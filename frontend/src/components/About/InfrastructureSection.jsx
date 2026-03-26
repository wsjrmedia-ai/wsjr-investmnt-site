"use client";

import GradientBox from "@/UI/GradientBox";
import Image from "next/image";

const data = [
    {
        id: "01",
        title: "Gann Astro models for market timing",
        desc: "Advanced cycle analysis that helps identify the best times to enter and exit investments.",
    },
    {
        id: "02",
        title: "Price and Time Cycle utilised for market analysis",
        desc: "Historical pattern recognition to identify recurring market cycles and trend reversals.",
    },
    {
        id: "03",
        title: "Banking logic applied to portfolio construction",
        desc: "Risk assessment and capital allocation methods adapted from institutional banking practices.",
    },
    {
        id: "04",
        title: "Risk-managed strategies using mathematical consistency and fractal mapping",
        desc: "Structured, mathematical models to predict trends and protect capital.",
    },
    {
        id: "05",
        title: "Currency and all assets were explored in-depth",
        desc: "Comprehensive analysis across Forex, commodities, equities, and alternative investments for diversified opportunities.",
    },
];

export default function InfrastructureSection() {
    return (
        <main className="bg-[#071E2F] text-white md:px-16 px-4 py-10 md:py-16">
            {/* Top Header */}
            <div className="mb-8">
                <h2 className="section-heading  mb-4">
                    Building the Infrastructure
                </h2>
                <p className="text-white section-desc leading-relaxed">
                    To help bridge this gap, our next key steps lay in the development of
                    proprietary, research-based systems that can sharpen an investment
                    strategy. Here are some examples:
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full">
                {data.map((item, index) => (
                    <GradientBox
               
                        key={item.id}
                        className={`relative overflow-hidden p-6 flex flex-col xl:h-[163px]  h-auto
              ${index < 3 ? "md:col-span-2" : "md:col-span-3 "}`}
                    >
                       


                        {/* Content */}
                        <div className="relative">
                            <h3 className="text-[16px] md:text-[18px] font-semibold text-white">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-[14px] md:text-[16px] text-gray-200 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </GradientBox>
                ))}
            </div>

            {/* Bottom Note */}
            <p className="text-left text-gray-300 section-desc mt-8">
                These models now power our regulated asset management advisory practice,
                through which we offer tailored investment planning, active and passive
                execution and hands-on portfolio support.
            </p>
        </main>
    );
}
