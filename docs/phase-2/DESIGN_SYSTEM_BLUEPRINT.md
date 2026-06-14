# Sound Academy Design System Blueprint

Date: 2026-06-14

## Design Intent

Sound Academy should feel like a church production command centre, not a generic LMS. The interface should support calm operation during pressure, quick scanning, service-day workflows and focused training.

The visual language is:

- dark navy/black base
- glass panels
- subtle purple, blue and teal accents
- restrained status colors
- high-contrast text
- dense but readable layouts
- mobile-first service controls
- professional audio/broadcast feel

## Tokens

Primary tokens live in `src/app/globals.css`:

- `--background`
- `--panel`
- `--panel-strong`
- `--ink`
- `--muted`
- `--line`
- `--accent`
- `--accent-strong`
- `--teal`
- `--green`
- `--warning`
- `--danger`
- `--glow`

Tailwind exposes these as `academy.*` colors in `tailwind.config.ts`.

## Core Primitives

Defined in `src/components/ui.tsx`:

- `PageHeader`: top context panel with eyebrow, title, description and optional action.
- `SurfaceCard`: default glass panel container.
- `StatCard`: high-level dashboard statistic.
- `MetricCard`: compact metric used in admin, visual registry and certification surfaces.
- `StatusPill`: semantic status chip.
- `ProgressBar`: linear progress indicator.
- `ProgressRing`: certification/service progress indicator.
- `Meter`: audio-style level meter.
- `SearchField`: search-first knowledge-base input.
- `SectionHeader`: section title, description and optional action.
- `InfoTile`: label/value technical data block.
- `StepCard`: numbered procedure/checklist row.
- `LinkedAction`: consistent inline action link.

## Surface Rules

- Use `SurfaceCard` for framed dashboard, knowledge-base, admin and training panels.
- Use glass panels for major content surfaces, not nested cards inside cards.
- Use `InfoTile` for technical facts such as inputs, outputs, location, signal path and connected devices.
- Use `StepCard` for SOP steps, checklists and learning objectives.
- Use `MetricCard` for compact counts and progress data.
- Use `StatusPill` for state, urgency, ownership and rights labels.

## Interaction Rules

- All actionable controls should include `focus-ring`.
- Buttons should be at least `py-2` on desktop and `py-3` for primary mobile/service actions.
- Avoid hover-only meaning; hover may reinforce but not replace visible status.
- Search inputs should be full-width on knowledge-base and library pages.
- Mobile Service Mode should retain large touch targets and fixed bottom navigation.

## Page Migration Completed

The following pages now use the shared dark design system:

- Dashboard
- Academy
- Module detail
- Lesson detail
- Sound Lab
- Service Mode
- X32 Console
- Logic Stream
- Dante
- Troubleshooting
- Equipment
- SOPs
- Certifications
- Service Logs
- Signal Flow
- Visuals
- Admin

## Remaining Design Work

Future phases should add:

- form primitives for Admin CMS
- modal/dialog primitives
- evidence upload card
- mentor review queue layout
- Digital Twin node and route components
- table-to-card responsive data pattern
- accessibility pass with color contrast and keyboard testing
- final mobile viewport screenshot review

## Anti-Patterns

Avoid:

- white cards on the dark app background
- generic LMS course-card layouts
- oversized marketing sections inside the app
- decorative blobs or one-note color palettes
- large blocks of static text where a workflow, checklist, drill or decision tree would teach better
- adding new page-specific UI when an existing primitive fits
