/* ─── Protocol Parameters ─────────────────────────────────────────── */
export const PARAMS = {
  n: 256,
  q: 3329,
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
  "ML-KEM":
    "Module-Lattice-based Key Encapsulation Mechanism (formerly known as Kyber). A NIST-standardized (FIPS 203) post-quantum cryptographic algorithm.",
  "Kyber":
    "The original name for the ML-KEM algorithm. Part of the CRYSTALS suite.",
  "KEM":
    "Key Encapsulation Mechanism — a protocol that allows two parties to establish a shared symmetric key using asymmetric operations.",
  "PQC":
    "Post-Quantum Cryptography — cryptographic algorithms designed to resist attacks by both classical and quantum computers.",
  "M-LWE":
    "Module Learning With Errors — the mathematical problem that forms the security foundation of ML-KEM.",
  "Polynomial Ring":
    "The algebraic structure Zq[x]/(x^n + 1), where arithmetic is performed on polynomials with coefficients modulo q, reduced modulo x^n + 1.",
  "NTT":
    "Number Theoretic Transform — a highly efficient algorithm for polynomial multiplication used in ML-KEM.",
  "Encapsulation":
    "The process where the sender uses the receiver's public key to generate a shared secret and an encapsulated key (ciphertext).",
  "Decapsulation":
    "The process where the receiver uses their private key and the encapsulated key to recover the shared secret.",
  "AEAD":
    "Authenticated Encryption with Associated Data — a form of encryption which simultaneously assures the confidentiality and authenticity of data (e.g., AES-256-GCM).",
  "HKDF":
    "HMAC-based Extract-and-Expand Key Derivation Function — used to derive session keys from the shared secret established by ML-KEM.",
  "FIPS 203":
    "The official NIST standard for Module-Lattice-Based Key Encapsulation Mechanism.",
  "CCA Security":
    "Chosen Ciphertext Attack security — a security notion where an attacker cannot learn anything even if they can ask for decryptions of other ciphertexts. ML-KEM provides CCA security via the Fujisaki–Okamoto transform.",
};

/* ─── Sample Vectors (Simplified for Visualization) ───────────────── */
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
  clone: "git clone https://github.com/aitwehrrg/Kyber.git\ncd Kyber",
  prerequisites: "# Requires: C++20 compiler (GCC 11+, Clang 13+)\n# OpenSSL 3.0 or higher\n# CMake 3.15 or later",
  build: "mkdir build && cd build\ncmake ..\nmake -j$(nproc)",
  run: "./kyber_demo",
  expectedOutput: `[ML-KEM] Key Generation complete.
[ML-KEM] Public Key (hex): 4a3f2...
[Sender] Encapsulating shared secret...
[Sender] Encapsulated Key (hex): 1d09e...
[Receiver] Decapsulating shared secret...
[Session] Shared Secret derived successfully.
[AEAD] Encrypting message: "PQC is here"
[Session] E2E secure channel established.`,
} as const;

