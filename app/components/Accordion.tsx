"use client";

import { useState, type ReactNode } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-0">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              className="accordion-trigger"
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
              id={`accordion-trigger-${item.id}`}
            >
              <span>{item.title}</span>
              <svg
                className="accordion-chevron"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isOpen && (
              <div
                id={`accordion-${item.id}`}
                role="region"
                aria-labelledby={`accordion-trigger-${item.id}`}
                className="accordion-content"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
