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

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
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
