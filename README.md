# Church Sound Academy

A church-specific sound engineering academy platform for volunteer onboarding, operator development, live-service troubleshooting, certification tracking, and livestream mixing training.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite for local MVP development
- PostgreSQL-ready Prisma schema for production/Vercel

## Core Areas

- Dashboard
- Learning Academy
- Lesson pages and quizzes
- Sound Lab with generated listening examples
- Troubleshooting decision trees
- SOP Library
- Equipment knowledge base
- Visual source registry
- Signal flow references
- Certification tracker
- Service logs
- Admin overview

## Project Roadmap

The build now follows the master phase plan in [docs/MASTER_PHASE_ROADMAP.md](docs/MASTER_PHASE_ROADMAP.md).

Phase 0 is mandatory before broad lesson generation or deeper feature expansion. Its governing documents live in [docs/phase-0/README.md](docs/phase-0/README.md) and define:

- Curriculum architecture
- Certification pathways
- Competency mapping
- Assessment design
- Mentor sign-off rules
- Platform integration strategy
- Curriculum governance

Phase 1 repository audit lives in [docs/phase-1/README.md](docs/phase-1/README.md). It records the current route/component/schema state, risks, and the backlog for Phase 2 design system and Phase 3 platform architecture.

## Local Setup

```bash
pnpm install
pnpm prisma:generate
pnpm dev
```

The local MVP uses:

```bash
DATABASE_URL="file:./dev.db"
```

Create `.env` locally with the value above for development. The file is intentionally ignored by Git.

## Vercel Notes

For production, use a hosted PostgreSQL database and set `DATABASE_URL` in Vercel project environment variables.

Before deployment, update `prisma/schema.prisma` datasource provider from `sqlite` to `postgresql` if using Postgres:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Recommended Vercel setup:

- Framework preset: Next.js
- Build command: `pnpm build`
- Install command: `pnpm install`
- Environment variable: `DATABASE_URL`

## Content Roadmap

The MVP includes seeded curriculum, sound examples, video source slots, visual references, SOPs, troubleshooting flows, equipment records, and certification data.

Per Phase 0, the next content step is not bulk lesson generation. First approve the curriculum hierarchy, certification requirements, competency framework, progression rules and assessment architecture. Then populate full lessons with church-specific screenshots, real service recordings, approved Logic templates, X32 showfile references, Dante diagrams, Waves chains and mentor rubrics.
