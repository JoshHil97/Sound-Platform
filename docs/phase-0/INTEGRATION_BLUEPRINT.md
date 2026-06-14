# Sound Academy Platform Integration Blueprint

## Integration Principle

The curriculum architecture must drive the platform. UI surfaces should not invent progress or content independently. Dashboard, Academy, Sound Lab, Service Mode, Troubleshooting, Equipment, SOPs, Certifications, Mentor Sign-Offs and Digital Twin all read from the same curriculum graph.

## Dashboard

Integrates:

- Current academy/certification
- Next required module
- Due spaced repetition
- Sound Lab exercises due
- Service readiness
- System health
- Mentor notes
- Expiring certifications

## Academy

Integrates:

- Academy hierarchy
- Skill tree nodes
- Locked/unlocked progression rules
- Module competency requirements
- Practical and service requirements
- Specialist pathways

## Lessons

Integrate:

- Lesson architecture map
- Practical steps
- Board checks
- Listening targets
- Related Sound Lab exercises
- Related equipment/SOP/troubleshooting
- Mentor sign-off task
- Evidence capture

## Sound Lab

Integrates:

- Listening competencies
- Scenario assessments
- Fault diagnosis
- Related lesson and troubleshooting links
- Mentor review mode
- Attempt history and spaced repetition queue

## Service Mode

Integrates:

- Service checklist templates
- User role and certification permission
- Quick troubleshooting trees
- SOP shortcuts
- Incident logging
- Escalation contacts
- Offline-ready critical content

## Troubleshooting

Integrates:

- Fault scenarios from competency framework
- Equipment relationships
- Service urgency
- First safe check
- Observation/meaning/action pairs
- Incident log output
- Related lessons and SOPs

## Equipment

Integrates:

- Signal path relationships
- Normal operating state
- Common faults
- Related modules and competencies
- Church-owned visual capture requirements
- SOP and troubleshooting links

## Certifications

Integrate:

- Certification framework
- Evidence status
- Practical sign-offs
- Sound Lab scores
- Service experience
- Mentor feedback
- Renewal rules

## Mentor Sign-Offs

Integrate:

- Assessment rubrics
- Observation process
- Evidence review
- Retry conditions
- Escalation route
- Calibration process

## Digital Twin

Digital Twin means a structured representation of the church production system, not direct hardware control.

Initial objects:

- X32 inputs, buses, matrices, DCAs, scenes and snippets
- Dante devices, transmit/receive channels, subscriptions, sample rate and clock policy
- Logic template inputs, auxes, buses, plugin chains and outputs
- P16 source order
- Wireless inventory
- Stage and monitor layout
- Livestream/OBS handoff

Digital Twin feeds:

- Lesson mocks
- Signal flow diagrams
- Troubleshooting flows
- Service Mode checks
- Equipment pages

## Admin CMS

Admin must manage:

- Academies
- Modules
- Lessons
- Competencies
- Assessments
- Sound Lab scenarios
- Troubleshooting flows
- Equipment
- SOPs
- Visual/audio/video assets
- Certification reviews
- Mentor sign-offs

## Vercel Launch Integration

Production path:

- GitHub main branch as production
- Feature branches as Vercel previews
- Vercel Marketplace Postgres such as Neon
- Prisma migrations in CI/CD
- Blob storage for church-owned screenshots/audio/video/evidence
- Environment variables managed in Vercel
- Preview testing for Service Mode, Sound Lab and lesson flows
