import Navigation from "../components/Navigation";
import CodeBlock from "../components/CodeBlock";
import Tabs from "../components/Tabs";
import Accordion from "../components/Accordion";
import GlossaryTooltip from "../components/GlossaryTooltip";
import ActorBadge from "../components/ActorBadge";
import LatexBlock from "../components/LatexBlock";
import { INSTALL_COMMANDS, PARAMS, SAMPLE_VECTORS, GLOSSARY } from "../lib/constants";

export default function Documentation() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <div className="section-container">
          <div className="docs-layout">
            {/* ═══════════════════════════════════════════════════════
                UNIFIED SIDEBAR
                ═══════════════════════════════════════════════════════ */}
            <aside className="docs-sidebar" aria-label="Documentation navigation">
              <nav>
                <div className="mb-6 px-3 border-b border-border-subtle pb-4">
                  <a
                    href="https://github.com/your-org/kyber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-2 text-muted hover:text-accent transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 4.365 9.75 10.399 11.14.6.111.82-.258.82-.577 0-.285-.021-1.04-.032-2.037-3.338.724-4.042-1.61-4.042-1.61C6.571 18.259 5.012 17.03 5.012 17.03c-1.091-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.218.694.825.576C20.565 21.792 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub Repository
                  </a>
                </div>

                {/* Installation */}
                <div className="docs-sidebar-group">
                  <span className="docs-sidebar-heading">Installation</span>
                  <a href="#install-prereqs">Prerequisites</a>
                  <a href="#install-clone">Clone &amp; Build</a>
                  <a href="#install-run">Run Demo</a>
                  <a href="#install-output">Expected Output</a>
                  <a href="#install-troubleshoot">Troubleshooting</a>
                </div>

                {/* Documentation */}
                <div className="docs-sidebar-group">
                  <span className="docs-sidebar-heading">Documentation</span>
                  <a href="#doc-summary">Protocol Summary</a>
                  <a href="#doc-keygen">Key Generation</a>
                  <a href="#doc-encap">Encapsulation</a>
                  <a href="#doc-decap">Decapsulation</a>
                  <a href="#doc-noise">Role of Noise</a>
                  <a href="#doc-why-c-fails">Why C Fails</a>
                  <a href="#doc-worked-example">Worked Example</a>
                  <a href="#doc-data-structures">Data Structures</a>
                  <a href="#doc-limitations">Limitations</a>
                  <a href="#doc-glossary">Glossary</a>
                </div>
              </nav>
            </aside>

            {/* ═══════════════════════════════════════════════════════
                CONTENT
                ═══════════════════════════════════════════════════════ */}
            <div className="max-w-3xl">
              {/* ───────────────────────────────────────────────────
                  INSTALLATION
                  ─────────────────────────────────────────────────── */}
              <section id="installation">
                <h2 id="install-top" className="mt-0">Installation</h2>
                <p style={{ color: "var(--muted)" }}>
                  Build the C++20 implementation.
                </p>

                <h3 id="install-prereqs">Prerequisites</h3>
                <ul className="text-sm space-y-1" style={{ color: "var(--fg)" }}>
                  <li>C++20-compatible compiler: GCC 11+ or Clang 13+</li>
                  <li>OpenSSL 3.0 or higher</li>
                  <li>CMake 3.15 or later</li>
                  <li>Build Tools: Make, Ninja, or MSVC (Visual Studio 2022)</li>
                </ul>
                <CodeBlock code={INSTALL_COMMANDS.prerequisites} language="bash" filename="prerequisites" />

                <h3 id="install-clone">Clone &amp; Build</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  Clone the repository and build using the standard CMake workflow:
                </p>
                <CodeBlock code={INSTALL_COMMANDS.clone} language="bash" filename="terminal" />
                <CodeBlock code={INSTALL_COMMANDS.build} language="bash" filename="terminal" />

                <h3 id="install-run">Run the Demo</h3>
                <CodeBlock code={INSTALL_COMMANDS.run} language="bash" filename="terminal" />

                <h3 id="install-output">Expected Output</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  The demo establishes a secure session and establishes an AEAD channel:
                </p>
                <CodeBlock
                  code={INSTALL_COMMANDS.expectedOutput}
                  language="plaintext"
                  filename="output"
                  showLineNumbers
                />

                <div className="mt-6 mb-10 border-t border-border-subtle pt-6">
                  <a
                    href="https://github.com/your-org/kyber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:underline font-medium"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 4.365 9.75 10.399 11.14.6.111.82-.258.82-.577 0-.285-.021-1.04-.032-2.037-3.338.724-4.042-1.61-4.042-1.61C6.571 18.259 5.012 17.03 5.012 17.03c-1.091-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.218.694.825.576C20.565 21.792 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    Explore full C++ implementation on GitHub →
                  </a>
                </div>

                <h3 id="install-troubleshoot">Troubleshooting</h3>
                <Accordion
                  items={[
                    {
                      id: "openssl",
                      title: "OpenSSL 3.0 Not Found",
                      content: (
                        <div>
                          <p className="m-0 text-sm" style={{ color: "var(--muted)" }}>
                            Install the OpenSSL development headers:
                          </p>
                          <CodeBlock code="# Ubuntu/Debian\nsudo apt install libssl-dev\n\n# macOS\nbrew install openssl@3" language="bash" filename="install openssl" />
                        </div>
                      ),
                    },
                    {
                      id: "cpp20",
                      title: "C++20 Support",
                      content: (
                        <p className="m-0 text-sm" style={{ color: "var(--muted)" }}>
                          This project requires C++20 (for <code>std::span</code>, <code>consteval</code>, etc.). 
                          Ensure you are using GCC 11+ or Clang 13+.
                        </p>
                      ),
                    },
                  ]}
                  allowMultiple
                />
              </section>

              <hr className="section-divider my-12" />

              {/* ───────────────────────────────────────────────────
                  DOCUMENTATION
                  ─────────────────────────────────────────────────── */}
              <section id="documentation">
                <h2 id="doc-top" className="mt-0">Technical Documentation</h2>
                <p style={{ color: "var(--muted)" }}>
                  Deep dive into the ML-KEM (Kyber) implementation architecture.
                </p>

                {/* Protocol Summary */}
                <h3 id="doc-summary">Protocol Summary</h3>
                <Tabs
                  tabs={[
                    {
                      id: "beginner",
                      label: "Overview",
                      content: (
                        <div className="text-sm space-y-3" style={{ color: "var(--fg)" }}>
                          <p>
                            ML-KEM-768 is a Module Lattice-based Key Encapsulation Mechanism. 
                            It is standardized by NIST in FIPS 203 for post-quantum security.
                          </p>
                          <p>
                            The protocol allows a receiver to publish a public key that any sender 
                            can use to "encapsulate" a shared secret. Only the receiver, using their 
                            private key, can "decapsulate" and recover the same secret.
                          </p>
                          <ul className="space-y-1">
                            <li><strong>Standard Compliant</strong>: Follows FIPS 203 exactly.</li>
                            <li><strong>Quantum Secure</strong>: Based on the Module-LWE problem.</li>
                            <li><strong>Production Grade</strong>: Optimized for speed and side-channel resistance.</li>
                          </ul>
                        </div>
                      ),
                    },
                    {
                      id: "technical",
                      label: "Mathematics",
                      content: (
                        <div className="text-sm space-y-3" style={{ color: "var(--fg)" }}>
                          <p>
                            ML-KEM operates in a module of rank $k$ over the polynomial ring{" "}
                            <LatexBlock>{`\\mathcal{R}_q = \\mathbb{Z}_q[x]/(x^n + 1)`}</LatexBlock> where{" "}
                            <LatexBlock>{`n = 256`}</LatexBlock> and{" "}
                            <LatexBlock>{`q = 3329`}</LatexBlock>.
                          </p>
                          <p>For ML-KEM-768, the module rank is $k=3$.</p>
                          <ol className="space-y-2">
                            <li>
                              <strong>Key Generation</strong>: Bob samples secret vectors and computes 
                              a noisy product with a random matrix $A$.
                            </li>
                            <li>
                              <strong>Encapsulation</strong>: Alice masks the public key with her own 
                              randomness to produce the ciphertext and shared secret.
                            </li>
                            <li>
                              <strong>Decapsulation</strong>: Bob uses his secret vector to strip the 
                              noise and recover the bits of the shared secret.
                            </li>
                          </ol>
                        </div>
                      ),
                    },
                  ]}
                />

                {/* Key Generation */}
                <h3 id="doc-keygen">Key Generation</h3>
                <p className="text-sm" style={{ color: "var(--fg)" }}>
                  The receiver generates a persistent keypair. The implementation uses 
                  <code>SecureBuffer</code> for all private material.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                  <div className="p-3 rounded-lg text-center" style={{ background: "var(--color-value-private-bg)" }}>
                    <div className="text-xs font-semibold" style={{ color: "var(--color-value-private-text)" }}>
                      Secret Key
                    </div>
                    <p className="text-xs mt-1">LWE secret vector {"$\\mathbf{s}$"}</p>
                  </div>
                  <div className="p-3 rounded-lg text-center" style={{ background: "var(--color-value-public-bg)" }}>
                    <div className="text-xs font-semibold" style={{ color: "var(--color-value-public-text)" }}>
                      Public Key
                    </div>
                    <p className="text-xs mt-1">Matrix {"$\\mathbf{A}$"} and vector {"$\\mathbf{b}$"}</p>
                  </div>
                </div>
                <CodeBlock
                  code={`// mlkem.h\nclass MLKEM768 {\npublic:\n    KeyPair generate();\n    Ciphertext encapsulate(const PublicKey& pk);\n    Secret decapsulate(const Ciphertext& ct, const PrivateKey& sk);\n};`}
                  language="cpp"
                  filename="mlkem.h"
                />

                {/* Data Structures */}
                <h3 id="doc-data-structures">Core Components</h3>
                <div className="overflow-x-auto my-4">
                  <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid var(--border)" }}>
                        <th className="text-left py-2 pr-4 font-semibold" style={{ color: "var(--fg)" }}>Module</th>
                        <th className="text-left py-2 font-semibold" style={{ color: "var(--fg)" }}>Description</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "var(--muted)" }}>
                      {[
                        ["NTT", "High-efficiency Number Theoretic Transform for polynomial arithmetic."],
                        ["AEAD", "AES-256-GCM authenticated encryption for the data channel."],
                        ["HKDF", "SHA-256 based key derivation for session keys."],
                        ["SecureBuffer", "RAII-based memory management with automatic zeroization."],
                      ].map(([mod, desc], i) => (
                        <tr key={i} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                          <td className="py-2 pr-4 font-medium" style={{ color: "var(--fg)" }}>{mod}</td>
                          <td className="py-2">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Glossary */}
                <h3 id="doc-glossary">Glossary</h3>
                <div className="grid grid-cols-1 gap-2 my-4">
                  {Object.keys(GLOSSARY).map((term) => (
                    <div
                      key={term}
                      className="p-3 rounded-lg"
                      style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}
                    >
                      <div className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
                        {term}
                      </div>
                      <p className="text-xs m-0 mt-1" style={{ color: "var(--muted)" }}>
                        {GLOSSARY[term]}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            FOOTER
            ═══════════════════════════════════════════════════════════ */}
        <footer
          className="border-t py-8 mt-16"
          style={{ borderColor: "var(--border-subtle)", background: "var(--surface)" }}
        >
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: "var(--muted)" }}>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="28" height="28" rx="4" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
                <circle cx="16" cy="16" r="2.5" fill="var(--accent)" />
              </svg>
              <span>Kyber ML-KEM Messaging Stack</span>
            </div>
            <div>
              FIPS 203 Compliant · MIT License
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
