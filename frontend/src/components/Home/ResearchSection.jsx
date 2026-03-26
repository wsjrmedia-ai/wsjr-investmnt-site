"use client";

export default function ResearchSection() {
  return (
    <section className="w-full px-4 md:px-16 relative md:py-10 py-2 bg-[#071E2F]">
      {/* Background Wrapper */}
      <div className="relative w-full rounded-lg overflow-hidden">

        {/* Mobile Background (right bottom) */}
        <div
          className="absolute inset-0 rounded-xl bg-no-repeat md:hidden"
          style={{
            backgroundImage: `url(/ResearchSection/coin.png)`,
            backgroundPosition: "right bottom",
            backgroundSize: "auto 125px", // fixed height
          }}
        />

        {/* Desktop & Tablet Background (right center) */}
        <div
          className="absolute inset-0 rounded-xl bg-no-repeat hidden md:block"
          style={{
            backgroundImage: `url(/ResearchSection/coin.png)`,
            backgroundPosition: "right center",
            backgroundSize: "auto 125px", // fixed height
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(
              circle at top right,
              rgba(165, 239, 255, 0) 0%,
              rgba(110, 191, 244, 0.2) 77%,
              rgba(70, 144, 212, 0.2) 100%
            )`,
          }}
        />

        {/* Content */}
        <div className="relative py-10 text-center md:text-left px-4 md:px-10">
          <p className="text-white section-desc mx-auto md:mx-0 leading-relaxed">
            Our research combines real-world expertise, deep insights and
            future-ready solutions to arrive at tailor-made solutions that help
            you rethink the potential of your portfolio, and consistently deliver
            results in the long run.
          </p>
        </div>
      </div>
    </section>
  );
}
