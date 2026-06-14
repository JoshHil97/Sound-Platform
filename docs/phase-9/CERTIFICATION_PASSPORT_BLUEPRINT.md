# Certification Passport Blueprint

## Purpose

Sound Academy certification proves that a volunteer can serve safely and confidently in the real church sound environment.

The certification page must answer five questions quickly:

1. What credential is the trainee pursuing?
2. What evidence proves readiness?
3. What competencies are still weak?
4. What mentor sign-offs are pending?
5. What service experience is required before approval?

## Passport Model

The MVP passport is represented by typed mock data:

- `CertificationPassport`
- `CertificationGate`
- `CompetencyProgress`
- `MentorSignOffTask`

It connects to existing seeded architecture:

- `CertificationDefinition`
- `Certification`
- `Competency`
- `CurriculumAssessment`
- `EvidenceRecord`
- `ServiceExperienceRecord`

## Certification Gates

Every credential must pass these gates:

- Modules complete
- Knowledge assessments passed
- Practical assessments signed off
- Sound Lab diagnostic evidence recorded
- Service observations logged
- Mentor feedback reviewed
- Renewal policy assigned

The UI shows each gate as `Complete`, `In Progress`, `Needs Review` or `Blocked`.

## Mentor Review

Mentor sign-offs should record:

- Trainee
- Mentor
- Task observed
- Due date or observation date
- Rubric
- Pass, retry or scheduled state

Senior Engineers should own practical readiness. Technical Directors/Admins should own final certification governance.

## Evidence Review

Evidence records become the audit trail for certification decisions.

Examples:

- X32 gain practical
- Dante-to-Logic verification
- Sound Lab diagnosis
- Sunday service observation
- Mentor note
- Future screenshot/audio/video uploads

Evidence should always answer: what was observed, what standard was applied, and what the trainee should do next.

## Service Experience

Service observations are required because church sound is pressure-sensitive.

The certification system should distinguish:

- Rehearsal shadowing
- Supervised live service operation
- Independent service operation
- Livestream-specific service operation
- Mentor/leadership observation

## Future Persistence

The existing Prisma schema already includes the persistence targets for this phase:

- `CertificationDefinition`
- `Certification`
- `MentorSignOff`
- `ServiceExperience`
- `Evidence`
- `EvidenceReview`

Future phases should wire the page to real database state once auth, role permissions and Admin CMS workflows are ready.

## Acceptance Notes

Phase 9 is complete when the running app no longer presents certification as generic course progress. It should feel like a competency passport for church production readiness, with visible evidence, mentor decisions, service observations and renewal governance.
