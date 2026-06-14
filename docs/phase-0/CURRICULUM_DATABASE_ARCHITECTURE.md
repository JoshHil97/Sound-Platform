# Sound Academy Curriculum Database Architecture

## Current State

The current schema already contains broad MVP entities: User, Role, Module, Lesson, LessonContent, Quiz, Question, PracticalAssessment, Certification, Equipment, SOP, TroubleshootingFlow, SignalPath, ServiceChecklist, VisualAsset, LessonGuide, AudioExample and TrainingVideo.

The production plan requires a richer curriculum graph so practical training, certification evidence and mentor review are queryable instead of stored in long strings.

## Target Core Models

### Academy

Fields:

- id
- slug
- title
- mission
- order
- ownerRole
- activeVersion

Relations:

- modules
- certifications
- progressionRules

### Certification

Fields:

- id
- academyId
- level
- title
- mission
- renewalMonths
- requiredServiceObservations
- status

Relations:

- competencyRequirements
- moduleRequirements
- assessmentRequirements
- progressionRules

### CurriculumModule

Fields:

- id
- academyId
- slug
- title
- purpose
- outcomes
- estimatedHours
- order
- version
- status

Relations:

- lessons
- competencies
- assessments
- practicalExercises
- relatedEquipment
- relatedSOPs
- relatedTroubleshootingFlows

### Lesson

Fields:

- id
- moduleId
- slug
- title
- type
- durationMinutes
- objective
- summary
- ministryContext
- prerequisites
- order

Relations:

- lessonSteps
- learningOutcomes
- practicalExercises
- soundLabExercises
- assessments
- resources

### LessonStep

Fields:

- id
- lessonId
- interfaceType
- action
- expectedObservation
- whyItMatters
- safetyNote
- order

### Competency

Fields:

- id
- slug
- title
- category
- description
- level

Relations:

- academies
- modules
- assessments
- evidence

### Skill

Fields:

- id
- slug
- title
- domain
- description

Relations:

- skillTreeNodes
- competencies

### Assessment

Fields:

- id
- moduleId
- type
- title
- rubric
- passCriteria
- retryCriteria
- mentorRoleRequired

Relations:

- evidence
- mentorSignOffs

### PracticalExercise

Fields:

- id
- lessonId
- title
- setup
- task
- expectedResult
- evidenceRequired
- safetyConstraints

### MentorSignOff

Fields:

- id
- userId
- mentorId
- assessmentId
- status
- observedAt
- serviceContext
- feedback
- nextStep

### ServiceExperience

Fields:

- id
- userId
- serviceDate
- serviceType
- roleServed
- mentorId
- observationNotes
- approvedForCertification

### LearningOutcome

Fields:

- id
- text
- outcomeType
- measurableVerb

Relations:

- academy
- module
- lesson

### SkillTree

Fields:

- id
- academyId
- title
- version

### SkillTreeNode

Fields:

- id
- skillTreeId
- skillId
- parentNodeId
- unlockRule
- positionX
- positionY

### ProgressionRule

Fields:

- id
- fromCertificationId
- toCertificationId
- ruleType
- requirement
- active

### Evidence

Fields:

- id
- userId
- type
- title
- description
- assetUrl
- relatedEntityType
- relatedEntityId
- submittedAt
- status

### EvidenceReview

Fields:

- id
- evidenceId
- reviewerId
- decision
- notes
- reviewedAt

## Migration Strategy

1. Keep current MVP tables while adding new curriculum graph tables.
2. Add seed data for Academies, Certifications, Competencies and Modules.
3. Map existing Module and Lesson records to the new Academy/CurriculumModule structure.
4. Replace string lists with relation tables over time.
5. Move local SQLite to PostgreSQL before production content entry.
6. Add Prisma migrations and run `prisma migrate deploy` in CI/CD.
