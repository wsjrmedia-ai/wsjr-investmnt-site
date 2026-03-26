'use client';

import Image from 'next/image';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import Header from '../Home/Header';
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

  return (
    <main
      className="relative md:min-h-screen xl:px-16 lg:px-12 lg:py-10 px-4 pt-4 pb-8 bg-cover bg-center text-white bg-[#071E2F]"
      style={{ backgroundImage: "url('/Hero/background.png')" }}
    >
      {/* ✅ Dynamic Meta Tags */}




      <div className="relative z-10">
        <Header />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16">
          {/* Left Content */}
          <div className="space-y-6 max-w-3xl 3xl:max-w-7xl">
            <div className="lg:pt-12 space-y-6">

              <h1 className="main-heading font-light leading-snug pt-8">
                Meet the Minds                 <br />

                <span className="font-bold whitespace-nowrap"> Behind the Mission </span>

              </h1>



              <p className="text-gray-300 text-fluid">
                A collective of global expertise, institutional insight, and market precision delivering strategies that move capital smarter.          </p>

              <div className="flex flex-wrap gap-4 items-center md:text-base text-sm">
                <Link href="/contact-us">
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
            <div className="bg-[#0B1F2D] border border-gray-700 rounded-xl p-6 md:p-8 max-w-[448px] w-full ml-auto">
              <h3 className="text-lg font-semibold mb-2">Contact a Specialist</h3>
              <p className="text-sm text-gray-400 mb-6">
                Have questions about our investment management services? <br />
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
                href="/contact-us"
                className="w-full cursor-pointer h-[42px] py-2 flex items-center justify-center rounded-md bg-gradient-to-r from-[#FBAA4E] to-[#0075B7] text-white font-semibold"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
