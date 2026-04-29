"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function AnalyticsGate() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const sync = () => {
      const v = window.localStorage.getItem("cookie_consent");
      setAccepted(v === "accepted");
    };
    sync();
    window.addEventListener("cookie_consent_changed", sync);
    return () => window.removeEventListener("cookie_consent_changed", sync);
  }, []);

  if (!accepted) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
