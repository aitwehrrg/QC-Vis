"use client";

import { useEffect, useRef, useState } from "react";

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
        </defs>

        {}
        <g opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s" }}>
          <text x="150" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--secondary)" className="uppercase tracking-widest">Bob (Receiver)</text>
          <text x="400" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--muted)" className="uppercase tracking-widest">Public Channel</text>
          <text x="650" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)" className="uppercase tracking-widest">Alice (Sender)</text>
        </g>

        {}
        <rect x="300" y="45" width="200" height="240" rx="12" fill="var(--surface-alt)" stroke="var(--border)" strokeDasharray="4 4" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.8s 0.2s" }} />
        <text x="400" y="275" textAnchor="middle" fontSize="10" fill="var(--muted)" opacity={visible ? 0.6 : 0}>Untrusted Zone</text>

        {}
        <g opacity={visible ? 1 : 0} transform={`translate(0, ${visible ? 0 : 10})`} style={{ transition: "all 0.5s 0.3s" }}>
          <rect x="50" y="60" width="200" height="60" rx="8" fill="var(--surface)" stroke="var(--secondary)" strokeWidth="1.5" />
          <text x="150" y="85" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--fg)">1. Key Generation</text>
          <text x="150" y="102" textAnchor="middle" fontSize="9" fill="var(--muted)">Generate Secret Lattice</text>
          <text x="150" y="112" textAnchor="middle" fontSize="9" fill="var(--muted)">& Add Obfuscating Noise</text>
        </g>

        <g opacity={visible ? 1 : 0} transform={`translate(0, ${visible ? 0 : 10})`} style={{ transition: "all 0.5s 0.9s" }}>
          <rect x="50" y="200" width="200" height="60" rx="8" fill="var(--surface)" stroke="var(--secondary)" strokeWidth="1.5" />
          <text x="150" y="225" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--fg)">6. Decapsulation</text>
          <text x="150" y="242" textAnchor="middle" fontSize="9" fill="var(--muted)">Filter Noise with Private Key</text>
          <text x="150" y="252" textAnchor="middle" fontSize="9" fill="var(--muted)">to Recover Shared Secret</text>
        </g>

        {}
        <g opacity={visible ? 1 : 0} transform={`translate(0, ${visible ? 0 : 10})`} style={{ transition: "all 0.5s 0.6s" }}>
          <rect x="550" y="130" width="200" height="60" rx="8" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="650" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--fg)">3. Encapsulation</text>
          <text x="650" y="172" textAnchor="middle" fontSize="9" fill="var(--muted)">Create Lattice Puzzle</text>
          <text x="650" y="182" textAnchor="middle" fontSize="9" fill="var(--muted)">from Public Key</text>
        </g>

        {}
        {}
        <path d="M 250 90 L 320 90 Q 350 90 350 120 L 350 130" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.5s" }} />
        <text x="300" y="82" textAnchor="middle" fontSize="10" fill="var(--accent)" fontWeight="600" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.5s" }}>2. Publish PK</text>

        {}
        <path d="M 350 130 Q 350 160 380 160 L 550 160" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.6s" }} />

        {}
        <path d="M 550 180 L 450 180 Q 420 180 420 210 L 420 220" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.8s" }} />
        <text x="500" y="200" textAnchor="middle" fontSize="10" fill="var(--secondary)" fontWeight="600" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.8s" }}>4. Send Ciphertext</text>

        {}
        <path d="M 420 220 Q 420 250 390 250 L 250 250" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.9s" }} />
        <text x="320" y="242" textAnchor="middle" fontSize="10" fill="var(--secondary)" fontWeight="600" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.9s" }}>5. Transport CT</text>

        {}
        <g opacity={visible ? 1 : 0} transform={`translate(0, ${visible ? 0 : 5})`} style={{ transition: "all 0.5s 1.2s" }}>
          <circle cx="400" cy="160" r="25" fill="var(--surface)" stroke="var(--tertiary)" strokeWidth="1.5" />
          <text x="400" y="164" textAnchor="middle" fontSize="14" fill="var(--tertiary)" fontWeight="bold">Eve</text>
          <text x="400" y="195" textAnchor="middle" fontSize="9" fill="var(--tertiary)" fontWeight="600" className="uppercase tracking-tighter">Attacker</text>
          
          <path d="M 375 160 Q 350 160 350 145" fill="none" stroke="var(--tertiary)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <path d="M 425 160 Q 450 160 450 175" fill="none" stroke="var(--tertiary)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        </g>

      </svg>
    </div>
  );
}
