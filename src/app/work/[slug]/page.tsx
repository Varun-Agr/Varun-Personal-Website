import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "../../projects";
import Navbar from "../../components/Navbar";
import ImageCarousel from "../../components/ImageCarousel";

const FONT = "var(--font-google-sans), sans-serif";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div
      className="min-h-screen text-[#e5e5e5]"
      style={{ backgroundColor: "#141414", fontFamily: FONT }}
    >
      <Navbar activePage="work" />

      {/* ──────── HERO ──────── */}
      <section className="px-6 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Back link */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors duration-300 mb-12"
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
            Back to Index
          </Link>

          {/* Two-column hero: right-aligned content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16">
            {/* Left: visual */}
            <ImageCarousel
              images={project.cardImage}
              alt={project.name}
              gradient={project.cardGradient}
              accent={project.cardAccent}
              stat={project.cardStat}
              statLabel={project.cardStatLabel}
            />

            {/* Right: info */}
            <div className="flex flex-col justify-center">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-[#888] mb-4">
                <span>Projects</span>
                <span className="text-[#555]">/</span>
                <span className="text-[#ccc]">{project.name}</span>
              </div>

              {/* Title */}
              <h1
                className="text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] tracking-[-0.02em] text-white font-medium mb-6"
                style={{ fontFamily: FONT }}
              >
                {project.cardTitle}
              </h1>

              {/* Description */}
              <p className="text-[#aaa] text-base leading-relaxed mb-8">
                {project.cardDescription}
              </p>

              {/* Tech stack */}
              <div className="text-sm text-[#666] mb-6">
                <span className="text-[#888]">Technologies:</span>{" "}
                {project.techStack}
              </div>

              {/* Tags */}
              <div className="mb-6">
                <p className="text-sm text-[#888] font-medium mb-3">
                  Project Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs text-[#ccc] border rounded"
                      style={{ borderColor: "#333" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Demo link */}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border text-sm text-white hover:bg-white hover:text-[#141414] transition-all duration-300 self-start"
                  style={{ borderColor: "#444", borderRadius: "2px" }}
                >
                  <span className="text-xs">&#x21a6;</span>
                  {project.demoLabel || "View Live"}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ──────── SEPARATOR ──────── */}
      <div
        className="w-full border-t"
        style={{ borderColor: "#222" }}
      />

      {/* ──────── BEFORE / AFTER ──────── */}
      <section className="px-6 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          {/* Before */}
          <div>
            <div
              className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase mb-6 rounded"
              style={{
                backgroundColor: "rgba(248, 113, 113, 0.12)",
                color: "#f87171",
              }}
            >
              Before
            </div>
            <h2
              className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.2] text-white font-medium mb-6"
              style={{ fontFamily: FONT }}
            >
              {project.before.headline}
            </h2>
            <div className="space-y-4">
              {project.before.body.map((para, i) => (
                <p
                  key={i}
                  className="text-[#aaa] text-base leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* After */}
          <div>
            <div
              className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase mb-6 rounded"
              style={{
                backgroundColor: "rgba(74, 222, 128, 0.12)",
                color: "#4ade80",
              }}
            >
              After
            </div>
            <h2
              className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.2] text-white font-medium mb-6"
              style={{ fontFamily: FONT }}
            >
              {project.after.headline}
            </h2>
            <div className="space-y-4">
              {project.after.body.map((para, i) => (
                <p
                  key={i}
                  className="text-[#aaa] text-base leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────── SEPARATOR ──────── */}
      <div
        className="w-full border-t"
        style={{ borderColor: "#222" }}
      />

      {/* ──────── NEXT PROJECT ──────── */}
      {(() => {
        const idx = projects.findIndex((p) => p.slug === slug);
        const next = projects[(idx + 1) % projects.length];
        return (
          <section className="px-6 py-16 lg:py-24">
            <div className="max-w-[1400px] mx-auto">
              <p className="text-sm text-[#666] uppercase tracking-widest mb-6">
                Next Project
              </p>
              <Link
                href={`/work/${next.slug}`}
                className="group block"
              >
                <h3
                  className="text-[clamp(1.4rem,3vw,2.4rem)] text-white font-medium group-hover:text-[#4ade80] transition-colors duration-300"
                  style={{ fontFamily: FONT }}
                >
                  {next.name}
                  <span className="inline-block ml-3 text-[#666] group-hover:translate-x-2 transition-transform duration-300">
                    &rarr;
                  </span>
                </h3>
                <p className="text-[#888] text-base mt-2 max-w-[600px]">
                  {next.cardDescription}
                </p>
              </Link>
            </div>
          </section>
        );
      })()}

      {/* ──────── FOOTER ──────── */}
      <footer className="px-6 border-t" style={{ borderColor: "#222" }}>
        <div className="max-w-[1400px] mx-auto py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
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
      </footer>
    </div>
  );
}
