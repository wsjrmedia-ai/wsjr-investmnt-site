'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ButtonWithImage from '@/UI/AnimatedButton';

const testimonials = [
  {
    name: 'Customer Name 1',
    company: 'Company Name Here',
    image: '',
    message:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Customer Name 2',
    company: 'Company Name Here',
    image: '',
    message:
      'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.',
  },
  {
    name: 'Customer Name 3',
    company: 'Company Name Here',
    image: '',
    message:
      'It has survived not only five centuries, but also the leap into electronic typesetting.',
  },
  {
    name: 'Customer Name 4',
    company: 'Company Name Here',
    image: '',
    message:
      'Remaining essentially unchanged. It was popularised in the 1960s.',
  },
];

const breakpoints = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
};

const LOOP_INTERVAL = 5000;
const SCROLL_DURATION = 1000;

const TestimonialSlider = () => {
  const [cardsPerSlide, setCardsPerSlide] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth;
      if (width >= 1024) setCardsPerSlide(breakpoints.desktop);
      else if (width >= 768) setCardsPerSlide(breakpoints.tablet);
      else setCardsPerSlide(breakpoints.mobile);
    };

    updateCardsPerSlide();
    window.addEventListener('resize', updateCardsPerSlide);
    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, []);

  const scrollToIndex = (index) => {
    if (scrollRef.current && !isScrolling) {
      setIsScrolling(true);

      // Calculate scroll position based on card width and gap
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 0;
      const gap = 16; // 1rem = 16px
      const newScrollLeft = index * (cardWidth + gap);

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
      newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    }

    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, LOOP_INTERVAL);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  const cardWidthClass = cardsPerSlide === 3 ? 'w-full md:w-1/3' :
    cardsPerSlide === 2 ? 'w-full md:w-1/2' :
      'w-full';

  return (
    <div className="bg-[#071E2F] py-12 md:py-24 px-4 md:px-16 text-white relative">
      <div className="md:mb-8 mb-6">
        <ButtonWithImage text="Hear from our investors" image={'none'}/>
      </div>
      {/* <h1 className="section-heading  leading-relaxed max-w-6xl mb-12 mt-2">
        Real stories. Real results. Hear from who've transformed their financial journeys with us.
      </h1> */}

      <div className="relative">
        {/* Navigation */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#BA833C] z-10 w-[30px] h-[30px] flex items-center justify-center rounded-full shadow-md hover:bg-yellow-500 transition"
        >
          <Image src="/service/arrowleft.png" alt="Left" width={27} height={27} />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#BA833C] w-[30px] h-[30px] flex items-center justify-center rounded-full shadow-md hover:bg-yellow-500 transition"
        >
          <Image src="/service/arrowright.png" alt="Right" width={27} height={27} />
        </button>

        {/* Track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-2 hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory', scrollPadding: '0 16px' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${cardWidthClass} px-2`}
              style={{ scrollSnapAlign: 'start', minHeight: '266px' }}
            >
              <div
                className="bg-cover bg-no-repeat bg-center p-6 rounded-xl h-full"
                style={{ backgroundImage: `url('/Testimonial/cardbg.png')` }}
              >
                <div className="flex items-center mb-4 gap-3">
                  {loading ? (
                    <div className="w-16 h-16 rounded-full bg-gray-600 animate-pulse" />
                  ) : (
                    <ImageWithFallback
                      src={testimonial.image}
                      fallback="/Testimonial/person-default.png"
                      alt="Person"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    {loading ? (
                      <>
                        <div className="w-32 h-4 bg-gray-600 rounded animate-pulse mb-2" />
                        <div className="w-24 h-3 bg-gray-700 rounded animate-pulse" />
                      </>
                    ) : (
                      <>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-[#CCCCCC] font-semibold">
                          {testimonial.company}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <hr
                  style={{
                    height: '1px',
                    border: 'none',
                    background:
                      'linear-gradient(to right, rgba(91,112,125,0.3) 0%, #D3D7DB 50%, rgba(78,96,111,0.3) 100%)',
                    margin: '1rem 0',
                  }}
                />
                {loading ? (
                  <div className="space-y-2 pt-4">
                    <div className="w-full h-3 bg-gray-700 rounded animate-pulse" />
                    <div className="w-5/6 h-3 bg-gray-700 rounded animate-pulse" />
                    <div className="w-4/6 h-3 bg-gray-700 rounded animate-pulse" />
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed pt-4">{testimonial.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImageWithFallback = ({ src, fallback, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
    />
  );
};

export default TestimonialSlider;