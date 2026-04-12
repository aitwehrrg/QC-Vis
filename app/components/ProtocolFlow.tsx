"use client";

import { useEffect, useRef, useState } from "react";

import { LatexInline } from "./LatexBlock";

interface FlowStep {
  from: "A" | "B" | "channel";
  to: "A" | "B" | "channel";
  label: React.ReactNode;
  detail: React.ReactNode;
  type: "private" | "public" | "encrypted";
}

const FLOW_STEPS: FlowStep[] = [
  { from: "B", to: "B", label: <LatexInline>{"\\text{Generate } \\mathbf{s}, \\mathbf{e}"}</LatexInline>, detail: <LatexInline>{"\\text{Secret key } \\mathbf{s} \\text{ and error } \\mathbf{e} \\text{ (private)}"}</LatexInline>, type: "private" },
  { from: "B", to: "B", label: <LatexInline>{"\\text{Compute } \\mathbf{b} = \\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e}"}</LatexInline>, detail: "Public key component", type: "public" },
  { from: "B", to: "channel", label: <LatexInline>{"\\text{Publish } (\\mathbf{a}, \\mathbf{b})"}</LatexInline>, detail: "Public key sent to channel", type: "public" },
  { from: "channel", to: "A", label: <LatexInline>{"\\text{Receive } (\\mathbf{a}, \\mathbf{b})"}</LatexInline>, detail: "Alice receives Bob's public key", type: "public" },
  { from: "A", to: "A", label: <LatexInline>{"\\text{Generate } \\mathbf{r}, \\mathbf{e}_1, \\mathbf{e}_2"}</LatexInline>, detail: "Ephemeral values (private)", type: "private" },
  { from: "A", to: "A", label: <LatexInline>{"\\text{Compute } \\mathbf{u}, \\mathbf{v}"}</LatexInline>, detail: <LatexInline>{"\\mathbf{u} = \\mathbf{a} \\cdot \\mathbf{r} + \\mathbf{e}_1, \\; \\mathbf{v} = \\mathbf{b} \\cdot \\mathbf{r} + \\mathbf{e}_2"}</LatexInline>, type: "public" },
  { from: "A", to: "A", label: "Derive shared key", detail: <LatexInline>{"K_A = \\text{Round}(\\mathbf{v})"}</LatexInline>, type: "private" },
  { from: "A", to: "A", label: "Encrypt message", detail: <LatexInline>{"\\text{ciphertext} = \\text{msg} \\oplus K_A"}</LatexInline>, type: "encrypted" },
  { from: "A", to: "channel", label: <LatexInline>{"\\text{Send } (\\mathbf{u}, \\mathbf{v}, \\text{ciphertext})"}</LatexInline>, detail: "Transmitted over public channel", type: "encrypted" },
  { from: "channel", to: "B", label: <LatexInline>{"\\text{Receive } (\\mathbf{u}, \\mathbf{v}, \\text{ct})"}</LatexInline>, detail: "Bob receives ciphertext bundle", type: "encrypted" },
  { from: "B", to: "B", label: <LatexInline>{"\\text{Compute } \\mathbf{v} - \\mathbf{u} \\cdot \\mathbf{s}"}</LatexInline>, detail: "Recovers approximate shared value", type: "private" },
  { from: "B", to: "B", label: "Derive shared key", detail: <LatexInline>{"K_B = \\text{Round}(\\mathbf{v} - \\mathbf{u} \\cdot \\mathbf{s}) \\approx K_A"}</LatexInline>, type: "private" },
  { from: "B", to: "B", label: "Decrypt message", detail: <LatexInline>{"\\text{msg} = \\text{ciphertext} \\oplus K_B"}</LatexInline>, type: "private" },
];

const typeStyles = {
  private: { bg: "var(--color-value-private-bg)", border: "var(--color-value-private-text)", text: "var(--color-value-private-text)" },
  public: { bg: "var(--color-value-public-bg)", border: "var(--color-value-public-text)", text: "var(--color-value-public-text)" },
  encrypted: { bg: "var(--color-value-cipher-bg)", border: "var(--color-value-cipher-text)", text: "var(--color-value-cipher-text)" },
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
              {key === "private" ? "Private" : key === "public" ? "Public" : "Encrypted"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
