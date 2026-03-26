"use client";

import { useEffect, useState } from "react";
import ButtonWithImage from "@/UI/AnimatedButton";
import Image from "next/image";
import Link from "next/link"; // ✅ import Link

const caseStudies = [
  {
    id: 1,
    icon: "/CaseStudies/icon1.png",
    bg: "/CaseStudies/bg1.png",
    title: "2,486% returns. One strategy.",
    heading: "How we turned market expertise into exceptional client success",
    description:
      "Step inside the strategy, execution, and milestones that powered this extraordinary market journey.",
  },
];

export default function CaseStudies() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[#071E2F] text-white py-12 px-4 md:px-16">
      <div className="md:mb-8 mb-6">
        <ButtonWithImage text="Investing Right" image={"none"} />
      </div>

      <h1 className="section-heading leading-relaxed max-w-6xl mb-12 mt-2">
        Real Results. Proven Strategies. Discover client success stories backed
        by data, execution, and measurable growth outcomes.
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {caseStudies.map((item, index) => {
          const isLastOdd =
            index === caseStudies.length - 1 && caseStudies.length % 2 !== 0;

          return (
            <Link
              key={index}
              href={`/case-study`} // ✅ dynamic route
              className={`relative rounded-xl p-4 sm:p-6 min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] overflow-hidden bg-no-repeat 
              ${isLastOdd ? "sm:col-span-2 lg:col-span-1" : ""}`}
              style={{
                backgroundImage: `url(${item.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "left bottom",
              }}
            >
              {loading ? (
                <div className="animate-pulse">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-12 h-12 sm:w-[53px] sm:h-[53px] bg-gray-700 rounded-[10px]" />
                    <div className="w-24 sm:w-32 h-4 bg-gray-700 rounded" />
                  </div>
                  <div className="h-4 sm:h-5 bg-gray-700 rounded w-full mb-2" />
                  <div className="h-3 sm:h-4 bg-gray-700 rounded w-3/4" />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <Image
                      src={item.icon}
                      alt="icon"
                      width={53}
                      height={53}
                      className="w-10 h-10 sm:w-[53px] sm:h-[53px]"
                    />
                    <h4 className="text-xs sm:text-sm font-medium">
                      {item.title}
                    </h4>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    {item.heading}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    {item.description}
                  </p>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
