# Phase 9 Certification

Phase 9 turns certification from a simple progress tracker into an evidence-based competency passport.

Implemented outputs:

- Upgraded `/certifications` into a certification command centre
- Added typed passport data for readiness, gates, competency evidence, Sound Lab score, mentor review and renewal policy
- Added mentor sign-off queue examples
- Connected certification UI to Phase 0 certification definitions, competencies, curriculum assessments, evidence records and service observations
- Preserved the rule that certification is awarded by demonstrated service readiness, not passive lesson completion

Current implementation status:

- Data is seeded/static for MVP clarity
- Existing Prisma schema already has `CertificationDefinition`, `MentorSignOff`, `ServiceExperience`, `Evidence` and `EvidenceReview` models for future persistence
- Final approval workflow is visual/mock until Admin CMS and auth permissions mature

Next recommended work:

- Persist passport status from real user progress
- Add mentor review actions in Admin CMS
- Attach Sound Lab attempts to evidence records
- Add evidence upload support for screenshots, service notes and audio/video examples
- Gate certification approvals by Senior Engineer, Technical Director and Admin roles
