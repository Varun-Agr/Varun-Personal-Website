"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const FONT = "var(--font-google-sans), sans-serif";

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  tags: string[];
}

const events: Event[] = [
  {
    title: "Academic Reception \u2014 New Delhi",
    date: "2024",
    location: "New Delhi, India",
    description:
      "Hosted an academic reception bringing together researchers, policymakers, and industry practitioners to discuss AI talent development and research collaboration across Indian institutions.",
    image: "/images/events/delhi-reception.jpg",
    tags: ["Academia", "Policy", "India"],
  },
  {
    title: "TRAI Forum \u2014 Academic Reception, Singapore",
    date: "2024",
    location: "Singapore",
    description:
      "Co-organised an academic reception alongside the TRAI Forum in Singapore, convening researchers and governance specialists from across APAC to explore talent pipelines for trustworthy AI research.",
    image: "/images/events/singapore-trai.jpg",
    tags: ["APAC", "Governance", "Academia"],
  },
  {
    title: "AI Security Summit \u2014 Lucid Computing Reception",
    date: "2023",
    location: "United Kingdom",
    description:
      "Hosted a reception at the AI Security Summit in partnership with Lucid Computing, connecting technical talent with organisations working on AI evaluation, interpretability, and alignment.",
    image: "/images/events/aisummit-lucid.jpg",
    tags: ["AI Security", "UK", "Industry"],
  },
];

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

export default function EventsPage() {
  const { time, isOnline } = useIST();

  return (
    <div
      className="min-h-screen text-[#e5e5e5] relative"
      style={{ backgroundColor: "#141414", fontFamily: FONT }}
    >
      <Navbar activePage="events" />

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
            Events
          </h1>
          <p className="text-[#888] text-base max-w-[600px]">
            Academic receptions, forums, and convenings organised to connect
            researchers, policymakers, and industry practitioners.
          </p>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: "#222" }} />

      {/* ──────────── EVENTS GRID ──────────── */}
      <section className="px-6 py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map((event) => (
              <div
                key={event.title}
                className="group rounded-lg overflow-hidden border transition-colors duration-300"
                style={{ borderColor: "#2a2a2a", backgroundColor: "#1a1a1a" }}
              >
                {/* Image */}
                <div
                  className="w-full aspect-[16/10] relative overflow-hidden"
                  style={{ backgroundColor: "#222" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2 px-6">
                      <div className="text-xs text-white/30 uppercase tracking-widest">
                        {event.location}
                      </div>
                      <div className="text-lg text-white/15 font-medium">
                        {event.date}
                      </div>
                    </div>
                  </div>
                  {/* Placeholder blur overlay — replace with real images */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background:
                        "linear-gradient(135deg, #4ade8020 0%, #141414 50%, #4ade8010 100%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#666]">
                    <span>{event.date}</span>
                    <span>&middot;</span>
                    <span>{event.location}</span>
                  </div>
                  <h3
                    className="text-white text-lg leading-snug font-medium"
                    style={{ fontFamily: FONT }}
                  >
                    {event.title}
                  </h3>
                  <p className="text-[#888] text-sm leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: "#4ade8012",
                          color: "#4ade80",
                          border: "1px solid #4ade8025",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: "#222" }} />

      {/* ──────────── FOOTER ──────────── */}
      <footer className="px-6">
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
            <p className="text-[#666] mt-2 hidden md:block">
              12.96&deg; N, 77.57&deg; E
            </p>
          </div>
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
