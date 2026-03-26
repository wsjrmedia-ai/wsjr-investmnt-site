"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";

const data = [
    { name: "Average Trade Return", value: 0 },
    { name: "Drawdown (%)", value: 29.69 },
    { name: "Win Rate (%)", value: 90.91 },
    { name: "Total Gain (%)", value: 2486.39 },
];

export default function PerformanceMetrics() {
    return (
        <div className="w-full bg-[#071E2F] flex flex-col 
                        h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
            <h2 className="text-white md:text-[20px] text-lg font-semibold  text-center mb-[-50px] md:mb-0">
                Percentage Performance Metrics
            </h2>
            <ResponsiveContainer width="90%" height="70%">
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{ top: 20, right: 70, left: 50, bottom: 55 }}
                >
                    {/* Grid */}
                    <CartesianGrid strokeDasharray="4 8" stroke="rgba(240, 240, 240, 0.2)" />

                    {/* X Axis */}
                    <XAxis
                        type="number"
                        domain={[0, 2500]}
                        stroke="#071E2F"
                        tick={{ fill: "grey", fontSize: 14 }}
                    />

                    {/* Y Axis */}
                    <YAxis
                        dataKey="name"
                        type="category"
                        stroke="#071E2F"
                        tick={{ fill: "grey", fontSize: 14 }}
                    />

                    {/* Tooltip */}
                    <Tooltip
                        formatter={(val) => `${val.toFixed(2)}%`}
                        cursor={{ fill: "rgba(255,255,255,0.1)" }}
                        contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
                        labelStyle={{ color: "#f1f5f9" }}
                        itemStyle={{ color: "#BA833C" }}
                    />

                    {/* Bars */}
                    <Bar dataKey="value" fill="rgba(6, 76, 124, 0.6)" barSize={80}>
                        <LabelList
                            dataKey="value"
                            position="right"
                            formatter={(val) => `${val.toLocaleString()}%`}
                            style={{ fill: "white", fontWeight: "600", fontSize: "14px" }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
