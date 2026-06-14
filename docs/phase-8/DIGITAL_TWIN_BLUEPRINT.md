# Digital Twin Blueprint

## Purpose

The Digital Twin is the shared model of the church sound system. It should become the source of truth for training, troubleshooting, equipment records, Service Mode and future admin content.

## Model Scope

Phase 8 adds typed models for:

- X32 input channels
- X32 buses
- Dante devices
- Dante subscriptions
- Logic channel strips
- P16 sources
- Stage zones
- Wireless assignments
- Digital signal paths

## Seeded Church System

The initial twin represents:

- Behringer X32 as FOH, monitor and stream-routing console
- Dante from X32 card to stream Mac/DVS
- Logic Pro livestream session with speech, vocal, choir, audience and master channels
- P16 source order for stage monitoring
- Wireless pastor, host and lead vocal assignments
- Stage zones for lectern, worship front line, choir, band and audience mics
- Signal paths for pastor-to-room, pastor-to-stream, lead-vocal-to-P16 and choir-to-stream

## Platform Integration

Phase 8 connects twin data to:

- `/digital-twin`: full inspectable system model
- `/signal-flow`: Digital Twin signal routes and related lessons/troubleshooting
- `/equipment`: twin summary cards
- `/x32-console`: featured channel normal state
- `/dante`: Dante matrix from seeded devices/subscriptions

## Governance Rule

When the real church patch changes, the Digital Twin should be updated before lesson content, SOPs or troubleshooting flows are changed.

Future admin tools should allow Senior Engineers or Technical Directors to:

- Edit X32 channels and buses
- Edit Dante devices and subscriptions
- Edit Logic template strips
- Edit P16 source order
- Edit stage zones
- Approve changes with version history
- Mark old system maps retired

## Future Enhancements

Later phases should add:

- Database persistence for the twin
- Admin editing workflow
- Versioned patch snapshots
- Change approval flow
- Import/export for X32/Logic/Dante maps
- Relationship graph queries
- Real church photos and screenshots
- Service Mode checks generated from the twin

## Acceptance Notes

Phase 8 is complete when the app has a visible, reusable church system model that other pages start consuming.
