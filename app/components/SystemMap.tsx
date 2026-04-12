"use client";

import { useEffect, useRef, useState } from "react";

import LatexBlock, { LatexInline } from "./LatexBlock";

export default function SystemMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (svgRef.current) observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    { x: 120, y: 60, label: "B generates", sublabel: <LatexInline>{"\\text{keypair } (\\mathbf{a}, \\mathbf{b}, \\mathbf{s})"}</LatexInline>, color: "var(--color-actor-b)" },
    { x: 350, y: 60, label: "B publishes", sublabel: <LatexInline>{"\\text{public key } (\\mathbf{a}, \\mathbf{b})"}</LatexInline>, color: "var(--color-actor-b)" },
    { x: 580, y: 60, label: "A encapsulates", sublabel: "shared secret", color: "var(--color-actor-a)" },
    { x: 580, y: 180, label: "A encrypts", sublabel: "message", color: "var(--color-actor-a)" },
    { x: 350, y: 180, label: "B decrypts", sublabel: "message", color: "var(--color-actor-b)" },
    { x: 120, y: 180, label: "C observes", sublabel: "learns nothing", color: "var(--color-actor-c)" },
  ];

  const arrows = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={svgRef}
        viewBox="0 0 700 260"
        className="w-full max-w-3xl mx-auto"
        style={{ minWidth: "500px" }}
        role="img"
        aria-label="System map showing the Ring-LWE protocol flow between Alice, Bob, and Eve"
      >
        <title>Protocol System Map</title>
        {/* Arrows */}
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--muted)" />
          </marker>
        </defs>
        {arrows.map((arrow, i) => {
          const from = steps[arrow.from];
          const to = steps[arrow.to];
          return (
            <line
              key={i}
              x1={from.x + 60}
              y1={from.y + 20}
              x2={to.x - 60}
              y2={to.y + 20}
              stroke="var(--muted)"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
              opacity={visible ? 1 : 0}
              style={{
                transition: `opacity 0.5s ${i * 0.15}s`,
              }}
            />
          );
        })}
        {/* Step boxes */}
        {steps.map((step, i) => (
          <g
            key={i}
            opacity={visible ? 1 : 0}
            transform={`translate(0, ${visible ? 0 : 10})`}
            style={{
              transition: `all 0.5s ${i * 0.1}s`,
            }}
          >
            <rect
              x={step.x - 55}
              y={step.y - 5}
              width="110"
              height="50"
              rx="6"
              fill="var(--surface)"
              stroke={step.color}
              strokeWidth="1.5"
            />
            <text
              x={step.x}
              y={step.y + 16}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={step.color}
              fontFamily="var(--font-inter), sans-serif"
            >
              {step.label}
            </text>
            <foreignObject
              x={step.x - 55}
              y={step.y + 22}
              width="110"
              height="20"
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  color: "var(--muted)",
                  fontFamily: "var(--font-jetbrains), monospace",
                  textAlign: "center"
                }}
              >
                {step.sublabel}
              </div>
            </foreignObject>
          </g>
        ))}
        {/* Dashed line from C to channel */}
        <line
          x1={120}
          y1={170}
          x2={350}
          y2={130}
          stroke="var(--color-actor-c)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity={visible ? 0.4 : 0}
          style={{ transition: "opacity 0.5s 0.5s" }}
        />
        <text
          x={235}
          y={142}
          textAnchor="middle"
          fontSize="8"
          fill="var(--color-actor-c)"
          opacity={visible ? 0.6 : 0}
          style={{ transition: "opacity 0.5s 0.6s" }}
          fontFamily="var(--font-inter), sans-serif"
        >
          observes public channel
        </text>
      </svg>
    </div>
  );
}
