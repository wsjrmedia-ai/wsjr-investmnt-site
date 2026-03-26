'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import ButtonWithImage from '@/UI/AnimatedButton';
import { getAllServicesOverview } from '@/lib/services';
import Link from 'next/link';

export default function ServiceMain() {
  const details = getAllServicesOverview();
  const cardRefs = useRef([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    setHoveredCard(index);
  };

  const resetStyle = () => {
    setHoveredCard(null);
  };

  return (
    <section className="bg-[#071E2F] md:px-16 px-4 md:py-26 text-white py-16">
      <div className="mx-auto text-left space-y-6">
        <ButtonWithImage text={'What we do at'} />
        <h2 className="section-heading max-w-6xl py-6 leading-relaxed">
          Our comprehensive suite of services is designed to provide you with the expertise and guidance needed to achieve your financial goals.
        </h2>

        {/* Responsive Grid Layout */}
        <div className="flex justify-center sm:block">
          <div className="grid gap-6 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {details.map((service, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={resetStyle}
                className="card-hover-bg min-w-[280px] w-[290px] h-[375px] md:min-w-[341px] md:max-w-[351px] md:h-[355px] relative flex-shrink-0 cursor-pointer rounded-xl p-5 transition-all duration-500 group overflow-hidden flex flex-col before:content-[''] before:absolute before:top-[var(--y)] before:left-[var(--x)] before:translate-x-[-50%] before:translate-y-[-50%] before:bg-[radial-gradient(var(--clr),transparent,transparent)] before:w-[700px] before:h-[700px] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 after:content-[''] after:absolute after:inset-[2px] after:rounded-xl"
                style={{ '--clr': '#B9833E' }}
              >
                {/* Content Layer */}
                <div className="relative z-40 flex flex-col justify-between h-full">
                  <div className="w-full h-[162px] relative mb-4">
                    <Image
                      src={service.thumbImg}
                      alt={service.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div className="md:h-[60px] h-[30px]">
                      <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                      <p className="text-sm text-gray-300">{service.shortDesc}</p>
                    </div>
                    <Link key={service.name} href={`/services/${service.url}`}>
                      <p className="mt-3 text-white cursor-pointer underline">Know More</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}