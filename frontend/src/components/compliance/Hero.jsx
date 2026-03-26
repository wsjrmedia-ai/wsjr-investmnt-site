'use client'

import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import Header from '../Home/Header'
import Link from 'next/link';

const gradientBorder = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`

export const AnimatedButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-weight: 500;
  background: transparent;
  border: none;
  color: white;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  z-index: 0;
  min-height: 42px;
  width: 151px;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px;
    background-image: url('/button/contactbg.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0.5rem;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
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
    transition: background 0.3s, color 0.3s;

    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`

export default function Hero() {
  return (
    <main
      className="bg-cover bg-center text-white bg-[#071E2F]"
      style={{ backgroundImage: "url('/Hero/background.png')" }}
    >
      <div className="lg:px-16 lg:py-10 px-4 py-4">
        <Header />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-1 mt-7">
        {/* Left Content WITH padding */}
        <div className="space-y-6 max-w-6xl px-4 lg:px-20 py-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-snug pt-4">
            <span className="font-bold text-white">Compliance &</span>{" "}
            <span className="font-bold text-white">Legal Disclosures</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg">
            At Wall Street Jr. Investments, we are committed to operating with full transparency and adherence 
            to applicable laws and regulations. Our Compliance & Legal Disclosures ensure clients understand 
            their rights, obligations, and the safeguards we maintain under UAE and international standards.
          </p>

          {/* Optional Button */}
          {/* <Link href="#contact" scroll={true}>
            <AnimatedButton>
              Contact Us
              <span className="arrow">
                <Image src="/Hero/buttonarrow.png" alt="Arrow" width={24} height={24} />
              </span>
            </AnimatedButton>
          </Link> */}

          <div className="space-y-1">
            <p>
              <a href="mailto:office@wallstreetjr.com" className=" text-white">
                office@wallstreetjr.com
              </a>
            </p>
            <a href="tel:+97145529700" className="hover:underline">
              +971 4 552 9700
            </a>
          </div>
        </div>

        {/* Right Image (optional, currently disabled) */}
        {/* <div className="flex justify-end items-end m-0 p-0">
          <Image
            src="/about/hero-bg.png"
            alt="Hero Image"
            width={620}
            height={620}
            className="max-w-full h-auto object-contain"
            priority
          />
        </div> */}
      </section>
    </main>
  )
}
