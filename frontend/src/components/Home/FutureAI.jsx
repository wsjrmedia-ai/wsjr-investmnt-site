'use client';

import Image from 'next/image';
import ButtonWithImage from '@/UI/AnimatedButton'; // your existing component

export default function FutureAI() {
  const cards = [
    {
      id: 1,
      title: (
        <>
          Smarter Decisions with <br />
          <span className="font-semibold">AI </span>Insights
        </>
      ),
      description:
        'Unlock real-time, institutional-grade analysis through our AI tools. From predictive analytics to advanced market data, make informed moves with confidence.',
      image: '/futureai/golden.png',
      bgColor: 'bg-[#163851]',
    },
    {
      id: 2,
      title: (
        <>
          <span className="font-semibold">Security & Personalization</span> <br />
          Built-In
        </>
      ),
      description:
        'Benefit from blockchain-level security and AI-powered investment recommendations tailored to your financial goals and risk profile.',
      image: '/futureai/security.png',
      bgColor: 'bg-[#926744]',
    },
  ];

  return (
    <main className="bg-[#071E2F] text-white px-4 md:px-16 py-8 md:py-16">
      <div className="md:mb-8 mb-6">
        <ButtonWithImage text="Future at" />
      </div>

      <h1 className="section-heading leading-relaxed max-w-6xl mb-12 mt-2">
        Our AI platform is under active development. It will help customers simplify market data analysis, understand deep investment intelligence, and make better informed decisions with ease.
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`rounded-[10px] relative overflow-hidden flex flex-col justify-between 
              h-[420px] sm:h-[450px] md:h-[500px] lg:h-[534px] 2xl:h-[600px] 
              ${card.bgColor}`}
          >
            {/* Card 1: with image at bottom */}
            {card.id === 1 && (
              <>
                {/* Text block */}
                <div className="z-10 p-4 sm:p-6 lg:p-8 xl:p-12">
                  <h2 className="section-heading font-light mb-3 leading-snug">
                    {card.title}
                  </h2>
                  <p className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-300">
                    {card.description}
                  </p>
                </div>

                <div className="relative w-full flex justify-center sm:justify-end z-10">
                  <div className="relative w-full h-[180px] sm:h-[230px] md:h-[280px] lg:h-[330px] overflow-hidden">
                    <Image
                      src="https://wallstreetjr.s3.me-central-1.amazonaws.com/animations/Brains+2_1.gif"
                      alt="Brains Animation"
                      fill
                      unoptimized
                      className="object-cover object-right translate-x-[20%]"
                    />
                    {/* Overlay (optional) */}
                    <div className="absolute pointer-events-none"></div>
                  </div>
                </div>
              </>
            )}

            {/* Card 2: full-height GIF background with text on top */}
            {card.id === 2 && (
              <>
                {/* Background GIF */}
                <Image
                  src="https://wallstreetjr.s3.me-central-1.amazonaws.com/animations/Bitcoin.gif"
                  alt="Bitcoin Animation"
                  fill
                  unoptimized
                  className="object-cover sm:object-cover  sm:object-center md:object-top object-bottom absolute inset-0 bg-[#926744]"
                />

                {/* Optional overlay for readability */}
                {/* <div className="absolute inset-0 bg-black/40"></div> */}

                {/* Text content */}
                <div className="relative z-10 p-4 sm:p-6 lg:p-8 xl:p-12">
                  <h2 className="section-heading font-light mb-3 leading-snug">
                    {card.title}
                  </h2>
                  <p className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-200">
                    {card.description}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
