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
      "Voice-first career agent for high-volume markets. ElevenLabs + Claude for AI interviews, semantic matching via pgvector. Solves sourcing and AI-driven talent identification at scale.",
    cardStat: "10K+",
    cardStatLabel: "Candidates processed",
    cardGradient:
      "linear-gradient(135deg, #1a1a2a 0%, #1a1530 40%, #15102a 70%, #201a35 100%)",
    cardAccent: "#a78bfa",
    tags: ["AI/ML", "Voice AI", "Talent Tech", "PostgreSQL", "Python"],
    demoLink: "https://bit.ly/measuremint-early-demo",
    demoLabel: "View Early Demo",
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
    cardImage: ["/images/work/tech1.jpg", "/images/work/techops.png"],
    cardTitle: "ML Research Talent Map \u2014 50K Researcher Profiles",
    cardDescription:
      "Scraped and structured 50,000 ML researcher profiles from 5 years of ICLR, ICML, and CVPR proceedings. Searchable by research area via vector embeddings.",
    cardStat: "50K",
    cardStatLabel: "Researcher profiles",
    cardGradient:
      "linear-gradient(135deg, #0d1a2a 0%, #0a1525 40%, #121f30 70%, #0d1520 100%)",
    cardAccent: "#4ade80",
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
    techStack: "Python, AHP Framework, NLP, Data Visualisation",
    cardImage: ["/images/work/jd1.png"],
    cardTitle: "Talent Index \u2014 AHP-Weighted Scoring for AI Roles",
    cardDescription:
      "JD fingerprinting tool that analyses job descriptions across 10 skill dimensions, creating a shared quantitative language for AI talent evaluation across 13 labs.",
    cardStat: "106",
    cardStatLabel: "JDs fingerprinted",
    cardGradient:
      "linear-gradient(135deg, #1a2520 0%, #0d201a 40%, #152520 70%, #1a201a 100%)",
    cardAccent: "#34d399",
    tags: ["Analytics", "NLP", "AHP", "Python", "Data Viz"],
    before: {
      headline: "106 Job Descriptions, No Common Language",
      body: [
        "Every AI lab writes job descriptions differently. Anthropic emphasises alignment instincts. UK AISI foregrounds policy-aware engineering. Goodfire looks for mechanistic interpretability depth. Comparing roles across these labs meant reading each JD manually, guessing at what skills actually mattered, and hoping your intuition held.",
        "Without a shared vocabulary, talent teams couldn\u2019t benchmark roles, candidates couldn\u2019t compare opportunities, and hiring managers couldn\u2019t articulate what \u2018senior\u2019 meant in their specific context.",
      ],
    },
    after: {
      headline: "AHP-Weighted Scoring Brings Order to a Fragmented Landscape",
      body: [
        "Engineered a Talent Index scoring framework using Analytic Hierarchy Process (AHP) weighting. Built a JD fingerprinting tool that analyses job descriptions across 10 skill dimensions\u2014creating a shared, quantitative language for AI talent evaluation.",
        "106 job descriptions from leading labs were processed, fingerprinted, and clustered. Hiring managers can now see exactly how their role compares to the market. Candidates can map their skills against real demand. And recruiters finally have a compass instead of a guess.",
      ],
    },
  },
  {
    slug: "alignment-research-fellowship",
    cardImage: ["/images/work/ga1.png"],
    name: "India\u2019s First Alignment Research Fellowship",
    techStack: "Python, Data Pipelines, Survey Infrastructure",
    cardTitle: "Alignment Research Fellowship \u2014 India\u2019s First",
    cardDescription:
      "Founded India\u2019s first Alignment Research Fellowship: 600+ applicants across 40 STEM universities, 24 selected (top 4%), 10 papers published or under review.",
    cardStat: "600+",
    cardStatLabel: "Applicants",
    cardGradient:
      "linear-gradient(135deg, #201a1a 0%, #2a1a1a 40%, #251515 70%, #1a1015 100%)",
    cardAccent: "#f87171",
    tags: ["AI Safety", "Research", "Fellowship", "India", "Pipeline"],
    before: {
      headline: "India\u2019s Missing Pipeline: Top Talent, No Pathway to Safety Research",
      body: [
        "India produces some of the world\u2019s sharpest CS, Physics, and Mathematics graduates. But in 2022, there was no structured pathway for any of them to enter AI safety research. No fellowship. No reading groups. No community. The talent existed\u2014scattered across 40+ STEM universities\u2014with no connective tissue.",
        "Labs abroad were hiring from the same handful of Western graduate programmes. An entire subcontinent of potential researchers was invisible to the field.",
      ],
    },
    after: {
      headline: "600 Applicants, 24 Selected, 10 Papers Published",
      body: [
        "Founded India\u2019s first Alignment Research Fellowship. Built a pipeline from scratch: 600+ applicants across 40 STEM universities, evaluated on algorithms, ML theory, and research aptitude. Selected 24 fellows\u2014a 4% acceptance rate\u2014and placed them in structured research tracks covering interpretability, LLM robustness, scalable oversight, and model evaluations.",
        "10 papers now published or under review. 5 fellows pursuing research independently or at labs like the Mila-Quebec AI Institute. The initiative was acquired by SteadRise and scaled globally.",
      ],
    },
  },
  {
    slug: "ai-candidate-screening-pipeline",
    name: "AI Candidate Screening Pipeline",
    cardImage: ["/images/work/pipeline.png"],
    techStack: "Python, Claude API, Metaview, Juicebox",
    cardTitle: "AI Candidate Screening — Signal-Based Evaluation at Scale",
    cardDescription:
      "Automated two-stage screening pipeline: Claude evaluates candidates against configurable binary signals, then deterministic tier logic shortlists the top performers.",
    cardStat: "50%",
    cardStatLabel: "Cost savings via batching",
    cardGradient:
      "linear-gradient(135deg, #1a1520 0%, #201525 40%, #1a1028 70%, #251a30 100%)",
    cardAccent: "#c084fc",
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
    cardStat: "80K",
    cardStatLabel: "Records unified",
    cardGradient:
      "linear-gradient(135deg, #151520 0%, #1a1a28 40%, #12121f 70%, #181825 100%)",
    cardAccent: "#60a5fa",
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
    name: "India AI Report",
    techStack: "Research, Data Analysis, Policy Tracking, Stakeholder Mapping",
    cardImage: ["/images/work/indiaai.png"],
    cardTitle: "India AI Report — Tracking a Rising AI Market",
    cardDescription:
      "Dedicated tracker covering governance discussions, stakeholder decisions, investment trends, and technological developments across the Indian AI ecosystem.",
    cardStat: "50+",
    cardStatLabel: "Stakeholders tracked",
    cardGradient:
      "linear-gradient(135deg, #1a1520 0%, #1a1025 40%, #201530 70%, #151025 100%)",
    cardAccent: "#f472b6",
    tags: ["AI Governance", "Policy", "India", "Research", "Ecosystem"],
    demoLink: "https://indiaaitracker.com",
    demoLabel: "Visit Site",
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
    name: "Big Tech Laid Off Employee Monitor",
    techStack: "Next.js, GraphQL, Reddit API, GitHub API, HackerNews API, Google CSE",
    cardImage: ["/images/work/layoff.png"],
    cardTitle: "Layoff Monitor - Surfacing Hidden Talent from Big Tech Cuts",
    cardDescription:
      "Aggregates indirect signals from Reddit, GitHub, HackerNews, and Google CSE to identify individual engineers affected by Big Tech layoffs — turning statistical headlines into actionable sourcing leads.",
    cardStat: "100",
    cardStatLabel: "Signal sources",
    cardGradient:
      "linear-gradient(135deg, #1a1a1a 0%, #1f1a15 40%, #1a1510 70%, #201a10 100%)",
    cardAccent: "#fbbf24",
    tags: ["Next.js", "GraphQL", "APIs", "Sourcing", "Data Aggregation"],
    before: {
      headline: "Big Tech Layoffs: Thousands of Names, Zero Visibility",
      body: [
        "When a major tech company lays off 10,000 employees, the world sees a headline and a number. What it doesn't see is who those people are. Companies never publish individual names. The talent — often deeply experienced engineers, ML researchers, and infrastructure specialists — scatters across LinkedIn updates, Reddit threads, and personal blogs.",
        "Recruiters hunting for this talent had no systematic way to find them. The signal was there, buried in public forums and social posts, but no one was aggregating it. The richest talent pool in any given quarter was effectively invisible.",
      ],
    },
    after: {
      headline: "Indirect Signals Turned into a Sourcing Pipeline",
      body: [
        "Built a monitoring system that aggregates indirect layoff signals from seven public sources: Reddit threads, GitHub activity changes, HackerNews posts, Google Custom Search results, LinkedIn public updates, company blog announcements, and news APIs. Each signal is cross-referenced to build candidate-level profiles from what would otherwise be statistical noise.",
        "Recruiters can now filter by company, role type, seniority, and recency — turning a mass layoff event into a structured, searchable pipeline of proven engineers within days of an announcement, not weeks.",
      ],
    },
  },
];
