"use client";

import { useEffect, useRef, useState } from "react";

interface FlowStep {
  from: "A" | "B" | "channel";
  to: "A" | "B" | "channel";
  label: React.ReactNode;
  detail: React.ReactNode;
  type: "private" | "public" | "encrypted" | "noise";
}

const FLOW_STEPS: FlowStep[] = [
  { from: "B", to: "B", label: "Generate Secret Lattice", detail: "Bob picks a hidden set of points in a complex multi-dimensional space (Private Key).", type: "private" },
  { from: "B", to: "B", label: "Add Obfuscating Noise", detail: "Bob adds tiny errors (noise) to the lattice points, making the pattern unsolvable without the secret key.", type: "noise" },
  { from: "B", to: "channel", label: "Publish Public Key", detail: "The 'noisy' lattice is published. It looks like random data to anyone without the secret key.", type: "public" },
  { from: "channel", to: "A", label: "Receive Public Key", detail: "Alice receives Bob's noisy public key to start a secure conversation.", type: "public" },
  { from: "A", to: "A", label: "Pick a Random Secret", detail: "Alice generates a temporary secret value to use as the base for the encryption key.", type: "private" },
  { from: "A", to: "A", label: "Create Lattice Puzzle", detail: "Alice uses Bob's noisy public key to 'wrap' her secret into a new mathematical puzzle.", type: "noise" },
  { from: "A", to: "A", label: "Derive Session Key", detail: "Alice turns her secret into a strong AES-256 encryption key via HKDF.", type: "private" },
  { from: "A", to: "A", label: "Encrypt Message", detail: "Alice's message is encrypted with the session key using AES-GCM.", type: "encrypted" },
  { from: "A", to: "channel", label: "Send Secure Package", detail: "Alice sends the Lattice Puzzle (Encapsulated Key) and the Encrypted Message.", type: "encrypted" },
  { from: "channel", to: "B", label: "Receive Package", detail: "Bob receives the encrypted data and the puzzle from the public channel.", type: "encrypted" },
  { from: "B", to: "B", label: "Filter Out Noise", detail: "Using his private lattice structure, Bob precisely 'subtracts' the noise from Alice's puzzle.", type: "noise" },
  { from: "B", to: "B", label: "Recover Shared Secret", detail: "The noise disappears, revealing the exact secret Alice originally picked.", type: "private" },
  { from: "B", to: "B", label: "Decrypt Message", detail: "Bob derives the same session key and unlocks Alice's message.", type: "private" },
];

const typeStyles = {
  private: { bg: "var(--color-value-private-bg)", border: "var(--color-value-private-text)", text: "var(--color-value-private-text)" },
  public: { bg: "var(--color-value-public-bg)", border: "var(--color-value-public-text)", text: "var(--color-value-public-text)" },
  encrypted: { bg: "var(--color-value-cipher-bg)", border: "var(--color-value-cipher-text)", text: "var(--color-value-cipher-text)" },
  noise: { bg: "var(--color-value-noise-bg)", border: "var(--color-value-noise-text)", text: "var(--color-value-noise-text)" },
};

export default function ProtocolFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-idx") || "0");
            setVisibleSteps((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );

    const items = containerRef.current?.querySelectorAll("[data-idx]");
    items?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-2xl mx-auto">
      {/* Column headers */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div>
          <span className="actor-badge actor-badge-a">● Alice (A)</span>
        </div>
        <div>
          <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
            Channel
          </span>
        </div>
        <div>
          <span className="actor-badge actor-badge-b">● Bob (B)</span>
        </div>
      </div>

      {/* Vertical timeline */}
      <div className="relative">
        {/* Center line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px"
          style={{ background: "var(--border)" }}
          aria-hidden="true"
        />

        {FLOW_STEPS.map((step, i) => {
          const isVisible = visibleSteps.has(i);
          const style = typeStyles[step.type];
          const isLeft = step.from === "A" || step.to === "A";
          const isRight = step.from === "B" || step.to === "B";
          const isCenter = step.from === "channel" || step.to === "channel";

          let align = "left";
          if (isRight && !isLeft) align = "right";
          else if (isCenter) align = "center";

          return (
            <div
              key={i}
              data-idx={i}
              className="relative mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.5s ease",
              }}
            >
              {/* Dot on timeline */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
                style={{
                  background: style.border,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 0 3px var(--bg)`,
                }}
                aria-hidden="true"
              />

              <div
                className={`grid grid-cols-2 gap-4 ${
                  align === "right" ? "direction-rtl" : ""
                }`}
              >
                {align === "left" || align === "center" ? (
                  <>
                    <div className="pr-8 text-right">
                      <div
                        className="inline-block rounded-lg px-3 py-2 text-left"
                        style={{
                          background: style.bg,
                          border: `1px solid ${style.border}`,
                          maxWidth: "100%",
                        }}
                      >
                        <div
                          className="text-xs font-semibold"
                          style={{ color: style.text }}
                        >
                          {step.label}
                        </div>
                        <div
                          className="text-xs mt-0.5"
                          style={{ color: "var(--muted)", fontSize: "0.6875rem" }}
                        >
                          {step.detail}
                        </div>
                      </div>
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="pl-8">
                      <div
                        className="inline-block rounded-lg px-3 py-2"
                        style={{
                          background: style.bg,
                          border: `1px solid ${style.border}`,
                          maxWidth: "100%",
                        }}
                      >
                        <div
                          className="text-xs font-semibold"
                          style={{ color: style.text }}
                        >
                          {step.label}
                        </div>
                        <div
                          className="text-xs mt-0.5"
                          style={{ color: "var(--muted)", fontSize: "0.6875rem" }}
                        >
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-8 text-xs">
        {Object.entries(typeStyles).map(([key, style]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ background: style.bg, border: `1px solid ${style.border}` }}
            />
            <span style={{ color: "var(--muted)" }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
