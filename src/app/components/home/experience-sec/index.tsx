import React from 'react';

const ExperienceSec = () => {
    const experiences = [
        {
            year: "Impact Academy",
            title: "Co-Chief Executive Officer & Managing Director",
            company: "Mar 2024 - Now",
            type: "Singapore / India",
            description: "Scaled a from-scratch fellowship funnel to 4,200 warm ML, SWE, Quant candidates across 5 continents, sourcing >98th percentile candidates for 13 partner labs (e.g. Anthropic, the UK AISI, and FAR.AI)."
        },
        {
            year: "Impact Academy",
            title: "Head of Talent & Outreach",
            company: "Sep 2023 - Mar 2024",
            type: "Singapore / India",
            description: "Developed data-driven global talent strategy: ranked 150 countries on custom STEM/AI infrastructure index, pioneered \"Talent Identification Advisor\" model with 31 experts generating 12% of high-signal applications, and executed geo-targeted campaigns achieving 2.3x increase in qualified leads at 30% lower cost-per-acquisition."
        },
        {
            year: "India AI Safety Initiative",
            title: "Founder & Campus Recruiter",
            company: "Sep 2022 - Aug 2023",
            type: "New Delhi, India",
            description: "Led India's first Alignment Research Fellowship with $65k funding: recruited 600+ applicants from 40+ universities, selected 24 top candidates (4% acceptance rate) resulting in 10 publications, and managed campus recruiting for 3 programs that evaluated 1000+ STEM students, with 5 now pursuing research at leading AI labs."
        },
        {
            year: "Talent Consultancy Projects",
            title: "Senior Recruitment Consultant",
            company: "Mar 2021 - Aug 2022",
            type: "New Delhi, India",
            description: "Led talent recruitment operations for Atlas Fellowship India: managed 15-member team to connect with 60,000 students across 8,000 schools, sourcing 20 candidates with 5 selected; additionally supported UK operations and reviewed 500+ high-impact pitches for Future Forum."
        }
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
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-4 xl:gap-8 items-start relative">
                                <div className="">
                                    <h3 className="font-bold mb-2 text-black">{exp.year}</h3>
                                    <h4 className="text-lg font-normal">{exp.title}</h4>
                                </div>

                                <div className=" relative">
                                    {index < experiences.length && (
                                        <div className={`absolute left-0 top-3 w-px ${index < experiences.length - 1 ? 'h-40' : 'h-30'} bg-softGray`}></div>
                                    )}

                                    <div className="no-print absolute left-0 top-0 transform -translate-x-1/2">
                                        <div className={`no-print w-3.5 h-3.5 rounded-full border-1 bg-white flex items-center justify-center ${index === 1 ? 'border-primary' : 'border-black'
                                            }`}>
                                            {index === 0 && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pl-4 lg:pl-7">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xl text-black font-normal">{exp.company}</span>
                                        </div>
                                        <p className="text-base font-normal">{exp.type}</p>
                                    </div>
                                </div>

                                <div className="pl-8 sm:pl-0">
                                    <p className="leading-relaxed text-base">{exp.description}</p>
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