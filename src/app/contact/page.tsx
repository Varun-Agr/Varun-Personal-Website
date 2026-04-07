"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FONT = "var(--font-google-sans), sans-serif";
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxtPLoyZk7MNlyoahjnaPLP_4SmpXpVaQin1zgaLm2OSXQqcz-PJLv17Ps9Q8LK18iL/exec";

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

export default function ContactPage() {
  const { time, isOnline } = useIST();
  const scrolled = useScrolled(80);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const params = new URLSearchParams({
      full_name: formData.full_name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    });

    try {
      const res = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: params,
      });
      const raw = await res.text();
      let data: { success?: boolean; result?: string } = {};
      try {
        data = JSON.parse(raw);
      } catch {
        setStatus("error");
        return;
      }
      if (data.success || data.result === "success") {
        setStatus("success");
        setFormData({ full_name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full bg-transparent border-b text-white text-base py-3 outline-none transition-colors duration-300 placeholder:text-[#555] focus:border-white";

  return (
    <div
      className="min-h-screen text-[#e5e5e5] relative flex flex-col"
      style={{ backgroundColor: "#141414", fontFamily: FONT }}
    >
      {/* ──────────── NAV ──────────── */}
      <div
        className="sticky top-0 z-50 w-full px-6 transition-all duration-500"
        style={{ paddingTop: scrolled ? "10px" : "0px" }}
      >
        <nav
          className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto transition-all duration-500"
          style={{
            backgroundColor: scrolled
              ? "rgba(255, 255, 255, 0.97)"
              : "rgba(20, 20, 20, 0.92)",
            backdropFilter: "blur(12px)",
            borderRadius: scrolled ? "12px" : "0px",
            boxShadow: scrolled
              ? "0 4px 30px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)"
              : "none",
            borderBottom: scrolled ? "none" : "1px solid #2a2a2a",
          }}
        >
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-semibold tracking-[0.2em] transition-colors duration-500"
              style={{
                fontFamily: FONT,
                color: scrolled ? "#141414" : "#ffffff",
              }}
            >
              Varun Agrawal
            </Link>
            <div className="hidden md:flex items-center gap-1 text-sm">
              <Link
                href="/#work"
                className="px-3 py-1 transition-colors duration-300"
                style={{ color: scrolled ? "#666" : "#999" }}
              >
                Work
              </Link>
              <span style={{ color: scrolled ? "#ccc" : "#444" }}>|</span>
              <Link
                href="/#approach"
                className="px-3 py-1 transition-colors duration-300"
                style={{ color: scrolled ? "#666" : "#999" }}
              >
                Approach
              </Link>
              <span style={{ color: scrolled ? "#ccc" : "#444" }}>|</span>
              <Link
                href="/contact"
                className="px-3 py-1 transition-colors duration-300"
                style={{ color: scrolled ? "#141414" : "#fff" }}
              >
                Contact
              </Link>
            </div>
          </div>
          <Link
            href="/works"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 border text-sm transition-all duration-500"
            style={{
              borderColor: scrolled ? "#ccc" : "#444",
              borderRadius: scrolled ? "8px" : "2px",
              color: scrolled ? "#141414" : "#ffffff",
            }}
          >
            <span className="text-xs">&#x21a6;</span>
            View All Work
          </Link>
        </nav>
      </div>

      {/* ──────────── CONTENT ──────────── */}
      <div className="flex-1 px-6 pt-12 lg:pt-20 pb-20 lg:pb-32">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: heading + info */}
            <div>
              <h1
                className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white font-medium mb-6"
                style={{ fontFamily: FONT }}
              >
                Get in touch
              </h1>
              <p className="text-[#aaa] text-base leading-relaxed mb-10 max-w-[480px]">
                Have a role to fill, a research collaboration in mind, or just
                want to connect? Drop me a message and I&apos;ll get back to you.
              </p>

              <div className="space-y-6 text-sm">
                <div>
                  <p className="text-[#555] uppercase tracking-[0.15em] text-xs mb-2">Email</p>
                  <a
                    href="mailto:hello@varunagrawal.com"
                    className="text-white hover:text-[#4ade80] transition-colors duration-300"
                  >
                    hello@varunagrawal.com
                  </a>
                </div>
                <div>
                  <p className="text-[#555] uppercase tracking-[0.15em] text-xs mb-2">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/varun-agrawal-b3367a31/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#4ade80] transition-colors duration-300"
                  >
                    linkedin.com/in/varun-agrawal
                  </a>
                </div>
                <div>
                  <p className="text-[#555] uppercase tracking-[0.15em] text-xs mb-2">Location</p>
                  <p className="text-[#aaa]">New Delhi, India</p>
                  <p className="text-[#555] mt-1">28.61&deg; N, 77.21&deg; E</p>
                </div>
                <div>
                  <p className="text-[#555] uppercase tracking-[0.15em] text-xs mb-2">Status</p>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: isOnline ? "#4ade80" : "#666" }}
                    />
                    <span className="text-white">
                      {isOnline ? "Online" : "Offline"}
                    </span>
                    <span className="text-[#666]">&middot;</span>
                    <span className="text-[#999]">{time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="full_name"
                      className="block text-xs text-[#555] uppercase tracking-[0.15em] mb-2"
                    >
                      Name *
                    </label>
                    <input
                      required
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={handleChange}
                      className={inputClasses}
                      style={{ borderColor: "#333" }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs text-[#555] uppercase tracking-[0.15em] mb-2"
                    >
                      Phone *
                    </label>
                    <input
                      required
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses}
                      style={{ borderColor: "#333" }}
                      placeholder="+91 ..."
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs text-[#555] uppercase tracking-[0.15em] mb-2"
                  >
                    Email *
                  </label>
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    style={{ borderColor: "#333" }}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs text-[#555] uppercase tracking-[0.15em] mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`${inputClasses} resize-none`}
                    style={{ borderColor: "#333" }}
                    placeholder="Tell me about your project, role, or idea..."
                  />
                </div>

                {/* Status messages */}
                {status === "success" && (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded text-sm"
                    style={{ backgroundColor: "rgba(74, 222, 128, 0.1)", border: "1px solid rgba(74, 222, 128, 0.2)" }}
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="#4ade80" strokeWidth="2" />
                      <path d="M8 12l2.5 2.5L16 9" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#4ade80]">
                      Message sent successfully. I&apos;ll get back to you soon.
                    </span>
                  </div>
                )}
                {status === "error" && (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded text-sm"
                    style={{ backgroundColor: "rgba(248, 113, 113, 0.1)", border: "1px solid rgba(248, 113, 113, 0.2)" }}
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="#f87171" strokeWidth="2" />
                      <path d="M12 8v4M12 16h.01" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="text-[#f87171]">
                      Something went wrong. Please try again or email me directly.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center gap-2 px-8 py-3 border text-sm text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderColor: "#444", borderRadius: "2px" }}
                  onMouseEnter={(e) => {
                    if (status !== "sending") {
                      e.currentTarget.style.backgroundColor = "#fff";
                      e.currentTarget.style.color = "#141414";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#fff";
                  }}
                >
                  {status === "sending" && (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  <span className="text-xs">&#x21a6;</span>
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

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
            <p>Based in New Delhi,</p>
            <p>India</p>
            <p className="text-[#666] mt-2">28.61&deg; N, 77.21&deg; E</p>
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
