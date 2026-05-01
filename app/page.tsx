import Navigation from "./components/Navigation";
import SystemMap from "./components/SystemMap";
import ProtocolFlow from "./components/ProtocolFlow";
import CodeBlock from "./components/CodeBlock";
import ConversationTerminals from "./components/ConversationTerminals";
import { BENCHMARK_OUTPUT } from "./lib/constants";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1 lattice-bg">
        {}
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
                  <h1 className="text-balance m-0">Quantum IRC</h1>
                  <p className="text-sm m-0" style={{ color: "var(--muted)" }}>
                    PoC Post-Quantum Encrypted 1-to-1 Chat (FIPS 203)
                  </p>
                </div>
              </div>

              <p className="text-lg leading-relaxed" style={{ color: "var(--fg)" }}>
                A Proof-of-Concept terminal messaging system combining IRC-style chat over TCP 
                with ML-KEM-768 post-quantum encryption. Developed as a student research project 
                at VJTI featuring a custom C++20 implementation.
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  href="https://github.com/ghruank/irc-encrypted"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <FaGithub />
                  View Source on GitHub
                </a>
                <a href="/documentation" className="btn-secondary">
                  Documentation
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                  <h3 className="text-sm font-semibold m-0 mb-2" style={{ color: "var(--accent)" }}>
                    FIPS 203 Standard
                  </h3>
                  <p className="text-sm m-0" style={{ color: "var(--muted)" }}>
                    Complete implementation of ML-KEM-512/768/1024 as specified in FIPS 203. 
                    Includes KAT-style checks and constant-time primitives.
                  </p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                  <h3 className="text-sm font-semibold m-0 mb-2" style={{ color: "var(--accent)" }}>
                    Zero External Deps
                  </h3>
                  <p className="text-sm m-0" style={{ color: "var(--muted)" }}>
                    The ML-KEM core is entirely self-contained, including a custom 
                    implementation of SHA-3 and SHAKE without external libraries.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-center mb-8">PoC Exchange Demo</h2>
              <p className="text-center text-muted max-w-2xl mx-auto mb-12">
                Empirical output from a PoC session between Ghruank and Rupak,
                demonstrating the ML-KEM-768 handshake and E2E encrypted messaging.
              </p>
              <ConversationTerminals />
            </div>

            <div className="max-w-3xl">
              <h2 id="system-map">System Map</h2>
              <p style={{ color: "var(--muted)" }}>
                A high-level overview of the cryptographic stack. The KEM establishes a shared secret 
                which is then passed through HKDF-SHA256 to derive keys for AES-256-GCM.
              </p>
              <SystemMap />
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {}
        <section id="protocol-flow">
          <div className="section-container">
            <h2 className="mt-0">ML-KEM Protocol Flow</h2>
            <p style={{ color: "var(--muted)" }} className="max-w-2xl">
              ML-KEM achieves post-quantum security by hiding secrets within &quot;noisy&quot; mathematical lattices. 
              The process consists of KeyGen, Encapsulation, and Decapsulation.
            </p>
            <div className="mt-8">
              <ProtocolFlow />
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {}
        <section id="security">
          <div className="section-container">
            <div className="max-w-3xl">
              <h2 className="mt-0">Security Architecture</h2>
              <div className="callout callout-info">
                <div className="callout-title">✓ NIST Security Level 3 (ML-KEM-768)</div>
                <p>
                  ML-KEM-768 provides security roughly equivalent to AES-192, 
                  protecting against quantum-capable adversaries using Module-LWE.
                </p>
              </div>

              <h3>Implementation Security</h3>
              <ul className="text-sm space-y-2" style={{ color: "var(--fg)" }}>
                <li>
                  <strong>Constant-Time Execution.</strong> Decapsulation uses branchless 
                  logic for implicit rejection to mitigate timing side-channels.
                </li>
                <li>
                  <strong>No Heap Allocation.</strong> All cryptographic buffers are 
                  stack-allocated with constexpr-sized arrays for safety.
                </li>
                <li>
                  <strong>Authenticated Encryption.</strong> Relies on OpenSSL 3.0+ for 
                  vetted AES-256-GCM and HKDF-SHA256 implementations in the AEAD layer.
                </li>
              </ul>

              <h3>Performance Benchmarks (x86_64, Release Build)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4">
                {[
                  { label: "KeyGen", time: "~393 μs" },
                  { label: "Encaps", time: "~421 μs" },
                  { label: "Decaps", time: "~651 μs" },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 rounded-lg text-center" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                    <div className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>{stat.label}</div>
                    <div className="text-sm font-bold">{stat.time}</div>
                  </div>
                ))}
              </div>

              <CodeBlock
                code={BENCHMARK_OUTPUT}
                language="plaintext"
                filename="benchmarks"
              />

              <h3>Threat Model</h3>
              <p className="text-sm" style={{ color: "var(--fg)" }}>
                ML-KEM is IND-CCA2 secure, meaning it remains secure even when an adversary 
                can obtain decryptions of related ciphertexts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="p-4 rounded-lg" style={{ background: "var(--color-value-public-bg)", border: "1px solid var(--color-value-public-text)" }}>
                  <h4 className="text-sm font-semibold m-0 mb-2" style={{ color: "var(--color-value-public-text)" }}>
                    Public Information
                  </h4>
                  <ul className="text-xs space-y-1 m-0" style={{ color: "var(--fg)" }}>
                    <li>Encapsulation Key (ek)</li>
                    <li>Ciphertext (c)</li>
                    <li>AEAD Encrypted Payload</li>
                    <li>Public Seeds (ρ)</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "var(--color-value-private-bg)", border: "1px solid var(--color-value-private-text)" }}>
                  <h4 className="text-sm font-semibold m-0 mb-2" style={{ color: "var(--color-value-private-text)" }}>
                    Private Material
                  </h4>
                  <ul className="text-xs space-y-1 m-0" style={{ color: "var(--fg)" }}>
                    <li>Decapsulation Key (dk)</li>
                    <li>Shared Secret (K)</li>
                    <li>Random Seeds (d, z)</li>
                    <li>Intermediate Noise Vectors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {}
        <section id="contribute">
          <div className="section-container">
            <div className="max-w-3xl">
              <h2 className="mt-0">Open Source C++ Implementation</h2>
              <p style={{ color: "var(--muted)" }}>
                The core library provides a student-developed proof-of-concept implementation of ML-KEM.
              </p>

              <h3>Repository Structure</h3>
              <CodeBlock
                code={`/\n├── pqc/                    # ML-KEM library (Abhay Upadhyay, Rupak Gupta)\n│   ├── include/mlkem/      # Public headers (mlkem.hpp, aead.hpp)\n│   └── src/                # FIPS 203 implementation (NTT, SHA-3)\n└── irc/                    # IRC system (Ghruank Kothare)\n    ├── server.cpp          # Blind relay server\n    ├── client.cpp          # Terminal client (handshake, messaging)\n    └── crypto.hpp          # Crypto wrapper`}
                language="plaintext"
                filename="project structure"
              />

              <h3>Building from Source</h3>
              <ol className="text-sm space-y-2" style={{ color: "var(--fg)" }}>
                <li>Install OpenSSL 3.0+ and CMake 3.14+.</li>
                <li><code>cd irc && mkdir build && cd build</code></li>
                <li><code>cmake .. -DCMAKE_BUILD_TYPE=Release</code></li>
                <li><code>make -j$(nproc)</code></li>
              </ol>


              <h3 className="mt-12">Contributors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {[
                  { name: "Abhay Upadhyay", github: "github.com/urabhay10", role: "PQC Library" },
                  { name: "Ghruank Kothare", github: "github.com/ghruank", role: "IRC & Integration" },
                  { name: "Rupak R. Gupta", github: "github.com/aitwehrrg", role: "PQC Library" },
                ].map((c) => (
                  <a
                    key={c.github}
                    href={c.github.startsWith("github.com") ? `https://${c.github}` : `https://${c.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-border-subtle bg-surface hover:border-accent transition-colors group"
                  >
                    <div className="text-xs font-semibold group-hover:text-accent transition-colors">{c.name}</div>
                    <div className="text-[10px] text-muted truncate">{c.github}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {}
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
