"use client";

import { useMemo } from "react";
import katex from "katex";

interface LatexBlockProps {
  children: string;
  display?: boolean;
  className?: string;
}

export default function LatexBlock({
  children,
  display = false,
  className = "",
}: LatexBlockProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        trust: true,
        macros: {
          "\\mathcal{R}": "\\mathcal{R}",
          "\\Z": "\\mathbb{Z}",
          "\\Zq": "\\mathbb{Z}_q",
        },
      });
    } catch {
      return children;
    }
  }, [children, display]);

  return (
    <span
      className={`katex-container ${display ? "block my-2" : "inline"} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      role="math"
    />
  );
}

/**
 * Renders text containing inline LaTeX marked with $...$
 */
export function LatexText({ children, className = "" }: { children: string; className?: string }) {
  const elements = useMemo(() => {
    const parts = children.split(/(\$[^\$]+\$)/g);
    return parts.map((part, i) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        const tex = part.slice(1, -1);
        try {
          const html = katex.renderToString(tex, {
            displayMode: false,
            throwOnError: false,
          });
          return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
        } catch {
          return <span key={i}>{part}</span>;
        }
      }
      return <span key={i}>{part}</span>;
    });
  }, [children]);

  return <div className={className}>{elements}</div>;
}

/**
 * Inline LaTeX shorthand.
 */
export function LatexInline({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return <LatexBlock className={className}>{children}</LatexBlock>;
}
