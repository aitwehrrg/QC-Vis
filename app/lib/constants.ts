export const PARAMS = {
  n: 256,
  q: 3329,
  k: {
    "512": 2,
    "768": 3,
    "1024": 4,
  }
} as const;

export const NAV_SECTIONS = [
  { id: "overview", route: "/", label: "Overview" },
  { id: "documentation", route: "/documentation", label: "Documentation" },
  { id: "simulation", route: "/simulation", label: "Simulation" },
] as const;

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

export const GLOSSARY: Record<string, string> = {
  "ML-KEM":
    "Module-Lattice-based Key Encapsulation Mechanism. A NIST-standardized (FIPS 203) post-quantum cryptographic algorithm.",
  "ML-KEM-768":
    "The parameter set targeting security category 3 (roughly equivalent to AES-192).",
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
    "Chosen Ciphertext Attack security — a security notion where an attacker cannot learn anything even if they can ask for decryptions of other ciphertexts.",
  "AVX2":
    "Advanced Vector Extensions 2 — an expansion of the x86 instruction set architecture used to accelerate NTT computations.",
  "Blind Relay":
    "A server architecture where the relay server forwards encrypted messages without having access to the plaintext or session keys.",
};

export const SAMPLE_VECTORS = {
  a: [3, 1, 4, 1, 5, 9, 2, 6],
  s: [1, 0, -1, 1, 0, 0, 1, -1],
  e: [0, 1, 0, -1, 0, 0, 1, 0],
  r: [0, 1, -1, 0, 1, 0, 0, -1],
  e1: [1, 0, 0, -1, 0, 1, 0, 0],
  e2: [0, 0, 1, 0, -1, 0, 0, 0],
} as const;

export const INSTALL_COMMANDS = {
  clone: "git clone https://github.com/ghruank/irc-encrypted.git\ncd irc-encrypted",
  prerequisites: "# Requires: OpenSSL 3.0+, CMake 3.14+, C++20 compiler (GCC 11+, Clang 13+)",
  build: "mkdir build && cd build\ncmake .. -DCMAKE_BUILD_TYPE=Release\nmake -j$(nproc)",
  run: "./server\n# In another terminal:\n./client 127.0.0.1",
  expectedOutput: `[R]egister new account  or  [L]ogin: R
Username: alice
Password: ••••••••••
Generating ML-KEM-768 keypair...
✓ Keypair saved to ~/.quantumirc/alice.keypair
✓ Account created! Authenticated as alice

/chat bob
Requesting bob's public key...
Performing ML-KEM-768 encapsulation...
✓ KEM sent. Session established with bob.
[you] encrypted : a3f0c29d1b7e82...`,
} as const;


