# ChatGPT Review Prompt

Use this prompt to ask ChatGPT or another reviewer to deeply review the platform and propose the next implementation pass.

```text
You are a senior product architect, church sound engineer, curriculum designer, and full-stack Next.js reviewer.

Review this GitHub repository:
https://github.com/JoshHil97/Sound-Platform.git

Product goal:
Build a church-specific sound engineering academy for a volunteer church sound team using Behringer X32, Dante, Logic Pro livestream mixing, Waves plugins, P16 personal monitoring, wireless microphones, choir microphones, stage monitors, talkback, livestream buses, and mixed-experience volunteers.

Please review the platform for:

1. Product depth
   - Is it too basic or too generic?
   - Where does it still feel like a simple LMS instead of a church sound training academy?
   - What interactive learning experiences should be added?

2. Curriculum depth
   - Expand every level: Foundations, Operator, Engineer, Senior Engineer, Technical Director.
   - Add detailed lesson content, practical drills, mentor sign-offs, active recall prompts, spaced repetition prompts, and scenario-based exercises.
   - Make Logic Pro livestream mixing, Dante, Waves plugins, X32 routing, P16 monitoring, wireless mics, choir mics, and troubleshooting much deeper.

3. Sound Lab
   - Review the generated audio examples.
   - Suggest more examples: bad gain, clipped mic, low gain with noise, feedback buildup, harsh EQ, muddy EQ, HPF effect, compression, over-compression, gate chopping, de-essing, limiter pumping, livestream translation.
   - Recommend how to make the lab feel like a virtual training environment with board checks, meters, signal path visuals, and guided troubleshooting.

4. Visuals and videos
   - Identify where the app needs sourced images, diagrams, screenshots, and short YouTube videos.
   - Prefer official vendor sources and high-quality short videos.
   - Clearly mark which visuals must be church-owned captures rather than external media.

5. UX/UI
   - Make the app more interactive and less bare bones.
   - Improve dashboard usefulness, module pages, lesson pages, troubleshooting flows, SOPs, equipment pages, visual registry, and admin content management.
   - Suggest mobile-friendly live-service workflows.

6. Technical architecture
   - Review Next.js App Router structure, TypeScript types, Prisma schema, seed data, and Vercel readiness.
   - Recommend database improvements, role-based access, admin editing, media management, progress tracking, and certification evidence workflows.

7. Implementation plan
   - Produce a prioritized backlog.
   - Identify the first 10 code changes to implement.
   - Include exact page/component/data-model changes.
   - Keep the project understandable for a junior developer.

Please be direct, practical, and specific. Do not just say "add more content"; provide concrete content examples, interaction designs, data structures, and page improvements.
```
