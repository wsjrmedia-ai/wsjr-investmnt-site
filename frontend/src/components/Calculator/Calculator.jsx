"use client";

import { useState, useEffect } from "react";
import { Calculator as CalcIcon } from "lucide-react";
import InvestmentChart from "./InvestmentChart";
import Link from "next/link";

export default function CalculatorPage({ onCalculate }) {
    const [currency, setCurrency] = useState("USD");
    const [initialInvestment, setInitialInvestment] = useState(10000); // default 100k
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
        const r = monthlyRate; // percentage per month
        const m = years * 12;

        // Simple Interest
        const I = (P * r * m) / 100;
        const FV = P + I;

        const calculatedResults = {
            finalValue: FV,
            totalGain: I,
        };

        setResults(calculatedResults);
        onCalculate &&
            onCalculate({
                initialInvestment: P,
                monthlyRate: r,
                months: m,
                currency,
                ...calculatedResults,
            });
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

    const size = 200;
    const strokeWidth = 20;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;



    return (
        <div
            className=" md:p-8 md:max-w-6xl md:mx-auto px-2 md:px-4 bg-[#071E2F] "
            style={{ backgroundColor: "#071E2F", color: "white" }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <CalcIcon className="w-8 h-8 text-[#BA833C]" />
                <h2 className="md:text-2xl text-1xl font-bold">
                    Portfolio Management Advisory Calculator
                </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Left Side - Controls */}
                <div className="space-y-8">
                    {/* Currency Selection */}
                    <div>
                        <label className="block text-sm md:text-lg font-medium mb-3">Currency</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full cursor-pointer border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 bg-[#0E293E] focus:border-transparent"
                        >
                            <option value="USD">USD - US Dollar</option>
                            <option value="AED">AED - UAE Dirham</option>
                            <option value="EUR">EUR - Euro</option>
                        </select>
                    </div>

                    {/* Initial Investment */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm md:text-lg font-medium">Initial Investment</label>
                            <div className="bg-gradient-to-r from-[#BA833C] to-[#064C7C]  px-4 py-2 rounded-lg">
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
                            min="0"
                            max="1000000"
                            step="1000"
                            value={initialInvestment}
                            onChange={(e) => setInitialInvestment(Number(e.target.value))}
                            className="w-full cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>0</span>
                            <span>1M</span>
                        </div>
                    </div>

                    {/* Monthly Return Rate */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm md:text-lg font-medium">Monthly Return Rate (%)</label>
                            <div className="bg-green-900 px-4 py-2 rounded-lg">
                                <span className="text-[white] font-semibold text-lg">
                                    {monthlyRate}%
                                </span>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="7"
                            step="0.1"
                            value={monthlyRate}
                            onChange={(e) => setMonthlyRate(Number(e.target.value))}
                            className="w-full cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>5%</span>
                            <span>7%</span>
                        </div>
                    </div>

                    {/* Time Period */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm md:text-lg font-medium">Time Period</label>
                            <div className="bg-green-900 px-4 py-2 rounded-lg">
                                <span className="text-[white] font-semibold text-lg">
                                    {years} Years
                                </span>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="1"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>1 Year</span>
                            <span>30 Years</span>
                        </div>
                    </div>

                    {/* Results Summary */}
                    {results && (
                        <div className="space-y-4 pt-6 border-t border-gray-700">
                            <div className="flex justify-between py-3">
                                <span className="text-sm md:text-lg">Final Value:</span>
                                <span className="font-semibold text-sm md:text-lg">
                                    {currencySymbols[currency]}{formatCurrency(results.finalValue)}
                                </span>
                            </div>
                            <div className="flex justify-between py-3 border-t border-gray-700">
                                <span className="text-sm md:text-lg">Total Gain:</span>
                                <span className="font-semibold text-white text-sm md:text-lg">
                                    {currencySymbols[currency]}{formatCurrency(results.totalGain)}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className=" bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center bg-no-repeat  rounded-lg p-4 mt-6 ">
                        <p className="text-sm text-white ">
                            <strong>For illustrative purposes only</strong>. This calculator assumes model returns and does not represent a promised outcome.
                        </p>
                    </div>
                </div>

                {/* Right Side - Donut Chart */}
                <div className="flex flex-col items-center justify-center">
                    <div className="py-12 w-full flex flex-col items-center">
                        <InvestmentChart
                            investedAmount={investedAmount}
                            returns={returns}
                        />

                        <button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 px-4 py-2 md:px-6 md:py-3 bg-[#14532D] text-white font-semibold rounded-lg shadow-md cursor-pointer"
                            onClick={() => {
                                const contactSection = document.getElementById("contact");
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                        >
                            Get Appointment
                        </button>
                    </div>




                    <div className="mt-8 space-y-3 w-full max-w-xs">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                Invested amount
                            </span>
                            <span className="font-semibold">
                                {currencySymbols[currency]}{formatNumber(investedAmount)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#14532D]"></span>
                                Est. returns
                            </span>
                            <span className="font-semibold text-[#14532D]">
                                {currencySymbols[currency]}{formatNumber(returns)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                                Total value
                            </span>
                            <span className="font-semibold text-purple-400">
                                {currencySymbols[currency]}{formatNumber(totalValue)}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
