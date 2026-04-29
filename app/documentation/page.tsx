import Navigation from "../components/Navigation";
import CodeBlock from "../components/CodeBlock";
import Tabs from "../components/Tabs";
import Accordion from "../components/Accordion";
import GlossaryTooltip from "../components/GlossaryTooltip";
import ActorBadge from "../components/ActorBadge";
import LatexBlock, { LatexText } from "../components/LatexBlock";
import { INSTALL_COMMANDS, PARAMS, SAMPLE_VECTORS, GLOSSARY, BENCHMARK_OUTPUT, LOCAL_DEMO_OUTPUT, IRC_SESSION_OUTPUT } from "../lib/constants";
import { FaGithub } from "react-icons/fa";

export default function Documentation() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <div className="section-container">
          <div className="docs-layout">
            {}
            <aside className="docs-sidebar" aria-label="Documentation navigation">
              <nav>
                <div className="mb-6 px-3 border-b border-border-subtle pb-4">
                  <a
                    href="https://github.com/ghruank/irc-encrypted"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex! items-center gap-2 text-muted hover:text-accent transition-colors"
                  >
                    <FaGithub className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">GitHub Repository</span>
                  </a>
                </div>

                {}
                <div className="docs-sidebar-group">
                  <span className="docs-sidebar-heading">Installation</span>
                  <a href="#install-prereqs">Prerequisites</a>
                  <a href="#install-clone">Clone &amp; Build</a>
                  <a href="#install-run">Run Demo</a>
                  <a href="#install-output">Expected Output</a>
                  <a href="#install-troubleshoot">Troubleshooting</a>
                </div>

                {}
                <div className="docs-sidebar-group">
                  <span className="docs-sidebar-heading">Documentation</span>
                  <a href="#doc-summary">Protocol Summary</a>
                  <a href="#doc-keygen">Key Generation</a>
                  <a href="#doc-encap">Encapsulation</a>
                  <a href="#doc-decap">Decapsulation</a>
                  <a href="#doc-noise">Role of Noise</a>
                  <a href="#doc-why-c-fails">Why Eavesdropping Fails</a>
                  <a href="#doc-worked-example">Worked Example</a>
                  <a href="#doc-performance">Performance</a>
                  <a href="#doc-data-structures">Data Structures</a>
                  <a href="#doc-limitations">Limitations</a>
                  <a href="#doc-glossary">Glossary</a>
                  <a href="#doc-contributors">Contributors</a>
                </div>
              </nav>
            </aside>

            {}
            <div className="max-w-3xl">
              {}
              <section id="installation">
                <h2 id="install-top" className="mt-0">Installation</h2>
                <p style={{ color: "var(--muted)" }}>
                  Build the C++20 implementation.
                </p>

                <h3 id="install-prereqs">Prerequisites</h3>
                <ul className="text-sm space-y-1" style={{ color: "var(--fg)" }}>
                  <li>C++20-compatible compiler (GCC 11+, Clang 13+, MSVC 19.30+)</li>
                  <li>OpenSSL 3.0 or higher (for AEAD and HKDF)</li>
                  <li>CMake 3.15 or later</li>
                  <li>AVX2-capable CPU (optional, for acceleration)</li>
                </ul>
                <CodeBlock code={INSTALL_COMMANDS.prerequisites} language="bash" filename="prerequisites" />

                <h3 id="install-clone">Clone &amp; Build</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  Clone the repository and build using the standard CMake workflow. Use <code>ENABLE_AVX2</code> 
                  to toggle optimized NTT paths.
                </p>
                <CodeBlock code={INSTALL_COMMANDS.clone} language="bash" filename="terminal" />
                <CodeBlock code={INSTALL_COMMANDS.build} language="bash" filename="terminal" />

                <h3 id="install-run">Run the Demo</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  The <code>demo</code> target runs an end-to-end flow of ML-KEM-768 key exchange 
                  followed by AEAD encryption.
                </p>
                <CodeBlock code={INSTALL_COMMANDS.run} language="bash" filename="terminal" />

                <h3 id="install-output">Expected Output</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  The local <code>demo</code> target validates the hybrid flow by running a 
                  standalone KeyGen, Encaps, and Decaps loop:
                </p>
                <CodeBlock
                  code={LOCAL_DEMO_OUTPUT}
                  language="plaintext"
                  filename="local-demo"
                />

                <div className="mt-6 mb-10 border-t border-border-subtle pt-6">
                  <a
                    href="https://github.com/ghruank/irc-encrypted"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:underline font-medium"
                  >
                    <FaGithub />
                    Explore full C++ implementation on GitHub →
                  </a>
                </div>

                <h3 id="install-troubleshoot">Troubleshooting</h3>
                <Accordion
                  items={[
                    {
                      id: "openssl",
                      title: "OpenSSL 3.0+ Not Found",
                      content: (
                        <div>
                          <p className="m-0 text-sm" style={{ color: "var(--muted)" }}>
                            This library requires OpenSSL 3.0+ for <code>EVP_CIPHER</code> 
                            and <code>HKDF</code> support. Ensure the development packages are installed.
                          </p>
                          <CodeBlock
                            code={`# Ubuntu / Debian\nsudo apt install libssl-dev\n\n# macOS\nbrew install openssl@3`}
                            language="bash"
                            filename="install-openssl"
                          />
                        </div>
                      ),
                    },
                    {
                      id: "avx2",
                      title: "AVX2 Support Issues",
                      content: (
                        <p className="m-0 text-sm" style={{ color: "var(--muted)" }}>
                          If building for an older CPU, ensure <code>-DENABLE_AVX2=OFF</code> is passed to 
                          CMake. The library uses runtime detection, but the AVX2 object file must be 
                          compilable by your toolchain.
                        </p>
                      ),
                    },
                  ]}
                  allowMultiple
                />
              </section>

              <hr className="section-divider my-12" />

              {}
              <section id="documentation">
                <h2 id="doc-top" className="mt-0">Technical Documentation</h2>
                <p style={{ color: "var(--muted)" }}>
                  Deep dive into the ML-KEM implementation architecture.
                </p>

                {}
                <h3 id="doc-summary">Protocol Summary</h3>
                <Tabs
                  tabs={[
                    {
                      id: "beginner",
                      label: "Overview",
                      content: (
                        <div className="text-sm space-y-3" style={{ color: "var(--fg)" }}>
                          <p>
                            ML-KEM (FIPS 203) is the primary post-quantum key encapsulation 
                            standard. It provides three security levels:
                          </p>
                          <ul className="space-y-1">
                            <li><strong>ML-KEM-512</strong>: NIST Level 1 (AES-128 equivalent)</li>
                            <li><strong>ML-KEM-768</strong>: NIST Level 3 (AES-192 equivalent)</li>
                            <li><strong>ML-KEM-1024</strong>: NIST Level 5 (AES-256 equivalent)</li>
                          </ul>
                          <p>
                            The protocol enables secure key exchange in the presence of quantum computers 
                            by leveraging the hardness of Module Learning With Errors (M-LWE).
                          </p>
                        </div>
                      ),
                    },
                    {
                      id: "technical",
                      label: "Mathematics",
                      content: (
                        <div className="text-sm space-y-3" style={{ color: "var(--fg)" }}>
                          <div className="text-sm leading-relaxed">
                            <LatexText>{`ML-KEM operates in a module of rank $k$ over the polynomial ring $\\mathcal{R}_q = \\mathbb{Z}_q[x]/(x^n + 1)$ where $n = 256$ and $q = 3329$.`}</LatexText>
                          </div>
                          <div className="text-sm">
                            <LatexText>{`Module rank $k$ varies by parameter set: $k=2$ (512), $k=3$ (768), $k=4$ (1024).`}</LatexText>
                          </div>
                          <ol className="space-y-2">
                            <li>
                              <strong>KeyGen</strong>: <LatexText className="inline">{`Samples secret $\\mathbf{s}, \\mathbf{e}$ and computes $\\mathbf{b} = \\mathbf{A}\\mathbf{s} + \\mathbf{e}$.`}</LatexText>
                            </li>
                            <li>
                              <strong>Encaps</strong>: <LatexText className="inline">{`Uses public key to encrypt a random 32-byte message $m$ into ciphertext $c$.`}</LatexText>
                            </li>
                            <li>
                              <strong>Decaps</strong>: <LatexText className="inline">{`Recovers $m$ and derives shared secret $K$ using implicit rejection if the ciphertext is tampered.`}</LatexText>
                            </li>
                          </ol>
                        </div>
                      ),
                    },
                  ]}
                />

                {}
                <h3 id="doc-keygen">Key Generation</h3>
                <p className="text-sm" style={{ color: "var(--fg)" }}>
                  Key generation (Algorithm 16) produces the encapsulation key (ek) and 
                  decapsulation key (dk). It utilizes OS-level CSPRNG to generate random seeds 
                  which are then expanded into the module matrix and noise vectors.
                </p>
                <CodeBlock
                  code={`// mlkem768.hpp\n// Generates a new keypair using OS CSPRNG\nstatic KeyPair generate();`}
                  language="cpp"
                  filename="mlkem768.hpp"
                />

                <h3 id="doc-encap">Encapsulation</h3>
                <p className="text-sm" style={{ color: "var(--fg)" }}>
                  Encapsulation (Algorithm 17) uses the public key (ek) to generate a 32-byte 
                  shared secret and a ciphertext (c). The process involves sampling an 
                  ephemeral message and encrypting it with a K-PKE scheme.
                </p>
                <CodeBlock
                  code={`// Encapsulates a shared secret for the given public key\nstatic EncapsResult encapsulate(const PublicKey& ek);`}
                  language="cpp"
                  filename="mlkem768.hpp"
                />

                <h3 id="doc-decap">Decapsulation</h3>
                <p className="text-sm" style={{ color: "var(--fg)" }}>
                  Decapsulation (Algorithm 18) recovers the shared secret from a ciphertext 
                  using the private key (dk). It features <strong>implicit rejection</strong>, 
                  meaning a tampered ciphertext will result in a deterministic random-looking 
                  key rather than an error, protecting against certain attacks.
                </p>
                <CodeBlock
                  code={`// Decapsulates the shared secret from a ciphertext\nstatic SharedSecret decapsulate(const Ciphertext& c, const PrivateKey& dk);`}
                  language="cpp"
                  filename="mlkem768.hpp"
                />

                <h3 id="doc-noise">Role of Noise</h3>
                <p className="text-sm" style={{ color: "var(--fg)" }}>
                  In ML-KEM, "noise" (error vectors sampled from a centered binomial distribution) 
                  is essential for security. By adding small errors to the polynomial products, 
                  the resulting public key and ciphertexts become instances of the 
                  <strong>Learning With Errors (LWE)</strong> problem, which is computationally 
                  intractable for both classical and quantum computers.
                </p>

                <h3 id="doc-why-c-fails">Why Eavesdropping Fails</h3>
                <p className="text-sm" style={{ color: "var(--fg)" }}>
                  An attacker (Eve) who intercepts the ciphertext $c$ cannot recover the 
                  shared secret because they lack the private key. Without the secret key 
                  polynomials, removing the noise from the ciphertext is equivalent to 
                  solving the M-LWE problem, for which no efficient quantum algorithm 
                  currently exists.
                </p>

                <h3 id="doc-worked-example">Worked Example: IRC Session</h3>
                <div className="text-sm space-y-3" style={{ color: "var(--fg)" }}>
                  <p>
                    A typical Post-Quantum IRC session involves a multi-step handshake to establish 
                    end-to-end encryption between Alice and Bob:
                  </p>
                  <ol className="space-y-2">
                    <li>Alice requests Bob's public key from the server.</li>
                    <li>Alice runs <code>MLKEM768::encapsulate(bob_ek)</code> to get <code>(K, c)</code>.</li>
                    <li>Alice sends <code>c</code> to Bob via the server.</li>
                    <li>Bob runs <code>MLKEM768::decapsulate(c, bob_dk)</code> to recover <code>K</code>.</li>
                    <li>Both parties derive a session key using <code>HKDF-SHA256(K)</code>.</li>
                    <li>Messages are encrypted using <code>AES-256-GCM</code>.</li>
                  </ol>
                  
                  <p className="mt-4" style={{ color: "var(--muted)" }}>
                    Empirical output from a production session:
                  </p>
                  <CodeBlock
                    code={IRC_SESSION_OUTPUT}
                    language="plaintext"
                    filename="irc-client"
                  />
                </div>

                <h3 id="doc-limitations">Limitations</h3>
                <ul className="text-sm space-y-1" style={{ color: "var(--fg)" }}>
                  <li><strong>1-to-1 only:</strong> No group rooms; sessions are strictly between two users.</li>
                  <li><strong>No message history:</strong> Messages are not stored; if you're offline, you miss them.</li>
                  <li><strong>Static identity keys:</strong> Same keypair across sessions; no forward secrecy between sessions.</li>
                  <li><strong>Linux preferred:</strong> Uses <code>getrandom(2)</code> and POSIX sockets.</li>
                </ul>

                {}
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
                        ["mlkem.hpp", "Low-level templated implementation of FIPS 203 Algorithms 16-18."],
                        ["ntt_avx2.hpp", "AVX2-optimized Number Theoretic Transform for x86_64."],
                        ["aead.hpp", "OpenSSL-backed HKDF-SHA256 and AES-256-GCM implementation."],
                        ["secure_buffer.hpp", "RAII buffer that zeroizes memory on destruction."],
                        ["symmetric.hpp", "FIPS-compliant SHA3 and SHAKE primitives."],
                      ].map(([mod, desc], i) => (
                        <tr key={i} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                          <td className="py-2 pr-4 font-medium" style={{ color: "var(--fg)" }}>{mod}</td>
                          <td className="py-2">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 id="doc-performance">Performance Benchmarks</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  The implementation is optimized for x86_64 systems with AVX2 support. 
                  Benchmarks confirm the deterministic efficiency of the cryptographic stack.
                </p>
                <CodeBlock
                  code={BENCHMARK_OUTPUT}
                  language="plaintext"
                  filename="benchmarks"
                />

                {}
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

                <h3 id="doc-contributors">Project Contributors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
                  {[
                    { name: "Rupak R. Gupta", id: "231080028", github: "github.com/aitwehrrg" },
                    { name: "Ghruank Kothare", id: "231080038", github: "github.com/ghruank" },
                    { name: "Abhay Upadhyay", id: "231080072", github: "github.com/urabhay10" },
                  ].map((c) => (
                    <a
                      key={c.id}
                      href={`https://${c.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-lg border border-border-subtle bg-surface hover:border-accent transition-colors group text-center"
                    >
                      <div className="text-sm font-bold group-hover:text-accent transition-colors">{c.name}</div>
                      <div className="text-[10px] text-accent/70 mt-1">{c.github}</div>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {}
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
              <span>Post-Quantum IRC Project</span>
            </div>
            <div>
              FIPS 203 Compliant · ML-KEM-768
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
