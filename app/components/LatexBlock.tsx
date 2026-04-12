"use client";

import { useMemo } from "react";
import katex from "katex";

interface LatexBlockProps {
  /** LaTeX source string */
  children: string;
  /** Display mode (centered block) vs inline */
  display?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * Renders LaTeX math using KaTeX.
 * Supports both display (block) and inline modes.
 */
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
          "\\vect": "\\mathbf{#1}",
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
      className={`katex-container ${display ? "katex-display-block" : "katex-inline"} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      role="math"
      aria-label={children}
    />
  );
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
