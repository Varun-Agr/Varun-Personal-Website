"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { projects } from "./projects";
import Navbar from "./components/Navbar";

const CAROUSEL_SLUGS = [
  "talent-index-jd-fingerprinting",
  "ml-research-talent-map",
  "ai-candidate-screening-pipeline",
  "big-tech-layoff-monitor",
  "alignment-research-fellowship",
  "measuremint",
  "recruiting-data-infrastructure",
  "india-ai-report",
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

const FONT = "var(--font-google-sans), sans-serif";

export default function ClonePage() {
  const { time, isOnline } = useIST();
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const carouselProjects = CAROUSEL_SLUGS.map((s) => projects.find((p) => p.slug === s)!);
  const totalSlides = carouselProjects.length + 1; // +1 for "View more"
  const { wrapperRef: carouselWrapperRef, activeIdx: carouselIdx, setActiveIdx: setCarouselIdx, visibleCount } = useStickyCarousel(totalSlides);
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
        "Scaled a recruiting funnel from scratch to 4,200 warm ML, SWE, and Quant candidates across 5 continents. Partnered with hiring managers at 13+ organizations to scope roles, calibrate bars, and close 26 offers across FAR.AI, UK AISI, and Apollo — securing 12 accepted placements.",
    },
    {
      title: "Trustworthy AI Science",
      content:
        "Co-founded Secure AI Futures Lab with $250K+ via Schmidt Sciences and AI Safety Tactical Opportunites Fund. Convening government, academia, and industry across India and APAC. Partnering with top IITs and IISc on AI for Science, Social Good, and Trustworthy AI. Hosted workshops featuring Prof. Stuart Russell.",
    },
    {
      title: "Building Tools",
      content:
        "Managed the development of an AI evaluation pipeline (Claude API + Airtable) scoring candidates across 20+ binary signals with tri-verdict logic. Leading product for Measuremint — a voice-first career agent using ElevenLabs + Claude for AI interviews.",
    },
  ];

  const logos1 = [
    // { name: "Anthropic", icon: "/images/logos/anthropic.png" },
    { name: "UK AISI", icon: "/images/logos/aisi.png" },
    { name: "FAR.AI", icon: "/images/logos/farai.svg" },
    { name: "Apollo Research", icon: "/images/logos/apollo.png" },
    // { name: "GovAI", icon: "/images/logos/govai.png" },
    // { name: "Goodfire", icon: "/images/logos/goodfire.webp" },
    { name: "80,000 Hours", icon: "/images/logos/80k.png" },
    { name: "J-PAL", icon: "/images/logos/jpal.png" },
    { name: "Schmidt Sciences", icon: "/images/logos/ss.png" },
    // { name: "NUS", icon: "/images/logos/nus.png" },
  ];

  const [logoSet, setLogoSet] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setLogoSet((s) => (s === 0 ? 1 : 0)), 3000);
    return () => clearInterval(id);
  }, []);

  const currentLogos = logoSet === 0 ? logos1 : logos1;

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

      {/* ──────────── HERO (headline) ──────────── */}
      <section className="px-6 pt-12 lg:pt-16" id="work">
        <div className="max-w-[90%] mx-auto">
          <h1
            className="text-[clamp(1.8rem,4.5vw,3.2rem)] leading-[1.15] tracking-[-0.02em] text-white max-w-[75%] mb-0 font-medium"
            style={{ fontFamily: FONT }}
          >
            {/*Technical Recruiter <span className="text-[#555]">&</span> AI Governance Builder sourcing top 1% STEM talent for frontier AI labs*/}
            {/*I place ML and engineering talent at the frontier labs working on the hardest problems.*/}
            I build talent pipelines and recruitment infra for frontier AI teams - helping them source the researchers, engineers, and generalists tackling the field's hardest problems.
          </h1>
        </div>
      </section>

      {/* ──────────── SCROLL-DRIVEN CAROUSEL ──────────── */}
      {/* Tall wrapper creates scroll runway; inner content is sticky */}
      <div
        ref={carouselWrapperRef}
        style={{ height: `${(totalSlides - 1) * 60 + 100}vh` }}
      >
        <div className="sticky top-[72px] px-6 py-12 lg:py-16" style={{ backgroundColor: "#141414" }}>
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-end">
            {/* Left: status + text + CTAs */}
            <div className="flex flex-col gap-6">
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
                7+ years identifying and placing exceptional researchers
                and engineers at organizations working on the world&apos;s hardest
                problems - from UK AISI to FAR.AI and Apollo Research.
              </p>

              <div className="flex flex-wrap gap-3 mt-2">
                <a
                  href="/contact"
                  className="flex items-center gap-2 px-5 py-2.5 border text-sm text-white hover:bg-white hover:text-[#141414] transition-all duration-300"
                  style={{ borderColor: "#444", borderRadius: "2px" }}
                >
                  <span className="text-xs">&#x21a6;</span>
                  I am looking to hire!
                </a>
                <Link
                  href="/works"
                  className="flex items-center gap-2 px-5 py-2.5 border text-sm text-white hover:bg-white hover:text-[#141414] transition-all duration-300"
                  style={{ borderColor: "#444", borderRadius: "2px" }}
                >
                  <span className="text-xs">&#x21a6;</span>
                  View All Projects
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
                        style={{ backgroundColor: "#1e1e1e" }}
                      >
                        <div
                          className="w-full aspect-[4/3] relative overflow-hidden"
                          style={{ background: p.cardGradient }}
                        >
                          {p.cardImage?.length ? (
                            <img
                              src={p.cardImage[0]}
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
                            className="text-white text-lg leading-snug font-medium"
                            style={{ fontFamily: FONT }}
                          >
                            {p.cardTitle}
                          </h3>
                          <p className="text-[#888] text-sm leading-relaxed">
                            {p.cardDescription}
                          </p>
                          <span className="inline-flex items-center gap-2 text-sm text-white mt-2 group-hover:gap-3 transition-all duration-300">
                            <span className="text-xs">&#x21a6;</span>
                            View Project
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                  {/* "View more" meta slide */}
                  <div
                    className="flex-shrink-0 px-2.5"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <Link
                      href="/works"
                      className="group block rounded-md overflow-hidden h-full"
                      style={{ backgroundColor: "#1e1e1e" }}
                    >
                      <div
                        className="w-full aspect-[4/3] relative overflow-hidden flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #222 50%, #1a1a1a 100%)" }}
                      >
                        <div className="text-center space-y-4">
                          <div className="text-xs text-white/30 tracking-widest uppercase">
                            Many More projects
                          </div>
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <h3
                          className="text-white text-lg leading-snug font-medium"
                          style={{ fontFamily: FONT }}
                        >
                          View All Work
                        </h3>
                        <p className="text-[#888] text-sm leading-relaxed">
                          Browse the full portfolio of projects, tools, and initiatives.
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm text-[#4ade80] mt-2 group-hover:gap-3 transition-all duration-300">
                          View All Projects &rarr;
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Carousel controls */}
              <div className="flex items-center justify-between mt-5">
                <div className="flex gap-1.5">
                  {Array.from({ length: totalSlides - visibleCount + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCarouselIdx(i)}
                      className="relative overflow-hidden [&::before]:!hidden"
                      style={{
                        width: carouselIdx === i ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor:
                          carouselIdx === i ? "#fff" : "#444",
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
                    className="w-9 h-9 flex items-center justify-center border text-[#999] hover:text-white hover:border-[#666] transition-colors duration-300"
                    style={{ borderColor: "#333", borderRadius: "2px" }}
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
                        Math.min(totalSlides - visibleCount, carouselIdx + 1)
                      )
                    }
                    className="w-9 h-9 flex items-center justify-center border text-[#999] hover:text-white hover:border-[#666] transition-colors duration-300"
                    style={{ borderColor: "#333", borderRadius: "2px" }}
                    disabled={carouselIdx >= totalSlides - visibleCount}
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
            I&apos;ve built recruiting infrastructure for frontier AI labs,
            research fellowships, and governance initiatives.
            The focus stays the same:{" "}
            <span className="text-[#4ade80]">finding exceptional people</span>,
            building the systems that surface them at scale, and making sure{" "}
            <span className="text-[#4ade80]">the right talent reaches the right problems</span>{" "}
            before anyone else finds them.
          </p>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: "#222" }} />

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
            <p className="text-[#aaa] text-base leading-relaxed">
              I find researchers and engineers for organizations working on
              problems that matter — frontier AI safety, governance, and
              alignment. Start with the talent map, build the pipeline,
              calibrate the bar, close the offer.
            </p>
            <p className="text-[#aaa] text-base leading-relaxed">
              The work spans technical recruiting, data-driven sourcing,
              AI governance research, and building the tools that make all
              of it scale. From founding India&apos;s first Alignment Research
              Fellowship to deploying LLM-assisted candidate triage — if it
              involves getting the right people to the right problems, I&apos;ve
              probably built infrastructure for it.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 border text-sm text-white hover:bg-white hover:text-[#141414] transition-all duration-300 mt-2"
              style={{ borderColor: "#444", borderRadius: "2px" }}
            >
              <span className="text-xs">&#x21a6;</span>
              View Approach
            </a>
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
        <div className="max-w-[1400px] mx-auto">
          <p className="text-sm text-[#666] uppercase tracking-widest mb-2">
            Upcoming
          </p>
          <h2
            className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.2] text-white font-medium mb-12"
            style={{ fontFamily: FONT }}
          >
            Want to chat? Find me at these places
          </h2>

          <div className="relative">
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
              ].map((event, i) => (
                <div key={i} className="flex gap-6 items-start">
                  {/* Dot */}
                  <div className="relative flex-shrink-0 mt-1.5 hidden sm:block">
                    <div
                      className="w-[15px] h-[15px] rounded-full border-2"
                      style={{
                        borderColor: i === 0 ? "#4ade80" : "#444",
                        backgroundColor: i === 0 ? "#4ade8033" : "transparent",
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
              ))}
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
          className="w-full object-cover"
          style={{ display: "block" }}
        />
      </div>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: "#222" }} />

      {/* ──────────── LOGO WALL ──────────── */}
      <section className="px-6 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-sm text-[#666] tracking-[0.15em] uppercase text-center mb-10">Trusted by people at</p>
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
            <p>Based in Bengaluru,</p>
            <p>India</p>
            <p className="text-[#666] mt-2">12.96&deg; N, 77.57&deg; E</p>
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
