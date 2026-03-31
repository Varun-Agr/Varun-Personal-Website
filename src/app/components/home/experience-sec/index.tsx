import React from "react";
import Link from "next/link";

const ExperienceSec = () => {
  const experiences: {
    year: string;
    title: string;
    company: string;
    type: string;
    description: string;
    url?: string;
  }[] = [
    {
      year: "Secure AI Futures Lab (SAFL)",
      title: "Co-Founder",
      company: "Sep 2025 - Present",
      type: "India / Singapore",
      description:
        "Raised $250K+ via Schmidt Sciences' Science of Trustworthy AI program to advance research expertise and technical governance for beneficial AI in India and APAC.\n\nConvening multi-stakeholder dialogues across government, academia, and industry—led flagship summit and Trustworthy AI panel in Singapore with leaders from IIT Madras, NUS AI Institute, UNSW, and UC Berkeley.\n\nPartnering with early-career professors at top 5 IITs + IISc on AI for Science, Trustworthy AI, and AI for Social Good.",
    },
    {
      year: "Impact Academy",
      title: "Head of Talent & Technical Recruiting (Co-CEO since Jun 2025)",
      company: "Mar 2024 - Present",
      type: "Singapore / India",
      description:
        "Scaled an end-to-end recruiting funnel to 4,200 warm ML, SWE, and Quant candidates across 5 continents; sourcing >98th percentile talent for 13 partner labs (Anthropic, UK AISI, FAR.AI).\n\nEnabled 45+ hires and 5 funded research PhD placements; advising 30+ partners on talent strategy across AI labs, startups, and academic institutions.\n\nDirected a 30-person distributed team; cut time-to-offer from 65 to 30 days and cost-per-hire by 27%. Built a 50,000-profile ML research talent map with vector embeddings for semantic search across 500K+ profiles.",
    },
    {
      year: "Impact Academy",
      title: "VP of Talent & Program Director",
      company: "Sep 2023 - Mar 2024",
      type: "Singapore / India",
      description:
        "Pioneered the 'Talent Identification Advisor' model—11 regional experts + 20 junior collaborators embedded in elite tech communities—generating 12% of high-signal applications.\n\nRan geo-targeted employer brand campaigns at NeurIPS and top-tier universities; 2.3× lift in qualified pipeline at 30% lower cost-per-acquisition. Mapped India's top 80 tech campuses across 13 states via structured professor survey.",
    },
    {
      year: "India AI Safety Initiative",
      title: "Founder & Campus Recruiter",
      company: "Sep 2022 - Aug 2023",
      type: "New Delhi, India",
      description:
        "Founded India's first Alignment Research Fellowship: built a pipeline of 600+ applicants across 40 STEM universities; selected 24 (top 4%), with 10 papers now published or under review.\n\nLed a 10-person campus recruiting pod for 3 moonshot programs in interpretability, LLM robustness, and scalable oversight—evaluating 1,000+ top-decile CS/Physics/Math students.",
    },
    // {
    //   year: "Talent Consultancy Projects",
    //   title: "Senior Recruitment Consultant",
    //   company: "Mar 2021 - Aug 2022",
    //   type: "New Delhi, India",
    //   description:
    //     "Led India Atlas Fellowship search: managed 15-person team across data engineering, outreach, and relationship-building; reached 60K students at 8K schools, sourced 20 finalists (5 selected).\n\nReviewed 400+ high-EV pitches for the Future Forum; interviewed 90+ Southeast Asian STEM students on career preferences.",
    // },
    {
      year: "JPAL - City University of New York (CUNY)",
      title: "Senior Operations Manager",
      company: "Jul 2020 - Aug 2021",
      type: "India / US",
      description:
        "Built recruiting ops for research associates; led Health & Well-Being vertical sourcing, converting 31 interns to researchers (35% of annual hiring).\n\nDeveloped a virtual training academy (econometrics, IRB, survey protocols); cut onboarding from 4 weeks to 10 days, saving PIs 40+ hours/project.",
    },
    // {
    //   year: "Budhimaan Baccha",
    //   title: "Founder",
    //   url: "https://budhimaanbaccha.com/",
    //   company: "Nov 2019 - Jun 2020",
    //   type: "India / UK",
    //   description:
    //     "Founded a digital literacy nonprofit training 53 underprivileged students in ITeS services for back-office employment across India.",
    // },
    // {
    //   year: "Suvita (formerly Charity Science)",
    //   title: "Program Officer, Analytics & Talent Operations",
    //   company: "Mar 2018 - Oct 2019",
    //   type: "India / UK",
    //   description:
    //     "Built end-to-end talent operations and data infrastructure as a founding team member; expanded core team from founding to 15 via a 50-candidate evaluation process.\n\nDeveloped real-time M&E dashboards for vaccination outreach KPIs; cut monthly reporting time by 60%.",
    // },
  ];

  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
            <h2>Experience</h2>
          </div>

          <div className="space-y-7 md:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-4 xl:gap-8 items-start relative"
              >
                <div>
                  {exp.url ? (
                    <Link href={exp.url} className="text-secondary hover:text-underline">
                      <h3 className="font-bold mb-2 text-black">{exp.year}</h3>
                    </Link>
                  ) : (
                    <h3 className="font-bold mb-2 text-black">{exp.year}</h3>
                  )}
                  <h4 className="text-lg font-normal">{exp.title}</h4>
                </div>

                <div className=" relative">
                  {index < experiences.length && (
                    <div
                      className={`absolute left-0 top-3 w-px ${index < experiences.length - 1 ? "h-40" : "h-30"} bg-softGray`}
                    ></div>
                  )}

                  <div className="no-print absolute left-0 top-0 transform -translate-x-1/2">
                    <div
                      className={`no-print w-3.5 h-3.5 rounded-full border-1 bg-white flex items-center justify-center ${
                        index === 1 ? "border-primary" : "border-black"
                      }`}
                    >
                      {index === 0 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>

                  <div className="pl-4 lg:pl-7">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl text-black font-normal">
                        {exp.company}
                      </span>
                    </div>
                    <p className="text-base font-normal">{exp.type}</p>
                  </div>
                </div>

                <div className="pl-8 sm:pl-0">
                  <ul className="leading-relaxed text-base">
                    {exp.description.split("\n\n").map((item, index) => (
                      <li key={index} className="list-disc list-inside">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSec;
