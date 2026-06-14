# Academy Experience Blueprint

## Purpose

The Academy must feel like a premium church production training system, not a generic course catalog. Phase 4 establishes the UI framework for specialist pathways so each academy can later receive deeper interactive lessons, sourced visuals, audio examples and certification evidence.

## Experience Model

The Academy is organized around specialist pathways:

- Foundations Specialist
- FOH Operator Specialist
- Livestream Specialist
- Systems Specialist
- Leadership Specialist
- Technical Director Specialist

Each pathway presents:

- Mission and progress
- Module sequence
- Skill-tree preview
- Competency and certification summary
- Practice lab expectations
- Assessment modes
- Related production systems
- Service-readiness framing

## Routes

- `/academy`: pathway command centre and academy overview
- `/academy/paths/[academySlug]`: specialist pathway experience
- `/academy/[moduleSlug]`: module details and lesson list
- `/lessons/[lessonSlug]`: practical lesson shell, to be deepened in later phases

Static params are generated from the typed `academies` data so routes remain data-driven.

## Component Framework

Phase 4 adds `src/components/academy-framework.tsx`.

Reusable components:

- `AcademyTopBar`
- `AcademySidebar`
- `SpecialistHero`
- `SpecialistModuleCard`
- `SkillTreePreview`
- `CertificationBand`
- `AcademyPathCard`
- `AcademyCommandPanel`

These components use existing UI primitives from `src/components/ui.tsx` and keep the visual language aligned with Phase 2: dark control-room surfaces, glass panels, neon accents, dense information cards and mobile-safe stacking.

## Data Integration

The Academy pages read from Phase 3 typed data:

- `Academy`
- `Module`
- `CertificationDefinition`
- `Competency`
- `Skill`
- `SkillTree`
- `ProgressionRule`

New helpers in `src/lib/data.ts`:

- `getAcademy`
- `getModulesForAcademy`
- `getAcademyForModule`
- `getCertificationDefinitionForAcademy`
- `getCompetenciesForAcademy`
- `getSkillsForAcademy`
- `getSkillTreeForAcademy`

## Design Direction

The provided reference images informed:

- Dense specialist dashboards
- Left path navigation
- Large practical hero panels
- Lesson-card grids with visual diagnostic language
- Skill-tree and certification framing
- Purple, blue, teal and emerald accent balance
- Control-room UI density

The images are design references only. They are not embedded as product content.

## Boundaries

Phase 4 does not attempt to generate all lesson content. It creates the pathway architecture that future content will attach to.

Later phases should add:

- Console walkthrough lesson engine
- Logic and X32 simulator panels
- Sound Lab audio generation and scoring
- Sourced visual/video registry
- Mentor evidence upload and review flows
- Admin editing for pathways and modules

## Acceptance Notes

Phase 4 should be considered complete when:

- Academy no longer feels like a flat course list
- Specialist paths are navigable and data-driven
- Modules connect back to their parent pathway
- Certification and competency context is visible
- The UI matches the premium Sound Academy direction closely enough for later phases to extend it
