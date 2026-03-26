"use client";

import ButtonWithImage from "@/UI/AnimatedButton";

export default function Conclusion() {
  return (
    <main className="bg-[#071E2F] text-white md:px-16 px-4 py-10 md:py-16">
      {/* Top Header Button */}
      <div className="md:mb-8 mb-6">
        <ButtonWithImage text={"Conclusion"} image={"none"} />
      </div>

      {/* Content */}
      <div className=" text-left">
        <p className="section-desc leading-relaxed text-white">
          This case study reflects our ability to deliver exceptional returns
          through disciplined, high-conviction trading. While the approach is
          aggressive, the results demonstrate that with the right market focus,
          disciplined execution, and risk controls, it is possible to achieve
          extraordinary outcomes in a relatively short period.
        </p>
      </div>
    </main>
  );
}
