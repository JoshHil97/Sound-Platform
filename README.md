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

Copy `.env.example` to `.env` for local development.

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

The MVP includes seeded curriculum, sound examples, video source slots, visual references, SOPs, troubleshooting flows, equipment records, and certification data. The next major phase is to deepen every lesson with church-specific screenshots, real service recordings, approved Logic templates, X32 showfile references, Dante diagrams, Waves chains, and mentor rubrics.
