"use client";

import Image from "next/image";

export default function MilestoneSection() {
  const data = [
    {
      title: "The Breakthrough",
      subtitle: "NISM, Mumbai",
      desc: "Joined National Institute of Securities Markets for a PG Diploma. Gained clarity on market mechanics, risk, regulation and institutional strategy. The fog began to clear.",
      logo: "/about/Milestones/nism.png",
    },
    {
      title: "The Step Up",
      subtitle: "Harvard University for Postgrad in Corporate Finance and Forex",
      desc: "Was mentored in International Risk Management, International financial markets and Global Banking Regulations and Practices. Would go on to join Bank of America and JP Morgan Chase under Mergers and Acquisitions.",
      logo: "/about/Milestones/harvard.png",
    },
    {
      title: "Return to the US",
      subtitle: "Entering Forex",
      desc: "Re-entered the market with data-driven precision. Ventured into the Forex market with equities 3x larger than Indian equities. This time, armed with the right knowledge and ready.",
      logo: "/about/Milestones/usa.png",
    },
  ];

  return (
    <section className="w-full px-4 md:px-16 lg:px-16 pb-12 bg-[#071E2F] text-white">
      {/* Header */}
      <div className="mx-auto text-left">
        <h2 className="text-[16px] md:text-lg font-semibold">
          <span
            className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#E4BC88] to-[#E7901F] bg-clip-text text-transparent mr-2"
          >
            6
          </span>{" "}
          Month Reset
        </h2>

        <p className="mt-3 text-gray-300 text-sm md:text-base leading-relaxed">
          Stepped back. Immersed in books, courses and studied under mentors.
          What was missing was a structured foundation.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
        {data.map((item, i) => (
          <div
            key={i}
            className={`relative p-5 sm:p-6 md:p-8 rounded-xl overflow-hidden bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center bg-no-repeat 
              ${i === 2 ? "md:col-span-2" : "col-span-1"}`}
          >
            {/* Logo as faded background */}
            <div
              className={`absolute ${i === 1 ? "md:top-[10%] w-[70px] h-[35px]" : "w-[120px] h-[42px] md:top-[10%]"
                } ${i === 2 ? "md:top-[25%] right-3 top-5" : "top-3 right-3"} `}
            >
              <Image
                src={item.logo}
                alt={item.title}
                fill={false} // ensure fixed size instead of filling
                width={i === 1 ? 70 : 120}
                height={i === 1 ? 35 : 42}
                className="object-contain pointer-events-none select-none"
              />
            </div>

            {/* Content */}
            <h3
              className="text-xl sm:text-2xl md:text-[28px] font-semibold bg-gradient-to-r from-[#E4BC88] to-[#E7901F] bg-clip-text text-transparent relative z-10"
            >
              {item.title}
            </h3>


            <p className="mt-2 text-[14px] md:pt-2 pt-0 lg:pt-0 sm:text-sm md:text-base font-medium text-white relative z-10  max-w-[200px] lg:max-w-[80%]">
              {item.subtitle}
            </p>

            <p className="mt-3 text-[14px] md:text-[16px] text-white leading-relaxed relative z-10 max-w-4xl xl:max-w-auto pt-2 md:pt-0">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
