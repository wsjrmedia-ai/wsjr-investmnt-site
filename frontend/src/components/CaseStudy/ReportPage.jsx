"use client";

import ButtonWithImage from "@/UI/AnimatedButton";

export default function ReportPage() {
    return (
        <div className="w-full max-w-md bg-[#071E2F] text-white rounded-[6px] overflow-hidden mx-auto py-16 md:py-0">

            <div className="flex md:hidden py-1 text-sm md:mb-8 mb-6">
                <ButtonWithImage text={"Getting to the numbers"} image={"none"} />
            </div>

            {/* Header */}
            <div className="flex justify-between px-4 py-3 bg-[#0062A7]/37 rounded-b-[6px] text-sm sm:text-base">
                <span className="font-semibold">Metric</span>
                <span className="font-semibold">Result</span>
            </div>

            {/* Metrics */}
            <div className="divide-y divide-[#071E2F] text-sm sm:text-base text-gray-400">
                <div className="flex justify-between px-4 py-3">
                    <span>Total Gain</span>
                    <span className="text-green-500 font-semibold">+2,486.39%</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                    <span>Net Profit</span>
                    <span className="font-semibold text-white">$587,348.12</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                    <span>Win Rate</span>
                    <span className="font-semibold text-white">90.91%</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                    <span>Max Consecutive Wins</span>
                    <span className="font-semibold text-white">36</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                    <span>Best Trade</span>
                    <span className="font-semibold text-white">$40,140</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                    <span>Worst Trade</span>
                    <span className="text-red-500 font-semibold">- $5,183</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                    <span>Average Trade Return</span>
                    <span className="text-green-500 font-semibold">+3.55%</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                    <span>Drawdown</span>
                    <span className="font-semibold text-white">29.69%</span>
                </div>
            </div>
        </div>
    );
}
