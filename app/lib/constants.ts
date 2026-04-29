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

export const BENCHMARK_OUTPUT = `★ ML-KEM Performance Benchmark (1000 iterations each)
------------------------------------------------------------
Parameter Set  |  KeyGen      |  Encaps      |  Decaps
------------------------------------------------------------
ML-KEM-512     |  274 μs      |  256 μs      |  403 μs     [OK]
ML-KEM-768     |  383 μs      |  426 μs      |  644 μs     [OK]
ML-KEM-1024    |  561 μs      |  632 μs      |  955 μs     [OK]
------------------------------------------------------------`;

export const LOCAL_DEMO_OUTPUT = `★ === ML-KEM-768 Secure Messaging Demo (FIPS 203) ===
Who is the sender? Alice
Who is the receiver? Bob

[ML-KEM] Key Generation complete.
[Bob] Publishes public key.

[Sender] Encapsulating shared secret...
[Sender] Encapsulated Key (hex): 3680880a9eb301de7daf6a3b5cef6265...

[AEAD] Encrypting message: "Post-quantum secure messaging"
[AEAD] Ciphertext (hex): 85fd8dc9fd4398c01e02f60af0efcc31...
[AEAD] Auth Tag (hex): f31a8c2eb961b522684c92c9641eb7d9
[AEAD] Nonce (hex): 2331df99bfaa6d26ae9cdc73

[Receiver] Decapsulating shared secret...
[Session] E2E secure channel established.

=== RESULTS ===
Bob received: "Post-quantum secure messaging"
(Message integrity: VERIFIED by AES-256-GCM authentication)`;

export const IRC_SESSION_OUTPUT = `▶ ./client 192.168.1.116
Quantum IRC Client (Production)
ML-KEM-768 / AES-256-GCM

Connecting to 192.168.1.116:6667 ...
Welcome. Use REGISTER <user> <pass> <ek_hex> or AUTH <user> <pass>

[R]egister new account or [L]ogin: r
Username: ghruank
Password (min 8 chars): ••••••••
Confirm password: ••••••••

Found existing keypair for ghruank. Reusing it.
Registering account...
✓ Account created! Now logging in...
✓ Authenticated as ghruank
Public key: 54bc3573a104b0d74d8d091763177681...

/list
Online users: hewhocodes rupak

/chat hewhocodes
Requesting hewhocodes’s public key from server...
Performing ML-KEM-768 encapsulation for hewhocodes...
✓ KEM sent. Waiting for hewhocodes to acknowledge...

Session established with hewhocodes
ML-KEM-768 + HKDF-SHA256 + AES-256-GCM

[you] encrypted : 6ef7275020b5e83400ce9489cdc...
[you] decrypted : hello rupak

[hewhocodes] encrypted : d710857650dd0f339d58a83...
[hewhocodes] decrypted : hello ghruank from ty it

[you] encrypted : 3090d721f88484766d69dea35c3...
[you] decrypted : how are you

[hewhocodes] encrypted : c622b23ede85efe655d04a0...
[hewhocodes] decrypted : im fine thank you`;


