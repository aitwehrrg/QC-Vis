"use client";

import { useEffect, useRef, useState } from "react";
import { LatexInline } from "./LatexBlock";

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

  return (
    <div className="w-full overflow-x-auto py-8">
      <svg
        ref={svgRef}
        viewBox="0 0 800 320"
        className="w-full max-w-4xl mx-auto"
        style={{ minWidth: "600px" }}
        role="img"
        aria-label="System map showing the Ring-LWE protocol flow between Alice, Bob, and Eve"
      >
        <title>Protocol System Map</title>
        
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--muted)" />
          </marker>
          <linearGradient id="grad-public" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-value-public-bg)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-value-public-bg)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* ─── Role Labels ─────────────────────────────────────────── */}
        <g opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s" }}>
          <text x="150" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--color-actor-b)" className="uppercase tracking-widest">Bob (Receiver)</text>
          <text x="400" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--muted)" className="uppercase tracking-widest">Public Channel</text>
          <text x="650" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--color-actor-a)" className="uppercase tracking-widest">Alice (Sender)</text>
        </g>

        {/* ─── Background Zones ────────────────────────────────────── */}
        <rect x="300" y="45" width="200" height="240" rx="12" fill="url(#grad-public)" stroke="var(--border-subtle)" strokeDasharray="4 4" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.8s 0.2s" }} />
        <text x="400" y="275" textAnchor="middle" fontSize="10" fill="var(--muted)" opacity={visible ? 0.6 : 0}>Untrusted Zone</text>

        {/* ─── Bob's Actions ───────────────────────────────────────── */}
        <g opacity={visible ? 1 : 0} transform={`translate(0, ${visible ? 0 : 10})`} style={{ transition: "all 0.5s 0.3s" }}>
          <rect x="50" y="60" width="200" height="60" rx="8" fill="var(--surface)" stroke="var(--color-actor-b)" strokeWidth="1.5" />
          <text x="150" y="85" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--fg)">1. Key Generation</text>
          <foreignObject x="60" y="92" width="180" height="20">
            <div className="flex justify-center text-[9px] text-muted font-mono"><LatexInline>{"\\text{pk}=(\\mathbf{a}, \\mathbf{b}), \\text{sk}=\\mathbf{s}"}</LatexInline></div>
          </foreignObject>
        </g>

        <g opacity={visible ? 1 : 0} transform={`translate(0, ${visible ? 0 : 10})`} style={{ transition: "all 0.5s 0.9s" }}>
          <rect x="50" y="200" width="200" height="60" rx="8" fill="var(--surface)" stroke="var(--color-actor-b)" strokeWidth="1.5" />
          <text x="150" y="225" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--fg)">6. Decapsulation</text>
          <foreignObject x="60" y="232" width="180" height="20">
            <div className="flex justify-center text-[9px] text-muted font-mono"><LatexInline>{"\\text{Recover } K = \\text{Round}(\\mathbf{v}-\\mathbf{us})"}</LatexInline></div>
          </foreignObject>
        </g>

        {/* ─── Alice's Actions ─────────────────────────────────────── */}
        <g opacity={visible ? 1 : 0} transform={`translate(0, ${visible ? 0 : 10})`} style={{ transition: "all 0.5s 0.6s" }}>
          <rect x="550" y="130" width="200" height="60" rx="8" fill="var(--surface)" stroke="var(--color-actor-a)" strokeWidth="1.5" />
          <text x="650" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--fg)">3. Encapsulation</text>
          <foreignObject x="560" y="162" width="180" height="20">
            <div className="flex justify-center text-[9px] text-muted font-mono"><LatexInline>{"\\text{Derive } K, \\text{ compute } (\\mathbf{u}, \\mathbf{v})"}</LatexInline></div>
          </foreignObject>
        </g>

        {/* ─── Flow Arrows ─────────────────────────────────────────── */}
        {/* Step 2: PK Bob -> Channel */}
        <path d="M 250 90 L 320 90 Q 350 90 350 120 L 350 130" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.5s" }} />
        <text x="300" y="82" textAnchor="middle" fontSize="10" fill="var(--color-value-public-text)" fontWeight="600" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.5s" }}>2. Publish PK</text>

        {/* Step 2 continued: Channel -> Alice */}
        <path d="M 350 130 Q 350 160 380 160 L 550 160" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.6s" }} />

        {/* Step 4: CT Alice -> Channel */}
        <path d="M 550 180 L 450 180 Q 420 180 420 210 L 420 220" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.8s" }} />
        <text x="500" y="200" textAnchor="middle" fontSize="10" fill="var(--color-value-cipher-text)" fontWeight="600" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.8s" }}>4. Send Ciphertext</text>

        {/* Step 5: Channel -> Bob */}
        <path d="M 420 220 Q 420 250 390 250 L 250 250" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.9s" }} />
        <text x="320" y="242" textAnchor="middle" fontSize="10" fill="var(--color-value-cipher-text)" fontWeight="600" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.9s" }}>5. Transport CT</text>

        {/* ─── Eve ─────────────────────────────────────────────────── */}
        <g opacity={visible ? 1 : 0} transform={`translate(0, ${visible ? 0 : 5})`} style={{ transition: "all 0.5s 1.2s" }}>
          <circle cx="400" cy="160" r="25" fill="var(--surface)" stroke="var(--color-actor-c)" strokeWidth="1.5" />
          <text x="400" y="164" textAnchor="middle" fontSize="14" fill="var(--color-actor-c)" fontWeight="bold">Eve</text>
          <text x="400" y="195" textAnchor="middle" fontSize="9" fill="var(--color-actor-c)" fontWeight="600" className="uppercase tracking-tighter">Attacker</text>
          
          <path d="M 375 160 Q 350 160 350 145" fill="none" stroke="var(--color-actor-c)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <path d="M 425 160 Q 450 160 450 175" fill="none" stroke="var(--color-actor-c)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        </g>

      </svg>
    </div>
  );
}
