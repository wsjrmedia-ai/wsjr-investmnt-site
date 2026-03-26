"use client";

import ButtonWithImage from "@/UI/AnimatedButton";
import Image from "next/image";

export default function RiskDomains() {
  return (
    <main className="bg-[#071E2F] text-white md:px-16 px-4 py-12">
      {/* Top Header Button */}
      <div className="md:mb-10 mb-10">
        <ButtonWithImage text={"Risk domains we cover"} image={"none"} />
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {/* Card 1 */}
        <div className="rounded-xl p-6 min-h-[170px]  bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center bg-no-repeat">
          <h3 className="text-lg font-semibold mb-2">
            Portfolio Risk Assessment
          </h3>
          <p className="text-[15px] text-white leading-relaxed font-regular">
            Identifying and quantifying risks such as market, credit, and
            concentration using advanced tools like Value at Risk (VaR).
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl p-6 min-h-[170px] bg-[url('/casestudy/KeyTakeaways/card-bg.png')]  bg-cover bg-center bg-no-repeat">
          <h3 className="text-lg font-semibold mb-2">
            Asset-Liability Management
          </h3>
          <p className="text-[15px] text-gray-300 leading-relaxed">
            Aligning assets with future obligations to manage interest rate,
            inflation, and liquidity risks.
          </p>
        </div>

        {/* Card 3 with Image */}
        <div className="rounded-xl p-6 min-h-[170px] relative bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
          <h3 className="text-lg font-semibold mb-2">Hedging & Derivatives</h3>
          <p className="text-[15px] text-gray-300 leading-relaxed">
            Using instruments like options, futures, and swaps to protect against
            market swings.
          </p>
          {/* <div className="absolute bottom-4 right-4 w-[149px] h-[149px]">
            <Image
              src="/service/RiskDomain/hedging.png"
              alt="Hedging Illustration"
              width={149}
              height={149}
              className="object-contain"
            />
          </div> */}
        </div>

        {/* Card 4 */}
       <div className="rounded-xl p-6 min-h-[170px] relative bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
          <h3 className="text-lg font-semibold mb-2">Operational & Compliance Risk</h3>
          <p className="text-[15px] text-gray-300 leading-relaxed ">
            Strengthening processes and policies to reduce operational failures and ensure regulatory adherence.
          </p>
          {/* <div className="absolute bottom-2 left-0 w-[40px] h-[40px]">
            <Image
              src="/service/RiskDomain/operation.png"
              alt="Hedging Illustration"
              width={40}
              height={40}
              className="object-cover"
            />
          </div> */}
        </div>

        {/* Card 5 */}
        <div className="rounded-xl p-6 min-h-[170px] bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center bg-no-repeat">
          <h3 className="text-lg font-semibold mb-2">
            Capital Protection Frameworks
          </h3>
          <p className="text-[15px] text-gray-300 leading-relaxed">
            Implementing buffers, diversification, and tactical stop-loss
            methods to limit downside exposure.
          </p>
        </div>
      </div>
    </main>
  );
}
