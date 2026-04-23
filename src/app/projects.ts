export interface Project {
  slug: string;
  name: string;
  techStack: string;
  cardTitle: string;
  cardDescription: string;
  cardStat: string;
  cardStatLabel: string;
  cardGradient: string;
  cardAccent: string;
  cardImage?: string[];
  tags: string[];
  year: string;
  demoLink?: string;
  demoLabel?: string;
  before: { headline: string; body: string[] };
  after: { headline: string; body: string[] };
}

export const projects: Project[] = [
  {
    slug: "measuremint",
    name: "Measuremint",
    techStack: "ElevenLabs, Claude, PostgreSQL, pgvector, Python",
    cardImage: ["/images/work/dh1.png"],
    cardTitle: "Measuremint - AI-Powered Talent Intelligence Platform",
    cardDescription:
      "Voice-first career agent for high-volume markets. ElevenLabs + Claude for AI interviews and semantic similarity for matching. Solves sourcing and AI-driven talent identification at scale.",
    cardStat: "10K+ candidates",
    cardStatLabel: "Candidates processed",
    cardGradient:
      "linear-gradient(135deg, #1a1a2a 0%, #1a1530 40%, #15102a 70%, #201a35 100%)",
    cardAccent: "#a78bfa",
    tags: ["AI/ML", "Voice AI", "Talent Tech", "PostgreSQL", "Python"],
    demoLink: "https://bit.ly/measuremint-early-demo",
    demoLabel: "View ",
    year: "2025",
    before: {
      headline: "High-Volume Hiring: Too Many Applicants, No Way to Find Signal",
      body: [
        "A single job posting in India's tech market can attract 2,000 to 20,000 applicants. Recruiters were reading CVs by the thousand and running phone screens for weeks. The best candidates\u2014the ones who could articulate their thinking, not just list credentials\u2014were buried under volume.",
        "The entire pipeline was optimised for throughput, not signal. There was no scalable way to identify who was genuinely strong versus who simply had the right keywords on their resume.",
      ],
    },
    after: {
      headline: "AI-Driven Sourcing and Identification at Scale",
      body: [
        "Measuremint replaced the manual grind with a three-tier evaluation funnel: automated CV parsing, an asynchronous voice challenge, and a full 10-minute AI interview powered by ElevenLabs and Claude. PostgreSQL with pgvector handles semantic matching across the entire candidate pool.",
        "The system surfaces genuine signal from thousands of applicants\u2014identifying candidates who can think and communicate, not just those with the right keywords. Recruiters spend time on the strongest candidates instead of triaging the full volume.",
      ],
    },
  },
  {
    slug: "ml-research-talent-map",
    name: "ML Research Talent Map",
    techStack: "Python, Vector Embeddings, ICLR/ICML/CVPR Data, Apify",
    cardImage: ["/images/work/tech1.jpg"],
    cardTitle: "ML Research Talent Map \u2014 50K Researcher Profiles",
    cardDescription:
      "Scraped and structured 50,000 ML researcher profiles from 5 years of ICLR, ICML, and CVPR proceedings. Searchable by research area via vector embeddings.",
    cardStat: "50K profiles",
    cardStatLabel: "Researcher profiles",
    cardGradient:
      "linear-gradient(135deg, #0d1a2a 0%, #0a1525 40%, #121f30 70%, #0d1520 100%)",
    cardAccent: "#4ade80",
    year: "2024",
    tags: ["Data Engineering", "NLP", "Vector Search", "Python", "Apify"],
    before: {
      headline: "No Structured Way to Search ML Research Talent",
      body: [
        "Five years of ICLR, ICML, and CVPR proceedings contained tens of thousands of researchers, but there was no structured dataset linking them to their research areas, affiliations, or co-author networks.",
        "Sourcing relied on manual keyword searches across Google Scholar and spreadsheets that went stale quickly. Labs were hiring from personal networks rather than the full landscape of available researchers.",
      ],
    },
    after: {
      headline: "50K Profiles Scraped, Structured, and Searchable",
      body: [
        "Scraped and structured 50,000 ML researcher profiles from five years of top-tier conference proceedings. Each profile includes publication history, co-author networks, and research area tags.",
        "Added a search layer using vector embeddings so recruiters can query by research area or methodology and get ranked results. The dataset is kept up to date as new proceedings are published.",
      ],
    },
  },
  {
    slug: "talent-index-jd-fingerprinting",
    name: "Talent Index & JD Fingerprinting",
    techStack: "Python, NLP, Data Visualisation",
    cardImage: ["/images/work/jd1.jpg"],
    cardTitle: "Weighted Talent Index & JD Fingerprinting",
    cardDescription:
      "A data science project that analyses 106 job descriptions across 10 skill dimensions to build a unified view of how different roles compare — improving how we calibrate candidates against actual market demand.",
    cardStat: "106 JDs fingerprinted",
    cardStatLabel: "JDs fingerprinted",
    cardGradient:
      "linear-gradient(135deg, #1a2520 0%, #0d201a 40%, #152520 70%, #1a201a 100%)",
    cardAccent: "#34d399",
    tags: ["Analytics", "NLP", "Python", "Data Viz"],
    year: "2025",
    before: {
      headline: "106 Job Descriptions, No Common Language",
      body: [
        "Every organisation writes job descriptions differently. One emphasises alignment instincts, another foregrounds policy-aware engineering, a third looks for mechanistic interpretability depth. Comparing roles across these teams meant reading each JD manually, guessing at what skills actually mattered, and hoping your intuition held.",
        "Without a shared framework, we couldn\u2019t benchmark roles against each other or calibrate what \u2018senior\u2019 meant across different contexts. Skill evaluation was subjective and inconsistent.",
      ],
    },
    after: {
      headline: "A Unified View of Roles That Improved Calibration",
      body: [
        "Engineered a weighted Talent Index scoring framework and a JD fingerprinting tool that breaks job descriptions into 10 skill dimensions. 106 JDs across 13 organisations were processed, fingerprinted, and clustered.",
        "This gave us a much more unified view of how roles compare across different teams and organisations, which directly improved how we calibrate any given candidate\u2019s skills objectively for different types of positions. Instead of subjective reads on individual JDs, we had a structured baseline to evaluate against.",
      ],
    },
  },
  {
    slug: "ai-candidate-screening-pipeline",
    name: "AI Candidate Screening Pipeline",
    cardImage: ["/images/work/pipeline.jpg"],
    techStack: "Python, Claude API, Metaview, Juicebox",
    cardTitle: "AI Candidate Screening — Signal-Based Evaluation at Scale",
    cardDescription:
      "Automated two-stage screening pipeline: Claude evaluates candidates against configurable binary signals, then deterministic tier logic shortlists the top performers.",
    cardStat: "Batched evaluation",
    cardStatLabel: "Async Claude API screening",
    cardGradient:
      "linear-gradient(135deg, #1a1520 0%, #201525 40%, #1a1028 70%, #251a30 100%)",
    cardAccent: "#c084fc",
    year: "2026",
    tags: ["Claude API", "Metaview", "Juicebox", "Python", "LLM Evaluation"],
    before: {
      headline: "Likert Scales Don\u2019t Force Real Decisions",
      body: [
        "We historically evaluated candidates using 1\u20135 Likert ratings on Airtable. The problem: reviewers gravitated toward average scores to avoid making difficult calls, or because the evidence wasn\u2019t clear-cut. A candidate rated 3/5 on \u201ctechnical depth\u201d tells you almost nothing\u2014it\u2019s a hedge, not a signal.",
        "The scores were also hard to compare across roles and organizations. What counts as a 4 for one reviewer is a 3 for another. Re-screening when requirements changed meant re-reading every profile and re-calibrating the same ambiguous scale.",
      ],
    },
    after: {
      headline: "Binary Signals: Pass, Fail, or Unknown\u2014No Middle Ground",
      body: [
        "Replaced Likert scales with binary signal evaluation. Each candidate is scored against specific, testable variables\u2014has_shipped_python_in_production, has_published_at_top_20_conference, has_completed_cs_phd\u2014with three possible verdicts: pass, fail, or unknown. Claude evaluates each signal with evidence citations drawn from CVs, LinkedIn, GitHub, and personal websites.",
        "Binary signals are definitive and actionable\u2014no room for fence-sitting. General variables like has_completed_cs_phd work across roles and orgs, while role-specific ones can be added as needed. The result: a recruiter can scan a candidate\u2019s signal profile and immediately see who to shortlist, without re-reading source material or second-guessing ambiguous ratings.",
      ],
    },
  },
  {
    slug: "recruiting-data-infrastructure",
    cardImage: ["/images/work/ga1.png"],
    name: "Recruiting Data Infrastructure",
    techStack:
      "Cloud SQL, Cloud Run, LinkedIn Recruiter RSC, Python, Anthropic MCP",
    cardTitle: "Recruiting Infrastructure \u2014 80K Records, One Pipeline",
    cardDescription:
      "Scalable recruiting infrastructure: Cloud SQL, Cloud Run. 100+ data sources harvested into an 80K-record dataset at >90% accuracy.",
    cardStat: "80K records",
    cardStatLabel: "Records unified",
    cardGradient:
      "linear-gradient(135deg, #151520 0%, #1a1a28 40%, #12121f 70%, #181825 100%)",
    cardAccent: "#60a5fa",
    year: "2024",
    tags: ["Data Infra", "Cloud SQL", "Cloud Run", "MCP"],
    before: {
      headline: "100 Data Sources, No Single Source of Truth",
      body: [
        "Candidate data was everywhere and nowhere. Conference attendee lists in CSV files. GitHub profiles bookmarked in browsers. Codeforces rankings in spreadsheets. Olympiad results in PDFs. Over 100 data sources, each in its own format, none talking to the others.",
        "Deduplication was manual. A single candidate might appear five times across three systems. There was no way to search, rank, or triage at scale. The recruiting team was spending more time wrangling data than evaluating talent.",
      ],
    },
    after: {
      headline: "80,000 Records at 90%+ Accuracy - One Unified Pipeline",
      body: [
        "Built a scalable recruiting infrastructure: Cloud SQL for transactional data, Cloud Run for everything else. Integrated LinkedIn Recruiter RSC for seamless platform interop.",
        "Python scrapers harvest 100+ data sources - conferences, Olympiads, GitHub, Codeforces - producing an 80K-record dataset at greater than 90% field-level accuracy. Now piloting LLM-assisted candidate triage via Anthropic\u2019s Model Context Protocol for the next step: intelligent, automated first-pass review.",
      ],
    },
  },
  {
    slug: "india-ai-report",
    name: "India AI Tracker",
    techStack: "Research, Data Analysis, Policy Tracking, Stakeholder Mapping",
    cardImage: ["/images/work/indiaai.jpg"],
    cardTitle: "India AI Tracker — Tracking a Rising AI Market",
    cardDescription:
      "Dedicated tracker covering governance discussions, stakeholder decisions, investment trends, and technological developments across the Indian AI ecosystem.",
    cardStat: "50+ stakeholders",
    cardStatLabel: "Stakeholders tracked",
    cardGradient:
      "linear-gradient(135deg, #1a1520 0%, #1a1025 40%, #201530 70%, #151025 100%)",
    cardAccent: "#f472b6",
    tags: ["AI Governance", "Policy", "India", "Research", "Ecosystem"],
    demoLink: "https://indiaaitracker.com",
    demoLabel: "Visit Site",
    year: "2025",
    before: {
      headline: "India's AI Landscape: Fragmented Signals, No Single View",
      body: [
        "India is emerging as a major supplier of AI talent globally, but tracking its AI ecosystem was nearly impossible. Government policy discussions, university research output, startup funding rounds, and regulatory moves were scattered across dozens of sources in different formats and languages.",
        "International labs and investors had no coherent picture of India's AI trajectory. Decisions about where to hire, invest, or partner were based on anecdotes and outdated reports rather than real-time intelligence.",
      ],
    },
    after: {
      headline: "A Living Intelligence Layer for India's AI Ecosystem",
      body: [
        "Built a dedicated India AI tracker that aggregates governance discussions, stakeholder decisions, investment trends, and technological developments into a single, continuously updated view. Covers 50+ stakeholders across government, academia, and industry.",
        "The report has become a reference for international organizations evaluating India as a talent source and research partner. It surfaces patterns — like which IITs are producing alignment-adjacent research, or which state governments are investing in AI infrastructure — that would otherwise take months of manual research to uncover.",
      ],
    },
  },
  {
    slug: "big-tech-layoff-monitor",
    name: "Indirect Talent Sourcing Channel",
    techStack: "Next.js, GraphQL, Reddit API, GitHub API, HackerNews API, Google CSE",
    cardImage: ["/images/work/layoff.jpg"],
    cardTitle: "Indirect Talent Sourcing Channel (WIP)",
    cardDescription:
      "Monitors public signals across Reddit, GitHub, HackerNews, and Google CSE to rapidly surface experienced engineers entering the market during workforce transitions — feeding structured leads into downstream recruiting workflows.",
    cardStat: "100 signal sources",
    cardStatLabel: "Signal sources",
    cardGradient:
      "linear-gradient(135deg, #1a1a1a 0%, #1f1a15 40%, #1a1510 70%, #201a10 100%)",
    cardAccent: "#fbbf24",
    year: "2026",
    tags: ["Next.js", "GraphQL", "APIs", "Sourcing", "Data Aggregation"],
    before: {
      headline: "Workforce Transitions Create a Hidden Talent Pool",
      body: [
        "When major tech companies restructure, experienced engineers, ML researchers, and infrastructure specialists re-enter the market all at once. But there's no central directory — these individuals surface across LinkedIn updates, Reddit threads, personal blogs, and forum posts over days and weeks.",
        "Without a systematic way to aggregate these signals, recruiters miss the window entirely. The highest-density talent pool in any given quarter was effectively invisible to the teams that needed it most.",
      ],
    },
    after: {
      headline: "Public Signals Aggregated into a Structured Sourcing Pipeline",
      body: [
        "Building a monitoring system that cross-references seven public signal sources — Reddit threads, GitHub activity patterns, HackerNews posts, Google Custom Search results, LinkedIn public updates, company announcements, and news APIs — to assemble candidate-level profiles from what would otherwise be noise. Each signal is weighted and deduplicated to produce high-confidence leads.",
        "The output feeds directly into existing talent map and outreach workflows, letting recruiters filter by company, role type, seniority, and recency. The goal: turn a workforce transition event into a searchable pipeline of proven engineers within days, not weeks.",
      ],
    },
  },
  {
    slug: "india-alignment-fellowship",
    name: "India Alignment Research Fellowship",
    techStack: "Program Design, Campus Recruiting, Technical Evaluation",
    cardTitle: "India's First Alignment Research Fellowship",
    cardDescription:
      "Founded India's first Alignment Research Fellowship. Built a pipeline of 600+ applicants across 40 STEM universities, selected 24 (top 4%); 10 papers now published or under review.",
    cardStat: "600+ applicants",
    cardStatLabel: "Across 40 STEM universities",
    cardGradient:
      "linear-gradient(135deg, #1a1a20 0%, #25201a 40%, #2a1f15 70%, #20150f 100%)",
    cardAccent: "#fb923c",
    tags: ["Program Design", "Campus Recruiting", "AI Safety", "India"],
    year: "2023",
    before: {
      headline: "India's Top STEM Talent Was Invisible to AI Safety Research",
      body: [
        "India produces thousands of world-class CS, physics, and math graduates each year from the IITs, CMI, ISI, and IISc — the same talent pool that quant firms and big-tech compete for aggressively. Yet almost none of this talent was flowing into AI safety and alignment research, the field most likely to shape how AI develops over the next decade.",
        "There was no structured pathway: no fellowship, no campus presence, no credible on-ramp. Students interested in the field had to self-teach, self-fund, and find mentors abroad — and most didn't.",
      ],
    },
    after: {
      headline: "600+ Applicants, 24 Fellows, 10 Published Papers",
      body: [
        "Founded India's first Alignment Research Fellowship. Secured $65K to pilot a 9-month program and led a 10-person campus recruiting pod across 40 STEM universities. Evaluated a 1,000-member pool of top-decile CS/Physics/Math students on algorithms, ML theory, and research interest; built placement channels at IITs, CMI, ISI, and IISc to tap CS toppers and specialised STEM researchers typically recruited by quant firms.",
        "600+ applicants, 24 selected (top 4%), across 3 moonshot tracks spanning interpretability, LLM robustness, scalable oversight, model evaluations, and responsible AI. 10 fellow papers are now published or under review, and 5 fellows are pursuing research independently or at labs like the Mila-Quebec AI Institute. The initiative was acquired by SteadRise in 2023.",
      ],
    },
  },
  {
    slug: "talent-graph-engine",
    name: "Talent Graph Engine",
    techStack: "Graph Database, Vector Embeddings, RAG, Python, React",
    cardImage: ["/images/work/networkengine.jpg"],
    cardTitle: "Talent Graph Engine \u2014 100K+ STEM Profiles, One Connected View",
    cardDescription:
      "A graph-based intelligence platform that connects 100K+ STEM and academic profiles across 500+ public sources. In-degree/out-degree analysis, shortest-path algorithms, and a RAG layer for natural language queries over the entire network.",
    cardStat: "100K+ profiles",
    cardStatLabel: "Profiles connected",
    cardGradient:
      "linear-gradient(135deg, #0f1a1a 0%, #0a1f1f 40%, #0d2626 70%, #112020 100%)",
    cardAccent: "#2dd4bf",
    year: "2026",
    tags: ["Graph Engine", "Search Engine", "Vector Database", "RAG", "Large-Scale Data Processing", "Graph Algorithms"],
    before: {
      headline: "Global STEM Talent Is Scattered Across Hundreds of Disconnected Sources",
      body: [
        "Researchers and engineers don\u2019t live in a single database. Their signal is spread across conference proceedings, university pages, patent filings, GitHub profiles, lab websites, and dozens of other public sources \u2014 none of which talk to each other. A recruiter trying to understand who works on what, who trained under whom, or which lab is producing strong candidates in a specific subfield has to piece it together manually.",
        "The relationships matter as much as the individuals. Knowing that a candidate co-authored with a well-published researcher, or moved from a research lab to a startup, reveals quality and trajectory that a keyword search on a CV never will. But without a connected view, those patterns stay invisible.",
      ],
    },
    after: {
      headline: "One Connected Graph Across 500+ Sources, Queryable in Plain English",
      body: [
        "Scraped and structured data from 500+ public sources into a unified graph of 100K+ STEM and academic profiles. Each node \u2014 person, lab, company, institution \u2014 is linked by co-authorship, affiliation, advisory relationships, and career transitions. A graph UI lets users visually explore research and industrial connections across people, groups, labs, and companies.",
        "In-degree and out-degree analysis surfaces hidden influencers and talent clusters. Shortest-path, minimum spanning tree, and other graph algorithms identify specific skills and talent concentrations across the network. A RAG integration resolves unstructured natural language queries \u2014 ask \u201Cwho are the strongest mechanistic interpretability researchers who\u2019ve published at ICML and have industry experience?\u201D and get ranked results with full end-to-end profile data: education, work history, skills, achievements, awards, and a SWOT analysis per profile.",
      ],
    },
  },
];
