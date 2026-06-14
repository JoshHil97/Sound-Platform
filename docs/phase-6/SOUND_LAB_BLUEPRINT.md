# Sound Lab Blueprint

## Purpose

Sound Lab trains volunteers to hear a problem, read the visual clues, choose the first safe board check and connect the diagnosis to a real service workflow.

It should not be a generic audio toy. Every scenario must point back to church sound operation: X32 gain, EQ, dynamics, feedback, Logic livestream mixing, Waves processing and service troubleshooting.

## Scenario Model

Phase 6 extends `AudioExample` with:

- Diagnosis
- Difficulty
- A/B/C variants
- Meter profile
- Spectrum hint
- First safe check
- Recommended fix
- Related troubleshooting flows

The goal is to let one scenario power:

- Audio playback
- Meter visuals
- Diagnosis prompts
- Mentor discussion
- Related lesson links
- Future evidence records

## Seeded Scenarios

The Sound Lab includes examples for:

- Clean gain
- Too much gain and clipping
- Too little gain and noise
- Rumble before/after HPF
- Harsh presence boost
- Muddy low-mid build-up
- Compression control
- Over-compressed vocal
- Gate chatter
- Feedback ringing
- Limiter working too hard
- Stream too dry
- Stream too roomy
- Stream too quiet
- Stream clipping
- Sibilance and de-essing

## Interaction Design

The upgraded player supports:

- Scenario selection
- Random scenario
- A/B/C/reference playback
- Generated browser audio
- Waveform visual
- Spectrum visual
- Input/output/gain-reduction/noise-floor meters
- Clipping indicator
- Diagnosis selection
- First-safe-check selection
- Reveal answer
- Recommended fix
- Related lessons
- Related troubleshooting flows

## Generated Audio Strategy

Phase 6 uses Web Audio API synthesis and processing because real church recordings are not yet available.

Generated examples are intentionally approximate. They are useful for teaching the direction of a fault, but the content phase should replace or supplement them with:

- Church-owned vocal clips
- Virtual soundcheck excerpts
- Stream master before/after clips
- Feedback-safe synthetic tones
- Mentor-approved examples

## Future Persistence

Later phases should persist:

- Attempts
- Selected diagnosis
- Selected first check
- Score
- Time spent
- Mentor review flag
- Evidence record
- Certification mapping

These should connect to the Phase 3 `Evidence`, `EvidenceReview`, `CurriculumAssessment` and `Certification` architecture.

## Acceptance Notes

Phase 6 is complete when Sound Lab feels interactive, diagnostic and connected to real service operation, even before real audio assets are available.
