"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "../projects";
import { FONT_SANS, FONT_SERIF, C } from "../theme";

function useIST() {
  const [time, setTime] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Calcutta" })
      );
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();
      const day = now.getDay();
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      const pad = (n: number) => n.toString().padStart(2, "0");
      setTime(`${h12}:${pad(m)}:${pad(s)} ${ampm} IST`);

      const weekday = day >= 1 && day <= 5;
      const saturday = day === 6;
      const mins = h * 60 + m;
      setIsOnline(
        (weekday && mins >= 540 && mins <= 1050) ||
          (saturday && mins >= 600 && mins <= 840)
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { time, isOnline };
}

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

export default function WorksPage() {
  const { time, isOnline } = useIST();
  const scrolled = useScrolled(80);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: C.bg, color: C.text, fontFamily: FONT_SANS }}
    >
      {/* ──────────── NAV ───────��──── */}
      <div
        className="sticky top-0 z-50 w-full px-6 transition-all duration-500"
        style={{ paddingTop: scrolled ? "10px" : "0px" }}
      >
        <nav
          className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto transition-all duration-500"
          style={{
            backgroundColor: scrolled
              ? "rgba(240, 235, 229, 0.97)"
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
              className="text-sm tracking-[0.2em] transition-colors duration-500"
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: "italic",
                color: scrolled ? C.bg : C.text,
              }}
            >
              Varun Agrawal
            </Link>
            <div className="hidden md:flex items-center gap-1 text-sm">
              <Link
                href="/works"
                className="px-3 py-1 transition-colors duration-300"
                style={{ color: scrolled ? C.bg : C.accent }}
              >
                Work
              </Link>
              <span style={{ color: scrolled ? "#ccc" : C.textDim }}>|</span>
              <Link
                href="/#approach"
                className="px-3 py-1 transition-colors duration-300"
                style={{ color: scrolled ? C.textDim : C.textMuted }}
              >
                Approach
              </Link>
              <span style={{ color: scrolled ? "#ccc" : C.textDim }}>|</span>
              <Link
                href="/contact"
                className="px-3 py-1 transition-colors duration-300"
                style={{ color: scrolled ? C.textDim : C.textMuted }}
              >
                Contact
              </Link>
            </div>
          </div>
          <Link
            href="/contact"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 border text-sm transition-all duration-500"
            style={{
              borderColor: scrolled ? C.accentMuted : C.borderLight,
              borderRadius: scrolled ? "8px" : "2px",
              color: scrolled ? C.bg : C.accent,
            }}
          >
            Let&apos;s Work Together
          </Link>
        </nav>
      </div>

      {/* ──────────── HEADER ───────────�� */}
      <section className="px-6 pt-12 lg:pt-20 pb-8">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-300 mb-10"
            style={{ color: C.textMuted }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1
            className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] mb-3"
            style={{ fontFamily: FONT_SERIF, color: C.text }}
          >
            All Projects
          </h1>
          <p className="text-base max-w-[600px]" style={{ color: C.textMuted }}>
            A collection of projects spanning AI talent infrastructure,
            governance research, and technical recruiting systems.
          </p>
        </div>
      </section>

      {/* ────��─────── SEPARATOR ───���──────── */}
      <div className="w-full border-t" style={{ borderColor: C.border }} />

      {/* ──────────── PROJECT TABLE ──────────── */}
      <section className="px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Table header */}
          <div
            className="hidden md:grid grid-cols-[1fr_1fr_120px_100px] gap-6 px-4 py-3 text-xs uppercase tracking-[0.15em] border-b"
            style={{ borderColor: C.border, color: C.textDim }}
          >
            <span>Project</span>
            <span>Stack</span>
            <span>Key Metric</span>
            <span className="text-right">Year</span>
          </div>

          {/* Rows */}
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_100px] gap-3 md:gap-6 px-4 py-6 border-b transition-all duration-300"
                style={{
                  borderColor: C.border,
                  backgroundColor:
                    hoveredIdx === i ? `${C.accent}08` : "transparent",
                }}
              >
                {/* Project name + description */}
                <div>
                  <h3
                    className="text-base mb-1 transition-colors duration-300"
                    style={{ fontFamily: FONT_SERIF, color: hoveredIdx === i ? C.accent : C.text }}
                  >
                    {project.name}
                    <span
                      className="inline-block ml-2 transition-all duration-300"
                      style={{
                        color: hoveredIdx === i ? C.accent : C.textDim,
                        transform: hoveredIdx === i ? "translateX(4px)" : "none",
                      }}
                    >
                      &rarr;
                    </span>
                  </h3>
                  <p className="text-sm leading-relaxed line-clamp-1" style={{ color: C.textDim }}>
                    {project.cardDescription}
                  </p>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 items-start">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs border rounded transition-colors duration-300"
                      style={{
                        borderColor:
                          hoveredIdx === i ? C.borderLight : C.border,
                        color: C.textMuted,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2.5 py-1 text-xs" style={{ color: C.textDim }}>
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Key metric */}
                <div className="flex items-center">
                  <span
                    className="text-lg font-semibold"
                    style={{ color: C.accent }}
                  >
                    {project.cardStat}
                  </span>
                </div>

                {/* Year placeholder */}
                <div className="flex items-center md:justify-end">
                  <span className="text-sm" style={{ color: C.textDim }}>2024</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ──────────── SEPARATOR ��─────────── */}
      <div className="w-full border-t" style={{ borderColor: C.border }} />

      {/* ──────────── FOOTER ──────────��─ */}
      <footer className="px-6" id="contact">
        <div
          className="py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b"
          style={{ borderColor: C.border }}
        >
          <p className="text-sm" style={{ color: C.textDim }}>
            &copy; 2026&ensp;Varun Agrawal. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm" style={{ color: C.textMuted }}>
            <a href="mailto:hello@varunagrawal.com" className="transition-colors duration-300 hover:opacity-80">
              Email
            </a>
            <a href="https://www.linkedin.com/in/varun-agrawal-b3367a31/" className="transition-colors duration-300 hover:opacity-80">
              LinkedIn
            </a>
            <a href="https://varunagrawal.com" className="transition-colors duration-300 hover:opacity-80">
              varunagrawal.com
            </a>
          </div>
        </div>

        <div className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: isOnline ? C.accent : C.textDim }}
                />
                <span style={{ color: C.text }}>
                  ({isOnline ? "Online" : "Offline"})
                </span>
              </span>
              <span style={{ color: C.textMuted }}>Now, {time}</span>
            </div>
          </div>
          <div className="text-sm lg:text-right space-y-1" style={{ color: C.textMuted }}>
            <p>Based in Bengaluru,</p>
            <p>India</p>
            <p className="mt-2" style={{ color: C.textDim }}>12.96&deg; N, 77.57&deg; E</p>
          </div>
        </div>

        <div className="py-4 text-center">
          <p className="text-xs tracking-[0.1em]" style={{ color: C.borderLight }}>
            Design courtesy{" "}
            <a
              href="https://www.harrygeorge.design/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors duration-300 hover:opacity-80"
              style={{ color: C.textDim }}
            >
              Harry George
            </a>
          </p>
        </div>

        <div className="py-8 overflow-hidden">
          <p
            className="text-[clamp(5rem,18vw,16rem)] leading-none tracking-[-0.02em] whitespace-nowrap select-none"
            style={{ fontFamily: FONT_SERIF, fontStyle: "italic", color: C.border }}
          >
            Varun Agrawal
          </p>
        </div>
      </footer>
    </div>
  );
}
