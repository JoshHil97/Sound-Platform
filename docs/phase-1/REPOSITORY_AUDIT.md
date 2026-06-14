# Sound Academy Repository Audit

Date: 2026-06-14

## Executive Summary

The repository is in a good MVP foundation state. It now has:

- A working Next.js App Router app.
- A premium dark control-room UI direction.
- A Phase 0 curriculum architecture document set.
- Static/mock data for modules, lessons, Sound Lab, videos, visual assets, equipment, SOPs and troubleshooting.
- Prisma models for the original LMS-style platform plus early asset/audio/video additions.
- Build, lint and schema validation commands.

The main architectural gap is that Phase 0 exists in documentation, while the running app still uses the older `Module`, `Lesson`, `Quiz`, `Certification` and static data shapes. Phase 2 and Phase 3 should close that gap before large content generation.

## Current Structure Summary

### App Routes

Current route inventory:

- `/`
- `/academy`
- `/academy/[moduleSlug]`
- `/admin`
- `/certifications`
- `/dante`
- `/equipment`
- `/lessons/[lessonSlug]`
- `/logic-stream`
- `/service-logs`
- `/service-mode`
- `/signal-flow`
- `/sops`
- `/sound-lab`
- `/troubleshooting`
- `/troubleshooting/[flowSlug]`
- `/visuals`
- `/x32-console`

The route surface now covers the requested MVP and early specialist modes. The strongest pages are the premium shell, dashboard, academy roadmap, Sound Lab, Service Mode and specialist pages. Several support pages still need the newer design treatment and deeper interactivity.

### Components

Current reusable component files:

- `src/components/app-shell.tsx`
- `src/components/ui.tsx`
- `src/components/sound-lab-player.tsx`
- `src/components/quiz-runner.tsx`
- `src/components/troubleshooting-runner.tsx`

The app has a useful shared UI start, but components are still broad and page-specific. Phase 2 should formalize a design system instead of letting one-off layout classes spread.

### Data Layer

Current data sources:

- `src/lib/types.ts`
- `src/lib/data.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`

The product currently runs primarily from typed mock/static data. Prisma can seed much of it, but many fields are newline-serialized strings rather than relational entities.

### Documentation

Current governing docs:

- `docs/MASTER_PHASE_ROADMAP.md`
- `docs/phase-0/*`
- `docs/CHATGPT_REVIEW_PROMPT.md`

Phase 0 documentation is strong enough to govern the next platform architecture step.

## What Is Working Well

- The app builds successfully as a Next.js production app.
- The product no longer reads as a generic LMS on the main training surfaces.
- The dashboard, Sound Lab and Service Mode are aligned with the desired live-production command-centre direction.
- The curriculum structure is church-specific: X32, Dante, Logic, Waves, P16, wireless, choir, speech, livestream and troubleshooting are all represented.
- Sound Lab uses browser-generated audio examples, which is a good placeholder until real recorded examples are approved.
- Visual and video source records exist, which supports the user requirement for sourced visuals and lesson media.
- The app shell already includes the intended major navigation areas.
- The seed data avoids lorem ipsum and uses realistic church sound language.

## Gaps By Area

### Curriculum Architecture Gap

Phase 0 defines academies, certifications, competencies, progression rules, mentor sign-offs, evidence reviews and service experience requirements. The live schema does not yet model most of that.

Missing or incomplete in Prisma:

- `Academy`
- `Skill`
- `Competency`
- `LearningOutcome`
- `SkillTree`
- `ProgressionRule`
- `PracticalExercise`
- `MentorSignOff`
- `ServiceExperience`
- `Evidence`
- `EvidenceReview`
- curriculum versioning and approval workflow

Current `Module`, `Lesson`, `Certification` and `PracticalAssessment` models are useful but too flat for the Phase 0 architecture.

### Design System Gap

The visual direction is promising but not yet governed by a proper component system.

Needs:

- Design tokens for colors, surfaces, shadows, borders, spacing and meters.
- Reusable shell primitives.
- Reusable dashboard cards, status cards, meters, progress rings and mobile checklist components.
- Consistent table-to-card responsive patterns.
- Accessibility review for dark contrast, focus states and tap targets.
- Clear rule set for glass panels, accent colors and density.

### Page Engine Gap

Pages are mostly hand-built. As content expands, this will become hard to maintain.

Needs:

- Academy roadmap components.
- Lesson simulator layout components.
- Specialist training page components.
- Sound Lab scenario engine.
- Service Mode checklist engine.
- Troubleshooting decision-tree engine connected to richer flow data.
- Certification passport components.
- Admin content management components.

### Content Gap

The current content is useful but intentionally shallow.

Needs after Phase 0 approval:

- Full lesson maps per module.
- Mentor rubrics per practical task.
- Scenario assessments.
- Service observation tasks.
- Source-approved visuals and videos.
- Church-owned image capture placeholders with ownership status.
- Real or approved audio examples for gain, EQ, compression, feedback and livestream translation.
- Dante/X32/Logic/Waves walkthrough data.

