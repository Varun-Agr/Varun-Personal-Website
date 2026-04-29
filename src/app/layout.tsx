import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import AnalyticsGate from "./components/AnalyticsGate";
import CookieConsent from "./components/CookieConsent";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://varunagrawal.com";
const SITE_TITLE = "Varun Agrawal — Technical Recruiter & Tool Builder";
const SITE_DESCRIPTION =
  "Technical recruiter and tool builder. 8+ years sourcing and placing researchers and engineers across AI, ML, and deep-tech — including UK AISI, FAR.AI, and Apollo Research.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Varun Agrawal",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Varun Agrawal",
  authors: [{ name: "Varun Agrawal", url: SITE_URL }],
  creator: "Varun Agrawal",
  keywords: [
    "Varun Agrawal",
    "Technical Recruiter",
    "AI Recruiter",
    "ML Recruiter",
    "AI Safety",
    "AI Governance",
    "Talent Sourcing",
    "AISI",
    "FAR.AI",
    "Apollo Research",
    "Secure AI Futures Lab",
    "SteadRise",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", sizes: "any" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Varun Agrawal",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Varun Agrawal — Technical Recruiter & Tool Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Varun Agrawal",
  url: SITE_URL,
  image: `${SITE_URL}/images/og-image.jpg`,
  jobTitle: "Technical Recruiter & Tool Builder",
  description: SITE_DESCRIPTION,
  email: "mailto:hello@varunagrawal.com",
  worksFor: [
    { "@type": "Organization", name: "SteadRise", url: "https://steadrise.org" },
    {
      "@type": "Organization",
      name: "Secure AI Futures Lab",
      url: "https://secureaifutureslab.com",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/varun-agrawal-b3367a31/",
    "https://varunagrawal.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jakarta.variable}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AnalyticsGate />
        <CookieConsent />
      </body>
    </html>
  );
}
