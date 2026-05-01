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

export function LatexText({ children, className = "" }: { children: string; className?: string }) {
  const elements = useMemo(() => {
    const parts = children.split(/(\$[^\$]+\$)/g);
    return parts.flatMap((part, i) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        const tex = part.slice(1, -1);
        try {
          const html = katex.renderToString(tex, {
            displayMode: false,
            throwOnError: false,
          });
          return <span key={`math-${i}`} dangerouslySetInnerHTML={{ __html: html }} />;
        } catch {
          return <span key={`math-${i}`}>{part}</span>;
        }
      }
      
      // Support for bold text using **
      const boldParts = part.split(/(\*\*.+?\*\*)/g);
      return boldParts.map((subPart, j) => {
        if (subPart.startsWith("**") && subPart.endsWith("**")) {
          return (
            <strong key={`bold-${i}-${j}`} className="font-bold">
              {subPart.slice(2, -2)}
            </strong>
          );
        }
        return <span key={`text-${i}-${j}`}>{subPart}</span>;
      });
    });
  }, [children]);

  return <div className={className}>{elements}</div>;
}

export function LatexInline({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return <LatexBlock className={className}>{children}</LatexBlock>;
}
