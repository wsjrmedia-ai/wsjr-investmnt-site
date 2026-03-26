"use client";

import ButtonWithImage from "@/UI/AnimatedButton";
import GradientBox from "@/UI/GradientBox";
import Image from "next/image";

const data = [
    {
        id: "01",
        title: "Primary Focus",
        desc: "Gold (XAUUSD) – 77 trades, $527,760.85 profit (~90% of total returns)",
    },
    {
        id: "02",
        title: "Other Positions",
        desc: "BTCUSD_, NAS100_, USOIL.v, and select Forex pairs",
    },
    {
        id: "03",
        title: "Trading Style",
        desc: "Manual execution, no automated strategies or trading signals.",
    },
];

export default function AssetFocusSection() {
    return (
        <main className=" bg-[#071E2F] text-white md:px-16 px-4 py-10 md:py-16">
            {/* Top Header Button */}
            <div className="md:mb-8 mb-6">
                <ButtonWithImage text={'Asset focus & allocation'} image={'none'} />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {data.map((item) => (
                    <GradientBox
                        key={item.id}
                        className="relative rounded-lg overflow-hidden p-6 flex flex-col xl:h-[188px] h-auto"
                    >
                        

                        {/* Content */}
                        <div className="relative">
                            {/* Number + Title */}
                            <div className="flex items-center gap-3">
                                <span className="bg-gradient-to-r from-[#E4BC88] to-[#E7901F] bg-clip-text text-transparent text-[45px] md:text-[55px] font-bold">
                                    {item.id}
                                </span>
                                <h3 className="text-[16px] md:text-[18] font-semibold text-white">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="mt-3 text-[14px] md:text-[16px] text-white leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </GradientBox>
                ))}
            </div>

            {/* Bottom Note */}
            <p className="text-left text-gray-300 section-desc mt-8">
                This concentration enabled precise timing and market-specific strategies,
                resulting in consistent high win rates.
            </p>
        </main>
    );
}
