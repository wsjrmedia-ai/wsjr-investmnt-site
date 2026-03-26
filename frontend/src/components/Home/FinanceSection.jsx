"use client";

import Image from "next/image";

const contentData = [
  {
    id: 1,
    title: "Personalised, transparent & tech-enabled financial solutions",
    description: [
      "They say that a penny saved is a penny earned. Wise words to live by. Wall Street Jr. was founded on a mission to ensure personal financial growth in a dynamic world that is quickly becoming the norm.",
      "Our strategies are shaped by our experience and backed by the trust of our patrons who hail from different parts of the world. Our team’s proven methods can provide you the backing you need to take the next steps in securing your financial future, or ensuring that you are on the right track to realise your goals.",
    ],
    image: "/FinanceSection/financesection.png",
  },
];

export default function FinanceSection() {
  return (
    <section className="w-full bg-[#071E2F] px-4 sm:px-8 md:px-12 lg:px-16 py-10">
      {contentData.map((item) => (
        <div
          key={item.id}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10"
        >
          {/* Left Side Image - 35% */}
          <div className="relative w-full lg:w-[35%] h-[250px] sm:h-[300px] md:h-[340px] lg:h-[360px]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority // 🔑 loads fast if above the fold
              quality={90} // 🔑 sharper but optimized
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     35vw" // 🔑 responsive image sizes
              placeholder="blur"
              blurDataURL="/FinanceSection/financesection.png" // 🔑 lightweight preview
              className="object-cover rounded-lg"
            />
          </div>

          {/* Right Side Content - 60% */}
          <div className="w-full lg:w-[60%] text-white">
            <h2 className="section-heading font-semibold mb-4">
              {item.title}
            </h2>
            {item.description.map((para, idx) => (
              <p
                key={idx}
                className="text-gray-300 mb-4 leading-relaxed section-desc"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
