"use client";

import { useState, useEffect } from "react";
import { Calculator as CalcIcon } from "lucide-react";
import InvestmentChart from "../Calculator/InvestmentChart";
import HomeCalculatorChart from "./HomeCalculatorChart";
import Link from "next/link";

export default function HomeCalculator({ onCalculate }) {
    const [currency, setCurrency] = useState("USD");
    const [initialInvestment, setInitialInvestment] = useState(10000);
    const [years, setYears] = useState(5);
    const [monthlyRate, setMonthlyRate] = useState(5);
    const [results, setResults] = useState(null);

    const currencySymbols = {
        USD: "$",
        AED: "AED ",
        EUR: "€",
    };

    const calculateReturns = () => {
        const P = initialInvestment;
        const r = monthlyRate;
        const m = years * 12;
        const I = (P * r * m) / 100;
        const FV = P + I;
        setResults({ finalValue: FV, totalGain: I });
    };

    useEffect(() => {
        calculateReturns();
    }, [initialInvestment, years, monthlyRate, currency]);

    const formatNumber = (num) =>
        new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num);

    const formatCurrency = (num) =>
        new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);

    const totalValue = results?.finalValue || 0;
    const investedAmount = initialInvestment;
    const returns = results?.totalGain || 0;

    return (
        <div
            className="w-full text-white px-4 md:px-16 py-6"
            style={{ backgroundColor: "#071E2F" }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4">
                <CalcIcon className="w-7 h-7 text-[#BA833C]" />
                <h2 className="md:text-xl text-[20px] font-bold">
                    Portfolio Management Advisory Calculator
                </h2>
            </div>

            {/* Layout: 3 panels side by side (stack on mobile) */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
                {/* Left Panel */}
                <div className="p-6 space-y-6">
                    {/* Currency */}
                    <div>
                        <label className="block text-lg mb-2">Currency</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-[#0E293E] focus:ring-2 focus:ring-green-900 focus:outline-none"
                        >
                            <option value="USD">USD - US Dollar</option>
                            <option value="AED">AED - UAE Dirham</option>
                            <option value="EUR">EUR - Euro</option>
                        </select>
                    </div>

                    {/* Initial Investment */}
                    <div className="space-y-4">
                        <div className="xl:flex lg:block md:flex justify-between items-center">
                            <label className="text-lg ">Initial Investment</label>
                            <div className="bg-gradient-to-r from-[#BA833C] to-[#064C7C]  px-4 py-2 rounded-lg mt-3 md:mt-0">
                                <div className="flex items-center">
                                    <span className="text-white font-semibold text-lg mr-1">
                                        {currencySymbols[currency]}
                                    </span>
                                    <input
                                        type="text"
                                        value={formatNumber(initialInvestment)}
                                        onChange={(e) => {
                                            // Remove all non-digit characters
                                            const onlyNums = e.target.value.replace(/\D/g, "");
                                            setInitialInvestment(Number(onlyNums || 0));
                                        }}
                                        className="bg-transparent text-white font-semibold text-lg w-32 outline-none text-right"
                                    />

                                </div>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="1000000"
                            step="1000"
                            value={initialInvestment}
                            onChange={(e) => setInitialInvestment(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    {/* Monthly Return */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-lg">Monthly Return Rate (%)</label>
                            <span className="bg-green-900 px-3 py-2 rounded-lg text-white">
                                {monthlyRate}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="7"
                            step="0.1"
                            value={monthlyRate}
                            onChange={(e) => setMonthlyRate(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    {/* Time Period */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-lg">Time Period</label>
                            <span className="bg-green-900 px-3 py-2 rounded-lg text-white">
                                {years} Years
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="1"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Middle Panel (Results) */}
                <div className="p-6 space-y-4">
                    <div className="flex justify-between py-2">
                        <span>Final Value:</span>
                        <span className="font-semibold">
                            {currencySymbols[currency]}
                            {formatCurrency(totalValue)}
                        </span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-gray-700">
                        <span>Total Gain:</span>
                        <span className="font-semibold text-white">
                            {currencySymbols[currency]}
                            {formatCurrency(returns)}
                        </span>
                    </div>

                    <div className="bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center rounded-lg p-3 mt-4">
                        <p className="text-sm text-white py-4">
                            <strong>For illustrative purposes only</strong>. This calculator assumes model returns and does not represent a promised outcome.

                        </p>
                    </div>


                    <div className="mt-6 w-full max-w-xs space-y-3">
                        <div className="flex justify-between">
                            <span className="flex gap-2 items-center">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                Invested amount
                            </span>
                            <span>{currencySymbols[currency]}{formatNumber(investedAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="flex gap-2 items-center">
                                <span className="w-3 h-3 rounded-full bg-[#14532D]"></span>
                                Est. returns
                            </span>
                            <span className="text-green-900 font-medium">
                                {currencySymbols[currency]}{formatNumber(returns)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="flex gap-2 items-center">
                                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                                Total value
                            </span>
                            <span className="text-purple-400">
                                {currencySymbols[currency]}{formatNumber(totalValue)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Panel (Chart) */}
                <div className="flex flex-col justify-center items-center p-6">
                    <HomeCalculatorChart investedAmount={investedAmount} returns={returns} />
                    <Link href="/contact-us">
                        <button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 px-4 py-2 md:px-6 md:py-3 bg-[#14532D] text-white font-semibold rounded-lg shadow-md cursor-pointer"
                        >
                            Get Appointment
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
