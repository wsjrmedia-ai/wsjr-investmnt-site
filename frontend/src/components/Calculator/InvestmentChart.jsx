'use client';

import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import Link from "next/link";

const COLORS = ["#4F6CFF", "#14532D"]; // Investment blue, Returns green

export default function InvestmentChart({ investedAmount, returns }) {
  const data = [
    { name: "Total Investment", value: investedAmount },
    { name: "Total Returns", value: returns },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full h-[500px] bg-[#071E2F]">
      {/* Chart */}
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={450}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend
            verticalAlign="top"
            align="center"
            iconType="circle"
            formatter={(value, entry, index) => (
              <span
                style={{
                  color: COLORS[index],
                  fontSize: "14px",
                  marginLeft: "4px",
                }}
              >
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}
