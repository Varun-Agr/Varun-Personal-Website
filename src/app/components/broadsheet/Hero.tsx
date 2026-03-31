import { getImgPath } from "@/utils/image";
import Image from "next/image";

const Hero = () => {
  return (
    <section id="front-page" className="hero">
      <div className="hero__grid">
        {/* ── Column 1: Portrait ────────────────────── */}
        <div>
          <div className="hero__portrait-frame">
            <Image
              src={getImgPath("/images/home/banner/VA.png")}
              alt="Varun Agrawal — portrait"
              width={400}
              height={450}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
          <div className="hero__portrait-name">Varun Agrawal</div>
          <div className="hero__portrait-title">
            Co-CEO, Impact Academy &middot; Co-Founder, SAFL
          </div>

          <div className="hero__stats-box">
            <div className="hero__stats-header">Field Notes</div>
            <ul className="hero__stats-list">
              <li>
                <span>Candidates Sourced</span>
                <span>4,200+</span>
              </li>
              <li>
                <span>Hires Enabled</span>
                <span>45+</span>
              </li>
              <li>
                <span>Partner Labs</span>
                <span>13</span>
              </li>
              <li>
                <span>PhD Placements</span>
                <span>5</span>
              </li>
              <li>
                <span>Yrs. Experience</span>
                <span>7+</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Column rule ───────────────────────────── */}
        <div className="bs-column-rule" />

        {/* ── Column 2: Lead Story ──────────────────── */}
        <div className="hero__lead">
          <div className="bs-slug">Biographical Dispatch</div>
          <h2 className="hero__lead-headline">
            The Recruiter Who Ships Code: A&nbsp;Profile in Talent
            Infrastructure
          </h2>
          <div className="hero__lead-byline">
            By Varun Agrawal &middot; Self-Reported &middot; New Delhi, 2026
          </div>

          <div className="bs-body bs-drop-cap">
            When most recruiters reach for LinkedIn, Varun Agrawal reaches for a
            Python script. As Co-CEO of Impact Academy and Co-Founder of the
            Secure AI Futures Lab, he has spent seven years building the
            infrastructure&mdash;human and technical&mdash;that connects the
            world&rsquo;s best researchers with the labs shaping the future of
            AI.
          </div>

          <div className="bs-body" style={{ marginTop: 14 }}>
            His work spans the full stack of talent operations: from scraping
            five years of ICLR and ICML proceedings to build a 50,000-profile
            research talent map, to directing a 30-person distributed team that
            cut time-to-offer from 65 to 30 days for frontier AI labs including
            Anthropic, the UK AI Safety Institute, and FAR.AI.
          </div>

          <div className="bs-pull-quote">
            &ldquo;I got tired of broken recruiting tools. So I built better
            ones.&rdquo;
          </div>

          <div className="bs-body">
            He founded India&rsquo;s first Alignment Research Fellowship, built
            Measuremint&mdash;an AI-powered talent intelligence platform that
            reduces per-candidate screening costs by 95%&mdash;and raised $250K+
            via Schmidt Sciences to advance AI governance capacity across India
            and the APAC region. When he isn&rsquo;t building talent
            infrastructure, he coaches researchers on career strategy through
            80,000 Hours.
          </div>
        </div>

        {/* ── Column rule ───────────────────────────── */}
        <div className="bs-column-rule" />

        {/* ── Column 3: Sidebar ─────────────────────── */}
        <div className="hero__sidebar-section">
          <div className="hero__sidebar-box">
            <div className="hero__sidebar-box-header">Areas of Coverage</div>
            <div className="hero__sidebar-box-body">
              <ul>
                <li>AI Safety &amp; Alignment Research</li>
                <li>Technical Talent Sourcing (&gt;98th pctl.)</li>
                <li>ML/AI Research Evaluation</li>
                <li>Data Infrastructure &amp; Pipelines</li>
                <li>Talent Analytics &amp; Scoring (AHP)</li>
                <li>AI Governance &amp; Policy</li>
                <li>Vector Search &amp; Semantic Matching</li>
                <li>LLM-assisted Candidate Triage</li>
              </ul>
            </div>
          </div>

          <div className="hero__special-edition">
            <div className="hero__special-edition-label">
              &#9733; Special Edition
            </div>
            <p>
              <strong>Measuremint</strong> &mdash; Voice-first AI interviews
              that cut screening costs from $5 to $0.15 per candidate.
            </p>
            <a href="#projects">See Projects Section &#8594;</a>
          </div>

          <div className="hero__corrections">
            <div className="hero__corrections-header">
              Corrections &amp; Clarifications
            </div>
            <p>
              A previous version of this recruiter did not know how to code.
              That version has been deprecated. The current edition ships
              production infrastructure.
            </p>
          </div>
        </div>
      </div>

      <div className="bs-ornament" style={{ paddingBottom: 8 }}>&#10087; &#10022; &mdash; &#10022; &#10087;</div>
      <hr className="bs-section-rule" />
    </section>
  );
};

export default Hero;
