"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { GLOSSARY } from "@/app/lib/constants";

interface GlossaryTooltipProps {
  term: string;
  children?: React.ReactNode;
}

export default function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("top");
  const triggerRef = useRef<HTMLSpanElement>(null);
  const definition = GLOSSARY[term];

  const show = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition(rect.top < 120 ? "bottom" : "top");
    }
    setVisible(true);
  }, []);

  const hide = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (visible) {
      const handleScroll = () => setVisible(false);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [visible]);

  if (!definition) return <span>{children || term}</span>;

  return (
    <span
      ref={triggerRef}
      className="glossary-term"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      role="button"
      aria-describedby={`glossary-${term.replace(/\s+/g, "-")}`}
    >
      {children || term}
      {visible && (
        <span
          id={`glossary-${term.replace(/\s+/g, "-")}`}
          className="glossary-tooltip"
          role="tooltip"
          style={
            position === "bottom"
              ? { top: "calc(100% + 8px)", bottom: "auto" }
              : {}
          }
        >
          <strong style={{ color: "var(--accent)", fontSize: "0.6875rem" }}>
            {term}
          </strong>
          <br />
          {definition}
        </span>
      )}
    </span>
  );
}
