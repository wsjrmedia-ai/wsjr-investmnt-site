'use client';

import Image from 'next/image';
import ButtonWithImage from '@/UI/AnimatedButton';

export default function WhyWallStreet() {
  const cards = [
    {
      id: 1,
      image: '/why/why1.png',
      title: "Founder's Expertise",
      description:
        'Founded by a real investor with professional Wall Street expertise',
      span: 'md:col-span-3',
      imgClass: 'object-cover object-center',
    },
    {
      id: 2,
      image: '/why/why2.png',
      title: 'Deep Intelligence:',
      description:
        'Access to order flow, institutional investment insights and industry performance data.',
      span: 'md:col-span-2',
      imgClass: 'object-cover object-top',
    },
    {
      id: 3,
      image: '/why/why3.png',
      title: 'Unique Methodology:',
      description:
        'Banking and investment methods that are tried and tested',
      span: 'md:col-span-2',
      imgClass: 'object-cover object-center',
    },
    {
      id: 4,
      image: '/why/why4.png',
      title: 'Future Technology:',
      description: 'AI tools to simplify market analysis (Available soon)',
      span: 'md:col-span-3',
      imgClass: 'object-cover object-left',
    },
    {
      id: 5,
      image: '/why/why5.png',
      title: 'Ethical standards:',
      description:
        'We ensure all processes are compliant with restrictions',
      span: 'md:col-span-5',
      imgClass: 'object-cover object-left',
    },
  ];

  return (
    <main
      className="text-white px-4 md:px-16 py-16 font-sans bg-no-repeat bg-cover bg-center bg-[#071E2F]"
      style={{
        backgroundImage: "url('/why/whybg.png')",
      }}
    >
      {/* Button */}
      <div className="md:mb-8 mb-6">
        <ButtonWithImage text="Why" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`bg-[#071E2F] rounded-[8px] overflow-hidden shadow-md flex flex-col ${card.span}`}
          >
            <div className="relative h-[140px] w-full">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className={`rounded-t-[8px] ${card.imgClass}`}
                quality={85}          // optimized quality
                sizes="(max-width: 768px) 100vw, 33vw" // responsive sizing
                priority={false}      // lazy loading by default
                placeholder="blur"    // optional blur placeholder
                blurDataURL={card.image} // use same image as small placeholder
              />
            </div>
            <div className="p-6">
              <h2 className="font-semibold text-white mb-1 md:text-[16px] text-sm">
                {card.title}
              </h2>
              <p className="md:text-[16px] text-sm text-gray-300">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
