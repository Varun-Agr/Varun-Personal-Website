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
  rsvp?: string;
}

const events: Event[] = [
  {
    title: "Trustworthy AI Academic Reception - New Delhi",
    date: "2026",
    location: "New Delhi, India",
    description:
      "A baithak-style gathering near Bharat Mandapam alongside the AI Impact Summit. Anchored by Danish Pruthi, with academics from IITD, IITM, IIITD, IIITH, UNSW, MBZUAI, and ASU \u2014 convening infrastructure for the Trustworthy AI research community and a lead-in to SAFL\u2019s first workshop.",
    image: "/images/events/baithak.jpg",
    tags: ["Trustworthy AI", "Academia", "India"],
    rsvp: "https://luma.com/academic-reception",
  },
  {
    title: "Trustworthy AI Forum Panel - Singapore",
    date: "Jan 25, 2026",
    location: "SUTD, Singapore",
    description:
      "Official pre-summit event for the India AI Impact Summit 2026, held at SUTD during AAAI-26 week. A curated panel across India, Singapore, and Australia on the Safe & Trusted AI pillar \u2014 with speakers from MDDI, NUS AI Institute, IIT Madras (CeRAI), UNSW, AIDXTech, and FAR.AI.",
    image: "/images/events/sgp.jpg",
    tags: ["Trustworthy AI", "APAC", "Panel"],
    rsvp: "https://luma.com/safl-panel",
  },
  {
    title: "Hardware-rooted Sovereignty - New Delhi",
    date: "Feb 16, 2026",
    location: "Bharat Mandapam, New Delhi",
    description:
      "Session at the AI Impact Summit 2026, co-convened by LucidComputing and Secure AI Futures Lab. Exploring verifiable Safe & Trusted AI infrastructure for the Global South \u2014 hardware-layer verification, India\u2019s DPDP Act, and compute supply chains as the anchor for \u2018AI trust fabric\u2019 standards.",
    image: "/images/events/summit.jpg",
    tags: ["AI Security", "Hardware", "Global South"],
    rsvp: "https://luma.com/sovereignai",
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
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(74,222,128,0.12) 0%, rgba(20,20,20,0.45) 50%, rgba(74,222,128,0.08) 100%)",
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
