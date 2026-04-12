## Goal

Create a **fullscreen, 3D, cinematic protocol walkthrough** for a minimal Ring-LWE / Kyber-style educational algorithm. The simulation should explain the full protocol visually inside a 3D coordinate space where vectors, lattice structure, perturbations, transformations, ciphertext movement, and attacker limitations can be physically seen. A standard Three.js scene consists of a scene, camera, renderer, and animated objects; this simulator should use that foundation, but wrapped in a clean typed React architecture. [peerdh](https://peerdh.com/blogs/programming-insights/building-interactive-3d-graphics-with-typescript-and-three-js)

This is not a game.  
This is not a generic 3D background.  
This is not a dashboard widget.  
This is a mathematically serious, authored visual explanation.

## What the simulator must communicate

The simulator must visually explain:

1. B generates secret `s`, public random `a`, noise `e`, and computes `b = a*s + e`.
2. B publishes `(a, b)` while keeping `s` private.
3. A generates ephemeral `r`, `e1`, `e2`.
4. A computes `u = a*r + e1` and `v = b*r + e2`.
5. A derives a shared key.
6. A encrypts an example plaintext message like `HELLO`.
7. B uses `s` and received values to derive the same conceptual shared key and decrypt.
8. C sees public values and ciphertext only, but cannot recover the hidden secret relation.

The simulator must make the role of **noise hiding structure** visually intuitive.

## Scope boundaries

Build only:
- the fullscreen simulator page or route,
- the 3D scene,
- the overlay controls,
- the scene engine,
- the typed data/config/model layer,
- supporting visual components,
- a small legend and transcript panel if needed.

Do not build:
- homepage,
- docs content pages,
- repo pages,
- install instructions,
- blog sections,
- general site shell beyond what the simulator route needs.

## Visual style

The simulation should feel like:
- a web-native Manim-inspired walkthrough,
- mathematically elegant,
- cinematic but restrained,
- minimal and exact,
- dark-stage educational visualization.

The simulation should not feel like:
- cyberpunk,
- security-brand cliché,
- glowing gamer UI,
- flashy tech demo,
- random 3D art piece.

Visual rules:
- dark matte background,
- off-white text,
- careful use of color,
- high contrast,
- sparse and meaningful geometry,
- large empty space around objects,
- no unnecessary post-processing,
- no decorative particle spam.

Semantic colors:
- public values: blue/cyan,
- private values: amber/gold,
- noise: muted purple-gray,
- ciphertext/shared secret: green,
- attacker uncertainty: muted red-gray.

## 3D scene design

The scene must use a meaningful 3D coordinate system with visible axes and a mathematical spatial structure. A 3D coordinate system should act as a real explanatory frame, not as a decorative backdrop. [youtube](https://www.youtube.com/watch?v=YA28VQQ1vNM)

Use one or more of these visual metaphors in 3D:
- lattice point grid,
- vector arrows in space,
- polynomial coefficients represented as vertical bars or points,
- circular coefficient rings floating in 3D,
- perturbation fields showing small error,
- public/private object clusters,
- packet-like ciphertext transfer objects,
- ghost candidate reconstructions for attacker failure.

Key requirement:
The viewer should be able to physically see:
- structure,
- perturbation,
- transformation,
- transmission,
- alignment,
- ambiguity.

## Narrative structure

Build the simulator as a sequence of authored scenes with persistent objects. Object continuity matters more than raw spectacle. React Three Fiber encourages reusable state-driven components; use that pattern to preserve semantic objects across scene transitions. [r3f.docs.pmnd](https://r3f.docs.pmnd.rs/getting-started/introduction)

Each scene must have:
- `id`
- `title`
- `shortExplanation`
- `technicalNote`
- `cameraKeyframes`
- `visibleObjects`
- `animationCues`
- `optionalEquationOverlay`

Required scenes:

### Scene 1: World setup
- Show actors A, B, C anchored in different regions of 3D space.
- Show the axes and base lattice/grid.
- Introduce public zone vs private zones.

### Scene 2: B creates the private/public structure
- Show secret `s` near B.
- Show `a`.
- Show `e` as a small perturbation field.
- Animate `b = a*s + e`.
- Keep the explanation geometric and legible.

### Scene 3: Public key publication
- Move `(a, b)` into a shared/public region.
- Keep `s` locked near B.
- Make it visually obvious that C can observe the public region only.

### Scene 4: A encapsulates
- Show A pulling in `(a, b)`.
- Show ephemeral `r`, `e1`, `e2`.
- Animate creation of `u` and `v`.
- Preserve continuity from `a`, `b` into the new objects.

### Scene 5: Shared key at A
- Show how A derives a shared secret from the structure.
- Use a stable geometric motif to indicate key formation.

### Scene 6: Encrypt message
- Use plaintext `HELLO`.
- Show conversion to ciphertext using the shared key.
- Keep this layer visually simple and subordinate to the protocol itself.

### Scene 7: B decapsulates
- Show B combining private `s` with received values.
- Show B recovering the conceptual same shared key.
- Visually align A and B outputs.

### Scene 8: C fails
- Show C observing `(a, b, u, v, ciphertext)`.
- Show failed attempts to infer the secret.
- Use ambiguity clouds, branching vectors, or unresolved candidate structures.

### Scene 9: Final pullback
- Pull the camera back and show the whole protocol in one coherent spatial summary.
- Display legend for public/private/noisy/encrypted.

## Camera choreography

The camera is part of the explanation.  
Use authored camera states per scene:
- wide establishing shots,
- close inspection shots,
- smooth transitions,
- slow dolly/orbit only when it clarifies the concept,
- no chaotic free camera by default.

User interaction:
- guided autoplay first,
- optional orbit controls second,
- reset camera button,
- free camera toggle,
- scene jump support.

Do not let unrestricted camera interaction weaken the narrative.

## Animation rules

Animation must be deliberate and explanatory:
- smooth interpolation,
- object transforms instead of abrupt replacement,
- line/vector draw-ins,
- subtle opacity changes,
- selective emphasis,
- no bounce-heavy motion,
- no constant ambient motion that distracts.

The simulation should feel authored like a mathematical lecture, not procedurally busy.

## Architecture requirements

Implement a **typed scene engine**.

Create reusable types such as:
- `ProtocolScene`
- `SceneObject`
- `ActorAnchor`
- `ProtocolRole`
- `CameraPose`
- `AnimationCue`
- `OverlayState`
- `SimulationConfig`

Create reusable scene primitives such as:
- `Axes3D`
- `LatticeGrid`
- `VectorArrow`
- `CoefficientRing`
- `CoefficientBars`
- `PerturbationCloud`
- `ActorNode`
- `TransmissionPath`
- `CipherPacket`
- `EquationBillboard`
- `KeyGlyph`
- `LegendOverlay`

The system must be data-driven. Do not hardcode a giant monolithic canvas file.

## Overlay UI

Build a minimal overlay UI with Tailwind on top of the fullscreen 3D scene.

Required overlay elements:
- scene title,
- one-line explanation,
- optional technical note,
- progress indicator,
- play/pause,
- previous/next scene,
- restart,
- speed control,
- toggle labels,
- toggle equations,
- toggle beginner/technical mode,
- toggle free camera,
- reset camera,
- compact legend.

Optional:
- collapsible transcript panel,
- collapsible data panel showing current values like `a`, `b`, `s`, `u`, `v`.

The UI must stay minimal and not dominate the stage.

## Mathematical content

Use sample toy parameters and actual values suitable for a didactic demo:
- `n = 8`
- `q = 17`
- example `a`, `b`, `s`, `u`, `v`
- plaintext `HELLO`

The visuals do not need to literally compute every matrix/ring operation in real time, but they must correspond coherently to the protocol steps and values.

Use LaTeX throughout for any labels or equations needed.

If the toy implementation lacks reconciliation, indicate that clearly in the technical note while preserving the conceptual shared-key explanation.

## Performance requirements

The simulator must be performant and architected properly for the web:
- lazy-load the simulation route,
- reuse geometry/materials,
- use instancing for repeated points if needed,
- avoid excessive draw calls,
- use efficient update loops,
- cap DPR when appropriate,
- avoid gratuitous post-processing,
- degrade detail on weaker devices.

Three.js mathematical visualization benefits from careful scene management and performance discipline; repeated structures should be rendered efficiently. [discourse.threejs](https://discourse.threejs.org/t/three-js-for-visual-mathematics-advice-and-best-practices/2822)

## Accessibility and fallback

Provide:
- keyboard-accessible overlay controls,
- focus styles,
- reduced-motion mode,
- text transcript per scene,
- fallback message if WebGL is unavailable.

## Deliverables

Produce only the simulation-related code and files:
- fullscreen simulation page,
- 3D scene components,
- overlay components,
- typed scene data,
- configuration,
- styles necessary for the simulation,
- any helper utilities.

Do not spend effort on unrelated site sections.

## Code quality

Requirements:
- idiomatic Next.js App Router code,
- strong TypeScript typing,
- clean component boundaries,
- reusable scene primitives,
- no giant unstructured page component,
- concise comments only where necessary,
- code ready to drop into an existing repository.

## Quality bar

The result should feel like:
- a serious 3D mathematical protocol explainer,
- a clean research-demo simulator,
- a fullscreen authored walkthrough.

It should not feel like:
- an embedded toy,
- a 3D background demo,
- a game,
- a generic security visualization.

Final instruction: build only the simulator experience, optimized for fullscreen immersive explanation of the protocol in 3D space, using Next.js, Tailwind, TypeScript, React Three Fiber, and Three.js.