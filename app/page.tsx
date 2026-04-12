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
                  <h1 className="text-balance m-0">Kyber</h1>
                  <p className="text-sm m-0" style={{ color: "var(--muted)" }}>
                    ML-KEM Messaging Stack
                  </p>
                </div>
              </div>

              <p className="text-lg leading-relaxed" style={{ color: "var(--fg)" }}>
                A high-performance C++20 implementation of the ML-KEM-768 (FIPS 203)
                post-quantum key encapsulation mechanism, designed for secure messaging.
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  href="https://github.com/aitwehrrg/Kyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 4.365 9.75 10.399 11.14.6.111.82-.258.82-.577 0-.285-.021-1.04-.032-2.037-3.338.724-4.042-1.61-4.042-1.61C6.571 18.259 5.012 17.03 5.012 17.03c-1.091-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.218.694.825.576C20.565 21.792 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  View C++ Source on GitHub
                </a>
                <a href="#installation" className="btn-secondary">
                  Installation Guide
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                  <h3 className="text-sm font-semibold m-0 mb-2" style={{ color: "var(--accent)" }}>
                    Standard Compliant
                  </h3>
                  <p className="text-sm m-0" style={{ color: "var(--muted)" }}>
                    Strictly follows NIST FIPS 203 for ML-KEM-768. Built for interoperability 
                    and security against both classical and quantum attacks.
                  </p>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                  <h3 className="text-sm font-semibold m-0 mb-2" style={{ color: "var(--accent)" }}>
                    Modern C++20 Stack
                  </h3>
                  <p className="text-sm m-0" style={{ color: "var(--muted)" }}>
                    Leverages C++20 features including `std::span` and RAII for memory safety. 
                    Includes `SecureBuffer` for automatic zeroization of sensitive material.
                  </p>
                </div>
              </div>

              <h2 id="system-map">System Map</h2>
              <p style={{ color: "var(--muted)" }}>
                A high-level overview of the messaging stack. Bob generates a public key that Alice uses to "encapsulate" 
                a shared secret, creating an end-to-end encrypted session.
              </p>
              <SystemMap />
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {}
        <section id="protocol-flow">
          <div className="section-container">
            <h2 className="mt-0">The Lattice-Based Exchange</h2>
            <p style={{ color: "var(--muted)" }} className="max-w-2xl">
              ML-KEM-768 achieves post-quantum security by hiding secrets within "noisy" mathematical lattices. 
              This flow illustrates how Alice and Bob establish a secure channel.
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
                <div className="callout-title">✓ FIPS 203 Compliant</div>
                <p>
                  Designed to meet the security level roughly equivalent to AES-192, 
                  providing resistance against quantum-capable adversaries.
                </p>
              </div>

              <h3>Implementation Security</h3>
              <ul className="text-sm space-y-2" style={{ color: "var(--fg)" }}>
                <li>
                  <strong>High-efficiency NTT.</strong> Optimized polynomial arithmetic 
                  for performance and reliability.
                </li>
                <li>
                  <strong>Secure Memory.</strong> Sensitive material is handled via 
                  <code>SecureBuffer</code> to ensure zeroization after use.
                </li>
                <li>
                  <strong>Robust KDF/AEAD.</strong> Uses HKDF-SHA256 for key derivation 
                  and AES-256-GCM for the symmetric data channel.
                </li>
              </ul>

              <h3>Performance Results (Typical)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
                {[
                  { label: "KeyGen", time: "~105 us" },
                  { label: "Encaps", time: "~100 us" },
                  { label: "Decaps", time: "~125 us" },
                  { label: "E2E 1KB", time: "~270 us" },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 rounded-lg text-center" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)" }}>
                    <div className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>{stat.label}</div>
                    <div className="text-sm font-bold">{stat.time}</div>
                  </div>
                ))}
              </div>

              <h3>Threat Model</h3>
              <p className="text-sm" style={{ color: "var(--fg)" }}>
                The protocol protects against both passive eavesdroppers and active adversaries 
                capable of submitting modified ciphertexts (CCA security).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="p-4 rounded-lg" style={{ background: "var(--color-value-public-bg)", border: "1px solid var(--color-value-public-text)" }}>
                  <h4 className="text-sm font-semibold m-0 mb-2" style={{ color: "var(--color-value-public-text)" }}>
                    What C CAN do
                  </h4>
                  <ul className="text-xs space-y-1 m-0" style={{ color: "var(--fg)" }}>
                    <li>Observe public key</li>
                    <li>Observe encapsulated key</li>
                    <li>Observe AEAD-encrypted message</li>
                    <li>Record all transmissions</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg" style={{ background: "var(--color-value-private-bg)", border: "1px solid var(--color-value-private-text)" }}>
                  <h4 className="text-sm font-semibold m-0 mb-2" style={{ color: "var(--color-value-private-text)" }}>
                    What C CANNOT do
                  </h4>
                  <ul className="text-xs space-y-1 m-0" style={{ color: "var(--fg)" }}>
                    <li>Recover secret key</li>
                    <li>Derive the shared secret</li>
                    <li>Decrypt session traffic</li>
                    <li>Forge or modify messages</li>
                  </ul>
                </div>
              </div>

              <div className="callout callout-info mt-6">
                <div className="callout-title">ℹ Standard Compliance</div>
                <p>
                  This implementation follows the NIST SP 800-227 migration guidance 
                  and is tested against OpenSSL 3.0+ for underlying primitives.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {}
        <section id="contribute">
          <div className="section-container">
            <div className="max-w-3xl">
              <h2 className="mt-0">Open Source &amp; Development</h2>
              <p style={{ color: "var(--muted)" }}>
                The Kyber messaging stack is open source. The C++20 core and benchmarks are available on{" "}
                <a href="https://github.com/aitwehrrg/Kyber" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub</a>.
              </p>

              <h3>Repository Structure</h3>
              <CodeBlock
                code={`kyber/\n├── apps/                # CLI applications (sender, receiver, demo)\n├── benchmarks/          # Performance measurement suite\n├── include/kyber/       # Public API headers\n│   ├── crypto.h         # AEAD and KDF interfaces\n│   ├── mlkem.h          # ML-KEM-768 implementation\n│   ├── session.h        # Session management\n│   └── wire.h           # Wire format definitions\n├── src/                 # Implementation files\n│   ├── crypto/          # Cryptographic primitives\n│   ├── protocol/        # Session logic\n│   └── serialization/   # Wire format\n├── tests/               # Unit test suite\n├── CMakeLists.txt\n└── README.md`}
                language="plaintext"
                filename="project structure"
              />

              <h3>Building from Source</h3>
              <ol className="text-sm space-y-2" style={{ color: "var(--fg)" }}>
                <li>Clone the repository.</li>
                <li>Ensure OpenSSL 3.0+ and CMake 3.15+ are installed.</li>
                <li>Run <code>mkdir build && cd build && cmake .. && make</code>.</li>
                <li>Run <code>./unit_tests</code> to verify the implementation.</li>
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
