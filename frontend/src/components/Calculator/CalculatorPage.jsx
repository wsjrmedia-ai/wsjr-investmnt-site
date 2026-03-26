"use client";

import { useState } from "react";
import Calculator from "./Calculator";

export default function CalculatorPage() {
  const [calculationData, setCalculationData] = useState(null);

  return (
    <div className="md:py-16  bg-[#071E2F] px-4 py-10 md:px-0 pb-6">
      <Calculator onCalculate={(data) => setCalculationData(data)} />
    </div>
  );
}
