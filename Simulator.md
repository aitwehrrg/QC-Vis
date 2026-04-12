Build the 3D protocol simulator for my PQC project website in a clean Manim-inspired mathematical walkthrough style, similar in spirit to a 3Blue1Brown explainer, but implemented natively for the web. Do not copy branding or assets. Recreate the explanatory method: sparse stage, precise vector graphics, staged transformations, persistent objects, synchronized labels, and calm cinematic pacing. Browser-based Manim-style scene systems and SVG-driven animation are the reference model for implementation quality. [manim](https://www.manim.community)

### Core goal

Create an interactive web simulator for a minimal Ring-LWE / Kyber-style protocol that feels like a narrated math animation, not like a dashboard, app UI, or game. The simulator must visually explain how:
- B generates a secret and public key,
- A uses the public key to derive a shared secret and encrypt a message,
- B derives the same secret and decrypts,
- C sees public data and ciphertext but cannot recover the secret because noise hides structure. [manim](https://www.manim.community)

### Technical direction

Implement the simulator using:
- SVG as the primary rendering layer,
- GSAP or a custom timeline engine for animation sequencing,
- JavaScript scene management with persistent objects across scenes,
- optional Canvas only if needed for large point clouds,
- equation and label rendering as SVG or LaTeX, not as clumsy HTML overlays.

Do not use React unless absolutely necessary. Do not use generic card-based UI for the simulation. The animation system should feel like a programmable scene engine. SVG and scene-based sequencing are preferred because they preserve object identity and support crisp mathematical storytelling. [youtube](https://www.youtube.com/watch?v=NuUWZ38cbuk)

### Visual style

The simulation stage should have:
- dark matte background,
- off-white primary text,
- restrained accent palette,
- clean geometry,
- high whitespace,
- subtle motion,
- no neon gradients,
- no cyberpunk styling,
- no startup hero aesthetic,
- no glowing blobs,
- no skeuomorphic UI.

Style target:
- mathematical,
- elegant,
- exact,
- calm,
- legible,
- cinematic.

The animation should feel like a proof being drawn and transformed in front of the viewer.

### Scene design principles

Use these Manim-like principles:
- introduce one idea at a time,
- keep objects persistent across scenes,
- transform objects rather than replacing them abruptly,
- use fades sparingly and intentionally,
- use motion to explain causality,
- use braces, arrows, boxes, highlights, and labels to direct attention,
- attach labels to moving objects so the meaning stays bound to the geometry,
- use color consistently as semantic encoding.

### Required semantic color mapping

- Public values: blue or cyan family.
- Private values: warm gold or amber family.
- Noise / error: purple-gray or jittered white accent.
- Ciphertext / transmitted data: green.
- Attacker uncertainty / failed inference: muted red or desaturated gray.
- Neutral explanatory text: off-white and gray.

### Required protocol scenes

Build the simulator as a sequence of scenes, each with title, subtitle, explanatory text, and animation timeline.

Scene 1: protocol stage setup
- Show three actors: A, B, C.
- Show the communication channel.
- Show that B owns a private secret and later publishes a public key.
- Minimal stage, simple actor positioning, clean labels.

Scene 2: B generates secret structure
- Show secret polynomial `s` as a private object.
- Show random public polynomial `a`.
- Show error polynomial `e` as a small perturbation visual.
- Compute and display `b = a*s + e`.
- Make the role of noise visually obvious but not chaotic.

Scene 3: public key publication
- Publish `(a, b)` from B to the shared/public area.
- Show private `s` staying anchored near B and visually inaccessible to C.
- C can observe only public objects.

Scene 4: A encapsulates
- Show A taking `(a, b)`.
- Show ephemeral secret `r`, plus `e1`, `e2`.
- Animate computation of `u = a*r + e1` and `v = b*r + e2`.
- Keep visual continuity from `a`, `b` to `u`, `v`.

Scene 5: shared secret emergence
- Show A deriving a shared key from the ciphertext-related structure.
- Use converging geometry or matched highlight patterns to imply a stable shared secret.
- Do not make it flashy.

Scene 6: message encryption
- Use a concrete plaintext like HELLO.
- Show message bytes transforming into ciphertext using the derived key.
- Keep the symmetric encryption layer visually simple and secondary.

Scene 7: B decapsulates
- Show B using `s` together with received values to derive the same shared secret.
- Visually align A’s and B’s derived keys.
- If the toy model is imperfect, indicate conceptually matched keys and explain that full reconciliation is used in practical schemes.

Scene 8: attacker view
- Show C receiving public values and ciphertext only.
- Present attempted inference visually as branching ambiguity, fuzzy reconstruction, or unresolved candidate cloud.
- Clearly show that C lacks the private structure needed to derive the shared secret.

Scene 9: final recap
- Summarize the flow with all major objects reduced to a clean annotated overview.
- Show public vs private vs noisy vs encrypted categories in a legend.

### Required visual metaphors

Use one or more of these clean mathematical metaphors:
- lattice point grids with perturbed points,
- coefficient bars arranged on a ring,
- vectors over a modular grid,
- grouped polynomial blocks with highlighted transformations,
- braces and boxed equations connected to animated shapes.

The lattice must be meaningful, not decorative. Noise should be visually encoded as slight displacement, blur cloud, micro-jitter, or offset arrows so viewers can intuit that structure exists but is obscured.

### Interaction model

Default behavior:
- guided autoplay walkthrough.

Controls:
- play/pause,
- step next,
- step previous,
- restart,
- speed control,
- toggle beginner explanation,
- toggle technical overlay,
- toggle equations,
- toggle labels.

The simulator should still work as a passive explanatory filmstrip when the user does nothing.

### Text integration

For each scene include:
- one short title,
- one short explanation line,
- one optional technical note.

Keep on-stage text concise. Long prose belongs outside the stage. Labels must be integrated with objects and animate with them.

### Motion requirements

Animation must be deliberate and math-explainer-like:
- smooth easing,
- stroke draw-ins for lines and paths,
- object transforms over cuts,
- subtle zoom/pan only when it clarifies focus,
- no excessive bouncing,
- no ornamental parallax.

Each scene should feel authored, not auto-generated.

### Architecture requirements

Implement a reusable scene engine:
- declarative scene data structure,
- reusable graphic primitives,
- timeline-based transitions,
- persistent object registry,
- semantic grouping of objects by role,
- configuration object for colors, timings, and parameter values.

Suggested object primitives:
- point,
- vector,
- grid,
- polynomial strip,
- coefficient ring,
- label,
- equation block,
- brace annotation,
- transmission arrow,
- key badge,
- ciphertext block.

### Website integration

Embed this simulator into a documentation website for an open-source protocol.
The simulator section should include:
- the stage on the left or top,
- scene explanation panel on the right or below,
- controls below the stage,
- legend,
- optional transcript of the current step.

It must integrate visually with a serious documentation site, not overpower it.

### Accessibility

- keyboard-accessible controls,
- visible focus states,
- reduced-motion support,
- sufficient contrast,
- meaningful ARIA labels,
- text alternatives or transcript for each scene.

### Output

Produce:
- the full simulator implementation,
- all HTML/CSS/JS needed,
- clean code structure,
- comments only where necessary,
- polished default scene content using my Ring-LWE protocol,
- no placeholders.

### Quality bar

The result should feel like:
- an interactive mathematical lecture,
- a cryptography explainer made by someone who understands visual pedagogy,
- a web-native Manim-like walkthrough.

It should not feel like:
- a generic cyber-security website,
- a dashboard,
- a slideshow of cards,
- a toy animation with disconnected effects.

Prioritize explanatory clarity, object continuity, mathematical elegance, and controlled pacing over feature count. [3blue1brown](https://www.3blue1brown.com)