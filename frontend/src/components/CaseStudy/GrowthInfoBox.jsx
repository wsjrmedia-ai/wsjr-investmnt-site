"use client";

export default function GrowthInfoBox() {
  return (
    <section className="w-full px-4 md:px-16 relative md:py-10 py-2 bg-[#071E2F]">
      <div className="relative w-full rounded-xl overflow-hidden min-h-[120px] md:min-h-[150px] flex items-center justify-center p-4 md:p-6">
        {/* 🔹 Gradient Background (20%) */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(circle at top left,
              rgba(165, 239, 255, 1) 0%,   /* #A5EFFF */
              rgba(110, 191, 244, 0.22) 77%, /* #6EBFF4 with 22% */
              rgba(70, 144, 212, 0) 100%   /* #4690D4 fade out */
            )`,
            opacity: 0.2,
          }}
        />

        {/* Text Content */}
        <p className="relative section-desc text-white leading-relaxed text-left ">
          The growth trajectory demonstrates a shift from modest early gains to
          substantial monthly returns,{" "}
          <span className="font-semibold">peaking at $121,630</span> in December.
        </p>
      </div>
    </section>
  );
}
