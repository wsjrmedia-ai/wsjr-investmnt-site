'use client';

import Link from "next/link";

export default function CalculatorBanner() {
  return (
    <section className="w-full px-4 md:px-16 relative md:py-10 py-4 bg-[#071E2F]">
      {/* Background Wrapper */}
      <div className="relative w-full rounded-lg overflow-hidden">

        {/* Gradient Overlay (matching your theme) */}
        <div
          className="absolute inset-0 rounded-xl bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center bg-no-repeat "
         
        />

        {/* Content */}
        <div className="relative py-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-10 gap-6">
          {/* Left Text */}
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Portfolio Management Advisory Calculator
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Instantly calculate your potential returns, plan your portfolio 
              smarter, and take control of your investment journey.
            </p>

            {/* CTA Button */}
            <Link href="/calculator">
              <button className="mt-4 px-6 py-3 bg-gradient-to-r from-[#FBAA4E] to-[#0075B7] text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer">
                Try Calculator
              </button>
            </Link>
          </div>

          {/* Right SVG Calculator Illustration */}
          <div className="w-[180px] md:w-[220px] lg:w-[260px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 260"
              className="w-full h-auto"
            >
              <rect x="10" y="10" width="180" height="240" rx="20" fill="#0B1F2D" stroke="#0075B7" strokeWidth="4"/>
              <rect x="30" y="30" width="140" height="40" rx="6" fill="#0463A5"/>
              <text x="100" y="58" textAnchor="middle" fontSize="16" fill="white" fontFamily="Arial">12345</text>
              
              {/* Buttons grid */}
              <g fill="#FBAA4E">
                <rect x="30" y="90" width="40" height="40" rx="8"/>
                <rect x="80" y="90" width="40" height="40" rx="8"/>
                <rect x="130" y="90" width="40" height="40" rx="8"/>
                
                <rect x="30" y="140" width="40" height="40" rx="8"/>
                <rect x="80" y="140" width="40" height="40" rx="8"/>
                <rect x="130" y="140" width="40" height="40" rx="8"/>
                
                <rect x="30" y="190" width="40" height="40" rx="8"/>
                <rect x="80" y="190" width="40" height="40" rx="8"/>
                <rect x="130" y="190" width="40" height="40" rx="8"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
