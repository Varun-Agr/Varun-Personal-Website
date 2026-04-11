"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FONT_SANS, C } from "../theme";

function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

export default function Navbar({ activePage }: { activePage?: "work" | "approach" | "contact" | "events" }) {
  const scrolled = useScrolled(80);
  const [menuOpen, setMenuOpen] = useState(false);

  const linkColor = (page?: string) => {
    if (page === activePage) return scrolled ? C.bg : C.accent;
    return scrolled ? C.textDim : C.textMuted;
  };

  return (
    <div
      className="sticky top-0 z-50 w-full px-6 transition-all duration-500"
      style={{ paddingTop: scrolled ? "10px" : "0px" }}
    >
      <nav
        className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.97)"
            : `${C.bg}ee`,
          backdropFilter: "blur(12px)",
          borderRadius: scrolled ? "12px" : "0px",
          boxShadow: scrolled
            ? "0 4px 30px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)"
            : "none",
          borderBottom: scrolled ? "none" : `1px solid ${C.border}`,
        }}
      >
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.2em] transition-colors duration-500"
            style={{
              fontFamily: FONT_SANS,
              color: scrolled ? C.bg : C.text,
            }}
          >
            Varun Agrawal
          </Link>
          <div className="hidden md:flex items-center gap-1 text-sm">
            <Link
              href="/works"
              className="px-3 py-1 transition-colors duration-300"
              style={{ color: linkColor("work") }}
            >
              Projects
            </Link>
            <span aria-hidden="true" style={{ color: scrolled ? "#ccc" : C.textDim }}>|</span>
            <Link
              href="/#approach"
              className="px-3 py-1 transition-colors duration-300"
              style={{ color: linkColor("approach") }}
            >
              Approach
            </Link>
            <span aria-hidden="true" style={{ color: scrolled ? "#ccc" : C.textDim }}>|</span>
            <Link
              href="/events"
              className="px-3 py-1 transition-colors duration-300"
              style={{ color: linkColor("events") }}
            >
              Events
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/contact#companies"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 border text-sm transition-all duration-300"
            style={{
              borderColor: scrolled ? C.accentMuted : C.borderLight,
              borderRadius: scrolled ? "8px" : "2px",
              color: scrolled ? C.bg : C.accent,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.accent; e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = scrolled ? "#fff" : C.bg; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; e.currentTarget.style.borderColor = scrolled ? C.accentMuted : C.borderLight; e.currentTarget.style.color = scrolled ? C.bg : C.accent; }}
          >
            Fill A Role
          </Link>
          <Link
            href="/contact#talent"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 border text-sm transition-all duration-300"
            style={{
              borderColor: scrolled ? C.accentMuted : C.borderLight,
              borderRadius: scrolled ? "8px" : "2px",
              color: scrolled ? C.bg : C.accent,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.accent; e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = scrolled ? "#fff" : C.bg; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; e.currentTarget.style.borderColor = scrolled ? C.accentMuted : C.borderLight; e.currentTarget.style.color = scrolled ? C.bg : C.accent; }}
          >
            Get Placed
          </Link>
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-[2px] transition-all duration-300 origin-center"
              style={{
                backgroundColor: scrolled ? C.bg : C.text,
                transform: menuOpen ? "rotate(45deg) translate(2.5px, 2.5px)" : "none",
              }}
            />
            <span
              className="block w-5 h-[2px] transition-all duration-300"
              style={{
                backgroundColor: scrolled ? C.bg : C.text,
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-[2px] transition-all duration-300 origin-center"
              style={{
                backgroundColor: scrolled ? C.bg : C.text,
                transform: menuOpen ? "rotate(-45deg) translate(2.5px, -2.5px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>
      {/* Mobile menu dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 max-w-[1400px] mx-auto"
        style={{
          maxHeight: menuOpen ? "300px" : "0px",
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.97)"
            : `${C.bg}f7`,
          borderBottom: menuOpen ? `1px solid ${C.border}` : "none",
        }}
      >
        <div className="flex flex-col px-6 py-4 gap-3">
          <Link
            href="/works"
            className="text-sm py-2 transition-colors duration-300"
            style={{ color: linkColor("work") }}
            onClick={() => setMenuOpen(false)}
          >
            Work
          </Link>
          <Link
            href="/#approach"
            className="text-sm py-2 transition-colors duration-300"
            style={{ color: linkColor("approach") }}
            onClick={() => setMenuOpen(false)}
          >
            Approach
          </Link>
          <Link
            href="/events"
            className="text-sm py-2 transition-colors duration-300"
            style={{ color: linkColor("events") }}
            onClick={() => setMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/contact#companies"
            className="text-sm py-2 transition-colors duration-300"
            style={{ color: linkColor("contact") }}
            onClick={() => setMenuOpen(false)}
          >
            Hire Through Me
          </Link>
          <Link
            href="/contact#talent"
            className="text-sm py-2 transition-colors duration-300"
            style={{ color: linkColor("contact") }}
            onClick={() => setMenuOpen(false)}
          >
            Get Placed
          </Link>
          <Link
            href="/works"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border text-sm mt-1 transition-all duration-300"
            style={{
              borderColor: C.borderLight,
              borderRadius: "2px",
              color: scrolled ? C.bg : C.accent,
            }}
            onClick={() => setMenuOpen(false)}
          >
            View All Work
          </Link>
        </div>
      </div>
    </div>
  );
}
