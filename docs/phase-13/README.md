# Phase 13 Vercel Launch

Phase 13 prepares the concrete steps and artifacts needed to take Sound Academy from local SQLite development to a production Vercel deployment on Postgres. This phase does not provision any live infrastructure — that requires an actual Vercel account and Postgres database, which are outside this repository's reach — but it produces everything needed to execute the launch confidently.

Implemented outputs:

- `docs/phase-13/LAUNCH_RUNBOOK.md` — step-by-step sequence: provision Postgres, switch the Prisma datasource, bootstrap the schema, seed once, configure Vercel project settings, set up preview deployments, rollback checklist, and an asset-storage plan for future user-uploaded evidence
- `prisma/postgres/001_init.sql` — a schema-only baseline migration for Postgres, generated from the current `schema.prisma` via `prisma migrate diff --from-empty`, ready to apply with `psql` and register with `prisma migrate resolve --applied` so `prisma migrate deploy` can take over from a clean history afterward
- Expanded `.env.example` documenting both the local SQLite value and the production `DATABASE_URL` shape, with a pointer to the runbook
- Confirmed `pnpm build` succeeds with no `DATABASE_URL` set at all (Prisma's `generate` doesn't need a live connection), so Vercel's default install/build commands work without extra configuration beyond setting `DATABASE_URL` in the project's environment variables

Current implementation status:

- The Prisma datasource in `prisma/schema.prisma` still targets `sqlite`, matching local MVP development. The runbook documents switching it to `postgresql` as a deliberate step taken when the launch branch is cut, not something flipped speculatively in this phase.
- No `prisma/migrations/` history exists yet because the schema provider is still SQLite; the Postgres baseline lives separately at `prisma/postgres/001_init.sql` until the provider switch happens, at which point `prisma migrate dev`/`deploy` take over as documented in the runbook.
- Seed data is destructive on re-run (`seed.ts` calls `deleteMany()` on every table first) — the runbook calls this out explicitly so it's never run against a production database with real user data.
- The app still runs on static mock data at runtime (Phase 3 gap, unchanged) — none of this phase's Postgres work is exercised by the live app yet. It positions the database for whenever the runtime is wired to Prisma.

Not done in this phase (needs a live Vercel/Postgres account to complete):

- Actually creating the Vercel project and Postgres database
- Actually running the migration against a live database
- Configuring real environment variables in the Vercel dashboard
- Verifying a live preview deployment

Reference:

- `docs/phase-13/LAUNCH_RUNBOOK.md` — full launch sequence
- `prisma/postgres/001_init.sql` — Postgres baseline schema
- `.env.example` — required environment variables

Next recommended work:

- When ready to launch: follow `LAUNCH_RUNBOOK.md` step by step with real Vercel/Postgres credentials
- Decide the auth provider (Phase 1 audit gap) before any Prisma-backed runtime writes go live in production
- Revisit the performance/Lighthouse pass (tracked in Phase 12) once real media assets replace placeholders, ideally before the public launch
