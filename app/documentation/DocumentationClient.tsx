"use client";

import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import CodeBlock from "../components/CodeBlock";
import Tabs from "../components/Tabs";
import Accordion from "../components/Accordion";
import { LatexText } from "../components/LatexBlock";
import { INSTALL_COMMANDS, BENCHMARK_OUTPUT, DOC_SECTIONS } from "../lib/constants";
import { FaGithub } from "react-icons/fa";

export default function DocumentationClient() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is intersecting
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px", // Adjust these values to fine-tune when a section becomes active
        threshold: 0,
      }
    );

    // Flatten all items from all groups to observe them
    const allSectionIds = DOC_SECTIONS.flatMap(group => group.items.map(item => item.id));
    
    allSectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <main className="flex-1 lattice-bg">
        <div className="section-container">
          <div className="docs-layout">
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

                {DOC_SECTIONS.map((group) => (
                  <div key={group.group} className="docs-sidebar-group">
                    <span className="docs-sidebar-heading">{group.group}</span>
                    {group.items.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={activeSection === item.id ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({
                            behavior: "smooth"
                          });
                          window.history.pushState(null, "", `#${item.id}`);
                          setActiveSection(item.id);
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                ))}
              </nav>
            </aside>

            <div className="max-w-3xl">
              <section id="installation">
                <h2 id="install-top" className="mt-0">Installation</h2>

                <h3 id="install-prereqs">Prerequisites</h3>
                <ul className="text-sm space-y-1" style={{ color: "var(--fg)" }}>
                  <li>C++20 compiler (GCC 11+, Clang 13+)</li>
                  <li>OpenSSL 3.0+ (AEAD, HKDF, PBKDF2)</li>
                  <li>CMake 3.14+</li>
                  <li>Linux (getrandom(2), POSIX sockets)</li>
                </ul>
                <CodeBlock code={INSTALL_COMMANDS.prerequisites} language="bash" filename="prerequisites" />

                <h3 id="install-clone">Clone &amp; Build</h3>
                <CodeBlock code={INSTALL_COMMANDS.clone} language="bash" filename="terminal" />
                <CodeBlock code={INSTALL_COMMANDS.build} language="bash" filename="terminal" />

                <h3 id="install-run">Run the Demo</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  The <code>demo</code> target validates ML-KEM-768 flow. The <code>client</code> and <code>server</code> binaries provide the full IRC experience.
                </p>
                <CodeBlock code={INSTALL_COMMANDS.run} language="bash" filename="terminal" />

                <div className="mt-6 mb-10 border-t border-border-subtle pt-6">
                  <a
                    href="https://github.com/ghruank/irc-encrypted"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:underline font-medium"
                  >
                    <FaGithub />
                    Full C++ implementation on GitHub →
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
                            and <code>HKDF</code> support.
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
                      title: "Operating System Support",
                      content: (
                        <p className="m-0 text-sm" style={{ color: "var(--muted)" }}>
                          The current implementation uses <code>getrandom(2)</code> and POSIX 
                          sockets, making it primarily compatible with Linux.
                        </p>
                      ),
                    },
                  ]}
                  allowMultiple
                />
              </section>

              <hr className="section-divider my-8" />

              <section id="documentation">
                <h2 id="doc-top" className="mt-0">Technical Documentation</h2>

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
                            standard leveraging Module Learning With Errors (M-LWE).
                          </p>
                          <ul className="space-y-1">
                            <li><strong>ML-KEM-512</strong>: NIST Level 1</li>
                            <li><strong>ML-KEM-768</strong>: NIST Level 3</li>
                            <li><strong>ML-KEM-1024</strong>: NIST Level 5</li>
                          </ul>
                        </div>
                      ),
                    },
                    {
                      id: "technical",
                      label: "Mathematics",
                      content: (
                        <div className="text-sm space-y-3" style={{ color: "var(--fg)" }}>
                          <div className="text-sm leading-relaxed">
                            <LatexText>{`ML-KEM operates in a module of rank $k$ over $\\mathcal{R}_q = \\mathbb{Z}_q[x]/(x^n + 1)$ ($n=256, q=3329$).`}</LatexText>
                          </div>
                          <ol className="space-y-2">
                            <li>
                              <strong>KeyGen</strong>: <LatexText className="inline">{`Samples $\\mathbf{s}, \\mathbf{e}$ and computes $\\mathbf{b} = \\mathbf{A}\\mathbf{s} + \\mathbf{e}$.`}</LatexText>
                            </li>
                            <li>
                              <strong>Encaps</strong>: <LatexText className="inline">{`Encrypts 32-byte message $m$ into ciphertext $c$.`}</LatexText>
                            </li>
                            <li>
                              <strong>Decaps</strong>: <LatexText className="inline">{`Recovers $m$ using implicit rejection for CCA security.`}</LatexText>
                            </li>
                          </ol>
                        </div>
                      ),
                    },
                  ]}
                />

                <h3 id="doc-keygen">Key Generation</h3>
                <div className="text-sm" style={{ color: "var(--fg)" }}>
                  <LatexText>
                    Key generation (Algorithm 16) produces the encapsulation key $ek$ and 
                    decapsulation key $dk$. It utilizes OS-level CSPRNG to generate random seeds 
                    expanded into the module matrix and noise vectors.
                  </LatexText>
                </div>
                <CodeBlock
                  code={`// mlkem768.hpp\n// Generates a new keypair using OS CSPRNG\nstatic KeyPair generate();`}
                  language="cpp"
                  filename="mlkem768.hpp"
                />

                <h3 id="doc-encap">Encapsulation</h3>
                <div className="text-sm" style={{ color: "var(--fg)" }}>
                  <LatexText>
                    Encapsulation (Algorithm 17) uses $ek$ to generate a 32-byte 
                    shared secret and a ciphertext $c$. It involves sampling an 
                    ephemeral message and encrypting it with a K-PKE scheme.
                  </LatexText>
                </div>
                <CodeBlock
                  code={`// Encapsulates a shared secret for the given public key\nstatic EncapsResult encapsulate(const PublicKey& ek);`}
                  language="cpp"
                  filename="mlkem768.hpp"
                />

                <h3 id="doc-decap">Decapsulation</h3>
                <div className="text-sm" style={{ color: "var(--fg)" }}>
                  <LatexText>
                    Decapsulation (Algorithm 18) recovers the secret from $c$ 
                    using $dk$. It features **implicit rejection**, 
                    returning a random-looking key on tamper to mitigate timing attacks.
                  </LatexText>
                </div>
                <CodeBlock
                  code={`// Decapsulates the shared secret from a ciphertext\nstatic SharedSecret decapsulate(const Ciphertext& c, const PrivateKey& dk);`}
                  language="cpp"
                  filename="mlkem768.hpp"
                />

                <h3 id="doc-noise">Role of Noise</h3>
                <div className="text-sm" style={{ color: "var(--fg)" }}>
                  <LatexText>
                    Noise (error vectors from a centered binomial distribution) is essential. 
                    Adding errors makes public keys and ciphertexts instances of the 
                    **Learning With Errors (LWE)** problem, which is computationally 
                    intractable for quantum computers.
                  </LatexText>
                </div>

                <h3 id="doc-why-c-fails">Why Eavesdropping Fails</h3>
                <div className="text-sm" style={{ color: "var(--fg)" }}>
                  <LatexText>
                    An attacker (Eve) who intercepts $c$ cannot recover the secret without $dk$. 
                    Without the secret polynomials, removing noise is equivalent to 
                    solving the M-LWE problem.
                  </LatexText>
                </div>

                <h3 id="doc-performance">Performance Benchmarks</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  Benchmarks from a standard release build on typical modern hardware.
                </p>
                <CodeBlock
                  code={BENCHMARK_OUTPUT}
                  language="plaintext"
                  filename="benchmarks"
                />

                <h3 id="doc-references">References</h3>
                <div className="text-sm space-y-4" style={{ color: "var(--fg)" }}>
                  <div className="p-4 rounded-lg bg-surface border border-border-subtle">
                    <p className="font-bold mb-1">NIST FIPS 203</p>
                    <p className="text-xs text-muted mb-2">Standard for Module-Lattice-Based KEM</p>
                    <a 
                      href="https://doi.org/10.6028/NIST.FIPS.203" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-accent hover:underline"
                    >
                      doi.org/10.6028/NIST.FIPS.203
                    </a>
                  </div>

                  <div className="p-4 rounded-lg bg-surface border border-border-subtle">
                    <p className="font-bold mb-1">CRYSTALS-Kyber: a CCA-secure module-lattice-based KEM</p>
                    <p className="text-xs text-muted mb-2">Bos et al. EuroS&P 2018.</p>
                    <a 
                      href="https://pq-crystals.org/kyber/resources.shtml" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-accent hover:underline"
                    >
                      pq-crystals.org/kyber
                    </a>
                  </div>
                </div>

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
                        ["mlkem.hpp", "Low-level templated FIPS 203 implementation."],
                        ["mlkem768.hpp", "High-level ML-KEM-768 class wrapper."],
                        ["aead.hpp", "OpenSSL-backed HKDF and AES-256-GCM."],
                        ["symmetric.hpp", "Self-contained SHA-3 and SHAKE primitives."],
                        ["ntt.hpp", "Number Theoretic Transform implementation."],
                      ].map(([mod, desc], i) => (
                        <tr key={i} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                          <td className="py-2 pr-4 font-medium" style={{ color: "var(--fg)" }}>{mod}</td>
                          <td className="py-2">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 id="doc-limitations">Limitations</h3>
                <ul className="text-sm space-y-1" style={{ color: "var(--fg)" }}>
                  <li><strong>1-to-1 only:</strong> No group rooms.</li>
                  <li><strong>No message history:</strong> Messages are ephemeral.</li>
                  <li><strong>Static keys:</strong> No forward secrecy between sessions.</li>
                  <li><strong>Linux preferred:</strong> Uses <code>getrandom(2)</code> and POSIX sockets.</li>
                </ul>

                <h3 id="doc-contributors">Project Contributors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
                  {[
                    { name: "Abhay Upadhyay", github: "github.com/urabhay10" },
                    { name: "Ghruank Kothare", github: "github.com/ghruank" },
                    { name: "Rupak R. Gupta", github: "github.com/aitwehrrg" },
                  ].map((c) => (
                    <a
                      key={c.github}
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
              PoC Implementation · ML-KEM-768
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
