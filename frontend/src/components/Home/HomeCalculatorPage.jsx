"use client";

import { useState } from "react";
import HomeCalculator from "./HomeCalculator";

export default function HomeCalculatorPage() {
  const [calculationData, setCalculationData] = useState(null);

  return (
    <div className=" ">
      <HomeCalculator onCalculate={(data) => setCalculationData(data)} />
    </div>
  );
}
