import Navigation from "./components/Navigation";
import SystemMap from "./components/SystemMap";
import ProtocolFlow from "./components/ProtocolFlow";
import GlossaryTooltip from "./components/GlossaryTooltip";
import ActorBadge from "./components/ActorBadge";
import CodeBlock from "./components/CodeBlock";
import { PARAMS } from "./lib/constants";
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
                  <h1 className="text-balance m-0">ML-KEM</h1>
                  <p className="text-sm m-0" style={{ color: "var(--muted)" }}>
                    FIPS 203 Post-Quantum Messaging Stack
                  </p>
                </div>
              </div>

              <p className="text-lg leading-relaxed" style={{ color: "var(--fg)" }}>
                A high-performance C++20 implementation of ML-KEM (FIPS 203)
                supporting 512, 768, and 1024 parameter sets, featuring AVX2 acceleration 
                and integrated AEAD transport.
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  href="https://github.com/example/mlkem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <FaGithub />
                  View C++ Source on GitHub
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
                    AVX2 Optimized
                  </h3>
                  <p className="text-sm m-0" style={{ color: "var(--muted)" }}>
                    Optional AVX2-accelerated NTT path for modern x86 hardware, 
                    with runtime CPU dispatch and fallbacks for older systems.
                  </p>
                </div>
              </div>

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
              ML-KEM achieves post-quantum security by hiding secrets within "noisy" mathematical lattices. 
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
                  <strong>Secure Memory.</strong> Secrets are stored in <code>SecureBuffer</code> 
                  types that automatically zeroize memory on destruction.
                </li>
                <li>
                  <strong>OpenSSL Integration.</strong> Relies on OpenSSL 3.0+ for 
                  vetted AES-GCM and HKDF implementations in the AEAD layer.
                </li>
              </ul>

              <h3>Performance Benchmarks (x86_64, AVX2)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
                {[
                  { label: "KeyGen", time: "28 μs" },
                  { label: "Encaps", time: "35 μs" },
                  { label: "Decaps", time: "42 μs" },
                  { label: "NTT (AVX2)", time: "1.2 μs" },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 rounded-lg text-center" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                    <div className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>{stat.label}</div>
                    <div className="text-sm font-bold">{stat.time}</div>
                  </div>
                ))}
              </div>

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
                The core library provides a robust, reviewed implementation of ML-KEM.
              </p>

              <h3>Repository Structure</h3>
              <CodeBlock
                code={`pqc/\n├── apps/                # CLI tools (demo, sender, receiver)\n├── benchmarks/          # Performance measurement\n├── include/mlkem/       # Public API headers\n│   ├── mlkem.hpp        # Core ML-KEM templates\n│   ├── mlkem768.hpp     # Object-oriented wrapper\n│   ├── aead.hpp         # HKDF & AES-GCM layer\n│   └── secure_buffer.hpp # Auto-zeroing memory\n├── src/                 # Implementation (.cpp)\n├── tests/               # GoogleTest suite (KAT, Unit)\n├── CMakeLists.txt       # Build configuration\n└── README.md`}
                language="plaintext"
                filename="project structure"
              />

              <h3>Building from Source</h3>
              <ol className="text-sm space-y-2" style={{ color: "var(--fg)" }}>
                <li>Install OpenSSL 3.0+ and CMake 3.15+.</li>
                <li><code>mkdir build && cd build</code></li>
                <li><code>cmake .. -DENABLE_AVX2=ON</code></li>
                <li><code>make && ./demo</code></li>
              </ol>
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
              <span>ML-KEM C++20 Project</span>
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
