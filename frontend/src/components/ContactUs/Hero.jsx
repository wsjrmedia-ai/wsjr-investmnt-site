'use client'

import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import Header from '../Home/Header'
import ContactSection from './ContactSection'

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
        <main
            className="xl:px-16 lg:px-12 lg:py-10 md:px-10 px-4 py-4 bg-cover bg-center text-white bg-[#071E2F]"
            style={{ backgroundImage: "url('/Hero/background.png')" }}
        >
            <Header />
            <ContactSection />
        </main>
    )
}
