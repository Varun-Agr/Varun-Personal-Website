"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "../projects";
import Navbar from "../components/Navbar";

const FONT = "var(--font-google-sans), sans-serif";

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

      const monToSat = day >= 1 && day <= 6;
      const mins = h * 60 + m;
      setIsOnline(monToSat && mins >= 540 && mins <= 1260);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { time, isOnline };
}

export default function WorksPage() {
  const { time, isOnline } = useIST();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen text-[#e5e5e5] relative"
      style={{ backgroundColor: "#141414", fontFamily: FONT }}
    >
      <Navbar activePage="work" />

      {/* ──────────── HEADER ──────────── */}
      <section className="px-6 pt-12 lg:pt-20 pb-8">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors duration-300 mb-10"
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
            className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white font-medium mb-3"
            style={{ fontFamily: FONT }}
          >
            All Projects
          </h1>
          <p className="text-[#888] text-base max-w-[600px]">
            AI talent mapping, sourcing pipelines, tooling for recruiting operations and reports tracking AI developments.
          </p>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: "#222" }} />

      {/* ──────────── PROJECT TABLE ──────────── */}
      <section className="px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Table header */}
          <div
            className="hidden md:grid grid-cols-[108px_1fr_1fr_100px] gap-6 px-4 py-3 text-xs text-[#555] uppercase tracking-[0.15em] border-b"
            style={{ borderColor: "#2a2a2a" }}
          >
            <span>Preview</span>
            <span>Project</span>
            <span>Stack</span>
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
                className="grid grid-cols-1 md:grid-cols-[108px_1fr_1fr_100px] gap-3 md:gap-6 px-4 py-6 border-b transition-all duration-300 items-center"
                style={{
                  borderColor: "#2a2a2a",
                  backgroundColor:
                    hoveredIdx === i ? "rgba(255,255,255,0.03)" : "transparent",
                }}
              >
                {/* Preview thumbnail */}
                <div
                  className="relative w-[108px] h-[81px] rounded overflow-hidden flex-shrink-0 border"
                  style={{
                    background: project.cardGradient,
                    borderColor:
                      hoveredIdx === i ? "#444" : "#2a2a2a",
                    transition: "border-color 0.3s",
                  }}
                >
                  {project.cardImage?.length ? (
                    <img
                      src={project.cardImage[0]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-contain p-1.5"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold tracking-wider"
                      style={{ color: project.cardAccent }}
                    >
                      {project.name
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </div>
                  )}
                </div>

                {/* Project name + description */}
                <div>
                  <h3
                    className="text-white text-base font-medium mb-1 group-hover:text-[#4ade80] transition-colors duration-300"
                    style={{ fontFamily: FONT }}
                  >
                    {project.name}
                    <span className="inline-block ml-2 text-[#444] group-hover:text-[#4ade80] group-hover:translate-x-1 transition-all duration-300">
                      &rarr;
                    </span>
                  </h3>
                  <p className="text-[#666] text-sm leading-relaxed line-clamp-1">
                    {project.cardDescription}
                  </p>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 items-start">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs text-[#888] border rounded transition-colors duration-300"
                      style={{
                        borderColor:
                          hoveredIdx === i ? "#444" : "#2a2a2a",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2.5 py-1 text-xs text-[#555]">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Key metric */}
                {/*<div className="flex items-center">
                  <span
                    className="text-lg font-semibold"
                    style={{ color: project.cardAccent }}
                  >
                    {project.cardStat}
                  </span>
                </div>*/}

                {/* Year placeholder */}
                <div className="flex items-center md:justify-end">
                  <span className="text-[#555] text-sm">{project.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: "#222" }} />

      {/* ──────────── FOOTER ──────────── */}
      <footer className="px-6" id="contact">
        <div
          className="py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b"
          style={{ borderColor: "#2a2a2a" }}
        >
          <p className="text-[#666] text-sm">
            &copy; 2026&ensp;Varun Agrawal. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-[#888]">
            <a
              href="mailto:hello@varunagrawal.com"
              className="hover:text-white transition-colors duration-300"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/varun-agrawal-b3367a31/"
              className="hover:text-white transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://varunagrawal.com"
              className="hover:text-white transition-colors duration-300"
            >
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
                  style={{ backgroundColor: isOnline ? "#4ade80" : "#666" }}
                />
                <span className="text-white">
                  ({isOnline ? "Online" : "Offline"})
                </span>
              </span>
              <span className="text-[#999]">Now, {time}</span>
            </div>
          </div>
          <div className="text-sm text-[#888] lg:text-right space-y-1">
            <p>Based in India</p>
            <p className="text-[#666] mt-2 hidden md:block">12.96&deg; N, 77.57&deg; E</p>
          </div>
        </div>

        <div className="py-4 text-center">
          <p className="text-[#444] text-xs tracking-[0.1em]">
            Design courtesy{" "}
            <a
              href="https://www.harrygeorge.design/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666] hover:text-white transition-colors duration-300 underline underline-offset-2"
            >
              Harry George
            </a>
          </p>
        </div>

        <div className="py-8 overflow-hidden">
          <p
            className="text-[clamp(5rem,18vw,16rem)] leading-none font-bold tracking-[-0.02em] text-[#2a2a2a] whitespace-nowrap select-none"
            style={{ fontFamily: FONT }}
          >
            Varun Agrawal
          </p>
        </div>
      </footer>
    </div>
  );
}
