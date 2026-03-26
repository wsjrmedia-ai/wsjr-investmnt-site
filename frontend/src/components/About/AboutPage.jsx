'use client';

import ButtonWithImage from '@/UI/AnimatedButton';
import Image from 'next/image';
import styled from 'styled-components';

const GradientText = styled.div`
  background: linear-gradient(to right, #FBAA4E, #E7901F);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

export default function AboutPage() {
  return (
    <div className="text-white px-4 md:px-16 space-y-12 bg-[#071E2F] py-16">
      {/* Top Paragraph */}
      <p className="md:text-[30px] text-[20px]  font-light">
        Struggling to navigate investments? Our clients found clarity and growth with Wall Street Jr.
        Through expert strategy and real-time insights, they’ve gained more control in less time. Join
        thousands building wealth with confidence.
      </p>

      {/* Two-Column Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Text Block */}
        <div className="space-y-6 md:max-w-[600px]">
          <h2 className="text-[20px] md:text-[30px] leading-relaxed font-light">
            Turning Financial Vision Into Action <br />
            with Personalized <span className="font-semibold">Strategy, Insight,</span><br />
            and Real-World <span className="font-semibold">Experience</span>
          </h2>
          <p className="text-gray-300 text-[16px]">
            Partner with experts who understand markets and design tailored solutions for your financial goals.
          </p>
        </div>

        {/* Right Stats Box */}
<div
  className="bg-cover bg-center bg-no-repeat rounded-xl px-6 md:px-12 xl:px-20 py-10 shadow-md grid grid-cols-2 gap-x-10 gap-y-8 text-left text-white max-w-7xl mx-auto"
  style={{
    backgroundImage: "url('/Hero/aboutbg.png')",
  }}
>
  <div>
    <GradientText className="text-[30px] md:text-[40px]">25K</GradientText>
    <p className="text-sm md:text-base text-gray-300">ACTIVE USERS</p>
  </div>
  <div>
    <GradientText className="text-[30px] md:text-[40px]">300+</GradientText>
    <p className="text-sm md:text-base text-gray-300">5-STAR REVIEWS</p>
  </div>
  <div>
    <GradientText className="text-[30px] md:text-[40px]">$50M</GradientText>
    <p className="text-sm md:text-base text-gray-300">ASSETS UNDER GUIDANCE</p>
  </div>
  <div>
    <GradientText className="text-[30px] md:text-[40px]">700+</GradientText>
    <p className="text-sm md:text-base text-gray-300">CLIENT PORTFOLIOS MANAGED</p>
  </div>
</div>

      </div>
    </div>
  );
}
