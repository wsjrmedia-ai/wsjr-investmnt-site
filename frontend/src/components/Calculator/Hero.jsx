'use client';

import Image from 'next/image';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import Header from '../Home/Header';
import { getHeroSectionByServiceName } from '@/lib/services';
import Link from 'next/link';

const gradientBorder = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

export const AnimatedButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 2.5rem 0.5rem 0.5rem; /* extra right padding for arrow */
  font-weight: 500;
  background: transparent;
  border: none;
  color: white;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  z-index: 0;
  min-height: 42px;
  width: 180px;
  font-size: 0.9rem;

  /* Gradient Border */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    background: linear-gradient(90deg, #BA833C 0%, #0062A7 100%);
    border-radius: 0.5rem;

    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;

    z-index: -1;
  }

  /* Arrow Icon */
  span.arrow {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: #0463A5;
    color: white;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, color 0.3s;

    img {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;


export default function Hero() {

  return (
    <main
      className="relative md:min-h-screen lg:px-16 lg:py-10 px-4 pt-4 pb-8 bg-cover bg-center text-white bg-[#071E2F]"
      style={{ backgroundImage: "url('/Hero/background.png')" }}
    >
      {/* ✅ Dynamic Meta Tags */}


      {/* Extra BG on right side (desktop only) */}
      <div
        className={`absolute top-0 right-0 md:w-[100%] w-full h-full bg-no-repeat  md:bg-right bg-contain z-0`}
        style={{
          backgroundImage: `url('/Calculator/arrow.png')`,
          opacity: 0.6,
        }}
      />

      <div className="relative z-10">
        <Header />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16">
          {/* Left Content */}
          <div className="space-y-6 max-w-2xl">
            <div className="lg:pt-12 space-y-6">

              <h1 className="text-3xl xl:text-5xl lg:4xl md:text-3xl font-light leading-snug pt-2">
                Portfolio Management Advisory Calculator
              </h1>


              <p className="text-white text-base sm:text-lg">Precision & Clarity – Simplifying choices. Empowering decisions.
              </p>

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
          </div>

          {/* Right: Contact Box aligned to bottom right */}
          <div className="flex flex-col justify-end h-full md:min-h-[550px] ">
            <div className="bg-gradient-to-r from-[#B9833E1A] to-[#BA833CB3] rounded-xl p-[1px] max-w-[448px] w-full ml-auto">              <div className="bg-[#0B1F2D] rounded-xl p-6 md:p-8">
              <h3 className="md:text-[24px] text-[20px] font-semibold mb-2 text-white">Contact a Specialist</h3>
              <p className="text-sm text-white mb-6">
                Have questions about our Portfolio Management  Advisory? <br />
              </p>
              <p className="text-sm text-white mb-6">
                Our specialists are ready to help.
              </p>
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
