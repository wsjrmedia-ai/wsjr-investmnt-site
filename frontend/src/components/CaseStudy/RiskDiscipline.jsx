"use client";

import ButtonWithImage from "@/UI/AnimatedButton";

export default function RiskDiscipline() {
    return (
        <main className=" bg-[#071E2F] text-white md:px-16 px-4 py-10 md:py-16">
            {/* Top Header Button */}
            <div className="md:mb-8 mb-6">
                <ButtonWithImage text={'Risk & execution discipline'} image={'none'} />
            </div>

            <div className="max-w-4xl text-left text-white space-y-4">
                {/* Main text */}
                <p className="section-desc leading-relaxed">
                    Risk was actively managed through strict loss limits and capital allocation rules:
                </p>

                {/* Custom bullet points */}
                <div className="space-y-2 section-desc text-white md:ml-8 ml-5">
                    <div className="flex items-start gap-3">
                        <span className="mt-4 w-1.5 h-1.5 rounded-full bg-white mr-4"></span>
                        <p>Limited consecutive losses (max: 2)</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="mt-4 w-1.5 h-1.5 rounded-full bg-white mr-4"></span>
                        <p>Controlled drawdowns despite high leverage usage</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="mt-4 w-1.5 h-1.5 rounded-full bg-white mr-4"></span>
                        <p>Selective trade entries based on technical and fundamental convergence</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
