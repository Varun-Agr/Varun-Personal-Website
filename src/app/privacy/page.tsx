"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { setConsent, getConsent } from "../components/CookieConsent";
import { useEffect, useState } from "react";

const FONT = "var(--font-google-sans), sans-serif";

export default function PrivacyPage() {
  const [currentChoice, setCurrentChoice] = useState<string>("Not set");

  useEffect(() => {
    const sync = () => {
      const c = getConsent();
      setCurrentChoice(c === null ? "Not set" : c === "accepted" ? "Accepted" : "Declined");
    };
    sync();
    window.addEventListener("cookie_consent_changed", sync);
    return () => window.removeEventListener("cookie_consent_changed", sync);
  }, []);

  return (
    <div
      className="min-h-screen text-[#e5e5e5] relative"
      style={{ backgroundColor: "#141414", fontFamily: FONT }}
    >
      <Navbar />

      <section className="px-6 pt-12 lg:pt-20 pb-16">
        <div className="max-w-[760px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors duration-300 mb-10"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1
            className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white font-medium mb-3"
            style={{ fontFamily: FONT }}
          >
            Privacy Policy
          </h1>
          <p className="text-[#666] text-sm mb-12">Last updated: 29 April 2026</p>

          <div className="space-y-10 text-[#bbb] text-base leading-relaxed">
            <section>
              <p>
                This site is a personal portfolio. I keep data collection to
                what is strictly needed to run the site and respond to people
                who reach out. This page explains what is collected, how it is
                used, and how you can control it.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl mb-3" style={{ fontFamily: FONT }}>
                What I collect
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-white">Contact form submissions.</strong>{" "}
                  When you submit either form on the{" "}
                  <Link href="/contact" className="text-[#4ade80] underline underline-offset-2">
                    contact page
                  </Link>
                  , the fields you fill in (name, email, phone or company
                  details, and your message) are sent to a Google Sheet I own
                  and trigger an email notification to me. This data is only
                  used to reply to you.
                </li>
                <li>
                  <strong className="text-white">Anonymous analytics.</strong>{" "}
                  If you accept on the consent banner, the site loads Vercel
                  Analytics and Speed Insights. These collect aggregated page
                  views, referrers, and performance metrics. They do not use
                  cookies, do not collect personal data, and IP addresses are
                  hashed and discarded by Vercel. If you decline, neither
                  script is loaded.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl mb-3" style={{ fontFamily: FONT }}>
                Cookies and local storage
              </h2>
              <p className="mb-3">
                The site does not set advertising or tracking cookies. The only
                client-side storage used is a single browser{" "}
                <code className="text-[#4ade80] text-sm">localStorage</code>{" "}
                entry that records whether you accepted or declined analytics,
                so the banner does not reappear on every page. You can clear it
                from the controls below or by clearing your browser's site
                data.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl mb-3" style={{ fontFamily: FONT }}>
                Third parties
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-white">Vercel</strong> — hosting,
                  analytics, and performance monitoring.{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4ade80] underline underline-offset-2"
                  >
                    Vercel privacy policy
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-white">Google (Apps Script + Sheets)</strong>{" "}
                  — receives form submissions when you fill in the contact form.{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4ade80] underline underline-offset-2"
                  >
                    Google privacy policy
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl mb-3" style={{ fontFamily: FONT }}>
                How long I keep your data
              </h2>
              <p>
                Form submissions are kept for as long as I need them to follow
                up — typically up to 24 months. You can ask for your record to
                be deleted at any time by emailing{" "}
                <a
                  href="mailto:hello@varunagrawal.com"
                  className="text-[#4ade80] underline underline-offset-2"
                >
                  hello@varunagrawal.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl mb-3" style={{ fontFamily: FONT }}>
                Your rights
              </h2>
              <p className="mb-3">
                Depending on where you live (GDPR in the EU/EEA/UK, CCPA in
                California, DPDP Act in India, and similar regimes elsewhere),
                you have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>access a copy of the data I hold about you,</li>
                <li>ask for corrections,</li>
                <li>request deletion,</li>
                <li>withdraw consent for analytics at any time,</li>
                <li>object to processing or request portability.</li>
              </ul>
              <p className="mt-3">
                Email{" "}
                <a
                  href="mailto:hello@varunagrawal.com"
                  className="text-[#4ade80] underline underline-offset-2"
                >
                  hello@varunagrawal.com
                </a>{" "}
                and I will respond within a reasonable timeframe.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl mb-3" style={{ fontFamily: FONT }}>
                International transfers
              </h2>
              <p>
                Vercel and Google may store data on servers outside your
                country. Both operate under standard contractual clauses and
                publish their own GDPR/UK-GDPR documentation linked above.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl mb-3" style={{ fontFamily: FONT }}>
                Children
              </h2>
              <p>
                This site is not directed at children under 16 and I do not
                knowingly collect data from them.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl mb-3" style={{ fontFamily: FONT }}>
                Changes to this policy
              </h2>
              <p>
                If anything here changes meaningfully, I will update the date
                at the top of this page. Material changes that affect existing
                consent will trigger the banner again.
              </p>
            </section>

            <section
              className="border-t pt-8 mt-12"
              style={{ borderColor: "#2a2a2a" }}
            >
              <h2 className="text-white text-xl mb-3" style={{ fontFamily: FONT }}>
                Manage your preferences
              </h2>
              <p className="mb-4 text-sm">
                Current choice:{" "}
                <span className="text-white">{currentChoice}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setConsent("accepted")}
                  className="px-5 py-2.5 text-sm border transition-all duration-300 hover:bg-[#4ade80] hover:text-[#141414]"
                  style={{ borderColor: "#4ade80", color: "#4ade80", borderRadius: "2px" }}
                >
                  Accept analytics
                </button>
                <button
                  type="button"
                  onClick={() => setConsent("declined")}
                  className="px-5 py-2.5 text-sm border text-[#999] hover:bg-[#222] hover:text-white transition-all duration-300"
                  style={{ borderColor: "#444", borderRadius: "2px" }}
                >
                  Decline analytics
                </button>
                <button
                  type="button"
                  onClick={() => setConsent(null)}
                  className="px-5 py-2.5 text-sm border text-[#888] hover:bg-[#222] hover:text-white transition-all duration-300"
                  style={{ borderColor: "#333", borderRadius: "2px" }}
                >
                  Reset (show banner again)
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-white text-xl mb-3" style={{ fontFamily: FONT }}>
                Contact
              </h2>
              <p>
                Varun Agrawal &middot;{" "}
                <a
                  href="mailto:hello@varunagrawal.com"
                  className="text-[#4ade80] underline underline-offset-2"
                >
                  hello@varunagrawal.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
