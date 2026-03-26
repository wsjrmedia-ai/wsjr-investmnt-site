'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ButtonWithImage from '@/UI/AnimatedButton';
import { getAllServicesOverview } from '@/lib/services';
import Link from 'next/link';

const LOOP_INTERVAL = 5000;
const CARD_WIDTH = 280;
const SCROLL_DURATION = 1000;

export default function ServiceSlider() {
  const details = getAllServicesOverview();
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index) => {
    if (scrollRef.current && !isScrolling) {
      setIsScrolling(true);
      const newScrollLeft = index * CARD_WIDTH;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      setTimeout(() => {
        setIsScrolling(false);
        setCurrentIndex(index);
      }, SCROLL_DURATION);
    }
  };

  const scroll = (direction) => {
    if (isScrolling) return;

    let newIndex;
    if (direction === 'left') {
      newIndex = currentIndex === 0 ? details.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === details.length - 1 ? 0 : currentIndex + 1;
    }

    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, LOOP_INTERVAL);
    return () => clearInterval(interval);
  }, [currentIndex]);

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
        <div className="md:mb-8 mb-6">
          <ButtonWithImage text={'Our Services '} image={'none'} />
        </div>

        <h2 className="section-heading max-w-6xl leading-relaxed">
          Our comprehensive suite of advisory and consultancy services can provide you with the right expertise and guidance
        </h2>

        <div className="relative">
          {/* Arrows only for mobile & tablet */}
          <div className="block xl:hidden">
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#BA833C] z-60 w-[30px] h-[30px] flex items-center justify-center rounded-full shadow-md hover:bg-yellow-500 transition"
            >
              <Image src="/service/arrowleft.png" alt="Scroll Left" width={27} height={27} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-60 bg-[#BA833C] w-[30px] h-[30px] flex items-center justify-center rounded-full shadow-md hover:bg-yellow-500 transition"
            >
              <Image src="/service/arrowright.png" alt="Scroll Right" width={27} height={27} />
            </button>
          </div>

          {/* Container - responsive layout */}
          <div
            ref={scrollRef}
            className="
              2xl:grid 2xl:grid-cols-4 2xl:gap-6 2xl:overflow-hidden 
              lg:flex lg:overflow-x-auto lg:scroll-smooth lg:gap-6 
              flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-2 hide-scrollbar
            "
            style={{ scrollSnapType: 'x mandatory', scrollPadding: '0 16px' }}
            onMouseLeave={resetStyle}
          >
            {details.map((service, index) => (
              <Link key={index} href={`/services/${service.url}`}>
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={resetStyle}
                  className="
                    card-hover-bg min-w-[280px] w-[290px] h-[345px]
                    md:min-w-[300px] md:w-[300px] md:h-[350px]
                    2xl:min-w-[340px] 2xl:w-[350px] 2xl:h-[360px] 
                    relative flex-shrink-0 cursor-pointer rounded-xl p-5 
                    transition-all duration-500 group overflow-hidden flex flex-col
                    before:content-[''] before:absolute before:top-[var(--y)] before:left-[var(--x)] 
                    before:translate-x-[-50%] before:translate-y-[-50%] 
                    before:bg-[radial-gradient(var(--clr),transparent,transparent)] 
                    before:w-[700px] before:h-[700px] before:opacity-0 
                    before:transition-opacity before:duration-500 hover:before:opacity-100 
                    after:content-[''] after:absolute after:inset-[2px] after:rounded-xl
                  "
                  style={{ scrollSnapAlign: 'start', '--clr': '#B9833E' }}
                >
                  {/* Content */}
                  <div className="relative z-40 flex flex-col justify-between h-full">
                    <div className="w-full h-[162px] relative mb-4">
                      <Image
                        src={service.thumbImg}
                        alt={service.name}
                        fill
                        className="rounded-[8px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div className="md:h-[60px] h-[30px]">
                        <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                        <p className="text-sm text-gray-300">{service.shortDesc}</p>
                      </div>
                      <p className="mt-3 text-white cursor-pointer underline">Know More</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
