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
  cardImage?: string;
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
    cardImage: "/images/work/dh1.png",
    cardTitle: "Measuremint — AI-Powered Talent Intelligence Platform",
    cardDescription:
      "Voice-first career agent for high-volume markets. ElevenLabs + Claude for AI interviews, semantic matching via pgvector. Per-candidate cost from $5 to $0.15.",
    cardStat: "95%",
    cardStatLabel: "Cost reduction",
    cardGradient:
      "linear-gradient(135deg, #1a1a2a 0%, #1a1530 40%, #15102a 70%, #201a35 100%)",
    cardAccent: "#a78bfa",
    tags: ["AI/ML", "Voice AI", "Talent Tech", "PostgreSQL", "Python"],
    demoLink: "https://bit.ly/measuremint-early-demo",
    demoLabel: "View Early Demo",
    before: {
      headline: "The $5 Problem: When Every Candidate Costs a Fortune",
      body: [
        "It was 2024, and high-volume hiring markets in India were drowning. A single job posting could attract 2,000 to 20,000 applicants. At $5 per candidate for basic screening, evaluating 10,000 applicants cost $50,000 before a single hire was made.",
        "Recruiters were reading CVs by the thousand. Phone screens consumed weeks. The best candidates\u2014the ones who could articulate their thinking, not just list their credentials\u2014were buried under an avalanche of paper. The entire pipeline was optimised for volume, not signal.",
      ],
    },
    after: {
      headline: "Voice-First AI Interviews Cut Screening Costs by 95%",
      body: [
        "Measuremint replaced the manual grind with a three-tier evaluation funnel: automated CV parsing, an asynchronous voice challenge, and a full 10-minute AI interview powered by ElevenLabs and Claude. PostgreSQL with pgvector handles semantic matching across the entire candidate pool.",
        "Per-candidate cost dropped from $5 to $0.15\u2014a 95% reduction at scale. Candidates get a richer, more human experience. Recruiters get signal, not noise.",
      ],
    },
  },
  {
    slug: "ml-research-talent-map",
    name: "ML Research Talent Map",
    techStack: "Python, Vector Embeddings, Elasticsearch, ICLR/ICML/CVPR Data",
    cardImage: "/images/work/tech1.jpg",
    cardTitle: "ML Research Talent Map \u2014 50K Profiles, Sub-100ms Search",
    cardDescription:
      "Built a 50,000-profile ML research talent map from 5 years of top-tier conference proceedings with semantic search via vector embeddings.",
    cardStat: "50K",
    cardStatLabel: "Researcher profiles",
    cardGradient:
      "linear-gradient(135deg, #0d1a2a 0%, #0a1525 40%, #121f30 70%, #0d1520 100%)",
    cardAccent: "#4ade80",
    tags: ["Data Engineering", "NLP", "Vector Search", "Python", "Elasticsearch"],
    before: {
      headline: "50,000 Researchers, Zero Map: The Invisible Talent Pool",
      body: [
        "Five years of ICLR, ICML, and CVPR proceedings. Tens of thousands of researchers publishing cutting-edge work in machine learning. And yet no systematic way to find who among them was interested in AI safety, available for new roles, or a match for a specific lab\u2019s needs.",
        "Sourcing meant manual keyword searches, trawling Google Scholar pages, and maintaining sprawling spreadsheets that went stale within weeks. Labs were hiring from networks, not from the full landscape of available talent.",
      ],
    },
    after: {
      headline: "Semantic Search Across 50K Profiles in Under 100 Milliseconds",
      body: [
        "Built a 50,000-profile ML research talent map from five years of top-tier conference proceedings. Each profile is enriched with publication history, co-author networks, and research vectors.",
        "A two-stage candidate matching system using vector embeddings delivers sub-100ms semantic search. Recruiters can now query by research area, methodology, or even the conceptual neighbourhood of a specific paper\u2014and get ranked results in the time it takes to blink.",
      ],
    },
  },
  {
    slug: "talent-index-jd-fingerprinting",
    name: "Talent Index & JD Fingerprinting",
    techStack: "Python, AHP Framework, NLP, Data Visualisation",
    cardImage: "/images/work/jd1.png",
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
    cardImage: "/images/work/ga1.png",
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
    cardImage: "/images/work/pipeline.png",
    techStack: "Python, Claude API, Airtable, Anthropic Batches API",
    cardTitle: "AI Candidate Screening — Signal-Based Evaluation at Scale",
    cardDescription:
      "Automated two-stage screening pipeline: Claude evaluates candidates against configurable binary signals, then deterministic tier logic shortlists the top performers.",
    cardStat: "50%",
    cardStatLabel: "Cost savings via batching",
    cardGradient:
      "linear-gradient(135deg, #1a1520 0%, #201525 40%, #1a1028 70%, #251a30 100%)",
    cardAccent: "#c084fc",
    tags: ["AI/ML", "Claude API", "Airtable", "Python", "Recruitment"],
    before: {
      headline: "Manual Screening Doesn\u2019t Scale When Every Signal Matters",
      body: [
        "Hiring for AI safety roles requires evaluating candidates across dozens of nuanced dimensions\u2014alignment research intuition, policy fluency, technical depth, publication quality. Each signal demands careful reading of CVs, LinkedIn profiles, GitHub repos, and personal websites. A single recruiter screening 200 candidates against 15 signals is looking at 3,000 individual judgement calls.",
        "The process was slow, inconsistent, and expensive. Different reviewers weighted the same evidence differently. Re-screening when role requirements shifted meant starting from scratch. And the best candidates\u2014the ones who clear every bar\u2014were buried in the same queue as everyone else.",
      ],
    },
    after: {
      headline: "Two-Stage Pipeline: LLM Signals, Then Deterministic Shortlisting",
      body: [
        "Stage one uses Claude to evaluate each candidate against configurable binary signals\u2014pass, fail, or unknown\u2014with evidence citations drawn from assembled context: Airtable profiles, CV PDFs, LinkedIn data, GitHub, and personal websites. Signal definitions live in Airtable as the source of truth. Evaluations can be scoped by role, run in batch mode via Anthropic\u2019s Batches API for 50% cost savings, or executed synchronously for quick iterations.",
        "Stage two is pure threshold math. Role configs define three tiers\u2014hard requirements (all must pass), core competencies (configurable threshold), and differentiators (configurable threshold)\u2014and the shortlister applies them deterministically against existing verdicts. No API calls, fully auditable, free to re-run whenever requirements change. The two stages are decoupled: evaluate incrementally, shortlist on demand.",
      ],
    },
  },
  {
    slug: "recruiting-data-infrastructure",
    cardImage: "/images/work/techops.png",
    name: "Recruiting Data Infrastructure",
    techStack:
      "Cloud SQL, BigQuery, Elasticsearch, LinkedIn Recruiter RSC, Python, Anthropic MCP",
    cardTitle: "Recruiting Infrastructure \u2014 80K Records, One Pipeline",
    cardDescription:
      "Scalable recruiting infrastructure: Cloud SQL, BigQuery, Elasticsearch. 100+ data sources harvested into an 80K-record dataset at >90% accuracy.",
    cardStat: "80K",
    cardStatLabel: "Records unified",
    cardGradient:
      "linear-gradient(135deg, #151520 0%, #1a1a28 40%, #12121f 70%, #181825 100%)",
    cardAccent: "#60a5fa",
    tags: ["Data Infra", "Cloud SQL", "BigQuery", "Elasticsearch", "MCP"],
    before: {
      headline: "100 Data Sources, No Single Source of Truth",
      body: [
        "Candidate data was everywhere and nowhere. Conference attendee lists in CSV files. GitHub profiles bookmarked in browsers. Codeforces rankings in spreadsheets. Olympiad results in PDFs. Over 100 data sources, each in its own format, none talking to the others.",
        "Deduplication was manual. A single candidate might appear five times across three systems. There was no way to search, rank, or triage at scale. The recruiting team was spending more time wrangling data than evaluating talent.",
      ],
    },
    after: {
      headline: "80,000 Records at 90%+ Accuracy\u2014One Unified Pipeline",
      body: [
        "Built a scalable recruiting infrastructure: Cloud SQL for transactional data, BigQuery for analytics, Elasticsearch for full-text and faceted search. Integrated LinkedIn Recruiter RSC for seamless platform interop.",
        "Python scrapers harvest 100+ data sources\u2014conferences, Olympiads, GitHub, Codeforces\u2014producing an 80K-record dataset at greater than 90% field-level accuracy. Now piloting LLM-assisted candidate triage via Anthropic\u2019s Model Context Protocol for the next step: intelligent, automated first-pass review.",
      ],
    },
  },
];
