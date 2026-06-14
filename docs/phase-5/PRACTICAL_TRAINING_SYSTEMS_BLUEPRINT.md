# Practical Training Systems Blueprint

## Purpose

Phase 5 establishes the practical training engine for Sound Academy. The goal is to move lessons away from passive reading and toward repeatable operator drills that prepare volunteers for real church services.

## Workflow Model

Each practical workflow includes:

- System domain: X32, Logic, Dante, Waves, Wireless, P16 or Troubleshooting
- Scenario
- Operator target
- Safety rule
- Step-by-step actions
- What to observe
- Why each action matters
- What to do if the expected result is wrong
- Board checks
- Listening targets
- Evidence requirements
- Mentor sign-off criteria
- Related platform routes

The model is typed as `PracticalTrainingWorkflow` in `src/lib/types.ts`.

## Seeded Workflows

Phase 5 adds workflows for:

- Set clean gain on a vocal mic
- Route a vocal source to P16
- Verify Dante into Logic
- Build a purpose-first Waves vocal chain
- Prepare wireless mics for service
- Recover a no-sound source

These are realistic church sound drills, but still mock/seeded. They should be replaced or expanded with local church equipment names, screenshots, audio examples and mentor rubrics as the Digital Twin and content phases mature.

## Routes and Surfaces

- `/practical-training`: central cockpit for all practical drills
- `/lessons/[lessonSlug]`: renders full workflow cards for mapped lessons
- `/academy/[moduleSlug]`: previews workflows attached to the module
- `/x32-console`: links X32 and P16 drills
- `/logic-stream`: links Logic and Waves drills
- `/dante`: links network audio verification drills

## Component Integration

New component file:

- `src/components/practical-training.tsx`

Components:

- `PracticalTrainingWorkflowCard`
- `PracticalWorkflowMiniCard`

These components intentionally use existing UI primitives so the system stays understandable for a junior developer.

## Future Enhancements

Later phases should add:

- Real audio examples and A/B playback
- Scored workflow attempts
- Interactive console controls
- Mentor evidence upload
- Persisted sign-off status
- Admin workflow editing
- Church-specific visual assets
- Digital Twin routing relationships

## Acceptance Notes

Phase 5 is complete when a trainee can open practical training from navigation, see realistic operator workflows, and encounter those workflows inside lessons and training-mode pages.
