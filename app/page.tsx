import Navigation from "./components/Navigation";
import SystemMap from "./components/SystemMap";
import ProtocolFlow from "./components/ProtocolFlow";
import GlossaryTooltip from "./components/GlossaryTooltip";
import ActorBadge from "./components/ActorBadge";
import CodeBlock from "./components/CodeBlock";
import { PARAMS } from "./lib/constants";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1 lattice-bg">
        {/* ═══════════════════════════════════════════════════════════
            1. OVERVIEW
            ═══════════════════════════════════════════════════════════ */}
        <section id="overview">
          <div className="section-container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <svg width="40" height="40" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="28" height="28" rx="4" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
                  <circle cx="8" cy="8" r="2" fill="var(--accent)" />
                  <circle cx="16" cy="8" r="2" fill="var(--accent)" />
                  <circle cx="24" cy="8" r="2" fill="var(--accent)" />
                  <circle cx="8" cy="16" r="2" fill="var(--accent)" />
                  <circle cx="16" cy="16" r="2.5" fill="var(--accent)" />
                  <circle cx="24" cy="16" r="2" fill="var(--accent)" />
                  <circle cx="8" cy="24" r="2" fill="var(--accent)" />
                  <circle cx="16" cy="24" r="2" fill="var(--accent)" />
                  <circle cx="24" cy="24" r="2" fill="var(--accent)" />
                  <line x1="8" y1="8" x2="16" y2="16" stroke="var(--accent)" strokeWidth="0.75" opacity="0.5" />
                  <line x1="24" y1="8" x2="16" y2="16" stroke="var(--accent)" strokeWidth="0.75" opacity="0.5" />
                  <line x1="8" y1="24" x2="16" y2="16" stroke="var(--accent)" strokeWidth="0.75" opacity="0.5" />
                  <line x1="24" y1="24" x2="16" y2="16" stroke="var(--accent)" strokeWidth="0.75" opacity="0.5" />
                </svg>
                <div>
                  <h1 className="text-balance m-0">QC-Vis</h1>
                  <p className="text-sm m-0" style={{ color: "var(--muted)" }}>
                    Post-Quantum Cryptography Visualizer
                  </p>
                </div>
              </div>

              <p className="text-lg leading-relaxed" style={{ color: "var(--fg)" }}>
                An interactive educational implementation and visualizer for a minimal{" "}
                <GlossaryTooltip term="Ring-LWE">Ring-LWE</GlossaryTooltip> /{" "}
                <GlossaryTooltip term="Kyber">Kyber-style</GlossaryTooltip>{" "}
                <GlossaryTooltip term="KEM">key encapsulation</GlossaryTooltip> protocol in C++.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                  <h3 className="text-sm font-semibold m-0 mb-2" style={{ color: "var(--accent)" }}>
                    What problem does this solve?
                  </h3>
                  <p className="text-sm m-0" style={{ color: "var(--muted)" }}>
                    Current public-key cryptography (RSA, ECC) will break when large-scale quantum computers arrive. <GlossaryTooltip term="PQC">Post-quantum cryptography</GlossaryTooltip> provides alternatives based on mathematical problems that resist quantum attacks — primarily{" "}
                    <GlossaryTooltip term="Lattice">lattice-based</GlossaryTooltip> problems.
                  </p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                  <h3 className="text-sm font-semibold m-0 mb-2" style={{ color: "var(--accent)" }}>
                    Why this project exists
                  </h3>
                  <p className="text-sm m-0" style={{ color: "var(--muted)" }}>
                    Real lattice-based schemes like ML-KEM (Kyber) are complex. This project strips the protocol down to its core ideas — polynomial arithmetic, noise-hidden secrets, and key agreement — making them tangible through visualization.
                  </p>
                </div>
              </div>

              <div className="callout callout-warning mt-6">
                <div className="callout-title">⚠ Educational Implementation</div>
                <p>
                  This is a teaching tool, not production cryptography. It uses toy parameters
                  (n={PARAMS.n}, q={PARAMS.q}), has no constant-time guarantees, omits the
                  Fujisaki–Okamoto CCA transform, and should never be used for real encryption.
                  For production use, see NIST ML-KEM (FIPS 203).
                </p>
              </div>

              <h2 id="system-map">System Map</h2>
              <p style={{ color: "var(--muted)" }}>
                High-level view of how <ActorBadge actor="A" />, <ActorBadge actor="B" />, and{" "}
                <ActorBadge actor="C" /> interact in the protocol.
              </p>
              <SystemMap />
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ═══════════════════════════════════════════════════════════
            5. PROTOCOL FLOW
            ═══════════════════════════════════════════════════════════ */}
        <section id="protocol-flow">
          <div className="section-container">
            <h2 className="mt-0">Protocol Flow</h2>
            <p style={{ color: "var(--muted)" }} className="max-w-2xl">
              A message-sequence view of the protocol. Each step shows who performs the action, what data moves, and whether it is private, public, or encrypted.
            </p>
            <div className="mt-8">
              <ProtocolFlow />
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ═══════════════════════════════════════════════════════════
            6. SECURITY NOTES
            ═══════════════════════════════════════════════════════════ */}
        <section id="security">
          <div className="section-container">
            <div className="max-w-3xl">
              <h2 className="mt-0">Security Notes</h2>

              <div className="callout callout-warning">
                <div className="callout-title">⚠ Not for Production Use</div>
                <p>
                  This implementation is strictly educational. It must not be used for any real cryptographic purpose. The parameters are too small to provide security, the code is not constant-time, and critical transforms are omitted.
                </p>
              </div>

              <h3>What This Implementation Lacks</h3>
              <ul className="text-sm space-y-2" style={{ color: "var(--fg)" }}>
                <li>
                  <strong>No constant-time operations.</strong> Real implementations must avoid timing side channels. Every branch, memory access pattern, and arithmetic operation must take the same time regardless of secret values.
                </li>
                <li>
                  <strong>No CCA transform.</strong> The <GlossaryTooltip term="Fujisaki–Okamoto Transform">Fujisaki–Okamoto transform</GlossaryTooltip> is essential for chosen-ciphertext security. Without it, an attacker who can submit modified ciphertexts for decryption can extract the secret key.
                </li>
                <li>
                  <strong>Toy parameters.</strong> With n=8 and q=17, the lattice dimension is far too small. An attacker could brute-force all possible secrets in milliseconds. Real ML-KEM uses n=256, q=3329.
                </li>
                <li>
                  <strong>No hardened RNG.</strong> This demo uses JavaScript&apos;s <code>Math.random()</code>, which is not cryptographically secure. Production code requires an OS-provided CSPRNG.
                </li>
                <li>
                  <strong>Simplified reconciliation.</strong> The rounding-based key derivation may produce mismatches. Real Kyber uses a compress/decompress mechanism with reconciliation bits.
                </li>
              </ul>

              <h3>Threat Model</h3>
              <p className="text-sm" style={{ color: "var(--fg)" }}>
                The protocol protects against a passive eavesdropper (<ActorBadge actor="C" />) who can observe all data on the public channel. Specifically:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="p-4 rounded-lg" style={{ background: "var(--color-value-public-bg)", border: "1px solid var(--color-value-public-text)" }}>
                  <h4 className="text-sm font-semibold m-0 mb-2" style={{ color: "var(--color-value-public-text)" }}>
                    What C CAN do
                  </h4>
                  <ul className="text-xs space-y-1 m-0" style={{ color: "var(--fg)" }}>
                    <li>Observe public key (a, b)</li>
                    <li>Observe ciphertext (u, v)</li>
                    <li>Observe encrypted message</li>
                    <li>Record all transmissions</li>
                    <li>Perform offline computation</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "var(--color-value-private-bg)", border: "1px solid var(--color-value-private-text)" }}>
                  <h4 className="text-sm font-semibold m-0 mb-2" style={{ color: "var(--color-value-private-text)" }}>
                    What C CANNOT do
                  </h4>
                  <ul className="text-xs space-y-1 m-0" style={{ color: "var(--fg)" }}>
                    <li>Recover secret key s</li>
                    <li>Recover ephemeral values r, e₁, e₂</li>
                    <li>Derive the shared key</li>
                    <li>Decrypt the message</li>
                    <li>Modify messages in transit (CPA only)</li>
                  </ul>
                </div>
              </div>

              <h3>What &ldquo;Post-Quantum&rdquo; Means Here</h3>
              <p className="text-sm" style={{ color: "var(--fg)" }}>
                &ldquo;Post-quantum&rdquo; does not mean the protocol uses quantum mechanics. It means the underlying mathematical problem — Ring-LWE — is believed to resist attacks from both classical computers and quantum computers. Shor&apos;s algorithm, which breaks RSA and ECC, does not efficiently solve lattice problems.
              </p>

              <h3>What This Project Does NOT Claim</h3>
              <ul className="text-sm space-y-1" style={{ color: "var(--fg)" }}>
                <li>It does not claim to be a secure implementation.</li>
                <li>It does not claim compliance with NIST FIPS 203 (ML-KEM).</li>
                <li>It does not claim the toy parameters provide any security.</li>
                <li>It does not replace studying the actual ML-KEM specification.</li>
              </ul>

              <div className="callout callout-info mt-6">
                <div className="callout-title">ℹ For Real Cryptography</div>
                <p>
                  Use established, peer-reviewed implementations. Libraries like liboqs, libsodium (with PQ extensions), or BoringSSL provide vetted ML-KEM implementations. Consult NIST SP 800-227 for migration guidance. Practical cryptography guidance strongly favors established, reviewed implementations over custom deployments.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ═══════════════════════════════════════════════════════════
            7. CONTRIBUTE
            ═══════════════════════════════════════════════════════════ */}
        <section id="contribute">
          <div className="section-container">
            <div className="max-w-3xl">
              <h2 className="mt-0">Open Source &amp; Contribute</h2>
              <p style={{ color: "var(--muted)" }}>
                QC-Vis is open source. Contributions, issues, and discussions are welcome.
              </p>

              <h3>Repository Structure</h3>
              <CodeBlock
                code={`qc-vis/\n├── src/\n│   ├── rlwe.h              # Ring-LWE arithmetic\n│   ├── rlwe.cpp            # Polynomial operations\n│   ├── keygen.cpp          # Key generation\n│   ├── encapsulate.cpp     # Encapsulation\n│   ├── decapsulate.cpp     # Decapsulation\n│   ├── encrypt.cpp         # Message encryption\n│   └── main.cpp            # Demo driver\n├── app/                    # This website (Next.js)\n│   ├── components/         # React components\n│   ├── lib/                # Crypto engine & constants\n│   └── page.tsx            # Main page\n├── tests/\n│   ├── test_poly.cpp       # Polynomial arithmetic tests\n│   └── test_protocol.cpp   # End-to-end protocol tests\n├── CMakeLists.txt\n└── README.md`}
                language="plaintext"
                filename="project structure"
              />

              <h3>How to Contribute</h3>
              <ol className="text-sm space-y-2" style={{ color: "var(--fg)" }}>
                <li>Fork the repository on GitHub.</li>
                <li>Create a feature branch: <code>git checkout -b feature/your-feature</code></li>
                <li>Make your changes with clear commit messages.</li>
                <li>Ensure all tests pass: <code>cd build && ctest</code></li>
                <li>Submit a pull request with a description of your changes.</li>
              </ol>

              <h3>Roadmap &amp; Possible Extensions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                {[
                  { title: "Add reconciliation", desc: "Implement compress/decompress for exact key agreement", priority: "High" },
                  { title: "Add proper KDF", desc: "Use SHA-3/SHAKE for key derivation instead of raw rounding", priority: "High" },
                  { title: "Benchmark timings", desc: "Compare schoolbook vs. NTT polynomial multiplication", priority: "Medium" },
                  { title: "Compare with ML-KEM", desc: "Side-by-side comparison with real FIPS 203 parameters", priority: "Medium" },
                  { title: "WebAssembly version", desc: "Compile C++ to WASM for in-browser execution", priority: "Medium" },
                  { title: "Multiple parameter sets", desc: "Support ML-KEM-512, ML-KEM-768, ML-KEM-1024", priority: "Low" },
                  { title: "Attack visualizations", desc: "Show LLL/BKZ lattice reduction attempts visually", priority: "Low" },
                  { title: "Formal verification", desc: "Prove correctness of the polynomial arithmetic in Lean/Coq", priority: "Low" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-3 rounded-lg"
                    style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                        {item.title}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background:
                            item.priority === "High"
                              ? "var(--color-value-private-bg)"
                              : item.priority === "Medium"
                              ? "var(--color-value-cipher-bg)"
                              : "var(--surface-alt)",
                          color:
                            item.priority === "High"
                              ? "var(--color-value-private-text)"
                              : item.priority === "Medium"
                              ? "var(--color-value-cipher-text)"
                              : "var(--muted)",
                        }}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-xs m-0" style={{ color: "var(--muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            FOOTER
            ═══════════════════════════════════════════════════════════ */}
        <footer
          className="border-t py-8"
          style={{ borderColor: "var(--border-subtle)", background: "var(--surface)" }}
        >
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: "var(--muted)" }}>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="28" height="28" rx="4" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
                <circle cx="16" cy="16" r="2.5" fill="var(--accent)" />
              </svg>
              <span>QC-Vis — Post-Quantum Cryptography Visualizer</span>
            </div>
            <div>
              Educational implementation · Not for production use · MIT License
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
