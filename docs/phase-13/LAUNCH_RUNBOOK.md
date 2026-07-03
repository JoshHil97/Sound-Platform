# Vercel Launch Runbook

This is the step-by-step sequence for taking Sound Academy from local SQLite development to a live Vercel deployment on Postgres. Follow it in order the first time; later deploys only need the "Ongoing deploys" section.

## 1. Provision Postgres

Pick a provider (Vercel Postgres, Neon, Supabase, or any Postgres host reachable from Vercel's network). Create a production database and copy its connection string. Use a pooled/`sslmode=require` connection string if the provider offers one, since Vercel serverless functions open many short-lived connections.

## 2. Switch the Prisma datasource to Postgres

`prisma/schema.prisma` currently targets SQLite for local MVP development, per the datasource block:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Before the production build, change `provider` to `"postgresql"`. Do this as part of the release branch/PR that ships the launch, not as a manual step someone can forget — commit the change once Postgres is the permanent target. Local development can keep using SQLite via a separate schema file or a documented `git stash`/branch workflow if both environments need to coexist; that decision is out of scope for this runbook and should be made explicitly before flipping the provider.

## 3. Bootstrap the Postgres schema

A schema-only baseline migration is checked in at `prisma/postgres/001_init.sql`, generated via:

```bash
npx prisma migrate diff --from-empty --to-schema-datamodel <postgres-schema> --script
```

To apply it to a fresh production database:

```bash
psql "$DATABASE_URL" -f prisma/postgres/001_init.sql
npx prisma migrate resolve --applied 001_init
```

The `migrate resolve --applied` step tells Prisma's migration history table that this migration is already applied, so future `prisma migrate deploy` runs pick up cleanly from here. From this point forward, run `npx prisma migrate dev` locally (against a Postgres dev/shadow database) to generate new versioned migrations for schema changes, and `npx prisma migrate deploy` in CI/CD before each production deploy — not `prisma db push`, which has no history and can silently drop data on a divergent schema.

## 4. Seed (optional, first launch only)

`pnpm prisma:seed` runs `prisma/seed.ts` against whatever `DATABASE_URL` is set. `seed.ts` starts by calling `deleteMany()` on every table before reinserting starter data — it is destructive, not idempotent. Only run it against production once, immediately after step 3, on the still-empty database, if the plan is to launch with the same starter curriculum content used in development. Never run it again once real user data (accounts, progress, evidence, certifications) exists in production — it will wipe that data.

## 5. Vercel project settings

- Framework preset: Next.js (auto-detected)
- Install command: default (`pnpm install`) — this already triggers `prisma generate` via `@prisma/client`'s postinstall hook
- Build command: default (`pnpm build` / `next build`)
- Node.js version: 22.x (matches `engines.node` in `package.json`)
- Environment variable: `DATABASE_URL` set to the production Postgres connection string, scoped to the Production environment

## 6. Preview deployments

Set a second `DATABASE_URL` scoped to Preview environments, pointing at a separate (non-production) Postgres database or branch, so preview builds never write to production data. If the Postgres provider supports database branching (e.g., Neon), wire a preview branch per PR; otherwise a single shared staging database is an acceptable starting point.

## 7. Rollback checklist

- Vercel keeps prior deployments; use "Promote to Production" on the last known-good deployment to roll back the app instantly.
- Database rollback is not automatic. Before running a new `prisma migrate deploy` in production, confirm the migration is additive (new tables/columns) rather than destructive (dropped/renamed columns) unless a maintenance window and backup are planned.
- Take a Postgres backup/snapshot before every migration that alters or drops existing columns.

## 8. Asset storage plan

`public/dashboard-assets`, `public/icons`, and `public/training-assets` currently ship as static files bundled with the app, which works fine on Vercel as-is. If user-uploaded evidence/media is added later (see the Evidence/EvidenceReview models and the Phase 9 certification passport), plan for object storage (Vercel Blob, S3, or Supabase Storage) rather than the filesystem, since Vercel's serverless functions do not have persistent local disk.

## Ongoing deploys

Once the above is done once:

1. Push to `main` (or merge a PR) — Vercel builds and deploys automatically.
2. CI (`.github/workflows/ci.yml`) runs lint/typecheck/build/E2E on the same push; treat a red CI run as a signal to hold off on merging, since Vercel does not block deploys on CI status by default unless configured to.
3. If the change includes a schema migration, run `npx prisma migrate deploy` against production `DATABASE_URL` as part of the deploy step (a `postbuild`/CI step, or manually) before traffic depends on the new columns.
