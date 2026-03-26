"use client";

import ButtonWithImage from "@/UI/AnimatedButton";

export default function KeyTakeaways() {
  return (
    <main className="bg-[#071E2F] text-white md:px-16 px-4 py-4">
      {/* Top Header Button */}
      <div className="md:mb-8 mb-6">
        <ButtonWithImage text={"Key takeaways"} image={"none"} />
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  mx-auto">
        {/* Card 1 */}
        <div className="rounded-xl p-6 min-h-[200px] bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center shadow-md">
          <h3 className="text-lg font-semibold mb-2">Focused expertise</h3>
          <p className="text-[16px] text-gray-300 leading-relaxed mt-4">
            Specialising in gold enabled deep market understanding and timely execution
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl p-6 min-h-[200px] bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center shadow-md">
          <h3 className="text-lg font-semibold mb-2">High conviction</h3>
          <p className="text-[16px] text-gray-300 leading-relaxed mt-4">
            Large position sizes were employed selectively to capitalize on high-probability setups
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl p-6 min-h-[200px] bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center shadow-md">
          <h3 className="text-lg font-semibold mb-2">Performance scaling</h3>
          <p className="text-[16px] text-gray-300 leading-relaxed mt-4">
            Reinvestment of profits accelerated account growth in later stages
          </p>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl p-6 min-h-[200px] bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center shadow-md">
          <h3 className="text-lg font-semibold mb-2">Future growth</h3>
          <p className="text-[16px] text-gray-300 leading-relaxed mt-4">
            Incorporating additional assets could diversify risk while preserving returns
          </p>
        </div>
      </div>
    </main>
  );
}
