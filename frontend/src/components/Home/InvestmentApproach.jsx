'use client';

import ButtonWithImage from '@/UI/AnimatedButton';
import { useRef, useState } from 'react';
import Image from 'next/image';

const cards = [
  {
    key: 1,
    highlight: 'Strategic',
    rest: 'Investment Planning & Market Positioning',
    description:
      'We design personalized strategies to position your investments effectively and plan for long-term success.',
    bg: '/approach/card1.png',
  },
  {
    key: 2,
    highlight: 'Comprehensive',
    rest: 'Risk Evaluation & Portfolio Guidance',
    description:
      'We help clients understand financial risks and offer planning and portfolio support for better decision-making.',
    bg: '/approach/card1.png',
  },
  {
    key: 3,
    highlight: 'Ethical',
    rest: 'Compliance & Transparent Investment Standards',
    description:
      'We ensure all processes comply with ethical standards and promote full transparency for investor confidence.',
    bg: '/approach/card1.png',
  },
];

export default function InvestmentApproach() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [openCardKey, setOpenCardKey] = useState(1);

  const cardRefs = useRef([]);


  const handleCardClick = (card) => {
    setOpenCardKey(card.key);
  };

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
    <main className="bg-[#071E2F] text-white px-4 md:px-16 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div>
          <div className="py-1 text-sm md:mb-8 mb-6">
            <ButtonWithImage text={'Approach at'} />
          </div>
          <p className="section-heading font-light mb-6">
            We are not collecting money, <br />
            the account holder will be the investors.
          </p>
          <p className="section-heading font-light">
            Our approach is built on <br />
            transparency, real-world experience, <br />
            and a deep understanding of <br />
            financial markets.
          </p>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="flex flex-col gap-4">
          {cards.map((card, index) => {
            const isOpen = openCardKey === card.key;
            return (
              <div
                key={card.key}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`relative rounded-xl overflow-hidden border border-gray-600 transition-all duration-500 ease-in-out cursor-pointer px-6 md:py-4 py-2 flex flex-col before:content-[''] before:absolute before:top-[var(--y)] before:left-[var(--x)] before:translate-x-[-50%] before:translate-y-[-50%] before:bg-[radial-gradient(var(--clr),transparent,transparent)] before:w-[700px] before:h-[700px] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 after:content-[''] after:absolute after:inset-[2px] after:rounded-xl
        ${isOpen ? 'h-[254px]' : 'md:h-[65px] h-[70px] bg-[#163952]'}
        ${isOpen ? 'card-hover-bg' : ''}
      `}
                style={
                  isOpen
                    ? {
                      backgroundImage: `url(${card.bg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      '--clr': '#B9833E',
                    }
                    : {}
                }
                onMouseMove={(e) => isOpen && handleMouseMove(e, index)}
                onMouseLeave={resetStyle}
                onClick={() => handleCardClick(card)}
              >
                {/* Glow Effect */}
                {isOpen && (
                  <>
                    <div className="before:content-[''] before:absolute before:top-[var(--y)] before:left-[var(--x)] before:translate-x-[-50%] before:translate-y-[-50%] before:bg-[radial-gradient(var(--clr),transparent,transparent)] before:w-[700px] before:h-[700px] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 after:content-[''] after:absolute after:inset-[2px] after:rounded-xl" />
                  </>
                )}

                <div className="flex flex-col justify-between h-full relative z-10">
                  <div className="flex justify-between items-center pt-1 md:pt-0">
                    <p
                      className={`text-[14px] md:text-lg font-light ${isOpen ? 'text-white' : 'text-white/90'
                        }`}
                    >
                      <span
                        className={`font-semibold ${!isOpen
                          ? 'bg-gradient-to-r from-[#BA833C] to-white bg-clip-text text-transparent animate-gradient-x'
                          : ''
                          } transition-all duration-500`}
                      >
                        {card.highlight}
                      </span>{' '}
                      {card.rest}
                    </p>

                    {!isOpen && (
                      <button
                        className="flex-shrink-0 border border-[#BA833C] w-[28px] h-[28px] flex items-center justify-center rounded-full shadow-m transition hover:bg-[#BA833C]"
                        onClick={() => handleCardClick(card)}
                      >
                        <Image
                          src="/service/arrowright.png"
                          alt="Scroll Right"
                          width={18}
                          height={18}
                          className="filter brightness-0 invert"
                        />
                      </button>
                    )}
                  </div>

                  {isOpen && (
                    <div className="text-sm text-gray-300 z-10 mt-2">{card.description}</div>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </main>
  );
}
