# Sound Academy Platform Architecture Blueprint

Date: 2026-06-14

## Goal

Phase 3 implements the curriculum and certification data spine that Phase 0 defined. This prevents the platform from scaling as disconnected static pages.

The change is intentionally additive. The current app keeps using the existing MVP data where appropriate, while the new models prepare the database for skill-roadmap rendering, competency passports, mentor sign-off, evidence review and service-experience tracking.

## Added Prisma Architecture

New curriculum and progression models:

- `Academy`
- `CertificationDefinition`
- `Competency`
- `Skill`
- `SkillTree`
- `SkillTreeNode`
- `LearningOutcome`
- `LessonStep`
- `PracticalExercise`
- `CurriculumAssessment`
- `ProgressionRule`

New evidence and mentorship models:

- `MentorSignOff`
- `ServiceExperience`
- `Evidence`
- `EvidenceReview`

Existing models retained:

- `Module`
- `Lesson`
- `Quiz`
- `PracticalAssessment`
- `Certification`
- `Equipment`
- `SOP`
- `TroubleshootingFlow`
- `VisualAsset`
- `AudioExample`
- `TrainingVideo`

The existing `Certification` model remains the user progress record. The new `CertificationDefinition` model represents the governed certification requirements.

## Typed Architecture Data

`src/lib/types.ts` now includes platform architecture types for:

- academy definitions
- certification definitions
- competencies
- skills
- skill trees
- curriculum assessments
- practical exercises
- learning outcomes
- progression rules
- service experience records
- evidence records

`src/lib/data.ts` now includes compact seedable examples that map the Phase 0 architecture without generating hundreds of lessons.

## Seed Strategy

`prisma/seed.ts` now populates the architecture layer in this order:

1. Users and roles
2. Academies
3. MVP modules mapped to academies
4. Skills
5. Competencies
6. Certification definitions
7. Skill trees
8. Curriculum assessments
9. Lessons
10. Learning outcomes
11. Practical exercises
12. Existing MVP content
13. Progression rules
14. Service experience
15. Evidence

This creates a usable bridge from the current app to the future competency-driven platform.

## Verification Notes

Verified:

- `pnpm lint`
- `DATABASE_URL="file:./dev.db" pnpm prisma:validate`
- `DATABASE_URL="file:./dev.db" pnpm prisma:generate`
- `DATABASE_URL="file:./dev.db" pnpm build`
- SQLite DDL generation with `prisma migrate diff`
- Local seed execution against generated SQLite schema

Known caveat:

- `prisma db push` returned an opaque local `Schema engine error` in this environment, despite `prisma validate` and `migrate diff` succeeding. The generated SQL applied cleanly with `sqlite3`, and the seed completed successfully against that database. Phase 12 should revisit this while moving to `prisma.config.ts` and production Postgres migrations.

## Architecture Decisions

- Keep MVP tables while adding the curriculum graph.
- Avoid renaming `Certification` during this pass to reduce risk.
- Use `CertificationDefinition` for governed award criteria.
- Keep static UI powered by existing arrays until pages are migrated one at a time.
- Seed only representative architecture records; do not mass-generate lessons yet.

## Next Implementation Path

Phase 4 should begin using this data spine in the Academy experience:

- Render academies as the primary hierarchy.
- Show certification definitions per academy.
- Render skill tree nodes from `SkillTree`.
- Show competency requirements on module and lesson pages.
- Show practical assessment and evidence requirements before mentor sign-off.

Phase 9 will later turn this into the full competency passport and certification approval workflow.
