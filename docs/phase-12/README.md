# Phase 12 Production Hardening

Phase 12 establishes a lint/build/test baseline and closes small production-readiness gaps found while establishing it.

Implemented outputs:

- Fixed all `pnpm lint` errors (unescaped entities in the dashboard command centre) and warnings (dead `ContentBlock`/`ListBlock` components in the lesson page)
- Confirmed `pnpm build` and `tsc --noEmit` are clean
- Migrated Prisma config off the deprecated `package.json#prisma` block to `prisma.config.ts`, and fixed the resulting `.env` loading gap
- Validated `pnpm prisma:seed` runs cleanly against a fresh SQLite database (35 of 47 tables populated; the rest are user-activity tables such as attempts, incidents and logs that are expected to be empty pre-launch)
- Accessibility pass on the shell, dashboard and interactive components: confirmed landmarks (`<nav aria-label>`, `<main>`), `lang="en"`, real `<button>` elements with `focus-visible` rings on every interactive control, `aria-current` on active nav links, meaningful `alt` text on content images and `alt=""` on decorative images, and 44px+ mobile tap targets. Added `aria-hidden` to two stray decorative icons in the dashboard header for consistency.
- Added a Playwright smoke-test suite (`tests/e2e/smoke.spec.ts`) covering every top-level route plus a primary-navigation flow, run against a production build (`pnpm test:e2e`)
- The new suite caught a real bug: the app had no `favicon.ico`, so every fresh browser session logged a 404. Fixed by generating `src/app/favicon.ico` and pointing `metadata.icons` at the existing platform logo SVG.

Current implementation status:

- `pnpm lint`, `tsc --noEmit`, `pnpm build`, and `pnpm test:e2e` all pass cleanly
- Prisma CLI commands (`generate`, `validate`, `db push`, `db seed`) run through `prisma.config.ts`
- Known pre-existing gap (not introduced or fixed in this phase): the app still runs on typed static mock data (`src/lib/data.ts`) rather than the Prisma models at runtime — there is no `PrismaClient` import anywhere under `src/app`. This is the Phase 3 gap flagged in the Phase 1 repository audit and is unchanged here. Note also that Prisma's schema engine resolves a relative SQLite `DATABASE_URL` relative to `prisma/schema.prisma`, not the project root, which differs from where a runtime `PrismaClient` would resolve it — worth remembering once Prisma is wired into the live app.
- `docs/phase-1/REPOSITORY_AUDIT.md` also flagged real church file-system paths embedded in `src/lib/data.ts` (source notes referencing `/Users/joshuahilarion/...`). Left as-is since it's content data, not a hardening defect, but worth scrubbing before public/production content review.

Not done in this phase (left for a follow-up pass):

- Broader `aria-hidden` consistency pass on the ~90 remaining Lucide icons that render next to visible text (cosmetic screen-reader verbosity only, not a WCAG failure)
- Performance review (bundle analysis, Lighthouse pass)
- CI wiring to run `lint` / `build` / `test:e2e` on push (no CI config exists yet in the repo)

Reference:

- `tests/e2e/smoke.spec.ts` — route smoke coverage
- `playwright.config.ts` — builds and boots the app on port 3100 before running tests
- `prisma.config.ts` — replaces the deprecated `package.json#prisma` block

Next recommended work:

- Wire `pnpm lint`, `pnpm build`, and `pnpm test:e2e` into CI before Phase 13 launch
- Add a Lighthouse/perf pass once real media assets replace placeholders
- Decide auth provider (Phase 1 audit gap) before enabling any Prisma-backed runtime writes
