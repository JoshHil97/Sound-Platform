# Admin CMS Blueprint

## Purpose

The Admin CMS protects the quality and safety of Sound Academy content. It should manage the material that affects real church services:

- Curriculum
- Lessons
- Quizzes
- Practical exercises
- Equipment records
- SOPs
- Troubleshooting flows
- Visual and audio assets
- Users and roles
- Certification approvals
- Evidence reviews

## Admin Principle

Anything that can affect a live service, certification award or church-specific system document needs ownership, review and an approval path.

## Current MVP Surfaces

The `/admin` page now includes:

- CMS area health
- Editorial and approval queue
- Certification approval cockpit
- Governance health
- Asset and media governance
- Editor panel placeholders

These surfaces are intentionally visual/static in Phase 10.

## Content Area Model

`AdminContentArea` describes:

- Title
- Description
- Record count
- Owner role
- Status
- Primary action
- Risk

This helps the admin dashboard show what is safe, what is still drafting and what could affect service operations.

## Work Queue Model

`AdminWorkQueueItem` describes:

- Area
- Requester
- Owner role
- Priority
- Status
- Due date
- Detail

This becomes the future review workflow for curriculum edits, SOP changes, asset capture, equipment updates, troubleshooting improvements and certification approvals.

## Governance Model

`GovernanceStatus` describes:

- Governance area
- Status
- Cadence
- Owner role
- Next review
- Notes

This makes platform stewardship visible instead of hidden in scattered docs.

## Approval Boundaries

Recommended future permissions:

- Admin: content publishing, user role management, asset registry management
- Technical Director: certification governance, SOP approval, architecture and change-control approval
- Senior Engineer: mentor sign-offs, practical reviews, troubleshooting and equipment validation
- Engineer: lesson contribution, asset capture, Sound Lab and Logic/Dante workflow drafts
- Sound Operator: incident notes and training feedback
- Trainee: evidence submissions and lesson progress only

## Future Persistence

Phase 10 should eventually become a real CMS backed by:

- Auth and role permissions
- Server actions
- Database-backed work queues
- Audit logs
- Review and publish states
- Evidence review actions
- Asset storage and rights metadata

## Acceptance Notes

Phase 10 is complete when Admin no longer feels like a stats dump. It should look like the place a Technical Director or Admin would use to protect curriculum quality, certification authority, SOP safety, asset sourcing and church-specific system knowledge.
