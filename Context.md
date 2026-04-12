Build a production-quality static website for an open-source post-quantum cryptography project. The project is a minimal Ring-LWE / Kyber-style educational protocol implementation in C++. The website must have two equally important functions:  
1. installation and technical documentation for the protocol, codebase, and algorithm,  
2. an interactive visual simulation of the protocol using a lattice-based visualization.

This is not a marketing site. It is a documentation-first technical product site with an embedded simulator. The audience is computer science students, cryptography learners, open-source contributors, and evaluators reviewing the project for technical depth. The site must look credible, modern, restrained, and academic-engineering oriented. Documentation structure should follow practical software architecture and workflow-based information architecture principles rather than vague brochure sections. [gitbook](https://gitbook.com/docs/guides/docs-best-practices/documentation-structure-tips)

### Primary goals

- Explain the protocol clearly from beginner to intermediate level.
- Provide installation and usage instructions for the C++ implementation.
- Document the algorithm, data flow, public/private key roles, and threat model.
- Visually simulate the protocol with an interactive lattice/ring view.
- Show how A sends an encrypted message to B while C learns nothing useful.
- Make the project look publishable as a serious open-source academic-demo project.
- Support desktop and mobile, but optimize the simulator for desktop first.
- Keep the site static: pure HTML, CSS, and JavaScript only. No backend.

### Deliverable requirements

Create a complete static website in a project folder with:
- one main entry point,
- files split cleanly if needed,
- assets folder,
- polished dark mode and light mode,
- fully working navigation,
- responsive layout,
- no placeholder content,
- no lorem ipsum,
- no stock-marketing fluff.

Use semantic HTML and accessible interactions. All controls must be keyboard accessible. The site must feel like a hybrid of excellent docs and a cryptography explainer.

### Technology constraints

- Static site only.
- No build tools required.
- Use Tailwind CSS and TypeScript.
- Use SVG and Canvas if useful for the simulator.
- Do not use React unless absolutely necessary.
- Use CDN libraries only if they clearly improve the simulator or diagrams.
- Avoid heavy dependencies.
- No localStorage reliance.
- Everything must run offline after opening the HTML files, except external font/icon CDN dependencies if used.

### Visual direction

Design language:
- restrained, technical, elegant, not startup-like,
- no purple-blue AI gradients,
- no generic three-card SaaS sections,
- no glowing blobs,
- no over-round bubbly UI,
- no marketing hero with empty claims.

Preferred aesthetic:
- Swiss / systems / research-lab / developer documentation hybrid,
- neutral surfaces with one accent color,
- typography with strong hierarchy,
- dense but readable layout,
- diagrams and grids used as visual identity,
- subtle lattice motifs in dividers/backgrounds,
- polished but sober.

Use a custom SVG logo for the project that suggests lattice structure, modular arithmetic, or interconnected nodes.

### Information architecture

The website must have the following main navigation:

1. Overview
2. Installation
3. Documentation
4. Simulation
5. Protocol Flow
6. Security Notes
7. Open Source / Contribute

Use sticky top navigation on desktop and an accessible menu on mobile.

### Required pages or sections

#### 1. Overview
Include:
- project name,
- one-sentence definition,
- what problem it solves,
- why PQC matters,
- why this project exists,
- what “minimal Ring-LWE / Kyber-style” means,
- clear note that this is educational and not production cryptography.

Add a visual “system map” showing:
- B publishes public key,
- A encapsulates shared secret,
- A encrypts message,
- B decrypts,
- C only sees public data and ciphertext.

#### 2. Installation
Create actual docs-style installation instructions with:
- prerequisites,
- compiler requirements,
- how to clone,
- how to build the C++ code,
- how to run the example,
- sample command lines,
- expected output structure,
- troubleshooting notes.

Format this like real technical docs:
- copy buttons on code blocks,
- anchored headings,
- sidebar table of contents for long sections,
- clean monospace formatting.

#### 3. Documentation
This is the largest section. It should include:
- protocol summary,
- mathematical intuition in plain English,
- key generation,
- encapsulation,
- decapsulation,
- message encryption layer,
- role of noise,
- why C cannot recover the secret,
- limitations of the minimal demo,
- difference between this demo and real ML-KEM / Kyber,
- glossary of terms.

Inside Documentation, add subsections:
- “For beginners”,
- “Algorithm internals”,
- “Data structures in the C++ code”,
- “Worked example with a real message”.

For the worked example, show:
- sample vectors for `a`, `b`, `s`, `u`, `v`,
- derived key values,
- a plaintext message like HELLO,
- XOR or symmetric encryption stage,
- decryption on B’s side,
- failure note if the minimal implementation lacks reconciliation.

#### 4. Simulation
This is the core interactive feature.

Build a visual simulator that demonstrates the protocol step by step. It must be visually rich and understandable.

Simulation requirements:
- show three actors: A, B, C,
- show public and private values,
- animate the protocol in stages,
- include a lattice-inspired grid or ring-polynomial coordinate visualization,
- represent small noise visually,
- represent public key generation visually,
- represent encapsulation and decapsulation visually,
- show that C sees data moving across the channel but cannot derive the secret.

The simulator must support:
- Play / Pause / Step Forward / Reset,
- stage labels,
- hover tooltips,
- optional “show math” toggle,
- optional “show beginner explanation” toggle,
- speed control,
- randomize example values,
- choose between “simple view” and “technical view”.

Simulation scenes:
1. B generates secret `s`, error `e`, random `a`, computes public `b`.
2. B publishes `(a,b)`.
3. A generates ephemeral `r`, `e1`, `e2`.
4. A computes `(u,v)`.
5. A derives shared key.
6. A encrypts plaintext message.
7. B computes `u*s`, derives shared key, decrypts.
8. C inspects `(a,b,u,v,ciphertext)` and fails to recover plaintext.
9. Final comparison: A’s and B’s keys align conceptually; C has no usable secret.

Important: the simulation must not just animate boxes. It must use one of these meaningful visual metaphors:
- lattice point clouds and noisy perturbations,
- polynomial coefficient bars arranged on a ring,
- modular arithmetic grid showing wraparound,
- side-by-side secret/public/noisy transforms.

The simulator should make the role of “small errors hiding structure” intuitively visible. The site should leverage the fact that cryptographic protocol visualization works well on the web. [is.muni](https://is.muni.cz/th/tvcgk/Visualization_of_Cryptographic_Protocols_Archive.pdf)

#### 5. Protocol Flow
Create a crisp sequence-diagram-style section showing:
- who sends what,
- what remains private,
- what is public,
- where the shared secret appears,
- where message encryption happens.

Use a timeline or message-sequence diagram with animation on scroll.

#### 6. Security Notes
Include:
- educational implementation disclaimer,
- not safe for production,
- no constant-time guarantees,
- no CCA transform,
- toy parameters,
- no hardened RNG discussion,
- simplified reconciliation or omitted reconciliation,
- what would be needed for a real deployment,
- why established cryptography should be used in real systems. Practical cryptography guidance strongly favors established, reviewed cryptographic implementations over ad hoc deployment. [blackduck](https://www.blackduck.com/blog/cryptography-best-practices.html)

Also include:
- threat model,
- what attacker C can and cannot do,
- what “post-quantum” means in this context,
- what this project does not claim.

#### 7. Open Source / Contribute
Include:
- repository structure,
- how to contribute,
- issues roadmap,
- possible extensions:
  - add reconciliation,
  - add proper KDF,
  - benchmark timings,
  - compare with ML-KEM,
  - add WebAssembly version,
  - add multiple parameter sets,
  - add attack visualizations.

### Layout requirements

Desktop layout:
- left sidebar for docs sections when inside Installation and Documentation,
- main content column with excellent readability,
- right-side mini table of contents on large screens if space allows,
- simulator in a wide section with room to breathe.

Mobile layout:
- stacked sections,
- collapsible sidebar,
- simulator simplified but still usable,
- preserve legibility over visual density.

### Typography and components

Use:
- one display font and one body/mono pairing,
- strong code block styling,
- callout boxes for warnings, definitions, and insights,
- tabs for switching between beginner and technical explanations,
- accordions only where genuinely useful,
- breadcrumbs or section markers inside docs.

Components to include:
- copyable code blocks,
- expandable formula panels,
- diagram cards,
- glossary tooltips,
- simulator control bar,
- actor badges for A, B, C,
- status badges for public/private/noisy/encrypted.

### Content writing instructions

Write all actual copy for the site. Do not leave placeholders.

Tone:
- technical,
- clean,
- direct,
- educational,
- no hype,
- no “revolutionary” wording.

Content must explain:
- what Ring-LWE intuition is,
- how the protocol works step by step,
- why noise helps security,
- how the shared key is used to encrypt a message,
- how this relates to PQC,
- how this differs from production-grade standardized schemes.

Provide both:
- plain-language explanation for newcomers,
- concise algorithmic explanation for technical readers.

### Simulator implementation details

For the simulator:
- prefer SVG for crisp diagrams and Canvas only if needed for performance,
- animate transitions smoothly but minimally,
- use color coding consistently:
  - public values one color,
  - private values one color,
  - noisy/intermediate values one color,
  - ciphertext one color,
  - attacker view muted/redacted style.

Include a legend.

Build the simulation engine so that each stage is data-driven, not hardcoded visually frame by frame. Use a JavaScript object array for stages with:
- title,
- explanation,
- values shown,
- values hidden,
- animation instructions.

Expose a small configuration object so parameters can be changed later.

### Data/content examples to embed

Use an example based on:
- `n = 8`,
- `q = 17`,
- sample vectors for `a`, `b`, `s`, `u`, `v`,
- plaintext message `"HELLO"` or `"HELLO B"`,
- derived demo key strings,
- clear note that exact equality of keys in the toy model may require reconciliation in a full design.

### Documentation quality requirements

Structure docs around real workflows, not generic prose. Good technical documentation should be task-oriented and information-architected clearly. [idratherbewriting](https://idratherbewriting.com/learnapidoc/)

Required documentation patterns:
- quick start,
- install from source,
- run demo,
- understand output,
- protocol internals,
- FAQ,
- limitations,
- contribution guide.

### Accessibility and QA

- semantic HTML only,
- keyboard-navigable docs and simulator controls,
- visible focus states,
- reduced-motion mode,
- sufficient contrast in both themes,
- alt text for meaningful graphics,
- ARIA labels for icon-only controls,
- no text below 12px,
- no horizontal overflow on mobile.

### Performance

- lightweight assets,
- lazy-load noncritical visuals,
- avoid giant JS bundles,
- keep initial load fast,
- use content-visibility where useful.

### Quality bar

The final result must feel like:
- a serious open-source docs site,
- a cryptography explainer,
- an interactive research demo.

It must not feel like:
- a startup landing page,
- an AI-generated template,
- a generic cyber-security theme.

### Optional enhancements

If time permits, add:
- animated sequence diagram,
- parameter playground,
- downloadable sample transcript of a protocol run,
- side-by-side “toy demo vs real Kyber” comparison,
- theme toggle,
- syntax highlighting,
- WASM hook placeholder for running the C++ algorithm in browser later.

### Final instruction

Produce the full website with complete content and polished interaction design. Make deliberate design decisions. Prioritize documentation clarity and simulator intelligibility over decorative effects. The simulator and docs are the product.