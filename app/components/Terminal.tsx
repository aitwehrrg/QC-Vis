"use client";

import { useState, useEffect, useRef } from "react";

interface TerminalProps {
  title?: string;
  user?: string;
  hostname?: string;
  lines: string[];
  animate?: boolean;
  onComplete?: () => void;
  className?: string;
}

export default function Terminal({
  title = "Terminal",
  user = "user",
  hostname = "quantum",
  lines,
  animate = false,
  className = "",
}: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>(animate ? [] : lines);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) {
      if (visibleLines.length !== lines.length) {
        setTimeout(() => setVisibleLines(lines), 0);
      }
      return;
    }

    // Reset case
    if (lines.length === 0 || lines.length < visibleLines.length) {
      setVisibleLines(lines);
      return;
    }

    // Fast animation for new lines
    if (lines.length > visibleLines.length) {
      const nextLine = lines[visibleLines.length];
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, nextLine]);
      }, 100); // Fast typing speed
      return () => clearTimeout(timer);
    }
  }, [lines, animate, visibleLines.length]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
        </div>
        <div className="terminal-title">{title}</div>
      </div>
      <div className="terminal-body" ref={containerRef}>
        {visibleLines.map((line, i) => (
          <div key={i} className="terminal-line">
            {line.startsWith(">") ? (
              <span className="terminal-prompt-line">
                <span className="terminal-prompt">
                  {user}@{hostname}:~$
                </span>{" "}
                {line.substring(1)}
              </span>
            ) : (
              <span className={getLineClass(line)}>{line}</span>
            )}
          </div>
        ))}
        {animate && visibleLines.length < lines.length && (
          <div className="terminal-cursor">█</div>
        )}
      </div>
    </div>
  );
}

function getLineClass(line: string) {
  if (line.includes("✓") || line.toLowerCase().includes("complete") || line.toLowerCase().includes("established")) {
    return "text-accent";
  }
  if (line.includes("[you]") || line.includes("you:")) {
    return "text-actor-a";
  }
  if (line.includes("[") && line.includes("]")) {
    return "text-actor-b";
  }
  if (line.includes("error") || line.includes("!")) {
    return "text-tertiary";
  }
  return "";
}
