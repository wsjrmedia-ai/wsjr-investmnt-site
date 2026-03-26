'use client'

import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import Header from '../Home/Header'

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
  width: 180px;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px;
    // background: linear-gradient(270deg, #BA833C, #0062A7);
    // background-size: 400% 400%;
    // animation: ${gradientBorder} 1s linear infinite;

        background-image: url('/button/buttonbg.png'); /* Replace with your image */
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
    <main className=" bg-cover bg-center text-white bg-[#071E2F] lg:h-auto" 
    style={{ backgroundImage: "url('/Hero/background.png')" }}>
      <div className='lg:px-16 lg:py-10 md:px-12 px-4 py-4'>
        <Header />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 mt-7">
        {/* Left Content WITH padding */}
        <div className="space-y-6 max-w-6xl 3xl:max-w-7xl px-4 md:px-12 lg:px-20 py-10">
          {/* <AnimatedButton>
            Start Investing
            <span className="arrow">
              <Image src="/Hero/buttonarrow.png" alt="Arrow" width={24} height={24} />
            </span>
          </AnimatedButton> */}

          <h1 className="main-heading font-light leading-snug pt-16">
            <span className="font-bold text-white">2,486%</span> returns.<br />
            One<span className="font-bold text-white"> strategy.</span>
          </h1>

          <p className="text-gray-300 text-fluid">
            How we turned market expertise into exceptional client success
          </p>
        </div>

        {/* Right Image WITHOUT padding */}
        <div className="flex justify-end items-end m-0 p-0">
          <Image
            src="/casestudy/hero.png"
            alt="Hero Image"
            width={1080}
            height={600}
            className="max-w-full md:h-[580px] h-auto object-contain object-right"
            priority
          />
        </div>
      </section>
    </main>
  )
}
