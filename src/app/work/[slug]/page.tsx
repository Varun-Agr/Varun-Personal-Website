import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "../../projects";
import { FONT_SANS, FONT_SERIF, C } from "../../theme";

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
      className="min-h-screen"
      style={{ backgroundColor: C.bg, color: C.text, fontFamily: FONT_SANS }}
    >
      {/* ──────── NAV ──────── */}
      <nav
        className="flex items-center justify-between px-6 py-4 border-b max-w-[1400px] mx-auto"
        style={{ borderColor: C.border }}
      >
        <Link
          href="/"
          className="text-sm tracking-[0.2em] hover:opacity-70 transition-opacity"
          style={{ fontFamily: FONT_SERIF, fontStyle: "italic", color: C.text }}
        >
          Varun Agrawal
        </Link>
        <Link
          href="/contact"
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 border text-sm transition-all duration-300"
          style={{ borderColor: C.borderLight, borderRadius: "2px", color: C.accent }}
        >
          Let&apos;s Work Together
        </Link>
      </nav>

      {/* ──────── HERO ──────── */}
      <section className="px-6 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Back link */}
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-300 mb-12"
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
            Back to Index
          </Link>

          {/* Two-column hero */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16">
            {/* Left: visual */}
            <div
              className="aspect-[4/3] rounded-lg overflow-hidden relative"
              style={{ background: project.cardGradient }}
            >
              {project.cardImage ? (
                <img
                  src={project.cardImage}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div
                      className="text-6xl font-bold"
                      style={{ color: `${project.cardAccent}33` }}
                    >
                      {project.cardStat}
                    </div>
                    <div
                      className="text-sm tracking-widest uppercase"
                      style={{ color: `${project.cardAccent}55` }}
                    >
                      {project.cardStatLabel}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: info */}
            <div className="flex flex-col justify-center">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm mb-4" style={{ color: C.textMuted }}>
                <span>Projects</span>
                <span style={{ color: C.textDim }}>/</span>
                <span style={{ color: C.text }}>{project.name}</span>
              </div>

              {/* Title */}
              <h1
                className="text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] tracking-[-0.02em] mb-6"
                style={{ fontFamily: FONT_SERIF, color: C.text }}
              >
                {project.cardTitle}
              </h1>

              {/* Description */}
              <p className="text-base leading-relaxed mb-8" style={{ color: C.textMuted }}>
                {project.cardDescription}
              </p>

              {/* Tech stack */}
              <div className="text-sm mb-6" style={{ color: C.textDim }}>
                <span style={{ color: C.textMuted }}>Technologies:</span>{" "}
                {project.techStack}
              </div>

              {/* Tags */}
              <div className="mb-6">
                <p className="text-sm mb-3" style={{ color: C.textMuted }}>
                  Project Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs border rounded"
                      style={{ borderColor: C.borderLight, color: C.textMuted }}
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 border text-sm transition-all duration-300 self-start"
                  style={{ borderColor: C.accent, borderRadius: "2px", color: C.accent }}
                >
                  {project.demoLabel || "View Live"} &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ──────── SEPARATOR ──────── */}
      <div className="w-full border-t" style={{ borderColor: C.border }} />

      {/* ──────── BEFORE / AFTER ──────── */}
      <section className="px-6 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
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
              className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.2] mb-6"
              style={{ fontFamily: FONT_SERIF, color: C.text }}
            >
              {project.before.headline}
            </h2>
            <div className="space-y-4">
              {project.before.body.map((para, i) => (
                <p key={i} className="text-base leading-relaxed" style={{ color: C.textMuted }}>
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
                backgroundColor: `${C.accent}1a`,
                color: C.accent,
              }}
            >
              After
            </div>
            <h2
              className="text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.2] mb-6"
              style={{ fontFamily: FONT_SERIF, color: C.text }}
            >
              {project.after.headline}
            </h2>
            <div className="space-y-4">
              {project.after.body.map((para, i) => (
                <p key={i} className="text-base leading-relaxed" style={{ color: C.textMuted }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────── SEPARATOR ──────── */}
      <div className="w-full border-t" style={{ borderColor: C.border }} />

      {/* ──────── NEXT PROJECT ──────── */}
      {(() => {
        const idx = projects.findIndex((p) => p.slug === slug);
        const next = projects[(idx + 1) % projects.length];
        return (
          <section className="px-6 py-16 lg:py-24">
            <div className="max-w-[1400px] mx-auto">
              <p className="text-sm uppercase tracking-widest mb-6" style={{ color: C.textDim }}>
                Next Project
              </p>
              <Link
                href={`/work/${next.slug}`}
                className="group block"
              >
                <h3
                  className="text-[clamp(1.4rem,3vw,2.4rem)] transition-colors duration-300"
                  style={{ fontFamily: FONT_SERIF, color: C.text }}
                >
                  {next.name}
                  <span
                    className="inline-block ml-3 group-hover:translate-x-2 transition-transform duration-300"
                    style={{ color: C.textDim }}
                  >
                    &rarr;
                  </span>
                </h3>
                <p className="text-base mt-2 max-w-[600px]" style={{ color: C.textMuted }}>
                  {next.cardDescription}
                </p>
              </Link>
            </div>
          </section>
        );
      })()}

      {/* ──────── FOOTER ──────── */}
      <footer className="px-6 border-t" style={{ borderColor: C.border }}>
        <div className="max-w-[1400px] mx-auto py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
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
      </footer>
    </div>
  );
}