### Database Gap

Several current fields are serialized as strings:

- module objectives
- prerequisites
- lesson content blocks
- question options
- equipment common issues
- SOP links
- visual linked topics
- audio checks and board symptoms
- video linked lessons

This is fine for MVP seed data, but Phase 3 should convert core curriculum and evidence relationships into proper relational models.

### Admin CMS Gap

The admin page exists, but it is not yet an editor.

Needs:

- Module and lesson management.
- Curriculum approval status.
- Visual asset registry management.
- Audio example registry management.
- Troubleshooting flow editor.
- Equipment/SOP editor.
- Certification approval cockpit.
- Evidence review queue.
- Role-gated actions.

### Auth And Roles Gap

The app has role concepts in types and Prisma, but no real auth/session system.

Needs:

- Auth provider decision.
- Role-based route/action protection.
- User profile and certification state.
- Mentor/admin permissions.
- Vercel environment strategy.

### Vercel Production Gap

The app is Vercel-oriented but not production-ready.

Needs:

- Postgres datasource migration plan.
- Environment variable documentation.
- Prisma config migration away from deprecated `package.json#prisma`.
- Build command and install policy confirmation.
- Seed strategy for preview vs production.
- Asset storage plan for visuals, audio clips and future evidence uploads.

## Risk Register

| Risk | Severity | Why It Matters | Recommended Response |
| --- | --- | --- | --- |
| Curriculum docs and app data diverge | High | The platform could become visually strong but educationally inconsistent | Make Phase 0 docs the source of truth and implement curriculum models before bulk content |
| Static mock pages grow too large | High | Junior developers will struggle to maintain repeated one-off layouts | Create reusable design/page components in Phase 2 |
| Prisma schema remains too flat | High | Certification, evidence and service experience will be hard to track | Implement Phase 0 curriculum data model in Phase 3 |
| No real auth | High | Mentor sign-off, certification approval and admin features need permissions | Pick auth approach before Admin CMS implementation |
| Media sourcing not governed | Medium | Unsourced visuals/videos/audio can create rights and quality issues | Build visual/audio/video asset registry with source and rights status |
| Sound Lab audio is synthetic only | Medium | Good for MVP, not enough for advanced ear training | Add real church-owned clips later with A/B labeling |
| Vercel DB mismatch | Medium | Local SQLite differs from intended Postgres production | Create migration plan and test with hosted Postgres |
| Prisma config deprecation | Low | Not breaking now but will matter for Prisma 7 | Add `prisma.config.ts` during production hardening or earlier |

## Priority Backlog

### P0: Before More Content Generation

- Approve Phase 0 curriculum documents.
- Create relational curriculum types/models matching Phase 0.
- Define academy, competency, skill tree, progression, evidence and mentor sign-off entities.
- Decide auth provider and role model.
- Lock design-system primitives.

### P1: Phase 2 Design System

- Extract reusable components from current pages:
  - app shell
  - page header
  - stat/status cards
  - progress ring
  - meter
  - roadmap node
  - service checklist item
  - training panel
  - evidence card
- Add responsive layout rules for desktop dashboard and phone service mode.
- Normalize dark theme tokens in `globals.css` and Tailwind config.
- Update support pages to use the premium system consistently.

### P1: Phase 3 Platform Architecture

- Implement Phase 0 curriculum schema in Prisma.
- Add typed mock data that mirrors the future schema.
- Replace newline-serialized data where relationships matter.
- Add evidence and mentor sign-off data flows.
- Add asset source/rights workflow.
- Plan Postgres migration.

### P2: Academy And Lesson Engines

- Build an academy roadmap renderer from skill tree data.
- Build a simulator lesson layout that renders:
  - steps
  - board checks
  - listening targets
  - practical tasks
  - quiz
  - mentor sign-off
  - related SOP/equipment/troubleshooting
- Convert existing module pages into the new engine.

### P2: Sound Lab And Service Mode

- Convert Sound Lab examples into structured scenarios with attempts and scoring.
- Add A/B/C comparison state and answer tracking.
- Add Service Mode checklist sessions and incident shortcuts.
- Add escalation contact placeholders and service-day role context.

### P3: Production Hardening

- Add smoke tests or lightweight route tests.
- Add Prisma config file.
- Add Vercel deployment notes and Postgres setup doc.
- Add accessibility pass.
- Add seed validation.
- Add asset storage decision.

## Phase 1 Recommendation

Proceed to Phase 2 next.

Do not start mass lesson generation yet. The correct sequence is:

1. Phase 2: formalize the design system.
2. Phase 3: implement the curriculum/platform architecture.
3. Phase 4 onward: use those foundations to build the Academy, practical training systems, Sound Lab, Service Mode, Digital Twin and certification workflows.

This keeps Sound Academy from turning into a beautiful static mockup. The platform needs a reusable design language and a curriculum graph underneath it before content scales.
