"use client";

import { useState, useCallback, useRef } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language = "bash",
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const isTerminal = filename?.toLowerCase().includes("terminal") || 
                     filename?.toLowerCase().includes("demo") || 
                     filename?.toLowerCase().includes("benchmarks") ||
                     language === "bash" || 
                     language === "plaintext";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  const lines = code.split("\n");

  if (isTerminal) {
    return (
      <div className="terminal-window my-6">
        <div className="terminal-header">
          <div className="terminal-controls">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
          </div>
          <div className="terminal-title">{filename || "terminal"}</div>
          <button
            onClick={handleCopy}
            className="ml-auto opacity-50 hover:opacity-100 transition-opacity"
            aria-label={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
        <div className="terminal-body">
          {lines.map((line, i) => (
            <div key={i} className="terminal-line">
              {line.startsWith("$") || line.startsWith(">") || line.startsWith("#") ? (
                <span className="terminal-prompt-line">
                  <span className="terminal-prompt">{line.charAt(0)}</span> {line.substring(2)}
                </span>
              ) : (
                <span className={getLineClass(line)}>{line}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span>{filename || language}</span>
        <button
          onClick={handleCopy}
          className={`copy-btn ${copied ? "copied" : ""}`}
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="code-block-content">
        <code>
          {showLineNumbers
            ? lines.map((line, i) => (
                <span key={i} className="block">
                  <span
                    className="inline-block w-8 text-right mr-4 select-none"
                    style={{ color: "var(--muted)", opacity: 0.5 }}
                  >
                    {i + 1}
                  </span>
                  {line}
                </span>
              ))
            : code}
        </code>
      </pre>
    </div>
  );
}

function getLineClass(line: string) {
  if (line.includes("✓") || line.toLowerCase().includes("complete") || line.toLowerCase().includes("established") || line.toLowerCase().includes("[ok]")) {
    return "text-accent";
  }
  if (line.includes("[you]") || line.includes("you:")) {
    return "text-actor-a";
  }
  if (line.includes("[") && line.includes("]")) {
    return "text-actor-b font-medium";
  }
  if (line.includes("error") || line.includes("!")) {
    return "text-tertiary";
  }
  return "";
}
