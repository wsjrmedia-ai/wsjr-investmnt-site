'use client'

import ButtonWithImage from '@/UI/AnimatedButton';
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import { Info } from 'lucide-react'

const GradientText = ({ children, className = '' }) => (
  <span
    className={`bg-gradient-to-r from-[#A37E4D] via-[#E7901F] to-[#E7901F] bg-clip-text text-transparent font-bold ${className}`}
  >
    {children}
  </span>
)

export default function AboutPage() {
  return (
    <div className="text-white px-4 sm:px-8 md:px-12 lg:px-16 py-12 md:py-16 space-y-10 md:space-y-12 bg-[#071E2F]">
      {/* Header Section */}
      <div className="flex flex-col text-center md:text-left">
        <div className="mb-6 md:mb-8">
          <ButtonWithImage text="Trusted. Tracked. Delivered." image="none" />
        </div>
        <h1 className="section-heading leading-relaxed text-left max-w-3xl md:max-w-5xl lg:max-w-6xl mx-auto md:mx-0 font-semibold">
          Our team consistently monitors performance and delivers real-time insights.
        </h1>
      </div>

      {/* Stats Box Section */}
      <div
        className="bg-cover bg-center bg-no-repeat w-full rounded-xl px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-12 lg:py-16 shadow-lg"
        style={{
          backgroundImage: "url('/Hero/aboutbg.png')",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-white text-center md:text-left">
          {/* Stat 1 */}
          <div className="flex flex-col items-center md:items-start">
            <GradientText className="text-3xl sm:text-4xl md:text-[48px] lg:text-[55px] font-bold">
              5-7%
            </GradientText>
            <p className="flex items-center gap-2 text-[14px] sm:text-[15px] md:text-[16px] text-gray-300 mt-2">
              Model-based monthly target range
              <span className="relative group cursor-pointer">
                <Info className="w-4 h-4 text-gray-400" />
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block w-64 sm:w-72 bg-gray-800 text-gray-300 text-xs rounded-lg p-3 shadow-lg z-50 text-left">
                  Illustrative only - not guaranteed. Past performance is not indicative of future results.{" "}
                  <a
                    href="/compliance-legal-disclosures"
                    className="underline text-[white]  break-words"
                  >
                    [See Compliance & Risk Disclosures]
                  </a>
                </span>
              </span>
            </p>

          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center md:items-start">
            <GradientText className="text-3xl sm:text-4xl md:text-[48px] lg:text-[55px] font-bold">
              3000+
            </GradientText>
            <p className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-300 mt-2">
              Consultations <br /> in asset investments
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center md:items-start">
            <GradientText className="text-3xl sm:text-4xl md:text-[48px] lg:text-[55px] font-bold">
              5000+
            </GradientText>
            <p className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-300 mt-2">
              Investors <br /> educated from all over the world
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
