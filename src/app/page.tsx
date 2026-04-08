"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { projects } from "./projects";
import { FONT_SANS, FONT_SERIF, C } from "./theme";

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

/* ─── scroll-driven carousel ─── */

function useStickyCarousel(totalCards: number) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  // Track viewport width to determine visible card count
  useEffect(() => {
    const updateVisible = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 2);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIdx = totalCards - visibleCount;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const viewportH = window.innerHeight;
      const runway = wrapperHeight - viewportH;
      if (runway <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / runway));

      const idx = Math.round(progress * maxIdx);
      setActiveIdx(Math.max(0, Math.min(maxIdx, idx)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [maxIdx]);

  // Clamp activeIdx when visibleCount changes
  useEffect(() => {
    setActiveIdx((prev) => Math.min(prev, maxIdx));
  }, [maxIdx]);

  return { wrapperRef, activeIdx, setActiveIdx, visibleCount };
}

/* ─────────────────────────── page ─────────────────────────────── */

const FONT = FONT_SANS;

export default function ClonePage() {
  const { time, isOnline } = useIST();
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const carouselProjects = projects.slice(0, 3);
  const { wrapperRef: carouselWrapperRef, activeIdx: carouselIdx, setActiveIdx: setCarouselIdx, visibleCount } = useStickyCarousel(carouselProjects.length);
  const scrolled = useScrolled(80);
  const [menuOpen, setMenuOpen] = useState(false);
  const canvasRef = useTronTrail();
  const displayText = useScrollReveal();
  const approachLeft = useScrollReveal();
  const approachRight = useScrollReveal();

  const accordionItems = [
    {
      title: "Talent Sourcing & Intelligence",
      content:
        "Built a 50,000-profile ML research talent map from 5 years of ICLR/ICML/CVPR proceedings. Harvested 100+ data sources — conferences, Olympiads, GitHub, Codeforces — into an 80K-record dataset at >90% accuracy. Vector embeddings for candidate matching, AHP-weighted scoring across 10 skill dimensions.",
    },
    {
      title: "Technical Recruiting",
      content:
        "Scaled a recruiting funnel from scratch to 4,200 warm ML, SWE, and Quant candidates across 5 continents. Partnered with hiring managers at 13+ organizations to scope roles, calibrate bars, and close 26 offers across FAR.AI, UK AISI, Anthropic, and GovAI — securing 12 accepted placements.",
    },
    {
      title: "AI Governance & Research",
      content:
        "Co-founded Secure AI Futures Lab with $250K+ via Schmidt Sciences. Convening government, academia, and industry across India and APAC. Partnering with top IITs and IISc on AI for Science, Social Good, and Trustworthy AI. Hosted workshops featuring Prof. Stuart Russell.",
    },
    {
      title: "Building Tools",
      content:
        "Developed an AI evaluation pipeline (Claude API + Airtable) scoring candidates across 20+ binary signals with tri-verdict logic. Building Measuremint — a voice-first career agent using ElevenLabs + Claude for AI interviews, cutting per-candidate cost from $5 to $0.15 at scale.",
    },
  ];

  const logos1 = [
    { name: "Anthropic", icon: "/images/logos/anthropic.png" },
    { name: "UK AISI", icon: "/images/logos/aisi.png" },
    { name: "FAR.AI", icon: "/images/logos/farai.svg" },
    { name: "Apollo Research", icon: "/images/logos/apollo.png" },
    { name: "GovAI", icon: "/images/logos/govai.png" },
    { name: "Goodfire", icon: "/images/logos/goodfire.webp" },
  ];
  const logos2 = [
    { name: "Schmidt Sciences", icon: "/images/logos/ss.png" },
    { name: "80,000 Hours", icon: "/images/logos/80k.png" },
    { name: "J-PAL", icon: "/images/logos/jpal.png" },
    { name: "IIT Madras", icon: "/images/logos/iitm.png" },
    { name: "NUS", icon: "/images/logos/nus.png" },
    { name: "UC Berkeley", icon: "/images/logos/ucb.png" },
  ];

  const [logoSet, setLogoSet] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setLogoSet((s) => (s === 0 ? 1 : 0)), 3000);
    return () => clearInterval(id);
  }, []);

  const currentLogos = logoSet === 0 ? logos1 : logos2;

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: C.bg, color: C.text, fontFamily: FONT_SANS }}
    >
      {/* Shooting star trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
      />

      {/* ──────────── NAV WRAPPER ──────────── */}
      <div
        className="sticky top-0 z-50 w-full px-6 transition-all duration-500"
        style={{
          paddingTop: scrolled ? "10px" : "0px",
        }}
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
            <span
              className="text-sm tracking-[0.2em] transition-colors duration-500"
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: "italic",
                color: scrolled ? C.bg : C.text,
              }}
            >
              Varun Agrawal
            </span>
            <div className="hidden md:flex items-center gap-1 text-sm">
              <a
                href="/works"
                className="px-3 py-1 transition-colors duration-300"
                style={{ color: scrolled ? C.textDim : C.textMuted }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = scrolled ? C.bg : C.accent)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = scrolled ? C.textDim : C.textMuted)
                }
              >
                Work
              </a>
              <span style={{ color: scrolled ? "#ccc" : C.textDim }}>|</span>
              <a
                href="#approach"
                className="px-3 py-1 transition-colors duration-300"
                style={{ color: scrolled ? C.textDim : C.textMuted }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = scrolled ? C.bg : C.accent)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = scrolled ? C.textDim : C.textMuted)
                }
              >
                Approach
              </a>
              <span style={{ color: scrolled ? "#ccc" : C.textDim }}>|</span>
              <a
                href="/contact"
                className="px-3 py-1 transition-colors duration-300"
                style={{ color: scrolled ? C.textDim : C.textMuted }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = scrolled ? C.bg : C.accent)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = scrolled ? C.textDim : C.textMuted)
                }
              >
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 border text-sm transition-all duration-500"
              style={{
                borderColor: scrolled ? C.accentMuted : C.borderLight,
                borderRadius: scrolled ? "8px" : "2px",
                color: scrolled ? C.bg : C.accent,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = C.accent;
                e.currentTarget.style.color = C.bg;
                e.currentTarget.style.borderColor = C.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = scrolled ? C.bg : C.accent;
                e.currentTarget.style.borderColor = scrolled ? C.accentMuted : C.borderLight;
              }}
            >
              Let&apos;s Work Together
            </a>
            {/* Hamburger button — mobile only */}
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
              ? "rgba(240, 235, 229, 0.97)"
              : `${C.bg}f7`,
            borderBottom: menuOpen ? `1px solid ${scrolled ? "#ddd" : C.border}` : "none",
          }}
        >
          <div className="flex flex-col px-6 py-4 gap-3">
            <a
              href="/works"
              className="text-sm py-2 transition-colors duration-300"
              style={{ color: scrolled ? C.textDim : C.textMuted }}
              onClick={() => setMenuOpen(false)}
            >
              Work
            </a>
            <a
              href="#approach"
              className="text-sm py-2 transition-colors duration-300"
              style={{ color: scrolled ? C.textDim : C.textMuted }}
              onClick={() => setMenuOpen(false)}
            >
              Approach
            </a>
            <a
              href="/contact"
              className="text-sm py-2 transition-colors duration-300"
              style={{ color: scrolled ? C.textDim : C.textMuted }}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border text-sm mt-1 transition-all duration-300"
              style={{
                borderColor: scrolled ? C.accentMuted : C.borderLight,
                borderRadius: "2px",
                color: scrolled ? C.bg : C.accent,
              }}
              onClick={() => setMenuOpen(false)}
            >
              Let&apos;s Work Together
            </a>
          </div>
        </div>
      </div>

      {/* ──────────── HERO (headline) ──────────── */}
      <section className="px-6 pt-12 lg:pt-16" id="work">
        <div className="max-w-[1400px] mx-auto">
          <h1
            className="text-[clamp(2rem,5vw,3.8rem)] leading-[1.1] tracking-[-0.01em] max-w-[780px] mb-0"
            style={{ fontFamily: FONT_SERIF, color: C.text }}
          >
            I place ML and engineering talent at the frontier labs working on the{" "}
            <em style={{ color: C.accent }}>hardest problems.</em>
          </h1>
        </div>
      </section>

      {/* ──────────── SCROLL-DRIVEN CAROUSEL ──────────── */}
      {/* Tall wrapper creates scroll runway; inner content is sticky */}
      <div
        ref={carouselWrapperRef}
        style={{ height: `${(carouselProjects.length - 1) * 60 + 100}vh` }}
      >
        <div className="sticky top-[72px] px-6 py-12 lg:py-16" style={{ backgroundColor: C.bg }}>
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-end">
            {/* Left: status + text + CTAs */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-sm" style={{ color: C.textMuted }}>
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: isOnline ? C.accent : C.textDim }}
                  />
                  <span style={{ color: C.text }}>({isOnline ? "Online" : "Offline"})</span>
                </span>
                <span>Now, {time}</span>
              </div>

              <p className="text-base leading-relaxed" style={{ color: C.textMuted }}>
                Co-CEO at <a href="https://steadrise.org" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300" style={{ color: C.text }} onMouseEnter={e => e.currentTarget.style.color = C.accent} onMouseLeave={e => e.currentTarget.style.color = C.text}>SteadRise</a>. Co-Founder of <a href="https://secureaifutureslab.com/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300" style={{ color: C.text }} onMouseEnter={e => e.currentTarget.style.color = C.accent} onMouseLeave={e => e.currentTarget.style.color = C.text}>Secure AI Futures Lab</a>. Building
                Measuremint. 7+ years identifying and placing exceptional researchers
                and engineers at organizations working on the world&apos;s hardest
                problems.
              </p>

              <div className="flex flex-wrap gap-3 mt-2">
                <a
                  href="/contact"
                  className="flex items-center gap-2 px-5 py-2.5 border text-sm transition-all duration-300"
                  style={{ borderColor: C.accent, borderRadius: "2px", color: C.accent }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.accent; e.currentTarget.style.color = C.bg; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = C.accent; }}
                >
                  Let&apos;s Work Together
                </a>
                <Link
                  href="/works"
                  className="flex items-center gap-2 px-5 py-2.5 border text-sm transition-all duration-300"
                  style={{ borderColor: C.borderLight, borderRadius: "2px", color: C.text }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.text; e.currentTarget.style.color = C.bg; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = C.text; }}
                >
                  View All Work
                </Link>
              </div>
            </div>

            {/* Right: project cards carousel */}
            <div className="relative">
              {/* Carousel track */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${carouselIdx * (100 / visibleCount)}%)` }}
                >
                  {carouselProjects.map((p) => (
                    <div
                      key={p.slug}
                      className="flex-shrink-0 px-2.5"
                      style={{ width: `${100 / visibleCount}%` }}
                    >
                      <Link
                        href={`/work/${p.slug}`}
                        className="group block rounded-md overflow-hidden"
                        style={{ backgroundColor: C.bgCard }}
                      >
                        <div
                          className="w-full aspect-[4/3] relative overflow-hidden"
                          style={{ background: p.cardGradient }}
                        >
                          {p.cardImage ? (
                            <img
                              src={p.cardImage}
                              alt={p.name}
                              className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center space-y-3">
                                <div className="text-4xl font-bold text-white/20">
                                  {p.cardStat}
                                </div>
                                <div className="text-xs text-white/30 tracking-widest uppercase">
                                  {p.cardStatLabel}
                                </div>
                                <div className="flex gap-2 justify-center mt-2">
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: `${p.cardAccent}66` }}
                                  />
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: `${p.cardAccent}40` }}
                                  />
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: `${p.cardAccent}26` }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-5 space-y-3">
                          <h3
                            className="text-lg leading-snug"
                            style={{ fontFamily: FONT_SERIF, color: C.text }}
                          >
                            {p.cardTitle}
                          </h3>
                          <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>
                            {p.cardDescription}
                          </p>
                          <span className="inline-flex items-center gap-2 text-sm mt-2 group-hover:gap-3 transition-all duration-300" style={{ color: C.accent }}>
                            View Project &rarr;
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel controls */}
              <div className="flex items-center justify-between mt-5">
                <div className="flex gap-1.5">
                  {Array.from({ length: carouselProjects.length - visibleCount + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCarouselIdx(i)}
                      className="relative overflow-hidden [&::before]:!hidden"
                      style={{
                        width: carouselIdx === i ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor:
                          carouselIdx === i ? C.accent : C.borderLight,
                        transition: "all 0.3s",
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCarouselIdx(Math.max(0, carouselIdx - 1))
                    }
                    className="w-9 h-9 flex items-center justify-center border transition-colors duration-300 relative overflow-hidden [&::before]:!hidden"
                    style={{ borderColor: C.borderLight, borderRadius: "2px", color: C.textMuted }}
                    disabled={carouselIdx === 0}
                    aria-label="Previous"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setCarouselIdx(
                        Math.min(carouselProjects.length - visibleCount, carouselIdx + 1)
                      )
                    }
                    className="w-9 h-9 flex items-center justify-center border transition-colors duration-300 relative overflow-hidden [&::before]:!hidden"
                    style={{ borderColor: C.borderLight, borderRadius: "2px", color: C.textMuted }}
                    disabled={carouselIdx >= carouselProjects.length - visibleCount}
                    aria-label="Next"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: C.border }} />

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
            className="text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.2] tracking-[-0.015em]"
            style={{ fontFamily: FONT_SERIF, color: C.textMuted }}
          >
            I&apos;ve built recruiting infrastructure for frontier AI labs,
            research fellowships, and governance initiatives across three continents.
            The focus stays the same:{" "}
            <em style={{ color: C.accent, fontStyle: "italic" }}>finding exceptional people</em>,
            building the systems that surface them at scale, and making sure{" "}
            <em style={{ color: C.accent, fontStyle: "italic" }}>the right talent reaches the right problems</em>{" "}
            before anyone else finds them.
          </p>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: C.border }} />

      {/* ──────────── APPROACH ──────────── */}
      <section className="px-6 py-20 lg:py-28" id="approach">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: text */}
          <div
            ref={approachLeft.ref}
            className="space-y-6 transition-all duration-700"
            style={{
              opacity: approachLeft.visible ? 1 : 0,
              transform: approachLeft.visible ? "translateY(0)" : "translateY(40px)",
            }}
          >
            <p className="text-base leading-relaxed" style={{ color: C.textMuted }}>
              I find researchers and engineers for organizations working on
              problems that matter — frontier AI safety, governance, and
              alignment. Start with the talent map, build the pipeline,
              calibrate the bar, close the offer.
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.textMuted }}>
              The work spans technical recruiting, data-driven sourcing,
              AI governance research, and building the tools that make all
              of it scale. From founding India&apos;s first Alignment Research
              Fellowship to deploying LLM-assisted candidate triage — if it
              involves getting the right people to the right problems, I&apos;ve
              probably built infrastructure for it.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 border text-sm transition-all duration-300 mt-2"
              style={{ borderColor: C.borderLight, borderRadius: "2px", color: C.text }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.text; e.currentTarget.style.color = C.bg; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = C.text; }}
            >
              View Approach
            </a>
          </div>

          {/* Right: accordion */}
          <div
            ref={approachRight.ref}
            className="divide-y transition-all duration-700 delay-200"
            style={{
              borderColor: C.border,
              opacity: approachRight.visible ? 1 : 0,
              transform: approachRight.visible ? "translateY(0)" : "translateY(40px)",
            }}
          >
            {accordionItems.map((item, i) => (
              <div
                key={item.title}
                className="border-b"
                style={{ borderColor: C.border }}
              >
                {i === 0 && (
                  <div className="border-t" style={{ borderColor: "#2a2a2a" }} />
                )}
                <button
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group relative overflow-hidden [&::before]:!hidden"
                >
                  <span
                    className="text-base"
                    style={{ fontFamily: FONT_SERIF, letterSpacing: "0.02em", color: C.text }}
                  >
                    {item.title}
                  </span>
                  <span
                    className="text-xl transition-transform duration-300"
                    style={{
                      color: C.accent,
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
                  <p className="text-sm leading-relaxed pb-5" style={{ color: C.textMuted }}>
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: C.border }} />

      {/* ──────────── UPCOMING TIMELINE ──────────── */}
      <section className="px-6 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-sm uppercase tracking-widest mb-2" style={{ color: C.textDim }}>
            Upcoming
          </p>
          <h2
            className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.2] mb-12"
            style={{ fontFamily: FONT_SERIF, color: C.text }}
          >
            Want to chat? Find me at these places
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px hidden sm:block"
              style={{ backgroundColor: C.borderLight }}
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
              ].map((event, i) => (
                <div key={i} className="flex gap-6 items-start">
                  {/* Dot */}
                  <div className="relative flex-shrink-0 mt-1.5 hidden sm:block">
                    <div
                      className="w-[15px] h-[15px] rounded-full border-2"
                      style={{
                        borderColor: i === 0 ? C.accent : C.borderLight,
                        backgroundColor: i === 0 ? C.accentSoft : "transparent",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 sm:gap-8">
                    <p
                      className="text-sm pt-0.5"
                      style={{ color: C.textMuted, fontVariantNumeric: "tabular-nums" }}
                    >
                      {event.date}
                    </p>
                    <div>
                      <h3
                        className="text-lg"
                        style={{ fontFamily: FONT_SERIF, color: C.text }}
                      >
                        {event.name}
                      </h3>
                      <p className="text-sm mt-1" style={{ color: C.textMuted }}>
                        {event.description}
                      </p>
                      <p className="text-sm mt-1" style={{ color: C.textDim }}>
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: C.border }} />

      {/* ──────────── CANDID PHOTO ──────────── */}
      <div className="w-full">
        <img
          src="/images/VA_Candid.jpg"
          alt="Varun Agrawal"
          className="w-full object-cover"
          style={{ display: "block" }}
        />
      </div>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: C.border }} />

      {/* ──────────── LOGO WALL ──────────── */}
      <section className="px-6 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {currentLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center h-20 transition-opacity duration-700"
              >
                <img
                  src={logo.icon}
                  alt={logo.name}
                  className="max-h-14 md:max-h-16 max-w-[140px] md:max-w-[160px] w-auto h-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                  style={{ filter: "brightness(0) invert(0.55)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: C.border }} />

      {/* ──────────── FOOTER ──────────── */}
      <footer className="px-6" id="contact">
        {/* Top bar */}
        <div
          className="py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b"
          style={{ borderColor: C.border }}
        >
          <p className="text-sm" style={{ color: C.textDim }}>
            &copy; 2026&ensp;Varun Agrawal. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm" style={{ color: C.textMuted }}>
            <a href="mailto:hello@varunagrawal.com" className="transition-colors duration-300" onMouseEnter={e => e.currentTarget.style.color = C.accent} onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
              Email
            </a>
            <a href="https://www.linkedin.com/in/varun-agrawal-b3367a31/" className="transition-colors duration-300" onMouseEnter={e => e.currentTarget.style.color = C.accent} onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
              LinkedIn
            </a>
            <a href="https://varunagrawal.com" className="transition-colors duration-300" onMouseEnter={e => e.currentTarget.style.color = C.accent} onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
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
                  style={{ backgroundColor: isOnline ? C.accent : C.textDim }}
                />
                <span style={{ color: C.text }}>({isOnline ? "Online" : "Offline"})</span>
              </span>
              <span style={{ color: C.textMuted }}>Now, {time}</span>
            </div>
          </div>

          {/* Right: location */}
          <div className="text-sm lg:text-right space-y-1" style={{ color: C.textMuted }}>
            <p>Based in Bengaluru,</p>
            <p>India</p>
            <p className="mt-2" style={{ color: C.textDim }}>12.96&deg; N, 77.57&deg; E</p>
          </div>
        </div>

        {/* Design credit */}
        <div className="py-4 text-center">
          <p className="text-xs tracking-[0.1em]" style={{ color: C.borderLight }}>
            Design courtesy{" "}
            <a
              href="https://www.harrygeorge.design/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors duration-300"
              style={{ color: C.textDim }}
              onMouseEnter={e => e.currentTarget.style.color = C.accent}
              onMouseLeave={e => e.currentTarget.style.color = C.textDim}
            >
              Harry George
            </a>
          </p>
        </div>

        {/* Giant logo */}
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
