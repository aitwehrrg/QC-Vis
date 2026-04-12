/**
 * Simulator Engine (Revamped)
 *
 * Data-driven stage definitions for the interactive Ring-LWE protocol
 * simulator with 3D lattice visualization and LaTeX math.
 */

export interface SimStage {
  id: string;
  title: string;
  /** Beginner-friendly explanation */
  explanation: string;
  /** LaTeX equations for this stage (array of display-mode blocks) */
  latex: string[];
  /** Which protocol vectors to highlight in the 3D scene */
  highlightVectors: string[];
  /** Description of what the 3D scene is showing */
  sceneCaption: string;
  /** Who is acting */
  actorFocus: "A" | "B" | "C" | null;
  /** Camera suggestion */
  cameraPosition: [number, number, number];
}

export const SIM_STAGES: SimStage[] = [
  {
    id: "keygen",
    title: "Bob generates keypair",
    explanation:
      "Bob creates a random secret polynomial s and a small error polynomial e. He picks a random public polynomial a, then computes b = a·s + e. The error e is intentionally small — it hides the algebraic structure.",
    latex: [
      "\\mathbf{s} \\leftarrow \\chi(\\mathbb{Z}_q[x]/(x^n+1)),\\quad \\text{coeffs} \\in \\{-1, 0, 1\\}",
      "\\mathbf{e} \\leftarrow \\chi(\\mathbb{Z}_q[x]/(x^n+1)),\\quad \\text{coeffs} \\in \\{-1, 0, 1\\}",
      "\\mathbf{a} \\leftarrow \\text{uniform}(\\mathbb{Z}_q[x]/(x^n+1))",
      "\\mathbf{b} = \\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e} \\pmod{q}",
    ],
    highlightVectors: ["s", "e", "a"],
    sceneCaption: "Secret s (amber) and error e (rose) are small vectors. Public a (green) spans the space.",
    actorFocus: "B",
    cameraPosition: [5, 4, 6],
  },
  {
    id: "publish",
    title: "Bob publishes public key",
    explanation:
      "Bob publishes (a, b) as his public key. Anyone, including Eve, can see these values. But without knowing s or e, the public key reveals nothing — this is the Ring-LWE hardness assumption.",
    latex: [
      "\\text{pk} = (\\mathbf{a},\\; \\mathbf{b})\\quad \\text{where } \\mathbf{b} = \\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e}",
      "\\text{sk} = \\mathbf{s}",
      "\\text{Security: given } (\\mathbf{a},\\; \\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e}),\\; \\text{find } \\mathbf{s}",
    ],
    highlightVectors: ["a", "b", "as"],
    sceneCaption: "b (green) = a·s (teal, dashed) + e (noise). The noisy displacement hides the algebraic structure.",
    actorFocus: "B",
    cameraPosition: [4, 5, 5],
  },
  {
    id: "ephemeral",
    title: "Alice generates ephemeral values",
    explanation:
      "Alice wants to send Bob a message. She generates her own temporary random values: r, e₁, and e₂. These small polynomials are used once and then discarded.",
    latex: [
      "\\mathbf{r} \\leftarrow \\chi,\\quad \\mathbf{e}_1 \\leftarrow \\chi,\\quad \\mathbf{e}_2 \\leftarrow \\chi",
      "\\text{All coefficients in } \\{-1, 0, 1\\}",
    ],
    highlightVectors: ["r", "e1", "e2"],
    sceneCaption: "Alice's ephemeral vectors r (indigo), e₁ and e₂ (rose) appear — all small-magnitude.",
    actorFocus: "A",
    cameraPosition: [5, 3, 7],
  },
  {
    id: "compute-uv",
    title: "Alice computes ciphertext (u, v)",
    explanation:
      "Alice uses Bob's public key and her ephemeral values to compute two ciphertext polynomials. The value v approximately encodes the shared secret — the small errors add protective noise.",
    latex: [
      "\\mathbf{u} = \\mathbf{a} \\cdot \\mathbf{r} + \\mathbf{e}_1 \\pmod{q}",
      "\\mathbf{v} = \\mathbf{b} \\cdot \\mathbf{r} + \\mathbf{e}_2 \\pmod{q}",
      "\\textcolor{gray}{= (\\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e}) \\cdot \\mathbf{r} + \\mathbf{e}_2 = \\mathbf{a} \\cdot \\mathbf{s} \\cdot \\mathbf{r} + \\mathbf{e} \\cdot \\mathbf{r} + \\mathbf{e}_2}",
    ],
    highlightVectors: ["u", "v", "ar"],
    sceneCaption: "u (blue) and v (blue) are constructed. Notice how noise displaces them from the clean a·r direction.",
    actorFocus: "A",
    cameraPosition: [6, 4, 5],
  },
  {
    id: "shared-key-a",
    title: "Alice derives shared key by rounding",
    explanation:
      "Alice derives the shared secret by \"rounding\" each coefficient of v. Each coefficient maps to 0 or 1 based on proximity to 0 or q/2. This rounding extracts a stable bit pattern from the noisy polynomial.",
    latex: [
      "K_A = \\text{Round}(\\mathbf{v})",
      "\\text{For each } v_i: \\quad k_i = \\begin{cases} 0 & \\text{if } v_i \\approx 0 \\\\ 1 & \\text{if } v_i \\approx \\lfloor q/2 \\rfloor \\end{cases}",
    ],
    highlightVectors: ["v"],
    sceneCaption: "The green sphere shows the rounding radius around v. The highlighted lattice point is the nearest point — this determines the shared key bits.",
    actorFocus: "A",
    cameraPosition: [4, 3, 4],
  },
  {
    id: "encrypt",
    title: "Alice encrypts and sends",
    explanation:
      "Alice uses the derived shared key to encrypt her message via XOR. She sends (u, v, ciphertext) to Bob over the public channel.",
    latex: [
      "\\text{ciphertext} = \\text{msg} \\oplus K_A",
      "\\text{Alice sends } (\\mathbf{u},\\; \\mathbf{v},\\; \\text{ciphertext}) \\text{ to Bob}",
    ],
    highlightVectors: ["u", "v"],
    sceneCaption: "u and v are transmitted publicly. The shared key and message stay private.",
    actorFocus: "A",
    cameraPosition: [5, 4, 6],
  },
  {
    id: "decrypt",
    title: "Bob recovers shared key and decrypts",
    explanation:
      "Bob computes v − u·s. The large a·r·s terms cancel, leaving only small error residuals. Rounding this gives the same shared key Alice derived. Bob decrypts the message.",
    latex: [
      "\\mathbf{v} - \\mathbf{u} \\cdot \\mathbf{s} = \\mathbf{e} \\cdot \\mathbf{r} + \\mathbf{e}_2 - \\mathbf{e}_1 \\cdot \\mathbf{s}",
      "K_B = \\text{Round}(\\mathbf{v} - \\mathbf{u} \\cdot \\mathbf{s})",
      "\\text{msg} = \\text{ciphertext} \\oplus K_B",
    ],
    highlightVectors: ["diff", "v", "u"],
    sceneCaption: "v − u·s (teal) is a small vector — the errors didn't grow too much. It rounds to the same lattice point as v.",
    actorFocus: "B",
    cameraPosition: [4, 5, 5],
  },
  {
    id: "attacker",
    title: "Eve fails to recover the secret",
    explanation:
      "Eve sees everything on the public channel: a, b, u, v, and the ciphertext. But she doesn't know s, r, e, e₁, or e₂. Without these, she faces the Ring-LWE problem — computationally infeasible even with a quantum computer.",
    latex: [
      "\\text{Eve knows: } (\\mathbf{a},\\; \\mathbf{b},\\; \\mathbf{u},\\; \\mathbf{v},\\; \\text{ct})",
      "\\text{Eve needs } \\mathbf{s} \\text{ to compute } K",
      "(\\mathbf{a},\\; \\mathbf{a}\\mathbf{s} + \\mathbf{e}) \\to \\mathbf{s} \\text{ is Hard!}",
    ],
    highlightVectors: ["eve-attempt"],
    sceneCaption: "Eve sees b (red, dashed) but cannot decompose it into a·s + e. The private vectors s, e are ghosted — invisible to her.",
    actorFocus: "C",
    cameraPosition: [6, 3, 6],
  },
  {
    id: "summary",
    title: "Protocol complete — keys match",
    explanation:
      "Alice and Bob both derived the same shared key independently. Alice never sent the key directly — it emerged from the algebraic structure of Ring-LWE. Eve, despite seeing all transmitted data, cannot reconstruct it.",
    latex: [
      "K_A = \\text{Round}(\\mathbf{b} \\cdot \\mathbf{r} + \\mathbf{e}_2)",
      "K_B = \\text{Round}(\\mathbf{v} - \\mathbf{u} \\cdot \\mathbf{s})",
      "K_A \\approx K_B \\quad \\checkmark",
    ],
    highlightVectors: [],
    sceneCaption: "Both keys converge to the same lattice point. The protocol succeeds because noise is small enough for rounding to agree.",
    actorFocus: null,
    cameraPosition: [5, 4, 6],
  },
];

/* ─── Configuration ───────────────────────────────────────────────── */
export const SIM_CONFIG = {
  defaultSpeed: 1,
  speeds: [0.5, 1, 2] as const,
  autoPlayInterval: 4000,
  transitionDuration: 600,
};

/* ─── Available primes for q ──────────────────────────────────────── */
export const AVAILABLE_PRIMES = [5, 7, 11, 13, 17, 23, 29, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97] as const;
