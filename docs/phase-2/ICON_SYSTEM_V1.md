# Sound Platform Icon System V1

This icon set turns the generated navigation concepts into production UI assets for the Sound Academy shell.

## Assets

The production SVGs live in `public/icons/nav`:

- `dashboard.svg`
- `x32-console.svg`
- `logic-stream.svg`
- `dante-network.svg`
- `service-mode.svg`
- `academy.svg`
- `drills-labs.svg`
- `team.svg`
- `resources.svg`
- `reports.svg`
- `settings.svg`

The platform brand mark lives at:

- `public/icons/sound-platform-logo.svg`

## Design Rules

- Canvas: `64 x 64`.
- Export format: transparent-background SVG.
- Stroke width: `3px`.
- Stroke caps and joins: rounded.
- Visual style: outline-first, simple silhouettes, no icon containers.
- Sidebar render sizes: `24px`, `28px`, and `32px`.
- Padding: icon artwork sits comfortably inside the canvas and avoids touching edges.

The logo mark uses the same `64 x 64` canvas, but is filled rather than outline-only so the cross-and-waveform remains readable at small sidebar sizes.

## Color System

- Primary glow: `#8B5CF6`.
- Secondary glow: `#3B82F6`.
- Accent glow: `#2DD4BF`.

Each SVG uses the same purple-to-blue-to-teal gradient. The app shell controls final intensity with CSS rather than changing the SVG structure.

## State Behavior

- Default: slightly dimmed so text and active states remain readable.
- Hover: increases saturation and glow to roughly `120%`.
- Active: increases glow to roughly `140%` and lifts the icon by `1px`.
- Focused: uses the strongest glow at roughly `150%`.
- Disabled: desaturated and dimmed, with no navigation behavior.

Glows use the shared shell tokens in `src/app/globals.css` so the sidebar, search control, focus state, and icon hover behavior feel like one system.

## Concept Mapping

- Platform logo: church ministry cross fused with an audio waveform/meter shape.
- Dashboard: audio meters and command-centre monitoring.
- X32 Console: digital mixer, screen, and faders.
- Logic Stream: DAW timeline and multitrack recording.
- Dante Network: audio routing nodes, no direct Dante branding.
- Service Mode: church broadcast tower.
- Academy: graduation cap, book, and waveform.
- Drills & Labs: headphones and waveform.
- Team: crew collaboration around sound work.
- Resources: signal-flow documentation and SOPs.
- Reports: analytics and growth metrics.
- Settings: DSP/audio rack controls.

## Implementation

The global shell consumes these assets through `src/components/app-shell.tsx`. Shared styling lives in `src/app/globals.css` under the `nav-concept-icon` classes.
