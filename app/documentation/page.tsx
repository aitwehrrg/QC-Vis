import Navigation from "../components/Navigation";
import CodeBlock from "../components/CodeBlock";
import Tabs from "../components/Tabs";
import Accordion from "../components/Accordion";
import GlossaryTooltip from "../components/GlossaryTooltip";
import ActorBadge from "../components/ActorBadge";
import LatexBlock from "../components/LatexBlock";
import { INSTALL_COMMANDS, PARAMS, SAMPLE_VECTORS } from "../lib/constants";

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
                    href="https://github.com/your-org/qc-vis"
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
                  Get the C++ implementation running locally in under five minutes.
                </p>

                <h3 id="install-prereqs">Prerequisites</h3>
                <ul className="text-sm space-y-1" style={{ color: "var(--fg)" }}>
                  <li>C++17-compatible compiler: GCC 9+, Clang 10+, or MSVC 2019+</li>
                  <li>CMake 3.16 or later</li>
                  <li>Make or Ninja build system</li>
                  <li>Git (for cloning the repository)</li>
                </ul>
                <CodeBlock code={INSTALL_COMMANDS.prerequisites} language="bash" filename="prerequisites" />

                <h3 id="install-clone">Clone &amp; Build</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  Clone the repository and build with CMake:
                </p>
                <CodeBlock code={INSTALL_COMMANDS.clone} language="bash" filename="terminal" />
                <CodeBlock code={INSTALL_COMMANDS.build} language="bash" filename="terminal" />

                <h3 id="install-run">Run the Demo</h3>
                <CodeBlock code={INSTALL_COMMANDS.run} language="bash" filename="terminal" />

                <h3 id="install-output">Expected Output</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  A successful run produces output showing each protocol stage:
                </p>
                <CodeBlock
                  code={INSTALL_COMMANDS.expectedOutput}
                  language="plaintext"
                  filename="output"
                  showLineNumbers
                />

                <div className="mt-6 mb-10 border-t border-border-subtle pt-6">
                  <a
                    href="https://github.com/your-org/qc-vis"
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
                      id: "cmake-not-found",
                      title: "CMake not found",
                      content: (
                        <div>
                          <p className="m-0 text-sm" style={{ color: "var(--muted)" }}>
                            Install CMake via your package manager:
                          </p>
                          <CodeBlock code="# Ubuntu/Debian\nsudo apt install cmake\n\n# macOS\nbrew install cmake\n\n# Windows\nwinget install cmake" language="bash" filename="install cmake" />
                        </div>
                      ),
                    },
                    {
                      id: "cpp17",
                      title: "C++17 features not supported",
                      content: (
                        <p className="m-0 text-sm" style={{ color: "var(--muted)" }}>
                          Ensure your compiler supports C++17. For GCC, use version 9 or later.
                          You can check with <code>g++ --version</code>. On older Ubuntu, install
                          a newer GCC: <code>sudo apt install g++-11</code>.
                        </p>
                      ),
                    },
                    {
                      id: "link-errors",
                      title: "Linker errors on macOS",
                      content: (
                        <p className="m-0 text-sm" style={{ color: "var(--muted)" }}>
                          Ensure Xcode command-line tools are installed:{" "}
                          <code>xcode-select --install</code>. If CMake can&apos;t find the compiler,
                          try: <code>cmake .. -DCMAKE_CXX_COMPILER=clang++</code>.
                        </p>
                      ),
                    },
                    {
                      id: "windows",
                      title: "Building on Windows",
                      content: (
                        <div>
                          <p className="m-0 text-sm" style={{ color: "var(--muted)" }}>
                            Use Visual Studio 2019+ with C++ workload installed, or use WSL2 with Ubuntu.
                            If using MSVC directly:
                          </p>
                          <CodeBlock code='cmake .. -G "Visual Studio 16 2019"\ncmake --build . --config Release' language="bash" filename="Windows build" />
                        </div>
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
                <h2 id="doc-top" className="mt-0">Documentation</h2>
                <p style={{ color: "var(--muted)" }}>
                  Comprehensive guide to the Ring-LWE / Kyber-style protocol, from intuition to implementation.
                </p>

                {/* Protocol Summary */}
                <h3 id="doc-summary">Protocol Summary</h3>
                <Tabs
                  tabs={[
                    {
                      id: "beginner",
                      label: "For Beginners",
                      content: (
                        <div className="text-sm space-y-3" style={{ color: "var(--fg)" }}>
                          <p>
                            Imagine Alice wants to send Bob a secret message. They need to agree on a shared secret key — but they can only communicate over a public channel where Eve is listening.
                          </p>
                          <p>
                            Bob creates a mathematical puzzle using polynomial arithmetic. He publishes the puzzle (his public key) but keeps the solution (his secret key). The puzzle is designed so that:
                          </p>
                          <ul className="space-y-1">
                            <li>Anyone can <em>use</em> the puzzle to create a shared secret</li>
                            <li>Only Bob can <em>solve</em> the puzzle to recover that same secret</li>
                            <li>The puzzle is hard to solve because small random noise obscures the underlying structure</li>
                          </ul>
                          <p>
                            Alice uses Bob&apos;s puzzle to derive a shared secret, encrypts her message with it, and sends the result to Bob. Bob uses his secret key to derive the same shared secret and decrypts. Eve sees everything on the channel but cannot solve the puzzle — even with a quantum computer.
                          </p>
                        </div>
                      ),
                    },
                    {
                      id: "technical",
                      label: "Algorithm Internals",
                      content: (
                        <div className="text-sm space-y-3" style={{ color: "var(--fg)" }}>
                          <p>
                            The protocol operates in the <GlossaryTooltip term="Polynomial Ring">polynomial ring</GlossaryTooltip>{" "}
                            <LatexBlock>{`\\mathbb{Z}_{${PARAMS.q}}[x]/(x^{${PARAMS.n}} + 1)`}</LatexBlock> where{" "}
                            <LatexBlock>{`n = ${PARAMS.n}`}</LatexBlock> and{" "}
                            <LatexBlock>{`q = ${PARAMS.q}`}</LatexBlock>. All arithmetic is performed on polynomials with coefficients reduced modulo{" "}
                            <LatexBlock>q</LatexBlock>, and polynomial degree reduced modulo{" "}
                            <LatexBlock>{`x^n + 1`}</LatexBlock> (negacyclic convolution).
                          </p>
                          <p>The protocol proceeds in three phases:</p>
                          <ol className="space-y-2">
                            <li>
                              <strong>Key Generation</strong>: Bob samples{" "}
                              <LatexBlock>{"\\mathbf{s}, \\mathbf{e} \\leftarrow \\chi"}</LatexBlock>{" "}
                              (small-coefficient polynomials), selects random{" "}
                              <LatexBlock>{"\\mathbf{a} \\leftarrow \\mathbb{Z}_q[x]/(x^n+1)"}</LatexBlock>, and publishes{" "}
                              <LatexBlock>{"\\text{pk} = (\\mathbf{a},\\, \\mathbf{b} = \\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e})"}</LatexBlock>.
                            </li>
                            <li>
                              <strong>Encapsulation</strong>: Alice samples{" "}
                              <LatexBlock>{"\\mathbf{r}, \\mathbf{e}_1, \\mathbf{e}_2 \\leftarrow \\chi"}</LatexBlock>, computes{" "}
                              <LatexBlock>{"\\mathbf{u} = \\mathbf{a} \\cdot \\mathbf{r} + \\mathbf{e}_1"}</LatexBlock>,{" "}
                              <LatexBlock>{"\\mathbf{v} = \\mathbf{b} \\cdot \\mathbf{r} + \\mathbf{e}_2"}</LatexBlock>, and derives the shared key by rounding{" "}
                              <LatexBlock>{"\\mathbf{v}"}</LatexBlock>.
                            </li>
                            <li>
                              <strong>Decapsulation</strong>: Bob computes{" "}
                              <LatexBlock>{"\\mathbf{v} - \\mathbf{u} \\cdot \\mathbf{s} = \\mathbf{e} \\cdot \\mathbf{r} + \\mathbf{e}_2 - \\mathbf{e}_1 \\cdot \\mathbf{s}"}</LatexBlock>{" "}
                              (which is small), and rounds to get the same shared key.
                            </li>
                          </ol>
                          <p>
                            Security relies on the <GlossaryTooltip term="Ring-LWE">Ring-LWE</GlossaryTooltip> assumption: given{" "}
                            <LatexBlock>{"(\\mathbf{a},\\, \\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e})"}</LatexBlock>, it is computationally infeasible to recover{" "}
                            <LatexBlock>{"\\mathbf{s}"}</LatexBlock>.
                          </p>
                        </div>
                      ),
                    },
                  ]}
                />

                {/* Key Generation */}
                <h3 id="doc-keygen">Key Generation</h3>
                <p className="text-sm" style={{ color: "var(--fg)" }}>
                  <ActorBadge actor="B" /> generates the keypair. This happens once and the public key can be reused.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                  <div className="p-3 rounded-lg text-center" style={{ background: "var(--color-value-private-bg)" }}>
                    <div className="text-xs font-semibold" style={{ color: "var(--color-value-private-text)" }}>
                      Secret Key
                    </div>
                    <LatexBlock>{"\\mathbf{s} \\in \\{-1, 0, 1\\}^n"}</LatexBlock>
                  </div>
                  <div className="p-3 rounded-lg text-center" style={{ background: "var(--color-value-noise-bg)" }}>
                    <div className="text-xs font-semibold" style={{ color: "var(--color-value-noise-text)" }}>
                      Error
                    </div>
                    <LatexBlock>{"\\mathbf{e} \\in \\{-1, 0, 1\\}^n"}</LatexBlock>
                  </div>
                  <div className="p-3 rounded-lg text-center" style={{ background: "var(--color-value-public-bg)" }}>
                    <div className="text-xs font-semibold" style={{ color: "var(--color-value-public-text)" }}>
                      Public Key
                    </div>
                    <LatexBlock>{"\\mathbf{b} = \\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e} \\pmod{q}"}</LatexBlock>
                  </div>
                </div>
                <CodeBlock
                  code={`// Key generation in Zq[x]/(x^n+1)\nconst a = randomPolynomial(n, q);   // public random\nconst s = smallPolynomial(n);        // secret: coeffs in {-1, 0, 1}\nconst e = smallPolynomial(n);        // error:  coeffs in {-1, 0, 1}\nconst b = polyAdd(polyMul(a, s), e); // public key component`}
                  language="typescript"
                  filename="keygen.ts"
                />

                {/* Encapsulation */}
                <h3 id="doc-encap">Encapsulation</h3>
                <p className="text-sm" style={{ color: "var(--fg)" }}>
                  <ActorBadge actor="A" /> uses <ActorBadge actor="B" />&apos;s public key to create a shared secret. She generates ephemeral random values, computes two ciphertext polynomials, and derives a symmetric key.
                </p>
                <div className="my-4 p-4 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                  <LatexBlock display>{"\\mathbf{u} = \\mathbf{a} \\cdot \\mathbf{r} + \\mathbf{e}_1 \\pmod{q}"}</LatexBlock>
                  <LatexBlock display>{"\\mathbf{v} = \\mathbf{b} \\cdot \\mathbf{r} + \\mathbf{e}_2 \\pmod{q}"}</LatexBlock>
                </div>
                <CodeBlock
                  code={`// Encapsulation\nconst r  = smallPolynomial(n);             // ephemeral secret\nconst e1 = smallPolynomial(n);             // ephemeral error\nconst e2 = smallPolynomial(n);             // ephemeral error\n\nconst u = polyAdd(polyMul(a, r), e1);      // u = a·r + e₁\nconst v = polyAdd(polyMul(b, r), e2);      // v = b·r + e₂\n\nconst sharedKey = round(v);                // derive key by rounding`}
                  language="typescript"
                  filename="encapsulate.ts"
                />

                {/* Decapsulation */}
                <h3 id="doc-decap">Decapsulation</h3>
                <p className="text-sm" style={{ color: "var(--fg)" }}>
                  <ActorBadge actor="B" /> recovers the shared key using the secret key. The key step is computing{" "}
                  <LatexBlock>{"\\mathbf{v} - \\mathbf{u} \\cdot \\mathbf{s}"}</LatexBlock>, which cancels the large{" "}
                  <LatexBlock>{"\\mathbf{a} \\cdot \\mathbf{r} \\cdot \\mathbf{s}"}</LatexBlock> term, leaving only small error residuals.
                </p>
                <div className="my-4 p-4 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                  <LatexBlock display>{"\\mathbf{v} - \\mathbf{u} \\cdot \\mathbf{s} = \\mathbf{e} \\cdot \\mathbf{r} + \\mathbf{e}_2 - \\mathbf{e}_1 \\cdot \\mathbf{s}"}</LatexBlock>
                </div>
                <CodeBlock
                  code={`// Decapsulation\nconst us = polyMul(u, s);                // u·s = (a·r + e₁)·s\nconst diff = polySub(v, us);             // v - u·s = e·r + e₂ - e₁·s\nconst sharedKey = round(diff);           // same key if errors are small`}
                  language="typescript"
                  filename="decapsulate.ts"
                />
                <div className="callout callout-info">
                  <div className="callout-title">ℹ Key Alignment</div>
                  <p>
                    The residual <LatexBlock>{"\\mathbf{e} \\cdot \\mathbf{r} + \\mathbf{e}_2 - \\mathbf{e}_1 \\cdot \\mathbf{s}"}</LatexBlock> is a sum of products of small polynomials. With appropriate parameters, its coefficients remain small enough that rounding produces the same bit pattern as rounding{" "}
                    <LatexBlock>{"\\mathbf{v}"}</LatexBlock> directly. In a real scheme, a reconciliation mechanism ensures exact agreement; this demo may occasionally produce mismatches with unlucky randomness.
                  </p>
                </div>

                {/* Role of Noise */}
                <h3 id="doc-noise">Role of Noise</h3>
                <p className="text-sm" style={{ color: "var(--fg)" }}>
                  <GlossaryTooltip term="Noise / Error">Noise</GlossaryTooltip> is not a bug — it is the security mechanism. Without noise, recovering{" "}
                  <LatexBlock>{"\\mathbf{s}"}</LatexBlock> from{" "}
                  <LatexBlock>{"(\\mathbf{a},\\, \\mathbf{b} = \\mathbf{a} \\cdot \\mathbf{s})"}</LatexBlock> would be trivial linear algebra. The noise{" "}
                  <LatexBlock>{"\\mathbf{e}"}</LatexBlock> turns this into the Ring-LWE problem: distinguishing{" "}
                  <LatexBlock>{"\\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e}"}</LatexBlock> from a truly random polynomial.
                </p>
                <p className="text-sm mt-4" style={{ color: "var(--muted)" }}>
                  The noise perturbs values just enough that the legitimate recipient can tolerate it (by rounding), but large enough that an attacker cannot strip it away to recover the secret. This principle is at the heart of lattice-based cryptography.
                </p>

                {/* Why C Fails */}
                <h3 id="doc-why-c-fails">Why Eve Cannot Recover the Secret</h3>
                <p className="text-sm" style={{ color: "var(--fg)" }}>
                  <ActorBadge actor="C" /> observes everything transmitted on the public channel:{" "}
                  <LatexBlock>{"\\mathbf{a}"}</LatexBlock>,{" "}
                  <LatexBlock>{"\\mathbf{b}"}</LatexBlock>,{" "}
                  <LatexBlock>{"\\mathbf{u}"}</LatexBlock>,{" "}
                  <LatexBlock>{"\\mathbf{v}"}</LatexBlock>, and the ciphertext. But to derive the shared key, she would need to compute either:
                </p>
                <ul className="text-sm space-y-1" style={{ color: "var(--fg)" }}>
                  <li>
                    Bob&apos;s secret <LatexBlock>{"\\mathbf{s}"}</LatexBlock> from{" "}
                    <LatexBlock>{"(\\mathbf{a},\\, \\mathbf{b} = \\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e})"}</LatexBlock> — the Ring-LWE problem
                  </li>
                  <li>
                    Alice&apos;s ephemeral <LatexBlock>{"\\mathbf{r}"}</LatexBlock> from{" "}
                    <LatexBlock>{"(\\mathbf{a},\\, \\mathbf{u} = \\mathbf{a} \\cdot \\mathbf{r} + \\mathbf{e}_1)"}</LatexBlock> — also Ring-LWE
                  </li>
                </ul>
                <p className="text-sm" style={{ color: "var(--fg)" }}>
                  Both require solving Ring-LWE, which is believed to be computationally intractable for appropriate parameters — even for quantum computers. The best known quantum attacks have exponential complexity in the lattice dimension.
                </p>

                {/* Worked Example */}
                <h3 id="doc-worked-example">Worked Example</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  A complete protocol run with <LatexBlock>{`n = ${PARAMS.n}`}</LatexBlock>,{" "}
                  <LatexBlock>{`q = ${PARAMS.q}`}</LatexBlock>, and the message &ldquo;HELLO B&rdquo;.
                </p>
                <div className="space-y-3 my-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: "var(--color-value-public-text)" }}>
                        <LatexBlock>{"\\mathbf{a}"}</LatexBlock> (public random)
                      </div>
                      <code className="text-xs">[{SAMPLE_VECTORS.a.join(", ")}]</code>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: "var(--color-value-private-text)" }}>
                        <LatexBlock>{"\\mathbf{s}"}</LatexBlock> (Bob&apos;s secret)
                      </div>
                      <code className="text-xs">[{SAMPLE_VECTORS.s.join(", ")}]</code>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: "var(--color-value-noise-text)" }}>
                        <LatexBlock>{"\\mathbf{e}"}</LatexBlock> (Bob&apos;s error)
                      </div>
                      <code className="text-xs">[{SAMPLE_VECTORS.e.join(", ")}]</code>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: "var(--color-value-private-text)" }}>
                        <LatexBlock>{"\\mathbf{r}"}</LatexBlock> (Alice&apos;s ephemeral)
                      </div>
                      <code className="text-xs">[{SAMPLE_VECTORS.r.join(", ")}]</code>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: "var(--color-value-noise-text)" }}>
                        <LatexBlock>{"\\mathbf{e}_1"}</LatexBlock> (Alice&apos;s error)
                      </div>
                      <code className="text-xs">[{SAMPLE_VECTORS.e1.join(", ")}]</code>
                    </div>
                    <div className="p-3 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: "var(--color-value-noise-text)" }}>
                        <LatexBlock>{"\\mathbf{e}_2"}</LatexBlock> (Alice&apos;s error)
                      </div>
                      <code className="text-xs">[{SAMPLE_VECTORS.e2.join(", ")}]</code>
                    </div>
                  </div>
                  <div className="callout callout-note">
                    <div className="callout-title">💡 Note on Key Agreement</div>
                    <p>
                      With these toy parameters, the derived shared keys may not always match perfectly. In a real scheme like ML-KEM,{" "}
                      <GlossaryTooltip term="Reconciliation">reconciliation</GlossaryTooltip> and the{" "}
                      <GlossaryTooltip term="Fujisaki–Okamoto Transform">Fujisaki–Okamoto transform</GlossaryTooltip>{" "}
                      ensure exact agreement and CCA security. The simulator&apos;s &ldquo;Randomize&rdquo; button lets you try different values to see when keys align.
                    </p>
                  </div>
                </div>

                {/* Data Structures */}
                <h3 id="doc-data-structures">Data Structures in the C++ Code</h3>
                <CodeBlock
                  code={`// Core data structures\nstruct Polynomial {\n    std::array<int, N> coeffs;  // N = ${PARAMS.n}\n    \n    Polynomial operator*(const Polynomial& other) const;\n    Polynomial operator+(const Polynomial& other) const;\n    Polynomial operator-(const Polynomial& other) const;\n    void reduce(int q);  // reduce all coefficients mod q\n};\n\nstruct PublicKey {\n    Polynomial a;  // random public polynomial\n    Polynomial b;  // b = a*s + e\n};\n\nstruct SecretKey {\n    Polynomial s;  // small-coefficient secret\n};\n\nstruct Ciphertext {\n    Polynomial u;  // u = a*r + e1\n    Polynomial v;  // v = b*r + e2\n};\n\nstruct SharedKey {\n    std::bitset<N> bits;  // rounded coefficients\n};`}
                  language="cpp"
                  filename="rlwe.h"
                  showLineNumbers
                />

                {/* Limitations */}
                <h3 id="doc-limitations">Limitations vs. Real ML-KEM / Kyber</h3>
                <div className="overflow-x-auto my-4">
                  <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid var(--border)" }}>
                        <th className="text-left py-2 pr-4 font-semibold" style={{ color: "var(--fg)" }}>Feature</th>
                        <th className="text-left py-2 pr-4 font-semibold" style={{ color: "var(--fg)" }}>This Demo</th>
                        <th className="text-left py-2 font-semibold" style={{ color: "var(--fg)" }}>Real ML-KEM</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "var(--muted)" }}>
                      {[
                        ["Parameters", "n=8, q=17", "n=256, q=3329"],
                        ["Security level", "None (toy)", "128/192/256-bit"],
                        ["CCA security", "No", "Yes (FO transform)"],
                        ["Constant-time", "No", "Yes"],
                        ["Reconciliation", "Rounding only", "Compress/Decompress"],
                        ["RNG", "Math.random()", "OS CSPRNG"],
                        ["Polynomial mult.", "Schoolbook O(n²)", "NTT O(n log n)"],
                        ["Module structure", "Ring-LWE", "Module-LWE"],
                      ].map(([feature, demo, real], i) => (
                        <tr key={i} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                          <td className="py-2 pr-4 font-medium" style={{ color: "var(--fg)" }}>{feature}</td>
                          <td className="py-2 pr-4">{demo}</td>
                          <td className="py-2">{real}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Glossary */}
                <h3 id="doc-glossary">Glossary</h3>
                <div className="grid grid-cols-1 gap-2 my-4">
                  {Object.entries({
                    "Ring-LWE": true,
                    "Kyber": true,
                    "KEM": true,
                    "PQC": true,
                    "Lattice": true,
                    "Polynomial Ring": true,
                    "Noise / Error": true,
                    "Encapsulation": true,
                    "Decapsulation": true,
                    "Shared Secret": true,
                    "Modular Arithmetic": true,
                    "CCA Security": true,
                    "Fujisaki–Okamoto Transform": true,
                    "Reconciliation": true,
                  }).map(([term]) => (
                    <div
                      key={term}
                      className="p-3 rounded-lg"
                      style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}
                    >
                      <div className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
                        {term}
                      </div>
                      <GlossaryTooltip term={term}>
                        <span className="text-xs" style={{ color: "var(--muted)", borderBottom: "none" }}>
                          {/* Inline definition instead of tooltip in glossary */}
                        </span>
                      </GlossaryTooltip>
                      <p className="text-xs m-0 mt-1" style={{ color: "var(--muted)" }}>
                        {(() => {
                          const defs: Record<string, string> = {
                            "Ring-LWE": "Ring Learning With Errors — a lattice-based hard problem where secret information is hidden by adding small random noise to polynomial equations over a ring.",
                            "Kyber": "ML-KEM (formerly CRYSTALS-Kyber) — a NIST-standardized post-quantum key encapsulation mechanism based on the Module-LWE problem.",
                            "KEM": "Key Encapsulation Mechanism — a protocol that allows two parties to establish a shared symmetric key using asymmetric operations.",
                            "PQC": "Post-Quantum Cryptography — cryptographic algorithms designed to resist attacks by both classical and quantum computers.",
                            "Lattice": "A regular, repeating arrangement of points in n-dimensional space. Lattice-based cryptography relies on the hardness of finding short vectors in high-dimensional lattices.",
                            "Polynomial Ring": "The algebraic structure Zq[x]/(x^n + 1), where arithmetic is performed on polynomials with coefficients modulo q, reduced modulo x^n + 1.",
                            "Noise / Error": "Small random values added during encryption. They hide the algebraic structure of the secret but are small enough that the intended recipient can tolerate them during decryption.",
                            "Encapsulation": "The process where the sender uses the receiver's public key to generate a shared secret and a ciphertext that encodes it.",
                            "Decapsulation": "The process where the receiver uses their secret key to extract the shared secret from the ciphertext produced during encapsulation.",
                            "Shared Secret": "A symmetric key derived by both the sender and receiver independently, used to encrypt and decrypt the actual message.",
                            "Modular Arithmetic": "Arithmetic where numbers wrap around after reaching a modulus q. For example, 15 mod 17 = 15, but 18 mod 17 = 1.",
                            "CCA Security": "Chosen Ciphertext Attack security — a strong security notion where an attacker cannot learn anything even if they can ask for decryptions of other ciphertexts.",
                            "Fujisaki–Okamoto Transform": "A generic transformation that upgrades a CPA-secure KEM to CCA-secure. Used in real Kyber/ML-KEM but omitted in this educational demo.",
                            "Reconciliation": "A mechanism to ensure the sender and receiver derive exactly the same shared key despite small differences caused by noise.",
                          };
                          return defs[term] || "";
                        })()}
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
