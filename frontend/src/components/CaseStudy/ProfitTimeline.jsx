"use client";

import ButtonWithImage from "@/UI/AnimatedButton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Updated profit data with timeline from Apr 2023 to Oct 2024
const data = [
  { name: "Apr 2023", profit: 32000 },
  { name: "May 2023", profit: 45000 },
  { name: "Jun 2023", profit: 55000 },
  { name: "Jul 2023", profit: 60000 },
  { name: "Aug 2023", profit: 58000 },
  { name: "Sep 2023", profit: 62000 },
  { name: "Oct 2023", profit: 70000 },
  { name: "Nov 2023", profit: 85000 },
  { name: "Dec 2023", profit: 121630 },
  { name: "Jan 2024", profit: 140000 },
  { name: "Feb 2024", profit: 180000 },
  { name: "Mar 2024", profit: 210000 },
  { name: "Apr 2024", profit: 250000 },
  { name: "May 2024", profit: 300000 },
  { name: "Jun 2024", profit: 350000 },
  { name: "Jul 2024", profit: 400000 },
  { name: "Aug 2024", profit: 450000 },
  { name: "Sep 2024", profit: 520000 },
  { name: "Oct 2024", profit: 610000 },
];

export default function ProfitTimeline() {
  return (
    <div className="w-full bg-[#071E2F] flex flex-col h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] mb-[50px]">
      
      <div className="hidden md:flex py-1 text-sm md:mb-8 mb-6">
        <ButtonWithImage text={"Getting to the numbers"} image={"none"} />
      </div>
      
      <h2 className="text-white md:text-[20px] text-lg font-semibold text-center mb-[-50px] md:mb-0">
        Monthly Profit Timeline
      </h2>
      
      <ResponsiveContainer width="90%" height="70%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 50, bottom: 55 }}
        >
          <CartesianGrid strokeDasharray="4 8" stroke="rgba(240, 240, 240, 0.2)" />

          {/* X Axis */}
          <XAxis
            dataKey="name"
            stroke="#071E2F"
            tick={{ fill: "grey", fontSize: 14 }}
            label={{
              value: "Months",
              position: "bottom",
              dy: 30,
              fill: "#f1f5f9",
              fontSize: 16,
              fontWeight: "semibold",
            }}
          />

          {/* Y Axis */}
          <YAxis
            dataKey="profit"
            stroke="#071E2F"
            tick={{ fill: "grey", fontSize: 14 }}
            label={{
              value: "Profit (USD)",
              angle: -90,
              position: "insideLeft",
              dx: -40,
              fill: "#f1f5f9",
              fontSize: 14,
              fontWeight: "semibold",
            }}
          />

          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.1)" }}
            contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }}
            labelStyle={{ color: "#f1f5f9" }}
            itemStyle={{ color: "#BA833C" }}
          />

          <Line
            type="monotone"
            dataKey="profit"
            stroke="#BA833C"
            strokeWidth={2}
            dot={{ fill: "#FFFFFF", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
