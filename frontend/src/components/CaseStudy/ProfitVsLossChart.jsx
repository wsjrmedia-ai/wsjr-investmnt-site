"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Gross Profit (USD)", value: 600000, color: "#22A900" },
  { name: "Gross Loss (USD)", value: 100000, color: "#D31818" },
];

export default function ProfitVsLossChart() {
  return (
    <div className="w-full bg-[#071E2F] flex flex-col 
                    h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
      <h2 className="text-white md:text-[20px] text-lg font-semibold text-center mb-4">
        Profit vs Loss
      </h2>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          barSize={134}
          margin={{ top: 40, right: 30, left: 60, bottom: 55 }} // 🔑 Added more top + left margin
        >
          <CartesianGrid
            strokeDasharray="4 8"
            stroke="rgba(240, 240, 240, 0.2)"
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "grey", fontSize: 14 }}
            axisLine={{ stroke: "#071E2F" }}
          />

          <YAxis
            axisLine={{ stroke: "#071E2F" }}
            label={{
              value: "Amount (USD)",
              angle: -90,
              position: "insideLeft",
              fill: "#ffffff",
                  dx: -50,           // ✅ Add spacing from axis

              fontSize: 14,
            }}
            tick={{ fill: "grey", fontSize: 14 }} // 🔑 Removed custom tick override
          />

          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.1)" }}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#f1f5f9" }}
            itemStyle={{ color: "#BA833C" }}
          />

          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
