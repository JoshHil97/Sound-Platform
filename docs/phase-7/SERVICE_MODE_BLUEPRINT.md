# Service Mode Blueprint

## Purpose

Service Mode is the Sunday-facing operations surface for volunteers and engineers. It should help a person serving today know what is ready, what is still due, what to check first when something breaks and when to escalate.

The page is designed to feel like a native mobile control surface while still scaling to desktop.

## Data Model

Phase 7 extends `ServiceChecklistItem` with:

- Priority
- Section
- Owner
- Due time
- Fallback instruction
- Related SOP
- Quick fault link

Additional seeded models:

- `ServiceQuickFault`
- `ServiceEscalationContact`
- `ServiceScheduleItem`
- `OfflineResource`

## Service Workflow

The Service Mode page now includes:

- Current readiness percentage
- Critical-system status
- Wireless, Dante, Logic and fallback summary cards
- Grouped checklist sections
- Per-check fallback instructions
- Quick links to troubleshooting flows
- Today’s service run schedule
- Escalation contacts
- Incident draft placeholders
- Offline resource pack

## Mobile Requirements

Service Mode should preserve:

- Large touch targets
- Clear status pills
- One-handed vertical flow
- No hover-only controls
- Dense but readable cards
- Fast fault access
- Clear escalation

## Current Boundaries

Phase 7 does not persist checklist state. It uses seeded data to establish the product shape.

Later phases should add:

- User-specific “I am serving today” session state
- Persisted checklist completion
- Incident form submission
- Mentor/contact messaging integration
- Offline caching with service worker or framework-supported strategy
- Real service schedule integration
- Role-aware service assignments

## Acceptance Notes

Phase 7 is complete when Service Mode feels like a practical Sunday tool rather than a static checklist page.
