"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie_consent";
type Consent = "accepted" | "declined" | null;

export function setConsent(value: Consent) {
  if (typeof window === "undefined") return;
  if (value === null) {
    window.localStorage.removeItem(STORAGE_KEY);
  } else {
    window.localStorage.setItem(STORAGE_KEY, value);
  }
  window.dispatchEvent(new Event("cookie_consent_changed"));
}

export function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => setVisible(getConsent() === null);
    sync();
    window.addEventListener("cookie_consent_changed", sync);
    return () => window.removeEventListener("cookie_consent_changed", sync);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 sm:right-auto sm:max-w-md z-[10000] p-5 border bg-[#1a1a1a]"
      style={{ borderColor: "#2a2a2a", borderRadius: "4px" }}
    >
      <p className="text-sm leading-relaxed mb-4 text-[#ccc]">
        This site uses privacy-friendly analytics (Vercel) to count page views
        and measure performance. No advertising cookies, no profiling. A small
        preference is stored locally to remember your choice. See the{" "}
        <Link
          href="/privacy"
          className="text-[#4ade80] underline underline-offset-2 hover:text-white transition-colors duration-300"
        >
          privacy policy
        </Link>
        .
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setConsent("accepted")}
          className="flex-1 px-4 py-2 text-sm border transition-all duration-300 hover:bg-[#4ade80] hover:text-[#141414]"
          style={{ borderColor: "#4ade80", color: "#4ade80", borderRadius: "2px" }}
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => setConsent("declined")}
          className="flex-1 px-4 py-2 text-sm border text-[#999] hover:bg-[#222] hover:text-white transition-all duration-300"
          style={{ borderColor: "#444", borderRadius: "2px" }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
