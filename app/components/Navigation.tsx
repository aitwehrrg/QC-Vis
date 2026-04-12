"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_SECTIONS } from "@/app/lib/constants";
import { ThemeToggle } from "./ThemeProvider";

export default function Navigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Determine active item based on pathname and hash
  useEffect(() => {
    const hash = window.location.hash;
    
    // Default active section matches pathname
    let matched = NAV_SECTIONS.find(
      (s) => s.route === pathname || s.route === `${pathname}${hash}`
    );
    
    // If it's a root hash link and we have a hash, favor that
    if (pathname === "/" && hash) {
      matched = NAV_SECTIONS.find((s) => s.route === `/${hash}`);
    } else if (!hash) {
      matched = NAV_SECTIONS.find((s) => s.route === pathname);
    }
    
    if (matched) {
      setActiveSection(matched.id);
    }
  }, [pathname]);

  // Scroll spy for slash hash routing on the current page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 border-b"
        style={{
          background: "var(--bg)",
          borderColor: "var(--border-subtle)",
          backdropFilter: "blur(8px)",
          backgroundColor: "color-mix(in srgb, var(--bg) 85%, transparent)",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-sm tracking-tight"
            style={{ color: "var(--fg)" }}
            onClick={() => setMobileOpen(false)}
          >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="28" height="28" rx="4" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
            <circle cx="8" cy="8" r="2" fill="var(--accent)" />
            <circle cx="16" cy="8" r="2" fill="var(--accent)" />
            <circle cx="24" cy="8" r="2" fill="var(--accent)" />
            <circle cx="8" cy="16" r="2" fill="var(--accent)" />
            <circle cx="16" cy="16" r="2.5" fill="var(--accent)" />
            <circle cx="24" cy="16" r="2" fill="var(--accent)" />
            <circle cx="8" cy="24" r="2" fill="var(--accent)" />
            <circle cx="16" cy="24" r="2" fill="var(--accent)" />
            <circle cx="24" cy="24" r="2" fill="var(--accent)" />
            <line x1="8" y1="8" x2="16" y2="16" stroke="var(--accent)" strokeWidth="0.75" opacity="0.5" />
            <line x1="24" y1="8" x2="16" y2="16" stroke="var(--accent)" strokeWidth="0.75" opacity="0.5" />
            <line x1="8" y1="24" x2="16" y2="16" stroke="var(--accent)" strokeWidth="0.75" opacity="0.5" />
            <line x1="24" y1="24" x2="16" y2="16" stroke="var(--accent)" strokeWidth="0.75" opacity="0.5" />
          </svg>
            <span>QC-Vis</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_SECTIONS.map(({ id, label, route }) => (
              <Link
                key={id}
                href={route}
                className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
                style={{
                  color: activeSection === id ? "var(--accent)" : "var(--muted)",
                  background: activeSection === id ? "var(--accent-muted)" : "transparent",
                }}
              >
                {label}
              </Link>
            ))}
            <div className="ml-2 border-l pl-2" style={{ borderColor: "var(--border-subtle)" }}>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sim-btn"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-out panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed right-0 top-0 bottom-0 w-64 p-6 flex flex-col gap-1 border-l"
            style={{ background: "var(--surface)", borderColor: "var(--border-subtle)" }}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="sim-btn"
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {NAV_SECTIONS.map(({ id, label, route }) => (
              <Link
                key={id}
                href={route}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"
                style={{
                  color: activeSection === id ? "var(--accent)" : "var(--fg)",
                  background: activeSection === id ? "var(--accent-muted)" : "transparent",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Spacer for fixed nav */}
      <div className="h-14" aria-hidden="true" />
    </>
  );
}
