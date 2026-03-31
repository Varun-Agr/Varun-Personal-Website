const projects = [
  {
    name: "Measuremint",
    techStack: "ElevenLabs, Claude, PostgreSQL, pgvector, Python",
    demoLink: "https://bit.ly/measuremint-early-demo",
    demoLabel: "View Early Demo",
    before: {
      headline:
        "The $5 Problem: When Every Candidate Costs a Fortune",
      body: [
        "It was 2024, and high-volume hiring markets in India were drowning. A single job posting could attract 2,000 to 20,000 applicants. At $5 per candidate for basic screening, evaluating 10,000 applicants cost $50,000 before a single hire was made.",
        "Recruiters were reading CVs by the thousand. Phone screens consumed weeks. The best candidates—the ones who could articulate their thinking, not just list their credentials—were buried under an avalanche of paper. The entire pipeline was optimised for volume, not signal.",
      ],
    },
    after: {
      headline:
        "Voice-First AI Interviews Cut Screening Costs by 95%",
      body: [
        "Measuremint replaced the manual grind with a three-tier evaluation funnel: automated CV parsing, an asynchronous voice challenge, and a full 10-minute AI interview powered by ElevenLabs and Claude. PostgreSQL with pgvector handles semantic matching across the entire candidate pool.",
        "Per-candidate cost dropped from $5 to $0.15—a 95% reduction at scale. Candidates get a richer, more human experience. Recruiters get signal, not noise.",
      ],
    },
  },
  {
    name: "ML Research Talent Map",
    techStack: "Python, Vector Embeddings, Elasticsearch, ICLR/ICML/CVPR Data",
    before: {
      headline:
        "50,000 Researchers, Zero Map: The Invisible Talent Pool",
      body: [
        "Five years of ICLR, ICML, and CVPR proceedings. Tens of thousands of researchers publishing cutting-edge work in machine learning. And yet no systematic way to find who among them was interested in AI safety, available for new roles, or a match for a specific lab's needs.",
        "Sourcing meant manual keyword searches, trawling Google Scholar pages, and maintaining sprawling spreadsheets that went stale within weeks. Labs were hiring from networks, not from the full landscape of available talent.",
      ],
    },
    after: {
      headline:
        "Semantic Search Across 500K Profiles in Under 100 Milliseconds",
      body: [
        "Built a 50,000-profile ML research talent map from five years of top-tier conference proceedings. Each profile is enriched with publication history, co-author networks, and research vectors.",
        "A two-stage candidate matching system using vector embeddings delivers sub-100ms semantic search across 500K+ profiles. Recruiters can now query by research area, methodology, or even the conceptual neighbourhood of a specific paper—and get ranked results in the time it takes to blink.",
      ],
    },
  },
  {
    name: "Talent Index & JD Fingerprinting",
    techStack: "Python, AHP Framework, NLP, Data Visualisation",
    before: {
      headline:
        "106 Job Descriptions, No Common Language",
      body: [
        "Every AI lab writes job descriptions differently. Anthropic emphasises alignment instincts. UK AISI foregrounds policy-aware engineering. Goodfire looks for mechanistic interpretability depth. Comparing roles across these labs meant reading each JD manually, guessing at what skills actually mattered, and hoping your intuition held.",
        "Without a shared vocabulary, talent teams couldn't benchmark roles, candidates couldn't compare opportunities, and hiring managers couldn't articulate what 'senior' meant in their specific context.",
      ],
    },
    after: {
      headline:
        "AHP-Weighted Scoring Brings Order to a Fragmented Landscape",
      body: [
        "Engineered a Talent Index scoring framework using Analytic Hierarchy Process (AHP) weighting. Built a JD fingerprinting tool that analyses job descriptions across 10 skill dimensions—creating a shared, quantitative language for AI talent evaluation.",
        "106 job descriptions from leading labs were processed, fingerprinted, and clustered. Hiring managers can now see exactly how their role compares to the market. Candidates can map their skills against real demand. And recruiters finally have a compass instead of a guess.",
      ],
    },
  },
  {
    name: "India's First Alignment Research Fellowship",
    techStack: "Python, Data Pipelines, Survey Infrastructure",
    before: {
      headline:
        "India's Missing Pipeline: Top Talent, No Pathway to Safety Research",
      body: [
        "India produces some of the world's sharpest CS, Physics, and Mathematics graduates. But in 2022, there was no structured pathway for any of them to enter AI safety research. No fellowship. No reading groups. No community. The talent existed—scattered across 40+ STEM universities—with no connective tissue.",
        "Labs abroad were hiring from the same handful of Western graduate programmes. An entire subcontinent of potential researchers was invisible to the field.",
      ],
    },
    after: {
      headline:
        "600 Applicants, 24 Selected, 10 Papers Published",
      body: [
        "Founded India's first Alignment Research Fellowship. Built a pipeline from scratch: 600+ applicants across 40 STEM universities, evaluated on algorithms, ML theory, and research aptitude. Selected 24 fellows—a 4% acceptance rate—and placed them in structured research tracks covering interpretability, LLM robustness, scalable oversight, and model evaluations.",
        "10 papers now published or under review. 5 fellows pursuing research independently or at labs like the Mila-Quebec AI Institute. The initiative was acquired by Impact Academy and scaled globally.",
      ],
    },
  },
  {
    name: "Recruiting Data Infrastructure",
    techStack:
      "Cloud SQL, BigQuery, Elasticsearch, LinkedIn Recruiter RSC, Python, Anthropic MCP",
    before: {
      headline:
        "100 Data Sources, No Single Source of Truth",
      body: [
        "Candidate data was everywhere and nowhere. Conference attendee lists in CSV files. GitHub profiles bookmarked in browsers. Codeforces rankings in spreadsheets. Olympiad results in PDFs. Over 100 data sources, each in its own format, none talking to the others.",
        "Deduplication was manual. A single candidate might appear five times across three systems. There was no way to search, rank, or triage at scale. The recruiting team was spending more time wrangling data than evaluating talent.",
      ],
    },
    after: {
      headline:
        "80,000 Records at 90%+ Accuracy—One Unified Pipeline",
      body: [
        "Built a scalable recruiting infrastructure: Cloud SQL for transactional data, BigQuery for analytics, Elasticsearch for full-text and faceted search. Integrated LinkedIn Recruiter RSC for seamless platform interop.",
        "Python scrapers harvest 100+ data sources—conferences, Olympiads, GitHub, Codeforces—producing an 80K-record dataset at greater than 90% field-level accuracy. Now piloting LLM-assisted candidate triage via Anthropic's Model Context Protocol for the next step: intelligent, automated first-pass review.",
      ],
    },
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="projects__header">
        <hr className="bs-double-rule" />
        <h2>Special Reports</h2>
        <hr className="bs-thin-rule" style={{ marginTop: 8 }} />
      </div>

      {projects.map((project, i) => (
        <div key={project.name}>
          <div className="project">
            <div className="project__title-bar">
              <h3>Special Report: {project.name}</h3>
            </div>

            <div className="project__grid">
              {/* BEFORE */}
              <div className="project__before">
                <div className="bs-slug bs-slug--red">Before</div>
                <h4 className="project__headline">{project.before.headline}</h4>
                {project.before.body.map((para, j) => (
                  <div
                    key={j}
                    className={`bs-body ${j === 0 ? "bs-drop-cap" : ""}`}
                    style={j > 0 ? { marginTop: 12 } : undefined}
                  >
                    {para}
                  </div>
                ))}
              </div>

              {/* DIVIDER */}
              <div className="project__divider">
                <div className="project__divider-stamp">Then<br />vs<br />Now</div>
              </div>

              {/* AFTER */}
              <div className="project__after">
                <div className="bs-slug">After</div>
                <h4 className="project__headline">{project.after.headline}</h4>
                {project.after.body.map((para, j) => (
                  <div
                    key={j}
                    className={`bs-body ${j === 0 ? "bs-drop-cap" : ""}`}
                    style={j > 0 ? { marginTop: 12 } : undefined}
                  >
                    {para}
                  </div>
                ))}

                {project.demoLink && (
                  <div className="project__breaking">
                    <div className="project__breaking-label">&#9889; Breaking</div>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.demoLabel || "View Live"} &#8594;
                    </a>
                  </div>
                )}

                <div className="project__source-credits">
                  Technologies: {project.techStack}
                </div>
              </div>
            </div>
          </div>

          {/* Ornamental divider between projects */}
          {i < projects.length - 1 && (
            <div className="bs-ornament">&mdash; &#10022; &mdash;</div>
          )}
        </div>
      ))}

      <div className="bs-ornament">&#10087; &#10022; &mdash; &#10022; &#10087;</div>
      <hr className="bs-section-rule" />
    </section>
  );
};

export default Projects;
