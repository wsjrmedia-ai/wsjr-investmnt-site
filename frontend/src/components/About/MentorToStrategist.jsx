"use client";

import Image from "next/image";

export default function MentorToStrategist() {
    return (
        <main
            className="bg-[#071E2F] text-white py-10 md:py-16 relative"
            style={{
                backgroundImage: "url('/about/mentor/bg-pattern.png')", // replace with your actual bg image
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="mx-auto">
                {/* Title */}
                <h2 className="section-heading font-semibold mb-4 md:px-16 px-4">
                    From Investments Mentor to Wealth Strategist
                </h2>

                {/* Subtitle */}
                <p className="text-white mb-10 section-desc leading-relaxed md:px-16 px-4">
                    Wall Street Jr. group was founded with a clear purpose – to close the gap
                    between how institutions build wealth and how individuals can follow suit.
                </p>

                {/* Middle Image */}
                <div className="relative w-full h-[120px] md:h-[190px] mb-10">
                    <Image
                        src="/about/mentor/middle-banner.png" // replace with actual middle image
                        alt="Decorative Middle Banner"
                        fill
                        className="object-cover lg:object-top object-right-top"
                    />
                </div>

                {/* Description */}
                <p className="text-[white] leading-relaxed mb-6 section-desc md:px-16 px-4">
                    After completing the Postgraduate Program in Corporate Finance and Forex
                    at Harvard University, our founder went on to work with J.P. Morgan Chase
                    and Bank of America, where he gained first-hand exposure to how capital
                    truly moves across systems – from execution strategies and market-making
                    structures to risk control frameworks used by the world’s largest financial
                    institutions.
                </p>

                {/* Highlighted Insight */}
                <p className="text-[white] leading-relaxed section-desc md:px-16 px-4">
                    The insight was clear:{" "}
                    <span className="font-semibold text-white">
                        Retail investors don't lack ambition they lack access to institutional
                        logic.
                    </span>{" "}
                    That insight became the foundation of Wall Street Jr.
                </p>
            </div>
        </main>
    );
}
