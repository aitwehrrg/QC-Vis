/* ─── Protocol Parameters ─────────────────────────────────────────── */
export const PARAMS = {
  n: 8,
  q: 17,
} as const;

/* ─── Navigation ──────────────────────────────────────────────────── */
export const NAV_SECTIONS = [
  { id: "overview", route: "/", label: "Overview" },
  { id: "documentation", route: "/documentation", label: "Documentation" },
  { id: "simulation", route: "/simulation", label: "Simulation" },
] as const;

/* ─── Color Tokens ────────────────────────────────────────────────── */
export const VALUE_COLORS = {
  public: { bg: "var(--color-value-public-bg)", text: "var(--color-value-public-text)", label: "Public" },
  private: { bg: "var(--color-value-private-bg)", text: "var(--color-value-private-text)", label: "Private" },
  noise: { bg: "var(--color-value-noise-bg)", text: "var(--color-value-noise-text)", label: "Noise / Error" },
  ciphertext: { bg: "var(--color-value-cipher-bg)", text: "var(--color-value-cipher-text)", label: "Ciphertext" },
  attacker: { bg: "var(--color-value-attacker-bg)", text: "var(--color-value-attacker-text)", label: "Attacker View" },
} as const;

export const ACTOR_COLORS = {
  A: { accent: "var(--color-actor-a)", label: "Alice (Sender)" },
  B: { accent: "var(--color-actor-b)", label: "Bob (Receiver)" },
  C: { accent: "var(--color-actor-c)", label: "Eve (Eavesdropper)" },
} as const;

/* ─── Glossary ────────────────────────────────────────────────────── */
export const GLOSSARY: Record<string, string> = {
  "Ring-LWE":
    "Ring Learning With Errors — a lattice-based hard problem where secret information is hidden by adding small random noise to polynomial equations over a ring.",
  "Kyber":
    "ML-KEM (formerly CRYSTALS-Kyber) — a NIST-standardized post-quantum key encapsulation mechanism based on the Module-LWE problem.",
  "KEM":
    "Key Encapsulation Mechanism — a protocol that allows two parties to establish a shared symmetric key using asymmetric operations.",
  "PQC":
    "Post-Quantum Cryptography — cryptographic algorithms designed to resist attacks by both classical and quantum computers.",
  "Lattice":
    "A regular, repeating arrangement of points in n-dimensional space. Lattice-based cryptography relies on the hardness of finding short vectors in high-dimensional lattices.",
  "Polynomial Ring":
    "The algebraic structure Zq[x]/(x^n + 1), where arithmetic is performed on polynomials with coefficients modulo q, reduced modulo x^n + 1.",
  "Noise / Error":
    "Small random values added during encryption. They hide the algebraic structure of the secret but are small enough that the intended recipient can tolerate them during decryption.",
  "Encapsulation":
    "The process where the sender uses the receiver's public key to generate a shared secret and a ciphertext that encodes it.",
  "Decapsulation":
    "The process where the receiver uses their secret key to extract the shared secret from the ciphertext produced during encapsulation.",
  "Shared Secret":
    "A symmetric key derived by both the sender and receiver independently, used to encrypt and decrypt the actual message.",
  "Modular Arithmetic":
    "Arithmetic where numbers wrap around after reaching a modulus q. For example, 15 mod 17 = 15, but 18 mod 17 = 1.",
  "CCA Security":
    "Chosen Ciphertext Attack security — a strong security notion where an attacker cannot learn anything even if they can ask for decryptions of other ciphertexts. This demo does NOT provide CCA security.",
  "Fujisaki–Okamoto Transform":
    "A generic transformation that upgrades a CPA-secure KEM to CCA-secure. Used in real Kyber/ML-KEM but omitted in this educational demo.",
  "Reconciliation":
    "A mechanism to ensure the sender and receiver derive exactly the same shared key despite small differences caused by noise.",
};

/* ─── Sample Vectors (for worked example) ─────────────────────────── */
export const SAMPLE_VECTORS = {
  a: [3, 1, 4, 1, 5, 9, 2, 6],
  s: [1, 0, -1, 1, 0, 0, 1, -1],
  e: [0, 1, 0, -1, 0, 0, 1, 0],
  r: [0, 1, -1, 0, 1, 0, 0, -1],
  e1: [1, 0, 0, -1, 0, 1, 0, 0],
  e2: [0, 0, 1, 0, -1, 0, 0, 0],
} as const;

/* ─── Installation Commands ───────────────────────────────────────── */
export const INSTALL_COMMANDS = {
  clone: "git clone https://github.com/your-org/qc-vis.git\ncd qc-vis",
  prerequisites: "# Requires: C++17 compiler (GCC 9+, Clang 10+, MSVC 2019+)\n# CMake 3.16 or later\n# Make or Ninja build system",
  build: "mkdir build && cd build\ncmake .. -DCMAKE_BUILD_TYPE=Release\nmake -j$(nproc)",
  run: "./build/qc_vis_demo",
  expectedOutput: `[KeyGen] Generated secret polynomial s
[KeyGen] Generated error polynomial e
[KeyGen] Public key (a, b) computed
[Encapsulate] Generated ephemeral r, e1, e2
[Encapsulate] Computed (u, v)
[Encapsulate] Shared key (sender): 0x7a3f...
[Decrypt] Recovered shared key (receiver): 0x7a3f...
[Encrypt] Plaintext: "HELLO B"
[Encrypt] Ciphertext: 0x1d09...
[Decrypt] Recovered: "HELLO B"
[Verify] Keys match: YES`,
} as const;
