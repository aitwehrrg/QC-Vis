import { ProtocolScene } from "./types";

export const SCENES: ProtocolScene[] = [
  {
    id: "foundation",
    title: "1. Algebraic Foundation",
    shortExplanation: "The protocol operates in the ring $\\mathcal{R}_q = \\mathbb{Z}_q[x] / (x^n+1)$ with $n=256$ and $q=3329$ (visualized here in a reduced 8D space for 3D rendering).",
    cameraPose: { position: [10, 6, 10], target: [0, 0, 0] },
    visibleObjects: ["lattice", "axes", "basis-a"],
    actorFocus: null,
    equationOverlay: "\\begin{aligned} \\mathcal{R}_q &:= \\mathbb{Z}_{3329}[x] / (x^{256} + 1) \\\\ \\mathbf{a} &\\leftarrow \\mathcal{R}_q^{3 \\times 3} \\text{ (Public Matrix)} \\end{aligned}",
  },
  {
    id: "keygen",
    title: "2. Key Generation (Bob)",
    shortExplanation: "Bob generates a small secret vector $\\mathbf{s}$ and error $\\mathbf{e}$ using secure randomness. His public key $\\mathbf{b}$ is a noisy product that resists quantum inversion.",
    cameraPose: { position: [6, 4, 6], target: [1, 1, 0.5] },
    visibleObjects: ["lattice", "axes", "basis-a", "basis-b", "secret-point", "noise-cloud", "noisy-point"],
    actorFocus: "B",
    equationOverlay: "\\begin{aligned} \\mathbf{s}, \\mathbf{e} &\\leftarrow \\chi^{3} \\text{ (Secret)} \\\\ \\mathbf{b} &= \\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e} \\\\ pk &= (\\mathbf{a}, \\mathbf{b}) \\end{aligned}",
  },
  {
    id: "encapsulation",
    title: "3. Encapsulation (Alice)",
    shortExplanation: "Alice establishes a shared secret by masking Bob's public key with ephemeral randomness $\\mathbf{r}$. She produces two components $(\\mathbf{u}, \\mathbf{v})$ which form the ciphertext.",
    cameraPose: { position: [8, 5, 8], target: [-1, 0.5, 1.5] },
    visibleObjects: ["lattice", "axes", "basis-a", "basis-b", "u-vector", "v-vector", "r-vector", "e1-noise", "e2-noise"],
    actorFocus: "A",
    equationOverlay: "\\begin{aligned} \\mathbf{r}, \\mathbf{e}_1, \\mathbf{e}_2 &\\leftarrow \\chi \\\\ \\mathbf{u} &= \\mathbf{a}^T \\cdot \\mathbf{r} + \\mathbf{e}_1 \\\\ \\mathbf{v} &= \\mathbf{b}^T \\cdot \\mathbf{r} + \\mathbf{e}_2 \\end{aligned}",
  },
  {
    id: "decapsulation-init",
    title: "4. Decapsulation Core",
    shortExplanation: "Bob receives the ciphertext $(\\mathbf{u}, \\mathbf{v})$. Using his secret $\\mathbf{s}$, he strips the mask to recover the shared bits via noise cancellation.",
    cameraPose: { position: [5, 3, 5], target: [0, 2, 0] },
    visibleObjects: ["lattice", "axes", "basis-a", "basis-b", "u-vector", "v-vector", "secret-point"],
    actorFocus: "B",
    equationOverlay: "\\begin{aligned} \\mathbf{x} &= \\mathbf{v} - \\mathbf{u}^T \\cdot \\mathbf{s} \\\\ &= (\\mathbf{as}+\\mathbf{e})^T\\mathbf{r} + \\mathbf{e}_2 \\\\ &\\quad - (\\mathbf{ar}+\\mathbf{e}_1)^T\\mathbf{s} \\end{aligned}",
  },
  {
    id: "cancellation",
    title: "5. Algebraic Cancellation",
    shortExplanation: "The structured term $\\mathbf{a}^T\\mathbf{sr}$ appears in both components. Subtraction cancels this term, leaving only an aggregate of small error residuals.",
    cameraPose: { position: [4, 2, 4], target: [0, 0, 0] },
    visibleObjects: [
      "lattice", 
      "axes", 
      "basis-a", 
      "secret-point", 
      "r-vector", 
      "e1-noise", 
      "e2-noise", 
      "noise-cloud", 
      "shared-secret-point"
    ],
    actorFocus: "B",
    equationOverlay: "\\begin{aligned} \\mathbf{x} &= \\mathbf{s}^T\\mathbf{a}^T\\mathbf{r} + \\mathbf{e}^T\\mathbf{r} + \\mathbf{e}_2 \\\\ &\\quad - \\mathbf{r}^T\\mathbf{a}\\mathbf{s} - \\mathbf{e}_1^T\\mathbf{s} \\\\ &= \\mathbf{e}^T\\mathbf{r} + \\mathbf{e}_2 - \\mathbf{e}_1^T\\mathbf{s} \\end{aligned}",
  },
  {
    id: "correctness",
    title: "6. Proof of Correctness",
    shortExplanation: "Since all error terms are small, rounding recovers the exact secret bits. ML-KEM-768 ensures the error is bound such that recovery is 100% reliable with valid keys.",
    cameraPose: { position: [3, 2, 3], target: [0, 4, 0] },
    visibleObjects: ["lattice", "axes", "shared-secret-point"],
    actorFocus: "B",
    equationOverlay: "\\begin{aligned} \\mathbf{x} &= \\delta \\approx 0 \\pmod{q} \\\\ K &= \\text{Decompress}(\\mathbf{v}) \\\\ K' &= \\text{Decompress}(\\mathbf{x}) \\\\ K &= K' \\text{ (Q.E.D.)} \\end{aligned}",
  },
  {
    id: "security",
    title: "7. Security Analysis",
    shortExplanation: "Eve faces the Module Learning With Errors (M-LWE) problem. In a 256-dimensional space, solving for $\\mathbf{s}$ requires exponential complexity for even the most powerful quantum computers.",
    cameraPose: { position: [16, 10, 16], target: [0, 0, 0] },
    visibleObjects: ["lattice", "axes", "basis-a", "basis-b", "ambiguity-sphere"],
    actorFocus: "C",
    equationOverlay: "\\begin{aligned} \\text{Adv}_{Eve} &\\approx 2^{-192} \\text{ (AES-192 equivalent)} \\\\ &\\text{NIST Security Level 3} \\\\ &\\text{FIPS 203 Standard} \\end{aligned}",
  }
];

