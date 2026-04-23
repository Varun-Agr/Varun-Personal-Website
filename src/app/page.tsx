"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { projects } from "./projects";
import Navbar from "./components/Navbar";
import PipelinesBackground from "./components/PipelinesBackground";

const CAROUSEL_SLUGS = [
  "ai-candidate-screening-pipeline",
  "talent-index-jd-fingerprinting",
  "talent-graph-engine",
// "measuremint",
  "big-tech-layoff-monitor",
  "india-ai-report",
  // "ml-research-talent-map",
  // "recruiting-data-infrastructure",
];

/* ─────────────────────────── helpers ─────────────────────────── */

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

/* ─── shooting star trail ─── */

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

function useTronTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail = useRef<TrailPoint[]>([]);
  const animFrame = useRef<number>(0);
  const MAX_POINTS = 80;
  const MAX_AGE = 55; // frames to fade

  const onMouseMove = useCallback((e: MouseEvent) => {
    trail.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    if (trail.current.length > MAX_POINTS) {
      trail.current.shift();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // age points and remove dead ones
      for (const p of trail.current) p.age++;
      trail.current = trail.current.filter((p) => p.age < MAX_AGE);

      const points = trail.current;
      if (points.length < 2) {
        animFrame.current = requestAnimationFrame(animate);
        return;
      }

      // draw the tron line trail
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const progress = i / points.length; // 0 = old tail, 1 = fresh head
        const alpha = progress * Math.max(0, 1 - p1.age / MAX_AGE);

        if (alpha <= 0) continue;

        const width = progress * 2.5;

        // glow layer
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `hsla(0, 0%, 80%, ${alpha * 0.3})`;
        ctx.lineWidth = width + 6;
        ctx.lineCap = "round";
        ctx.stroke();

        // core line
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `hsla(0, 0%, 90%, ${alpha * 0.8})`;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.stroke();

        // bright center
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `hsla(0, 0%, 100%, ${alpha})`;
        ctx.lineWidth = Math.max(0.5, width * 0.4);
        ctx.lineCap = "round";
        ctx.stroke();
      }

      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrame.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  return canvasRef;
}

/* ─── animate on scroll ─── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ─────────────────────────── page ─────────────────────────────── */

const FONT = "var(--font-google-sans), sans-serif";

export default function ClonePage() {
  const { time, isOnline } = useIST();
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const carouselProjects = CAROUSEL_SLUGS.map((s) => projects.find((p) => p.slug === s)!);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(0);
  const [hoveredConf, setHoveredConf] = useState<number | null>(null);
  const canvasRef = useTronTrail();
  const displayText = useScrollReveal();
  const approachLeft = useScrollReveal();
  const approachRight = useScrollReveal();

  const accordionItems = [
    {
      title: "Talent Sourcing & Intelligence",
      content:
        "Built a 50,000-profile ML research talent map from 5 years of ICLR/ICML/CVPR proceedings. Harvested 100+ data sources — conferences, Olympiads, GitHub, Codeforces — into an 80K-record dataset at >90% accuracy. Vector embeddings for candidate matching, weighted scoring across 10 skill dimensions.",
    },
    {
      title: "Technical Recruiting",
      content:
        "Scaled a recruiting funnel from scratch to 4,200 warm ML, SWE, and Quant candidates across 5 continents, while directing a 30-person distributed team that cut time-to-offer from 65 to 30 days and cost-per-hire by 27%. Partnered with hiring managers at 13+ organizations to scope roles, calibrate bars, and close 26 offers across FAR.AI, UK AISI, and Apollo — securing 12 accepted placements.",
    },
    {
      title: "Trustworthy AI Science",
      content:
        "Co-founded Secure AI Futures Lab with $250K+ via Schmidt Sciences and AI Security Tactical Opportunities Fund. Convening government, academia, and industry across India and APAC. Partnering with IITs and IISc on AI for Science, Social Good, and Trustworthy AI.",
    },
    {
      title: "Building Tools",
      content:
        "Managed the development of an AI evaluation pipeline (Claude API + Airtable) scoring candidates across 20+ binary signals with tri-verdict logic. Leading product for Measuremint — a voice-first career agent using ElevenLabs + Claude for AI interviews.",
    },
  ];

  const currentLogos = [
    { name: "UK AISI", icon: "/images/logos/aisi.png" },
    { name: "FAR.AI", icon: "/images/logos/farai.svg" },
    { name: "Apollo Research", icon: "/images/logos/apollo.png" },
    { name: "World Bank", icon: "/images/logos/worldbank.png" },
    { name: "J-PAL", icon: "/images/logos/jpal.png" },
    { name: "Schmidt Sciences", icon: "/images/logos/ss.png" },
  ];

  return (
    <div
      className="min-h-screen text-[#e5e5e5] relative"
      style={{ backgroundColor: "#141414", fontFamily: FONT }}
    >
      {/* Shooting star trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
      />

      <Navbar />

      {/* ──────────── HERO + BIO with network underlay ──────────── */}
      <div className="relative overflow-hidden">
        <PipelinesBackground />

        {/* Hero headline */}
        <section className="px-6 pt-16 pb-12 lg:pt-24 lg:pb-16 relative z-10" id="work">
          <div className="max-w-[90%] mx-auto">
            <h1
              className="text-[clamp(1.8rem,4.5vw,3.2rem)] leading-[1.15] tracking-[-0.02em] text-white max-w-full lg:max-w-[75%] mb-0 font-medium"
              style={{ fontFamily: FONT }}
            >
              {/*Technical Recruiter <span className="text-[#555]">&</span> AI Governance Builder sourcing top 1% STEM talent for frontier AI labs*/}
              {/*I build talent pipelines and recruiting tools for leading AI organisations, helping them hire top researchers, engineers, and generalists tackling the most consequential problems.*/}
              I build <span className="text-[#4ade80]">talent pipelines</span> and recruiting tools — and lead the teams that run them —
              for leading AI organisations <span className="text-[#4ade80]">hiring top researchers</span>,
              engineers, and generalists tackling the <span className="text-[#4ade80]">most consequential problems</span>.
            </h1>
          </div>
        </section>

        {/* Bio + status */}
        <section className="px-6 py-12 lg:py-16 relative z-10">
          <div className="max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: hero animation caption, aligned with Co-CEO row */}
            <div className="flex flex-col gap-6 max-w-[420px]">
              <div className="text-sm invisible select-none" aria-hidden="true">
                spacer
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#666] text-xs tracking-[0.15em] uppercase">
                  A Note On The Background
                </p>
                <p className="text-[#777] text-sm leading-relaxed">
                  The network is the core data structure of our talent graph -
                  researchers, labs, and affiliations as nodes.
                  <br />
                  Graph-theoretic algorithms - centrality, shortest path,
                  embeddings — traverse it to surface the right candidates.
                </p>
              </div>
            </div>
            {/* Right: existing bio */}
            <div className="flex flex-col gap-6 max-w-[600px] ml-auto">
              <div className="flex items-center gap-3 text-sm text-[#999]">
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: isOnline ? "#4ade80" : "#666" }}
                  />
                  <span className="text-white">({isOnline ? "Online" : "Offline"})</span>
                </span>
                <span>Now, {time}</span>
              </div>

              <p className="text-[#aaa] text-base leading-relaxed">
                Co-CEO at <a href="https://steadrise.org" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#4ade80] transition-colors duration-300">SteadRise</a>.
                <br />
                Co-Founder of <a href="https://secureaifutureslab.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#4ade80] transition-colors duration-300">Secure AI Futures Lab</a>.
                <br />
                <br />
                8+ years sourcing and placing researchers and engineers
                across AI, ML, and deep-tech — including UK AISI, FAR.AI,
                and Apollo Research — and running the ops and distributed
                teams behind the search.
              </p>

              <div className="flex flex-wrap gap-3 mt-2">
                <a
                  href="/contact"
                  className="flex items-center gap-2 px-5 py-2.5 border text-sm text-white hover:bg-white hover:text-[#141414] transition-all duration-300"
                  style={{ borderColor: "#444", borderRadius: "2px" }}
                >
                  <span className="text-xs">&#x21a6;</span>
                  Let's Talk!
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ──────────── PROJECT ACCORDION CAROUSEL ──────────── */}
      <section className="px-6 pb-16 lg:pb-24">
        <div className="max-w-[90%] mx-auto">
          <h2
            className="text-[clamp(1.2rem,2vw,1.5rem)] font-medium text-white mb-8 tracking-[-0.01em]"
            style={{ fontFamily: FONT }}
          >
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 rounded-xl overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
            {/* Left: accordion selector */}
            <div className="flex flex-col">
              {carouselProjects.map((p, i) => {
                const isSelected = selectedProjectIdx === i;
                return (
                  <div
                    key={p.slug}
                    className="border-b last:border-b-0"
                    style={{ borderColor: "#2a2a2a" }}
                  >
                    <button
                      onClick={() => setSelectedProjectIdx(i)}
                      className="w-full flex items-start justify-between px-4 sm:px-8 py-4 sm:py-5 text-left group transition-colors duration-200"
                      style={{ backgroundColor: isSelected ? "#222" : "transparent" }}
                    >
                      <div className="flex-1 pr-4">
                        <span
                          className="text-base leading-snug block"
                          style={{
                            fontFamily: FONT,
                            color: isSelected ? "#fff" : "#999",
                            transition: "color 0.2s",
                          }}
                        >
                          {p.cardTitle}
                        </span>
                        <div
                          className="overflow-hidden transition-all duration-300"
                          style={{
                            maxHeight: isSelected ? "200px" : "0",
                            opacity: isSelected ? 1 : 0,
                          }}
                        >
                          <p className="text-[#888] text-sm leading-relaxed mt-3">
                            {p.cardDescription}
                          </p>
                          <Link
                            href={`/work/${p.slug}`}
                            className="inline-flex items-center gap-2 text-sm text-[#4ade80] mt-3 hover:gap-3 transition-all duration-300"
                          >
                            View Project &rarr;
                          </Link>
                        </div>
                      </div>
                      <span
                        className="text-xl mt-0.5 flex-shrink-0 transition-transform duration-300"
                        style={{
                          color: isSelected ? "#fff" : "#555",
                          transform: isSelected ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        +
                      </span>
                    </button>
                  </div>
                );
              })}
              {/* View all row */}
              <div style={{ borderColor: "#2a2a2a" }}>
                <Link
                  href="/works"
                  className="w-full flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 text-left group transition-colors duration-200 hover:bg-[#222]"
                >
                  <span className="text-sm text-[#4ade80]" style={{ fontFamily: FONT }}>
                    View All Projects &rarr;
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: project image */}
            <div
              className="relative flex items-center justify-center p-6 sm:p-8 lg:p-12 min-h-[200px] sm:min-h-[300px] lg:min-h-[500px]"
              style={{
                background: carouselProjects[selectedProjectIdx]?.cardGradient || "#1e1e1e",
                transition: "background 0.5s ease",
              }}
            >
              {carouselProjects[selectedProjectIdx]?.cardImage?.length ? (
                <img
                  key={selectedProjectIdx}
                  src={carouselProjects[selectedProjectIdx].cardImage![0]}
                  alt={carouselProjects[selectedProjectIdx].name}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain animate-[fadeIn_0.4s_ease]"
                />
              ) : (
                <div className="text-center space-y-3 animate-[fadeIn_0.4s_ease]" key={selectedProjectIdx}>
                  <div className="text-3xl sm:text-5xl font-bold text-white/20">
                    {carouselProjects[selectedProjectIdx]?.cardStat}
                  </div>
                  <div className="text-xs text-white/30 tracking-widest uppercase">
                    {carouselProjects[selectedProjectIdx]?.cardStatLabel}
                  </div>
                  <div className="flex gap-2 justify-center mt-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `${carouselProjects[selectedProjectIdx]?.cardAccent}66` }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `${carouselProjects[selectedProjectIdx]?.cardAccent}40` }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `${carouselProjects[selectedProjectIdx]?.cardAccent}26` }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: "#222" }} />

      {/* ──────────── DISPLAY TEXT ──────────── */}
      <section className="px-6 py-20 lg:py-32">
        <div
          ref={displayText.ref}
          className="max-w-[1400px] mx-auto transition-all duration-700"
          style={{
            opacity: displayText.visible ? 1 : 0,
            transform: displayText.visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <p
            className="text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.2] tracking-[-0.015em] text-[#ccc]"
            style={{ fontFamily: FONT }}
          >
            I build recruiting infrastructure — talent maps, screening
            pipelines, sourcing tools — and lead the teams that run them, so that{" "}
            <span className="text-[#4ade80]">the right candidates surface faster</span>,
            and the hiring teams can{" "}
            <span className="text-[#4ade80]">spend time evaluating, not searching</span>.
            
          </p>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: "#222" }} />

      {/* ──────────── APPROACH ──────────── */}
      <section className="px-6 py-20 lg:py-28" id="approach">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          {/* Left: text */}
          <div
            ref={approachLeft.ref}
            className="space-y-6 transition-all duration-700"
            style={{
              opacity: approachLeft.visible ? 1 : 0,
              transform: approachLeft.visible ? "translateY(0)" : "translateY(40px)",
            }}
          >
            <p className="text-[#aaa] text-base leading-relaxed">
              Sourcing researchers and engineers for teams building reliable AI systems
              — start with the talent map, build the pipeline, calibrate the bar, close the offer.
              Running the ops and the distributed team behind it end-to-end.
            </p>
            <p className="text-[#aaa] text-base leading-relaxed">
              The work spans data-driven sourcing, RecOps infrastructure,
              and the tools that tie it together — 50K-profile
              talent maps, LLM-assisted candidate triage, JD fingerprinting.
              Alongside it, leading a 30-person distributed team and the
              stakeholder alignment that keeps searches on-roadmap.
              Most of my time goes into making recruiting pipelines
              more systematic and less manual.
            </p>
            
            
            
            {/*<a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 border text-sm text-white hover:bg-white hover:text-[#141414] transition-all duration-300 mt-2"
              style={{ borderColor: "#444", borderRadius: "2px" }}
            >
              <span className="/work">&#x21a6;</span>
              View Projects
            </a>*/}
          </div>

          {/* Right: accordion */}
          <div
            ref={approachRight.ref}
            className="divide-y transition-all duration-700 delay-200"
            style={{
              borderColor: "#2a2a2a",
              opacity: approachRight.visible ? 1 : 0,
              transform: approachRight.visible ? "translateY(0)" : "translateY(40px)",
            }}
          >
            {accordionItems.map((item, i) => (
              <div
                key={item.title}
                className="border-b"
                style={{ borderColor: "#2a2a2a" }}
              >
                {i === 0 && (
                  <div className="border-t" style={{ borderColor: "#2a2a2a" }} />
                )}
                <button
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span
                    className="text-white text-base"
                    style={{ fontFamily: FONT, letterSpacing: "0.02em" }}
                  >
                    {item.title}
                  </span>
                  <span
                    className="text-[#666] text-xl transition-transform duration-300"
                    style={{
                      transform: openAccordion === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openAccordion === i ? "200px" : "0",
                    opacity: openAccordion === i ? 1 : 0,
                  }}
                >
                  <p className="text-[#888] text-sm leading-relaxed pb-5">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: "#222" }} />

      {/* ──────────── UPCOMING TIMELINE ──────────── */}
      <section className="px-6 py-20 lg:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-[#666] uppercase tracking-widest mb-2">
            Upcoming
          </p>
          <h2
            className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.2] text-white font-medium mb-12"
            style={{ fontFamily: FONT }}
          >
            Want to chat? Find me at these places
          </h2>

          <div className="relative text-left">
            {/* Vertical line */}
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px hidden sm:block"
              style={{ backgroundColor: "#333" }}
            />

            <div className="space-y-10">
              {[
                {
                  date: "Apr 23 – 27, 2026",
                  name: "ICLR 2026",
                  location: "Rio de Janeiro, Brazil",
                  description:
                    "International Conference on Learning Representations",
                },
                {
                  date: "Jul 6th – 11th, 2026",
                  name: "ICML 2026",
                  location: "Seoul, South Korea",
                  description:
                    "International Conference on Machine Learning",
                },
                {
                  date: "Dec 6th - 12th 2026",
                  name: "NeurIPS 2026",
                  location: "Syndney, Australia",
                  description:
                    "Conference on Neural Information Processing Systems",
                },
              ].map((event, i) => {
                const activeIdx = hoveredConf ?? 0;
                const isActive = i === activeIdx;
                return (
                  <div
                    key={i}
                    className="flex gap-6 items-start cursor-default transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0.55 }}
                    onMouseEnter={() => setHoveredConf(i)}
                    onMouseLeave={() => setHoveredConf(null)}
                  >
                    {/* Dot */}
                    <div className="relative flex-shrink-0 mt-1.5 hidden sm:block">
                      <div
                        className="w-[15px] h-[15px] rounded-full border-2 transition-all duration-300"
                        style={{
                          borderColor: isActive ? "#4ade80" : "#444",
                          backgroundColor: isActive ? "#4ade8033" : "transparent",
                          boxShadow: isActive ? "0 0 12px #4ade8066" : "none",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 sm:gap-8">
                      <p
                        className="text-sm text-[#888] pt-0.5"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {event.date}
                      </p>
                      <div>
                        <h3
                          className="text-white text-lg font-medium"
                          style={{ fontFamily: FONT }}
                        >
                          {event.name}
                        </h3>
                        <p className="text-[#888] text-sm mt-1">
                          {event.description}
                        </p>
                        <p className="text-[#666] text-sm mt-1">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: "#222" }} />

      {/* ──────────── CANDID PHOTO ──────────── */}
      <div className="w-full">
        <img
          src="/images/VA_Candid.jpg"
          alt="Varun Agrawal"
          loading="lazy"
          decoding="async"
          className="w-full object-cover"
          style={{ display: "block" }}
        />
      </div>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: "#222" }} />

      {/* ──────────── LOGO WALL ──────────── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-sm text-[#666] tracking-[0.15em] uppercase text-center mb-10">Some of my Collaborators</p>
          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-6 gap-8 items-center">
            {currentLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center h-20 transition-opacity duration-700"
              >
                <img
                  src={logo.icon}
                  alt={logo.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-16 max-w-[160px] w-auto h-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                  style={{ filter: "brightness(0) invert(0.55)" }}
                />
              </div>
            ))}
          </div>
          {/* Mobile: horizontal scroll carousel */}
          <div className="md:hidden overflow-hidden">
            <div
              className="flex gap-8 items-center animate-[scrollLogos_15s_linear_infinite]"
              style={{ width: "max-content" }}
            >
              {[...currentLogos, ...currentLogos].map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="flex items-center justify-center h-16 flex-shrink-0"
                  style={{ minWidth: "100px" }}
                >
                  <img
                    src={logo.icon}
                    alt={logo.name}
                    className="max-h-12 max-w-[100px] w-auto h-auto object-contain opacity-50"
                    style={{ filter: "brightness(0) invert(0.55)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: "#222" }} />

      {/* ──────────── FOOTER ──────────── */}
      <footer className="px-6" id="contact">
        {/* Top bar */}
        <div
          className="py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b"
          style={{ borderColor: "#2a2a2a" }}
        >
          <p className="text-[#666] text-sm">
            &copy; 2026&ensp;Varun Agrawal. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-[#888]">
            <a href="mailto:hello@varunagrawal.com" className="hover:text-white transition-colors duration-300">
              Email
            </a>
            <a href="https://www.linkedin.com/in/varun-agrawal-b3367a31/" className="hover:text-white transition-colors duration-300">
              LinkedIn
            </a>
            <a href="https://varunagrawal.com" className="hover:text-white transition-colors duration-300">
              varunagrawal.com
            </a>
          </div>
        </div>

        {/* Info row */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: status + hours */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: isOnline ? "#4ade80" : "#666" }}
                />
                <span className="text-white">({isOnline ? "Online" : "Offline"})</span>
              </span>
              <span className="text-[#999]">Now, {time}</span>
            </div>
            {/*<div className="text-[#666] text-sm space-y-0.5">
              <p>Mon to Fri, 9AM - 5:30PM</p>
              <p>Sat, 10AM - 2PM</p>
              <p>Sundays &amp; Bank Holidays, Closed</p>
            </div>*/}
          </div>

          {/* Right: location */}
          <div className="text-sm text-[#888] lg:text-right space-y-1">
            <p>Based in India</p>
            <p className="text-[#666] mt-2 hidden md:block">12.96&deg; N, 77.57&deg; E</p>
          </div>
        </div>

        {/* Design credit */}
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

        {/* Giant logo */}
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
