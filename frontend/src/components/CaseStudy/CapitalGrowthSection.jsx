"use client";

import Image from "next/image";
import styled, { keyframes } from "styled-components";

const gradientBorder = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

export const AnimatedButton = styled.button`
  position: absolute; /* <-- Fix: place at top-left */
  top: 0.75rem;
  left: 0.75rem;
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
  min-height: 42px;
  width: 180px;
  z-index: 10;
  text-align: center;
  justify-content: center;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px;
    background-image: url('/button/buttonbg.png'); /* Replace with your image */
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0.5rem;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
  }
`;

export default function CapitalGrowthSection() {
  return (
    <div
      className="w-full bg-[#071E2F] text-white flex flex-col md:flex-row items-stretch px-4 md:px-16 pb-10 gap-6 md:gap-[5%]"
    >
      {/* Left Image with Label */}
      <div className="relative w-full md:w-[35%] rounded-lg overflow-hidden h-[220px] md:h-[309px]">
        <Image
          src="/casestudy/CapitalGrowthSection/capital-growth.png"
          alt="Capital Growth"
          width={600}
          height={309}
          className="w-full h-full object-cover rounded-lg z-0"
        />
        <AnimatedButton>Capital Growth</AnimatedButton>
      </div>

      {/* Middle Text with Right Background Image */}
      <div className="relative flex-1 flex items-center justify-center px-4 md:px-6 rounded-lg overflow-hidden min-h-[200px] md:min-h-[309px]">
        {/* Background image */}
        <Image
          src="/casestudy/CapitalGrowthSection/growth-bar.png"
          alt="Background"
          fill
          className="absolute inset-0 object-contain object-right"
        />
        {/* Text */}
        <p className="relative section-desc leading-relaxed text-gray-200 text-center md:text-left">
          Starting with a deposit of <span className="font-semibold">$32,000</span>,
          we generated cumulative profits of over half a million USD, with returns
          accelerating in the final quarters of the performance period. The compounding
          effect, combined with high-conviction trades, created an exponential growth curve.
        </p>
      </div>
    </div>
  );
}
