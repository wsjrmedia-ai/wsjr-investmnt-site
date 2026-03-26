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
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  font-weight: 500;
  background: transparent;
  border: none;
  color: white;
  background-color: transparent;
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
    // background: linear-gradient(270deg, #BA833C, #0062A7);
    // background-size: 400% 400%;
    // animation: ${gradientBorder} 1s linear infinite;

        background-image: url('/button/contactbg.png'); /* Replace with your image */
    background-size: contain;
    bground-position: center;
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
    <main className="bg-cover bg-center text-white bg-[#071E2F]"
      style={{ backgroundImage: "url('/Hero/background.png')" }}>
      <div className='lg:px-16 lg:py-10 px-4 py-4'>
        <Header />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 mt-7">
        {/* Left Content WITH padding */}
        <div className="space-y-6 max-w-6xl px-4 lg:px-20 py-10">


          <h1 className="text-3xl xl:text-5xl lg:4xl md:text-3xl font-light leading-snug pt-4">
            <span className="font-bold text-white">Privacy</span>
            <span className="font-bold text-white"> Policy</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg">
          Your privacy is important to us. This policy outlines how Wall Street Jr Investments collects, uses, and protects your information.
            </p>

          {/* <Link href="#contact" scroll={true}>
            <AnimatedButton>
              Contact Us
              <span className="arrow">
                <Image src="/Hero/buttonarrow.png" alt="Arrow" width={24} height={24} />
              </span>
            </AnimatedButton>
          </Link> */}
           <div className="space-y-1">
            <p><a href="mailto:office@wallstreetjr.com" className=" text-white">office@wallstreetjr.com</a></p>
            <p><a href="tel:+0445529700" className="hover:underline">
              (04) 552 9700
            </a></p>
          </div>

        </div>
        

        {/* Right Image WITHOUT padding */}
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
