'use client';

import Image from 'next/image';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import Header from '../Home/Header';
import { getHeroSectionByServiceName } from '@/lib/services';
import Link from 'next/link';

const gradientBorder = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

export const AnimatedButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
  font-weight: 500;
  background: transparent;
  border: none;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  z-index: 0;
  min-height: 42px;
  width: 180px;

  @media (min-width: 700px) { width: 200px; }
  @media (min-width: 1920px) { width: 245px; min-height: 56px; font-size: 1.25rem; }
  @media (min-width: 2560px) { width: 260px; min-height: 64px; font-size: 1.4rem; }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    background: linear-gradient(90deg, #BA833C, #0062A7);
    border-radius: 0.5rem;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }

  span.arrow {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: #0463A5;
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function Hero({ id, align }) {
  const heroSection = getHeroSectionByServiceName(id);
  return (
    <main className="relative md:min-h-screen xl:px-16 lg:px-12 lg:py-10 px-4 pt-4 pb-8  text-white overflow-hidden">
      {/* ✅ Meta Tags */}
      <Head>
        <title>{heroSection?.header || 'Service Details | Wall Street Jr'}</title>
        <meta name="description" content={heroSection?.description || 'Explore our service offerings tailored to your financial goals.'} />
        {heroSection?.thumbImg && <meta property="og:image" content={heroSection.thumbImg} />}
      </Head>

      {/* ✅ Full Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          src="/Hero/background.png"
          alt="Background"
          fill
          priority
          quality={90}
          className="object-cover object-center bg-[#071E2F]"
        />
      </div>

      {/* ✅ Right Side Extra Image */}
      {/* Right Side Extra Image */}
      {/* Right Side Extra Image */}
      {heroSection?.bg && (
        <div className="absolute top-0 right-0 w-full h-[300px] sm:h-[400px] md:w-[55%] md:h-full opacity-60 z-0">
          <Image
            src={heroSection.bg}
            alt="Service Background Overlay"
            fill
            className="object-contain object-right"
            priority={true}          // hero section, above the fold
            sizes="(max-width: 768px) 100vw, 55vw" // responsive image sizes
            quality={75}            // lower quality to improve load speed
            placeholder="blur"       // optional: blurry preview while loading
            blurDataURL={heroSection.bg} // small blurred image
          />
        </div>
      )}




      <div className="relative z-10">
        <Header />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16">
          {/* Left Content */}
          <div className="space-y-6 max-w-6xl 3xl:max-w-7xl">
            <h1 className="main-heading font-light leading-snug pt-4">
              {heroSection?.header?.split(/(\s|\/)/).map((part, index) => {
                const boldWords = heroSection?.bold?.split(' ') || [];
                const isBold = boldWords.includes(part);

                if (part === ' ') return ' ';
                if (part === '/')
                  return (
                    <span key={index} className="font-light">
                      /<br />
                    </span>
                  );

                return (
                  <span key={index} className={isBold ? 'font-bold' : 'font-light'}>
                    {part}
                  </span>
                );
              })}
            </h1>

            <p className="text-white text-fluid">{heroSection?.description}</p>

            <div className="flex flex-wrap gap-4 items-center md:text-base text-sm">
              <Link href="#contact">
                <AnimatedButton>
                  Get Started Today
                  <span className="arrow">
                    <Image src="/Hero/buttonarrow.png" alt="Arrow" width={24} height={24} />
                  </span>
                </AnimatedButton>
              </Link>

            </div>



          </div>

          {/* Right: Contact Box */}
          <div className="flex flex-col justify-end h-full md:min-h-[550px]">
            <div className="bg-gradient-to-r from-[#B9833E1A] to-[#BA833CB3] rounded-xl p-[1px] max-w-[448px] w-full ml-auto">
              <div className="bg-[#0B1F2D] rounded-xl p-6 md:p-8">
                <h3 className="md:text-[24px] text-[20px] font-semibold mb-2 text-white">
                  Contact a Specialist
                </h3>
                <p className="text-sm text-white mb-6">
                  Have questions about our {heroSection?.name}? <br />
                </p>
                <p className="text-sm text-white mb-6">Our specialists are ready to help.</p>
                {/* <a
                  href="https://calendly.com/d/csds-vxm-ckw/call-with-wall-street-jr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full cursor-pointer h-[42px] py-2 flex items-center justify-center rounded-md bg-gradient-to-r from-[#FBAA4E] to-[#0075B7] text-white font-semibold"
                >
                  Schedule Consultation
                </a> */}

                <Link
                  href="#contact"
                  className="w-full cursor-pointer h-[42px] py-2 flex items-center justify-center rounded-md bg-gradient-to-r from-[#FBAA4E] to-[#0075B7] text-white font-semibold"
                >
                  Schedule Consultation
                </Link>


              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
