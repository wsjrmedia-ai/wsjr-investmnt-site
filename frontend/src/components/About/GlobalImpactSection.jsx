"use client";

import Image from "next/image";

export default function GlobalImpactSection() {
    const achievements = [
        "Achieved “Best Forex Academy in GCC – 2023”",
        "Contributed to building the Largest Forex Hub – 2024",
        "Golden Achievement Award – 2024",
        "Earned a Guinness World Record for mentoring students from 54+ nationalities in a single lesson",
        "Built a thriving community of 120 – 150 active monthly learners",
        "Conducted biweekly live trading sessions",
        "Organised workshops and events across multiple continents",
    ];

    return (
        <section className="bg-[#071E2F] text-white md:px-16 px-6 py-12 ">
            {/* Heading */}
            <span className="section-heading font-semibold ">
                Entrepreneurship & Global Impact
            </span>

            {/* Intro Paragraph */}
            <p className="text-white section-desc leading-relaxed mb-4 mt-10">
                From retail mentorship to institutional-level education, our founder's
                journey has had real-world impact in helping investors from all around
                the world
            </p>

            {/* Highlights */}
            <p className="text-gray-200 section-desc leading-relaxed mb-3">
                <span className="font-semibold">{">>"}</span> Founded TOPSTOCKS
                ASSOCIATES PVT LTD in India and Chicago, offering certified financial
                courses tailored for retail traders.
            </p>
            <p className="text-gray-200 section-desc leading-relaxed mb-8">
                <span className="font-semibold">{">>"}</span> In 2023, he associated
                with a Forex Academy in Dubai, contributing to the training of the next
                generation of disciplined and data-driven traders. The academy is
                licensed under KHDA (Knowledge and Human Development Authority), the
                regulatory body for education in the UAE reflecting a commitment to
                international standards.
            </p>

            {/* Subheading */}
            <p className="text-gray-300 section-desc mb-8">
                Within just a year, the academy:
            </p>

            {/* Timeline List */}
            <ul className="relative border-l border-white ml-2 pl-8 space-y-6">
                {achievements.map((point, index) => (
                    <li key={index} className="relative flex items-start">
                        {/* Circle marker (perfectly centered on line) */}
                        <span className="absolute -left-[38px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"></span>

                        {/* Text */}
                        <p className="text-white text-base md:text-lg leading-relaxed ">
                            {point}
                        </p>

                        {/* Add image for Guinness World Record point */}
                        {point.includes("Guinness World Record") && (
                            <Image
                                src="/about/mentor/guinness.png"
                                alt="Guinness World Record"
                                width={42}
                                height={42}
                                className="ml-4"
                            />
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
