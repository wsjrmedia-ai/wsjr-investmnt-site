"use client";

import PerformanceMetrics from "./PerformanceMetrics";
import ProfitTimeline from "./ProfitTimeline";
import ProfitVsLossChart from "./ProfitVsLossChart";
import ReportPage from "./ReportPage";

export default function AnalysisReport() {
    return (
        <div className="min-h-screen bg-[#071E2F] px-4 md:px-16 ">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Box 1 */}
                <div className="hidden md:flex  text-white text-lg font-semibold ">
                    <ProfitTimeline />
                </div>

                {/* Box 2 */}
                <div className="flex  text-white text-lg font-semibold ">
                                            <ReportPage />


                </div>

                <div className="flex md:hidden  text-white text-lg font-semibold ">
                    <ProfitTimeline />
                </div>

                {/* Box 3 */}
                <div className="flex  text-white text-lg font-semibold">
                    <PerformanceMetrics />
                </div>

                {/* Box 4 */}
                <div className="flex  text-white text-lg font-semibold">
                                <ProfitVsLossChart />
                    
                </div>
            </div>
        </div>
    );
}
