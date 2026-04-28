"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FONT_SANS, C } from "../theme";
import Navbar from "../components/Navbar";

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

export default function ContactPage() {
  const { time, isOnline } = useIST();
  const [activeTab, setActiveTab] = useState<"companies" | "talent">("companies");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [companyFormData, setCompanyFormData] = useState({
    contact_name: "",
    designation: "",
    company_name: "",
    company_url: "",
    email: "",
    message: "",
  });

  // Handle hash-based tab selection
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "talent") setActiveTab("talent");
    else if (hash === "companies") setActiveTab("companies");
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanyFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const params = new URLSearchParams({
      form_type: "company",
      contact_name: companyFormData.contact_name,
      designation: companyFormData.designation,
      company_name: companyFormData.company_name,
      company_url: companyFormData.company_url,
      email: companyFormData.email,
      message: companyFormData.message,
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
        setCompanyFormData({ contact_name: "", designation: "", company_name: "", company_url: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full bg-transparent border-b text-base py-3 outline-none transition-colors duration-300 placeholder:opacity-40 focus:border-[#4ade80]";

  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{ backgroundColor: C.bg, color: C.text, fontFamily: FONT_SANS }}
    >
      <Navbar activePage="contact" />

      {/* ──────────── CONTENT ──────────── */}
      <main id="main-content" className="flex-1 px-6 pt-12 lg:pt-20 pb-20 lg:pb-32">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
            {/* Left: heading + info */}
            <div>
              <h1
                className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] mb-6"
                style={{ fontFamily: FONT_SANS, color: C.text }}
              >
                Get in touch
              </h1>
              <p className="text-base leading-relaxed mb-10 max-w-[480px]" style={{ color: C.textMuted }}>
                Have a role to fill, a research collaboration in mind, or just
                want to connect? I&apos;ll get back to you.
              </p>

              <div className="space-y-6 text-sm">
                <div>
                  <p className="uppercase tracking-[0.15em] text-xs mb-2" style={{ color: C.textDim }}>Email</p>
                  <a
                    href="mailto:hello@varunagrawal.com"
                    className="transition-colors duration-300"
                    style={{ color: C.text }}
                  >
                    hello[AT]varunagrawal[DOT]com
                  </a>
                </div>
                <div>
                  <p className="uppercase tracking-[0.15em] text-xs mb-2" style={{ color: C.textDim }}>LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/varun-agrawal-b3367a31/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 inline-block"
                    style={{ color: C.text }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                <div>
                  <p className="uppercase tracking-[0.15em] text-xs mb-2" style={{ color: C.textDim }}>Location</p>
                  <p style={{ color: C.textMuted }}>India</p>
                  <p className="mt-1 hidden md:block" style={{ color: C.textDim }}>28.61&deg; N, 77.21&deg; E</p>
                </div>
                <div>
                  <p className="uppercase tracking-[0.15em] text-xs mb-2" style={{ color: C.textDim }}>Status</p>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: isOnline ? C.accent : C.textDim }}
                    />
                    <span style={{ color: C.text }}>
                      {isOnline ? "Online" : "Offline"}
                    </span>
                    <span aria-hidden="true" style={{ color: C.textDim }}>&middot;</span>
                    <span style={{ color: C.textMuted }}>{time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div>
              {/* Tab switcher */}
              <div className="flex gap-0 mb-10 border-b" style={{ borderColor: C.border }}>
                <button
                  onClick={() => { setActiveTab("companies"); setStatus("idle"); }}
                  className="px-5 py-3 text-sm transition-colors duration-300 -mb-px"
                  style={{
                    color: activeTab === "companies" ? C.accent : C.textMuted,
                    borderBottom: activeTab === "companies" ? `2px solid ${C.accent}` : "2px solid transparent",
                  }}
                >
                  For Organisations
                </button>
                <button
                  onClick={() => { setActiveTab("talent"); setStatus("idle"); }}
                  className="px-5 py-3 text-sm transition-colors duration-300 -mb-px"
                  style={{
                    color: activeTab === "talent" ? C.accent : C.textMuted,
                    borderBottom: activeTab === "talent" ? `2px solid ${C.accent}` : "2px solid transparent",
                  }}
                >
                  For Candidates
                </button>
              </div>

              {/* Company form */}
              {activeTab === "companies" && (
                <form onSubmit={handleCompanySubmit} className="space-y-8" id="companies">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="contact_name"
                        className="block text-xs uppercase tracking-[0.15em] mb-2"
                        style={{ color: C.textDim }}
                      >
                        Name *
                      </label>
                      <input
                        required
                        id="contact_name"
                        name="contact_name"
                        type="text"
                        value={companyFormData.contact_name}
                        onChange={handleCompanyChange}
                        className={inputClasses}
                        style={{ borderColor: C.borderLight, color: C.text }}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="designation"
                        className="block text-xs uppercase tracking-[0.15em] mb-2"
                        style={{ color: C.textDim }}
                      >
                        Designation *
                      </label>
                      <input
                        required
                        id="designation"
                        name="designation"
                        type="text"
                        value={companyFormData.designation}
                        onChange={handleCompanyChange}
                        className={inputClasses}
                        style={{ borderColor: C.borderLight, color: C.text }}
                        placeholder="e.g. Head of Talent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="company_name"
                        className="block text-xs uppercase tracking-[0.15em] mb-2"
                        style={{ color: C.textDim }}
                      >
                        Organisation *
                      </label>
                      <input
                        required
                        id="company_name"
                        name="company_name"
                        type="text"
                        value={companyFormData.company_name}
                        onChange={handleCompanyChange}
                        className={inputClasses}
                        style={{ borderColor: C.borderLight, color: C.text }}
                        placeholder="Organisation name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company_url"
                        className="block text-xs uppercase tracking-[0.15em] mb-2"
                        style={{ color: C.textDim }}
                      >
                        Organisation URL
                      </label>
                      <input
                        id="company_url"
                        name="company_url"
                        type="url"
                        value={companyFormData.company_url}
                        onChange={handleCompanyChange}
                        className={inputClasses}
                        style={{ borderColor: C.borderLight, color: C.text }}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company_email"
                      className="block text-xs uppercase tracking-[0.15em] mb-2"
                      style={{ color: C.textDim }}
                    >
                      Email *
                    </label>
                    <input
                      required
                      id="company_email"
                      name="email"
                      type="email"
                      value={companyFormData.email}
                      onChange={handleCompanyChange}
                      className={inputClasses}
                      style={{ borderColor: C.borderLight, color: C.text }}
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company_message"
                      className="block text-xs uppercase tracking-[0.15em] mb-2"
                      style={{ color: C.textDim }}
                    >
                      Message *
                    </label>
                    <textarea
                      required
                      id="company_message"
                      name="message"
                      value={companyFormData.message}
                      onChange={handleCompanyChange}
                      rows={5}
                      className={`${inputClasses} resize-none`}
                      style={{ borderColor: C.borderLight, color: C.text }}
                      placeholder="Tell me about the role or engagement you have in mind..."
                    />
                  </div>

                  {status === "success" && (
                    <div
                      role="alert"
                      className="flex items-center gap-3 px-4 py-3 rounded text-sm"
                      style={{ backgroundColor: `${C.accent}1a`, border: `1px solid ${C.accent}33` }}
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke={C.accent} strokeWidth="2" />
                        <path d="M8 12l2.5 2.5L16 9" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ color: C.accent }}>
                        Message sent successfully. I&apos;ll get back to you soon.
                      </span>
                    </div>
                  )}
                  {status === "error" && (
                    <div
                      role="alert"
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
                    className="flex items-center gap-2 px-8 py-3 border text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4ade80] hover:text-[#141414] focus:bg-[#4ade80] focus:text-[#141414]"
                    style={{ borderColor: C.accent, borderRadius: "2px", color: C.accent }}
                  >
                    {status === "sending" && (
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )}
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}

              {/* Talent form */}
              {activeTab === "talent" && (
                <form onSubmit={handleSubmit} className="space-y-8" id="talent">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="full_name"
                        className="block text-xs uppercase tracking-[0.15em] mb-2"
                        style={{ color: C.textDim }}
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
                        style={{ borderColor: C.borderLight, color: C.text }}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs uppercase tracking-[0.15em] mb-2"
                        style={{ color: C.textDim }}
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
                        style={{ borderColor: C.borderLight, color: C.text }}
                        placeholder="+91 ..."
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-[0.15em] mb-2"
                      style={{ color: C.textDim }}
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
                      style={{ borderColor: C.borderLight, color: C.text }}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-[0.15em] mb-2"
                      style={{ color: C.textDim }}
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
                      style={{ borderColor: C.borderLight, color: C.text }}
                      placeholder="Tell me about your project, role, or idea..."
                    />
                  </div>

                  {status === "success" && (
                    <div
                      role="alert"
                      className="flex items-center gap-3 px-4 py-3 rounded text-sm"
                      style={{ backgroundColor: `${C.accent}1a`, border: `1px solid ${C.accent}33` }}
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke={C.accent} strokeWidth="2" />
                        <path d="M8 12l2.5 2.5L16 9" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ color: C.accent }}>
                        Message sent successfully. I&apos;ll get back to you soon.
                      </span>
                    </div>
                  )}
                  {status === "error" && (
                    <div
                      role="alert"
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
                    className="flex items-center gap-2 px-8 py-3 border text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4ade80] hover:text-[#141414] focus:bg-[#4ade80] focus:text-[#141414]"
                    style={{ borderColor: C.accent, borderRadius: "2px", color: C.accent }}
                  >
                    {status === "sending" && (
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )}
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ──────────── SEPARATOR ──────────── */}
      <div className="w-full border-t" style={{ borderColor: C.border }} />

      {/* ──────────── FOOTER ──────────── */}
      <footer className="px-6">
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
            <div className="flex items-center gap-3 text-sm" aria-live="polite" aria-atomic="true">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full" aria-hidden="true" style={{ backgroundColor: isOnline ? C.accent : C.textDim }} />
                <span style={{ color: C.text }}>({isOnline ? "Online" : "Offline"})</span>
              </span>
              <span style={{ color: C.textMuted }}>Now, {time}</span>
            </div>
          </div>
          <div className="text-sm lg:text-right space-y-1" style={{ color: C.textMuted }}>
            <p>Based in New Delhi</p>
            <p className="mt-2 hidden md:block" style={{ color: C.textDim }}>28.61&deg; N, 77.21&deg; E</p>
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

        <div className="py-8 overflow-hidden" aria-hidden="true">
          <p
            className="text-[clamp(5rem,18vw,16rem)] leading-none tracking-[-0.02em] whitespace-nowrap select-none"
            style={{ fontFamily: FONT_SANS, color: C.border }}
          >
            Varun Agrawal
          </p>
        </div>
      </footer>
    </div>
  );
}
