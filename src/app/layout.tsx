import type { Metadata } from "next";
import { Playfair_Display, EB_Garamond, Oswald } from "next/font/google";
import "./globals.css";
import "./broadsheet.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  weight: ["400", "500", "700"],
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Agrawal Dispatch — Varun Agrawal",
  description:
    "Technical Recruiter, Tool Builder, and AI Governance specialist. 7+ years sourcing top 1% STEM talent for frontier AI labs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${garamond.variable} ${oswald.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
