'use client'

import ButtonWithImage from '@/UI/AnimatedButton';
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'



const GradientText = styled.div`
 
  background: linear-gradient(to right, #A37E4D, #E7901F);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: bold;
`;



export default function ServiceAbout() {
  return (
    <div className=" text-white px-4 md:px-16 py-10 md:space-y-12 bg-[#071E2F] ">


      {/* Stats Box Section with full background image */}
      <div
        className="bg-cover bg-center bg-no-repeat  w-full rounded-xl px-4 md:px-16 py-6 md:py-10 shadow-lg"
        style={{
          backgroundImage: "url('/Hero/aboutbg.png')",
        }}
      >
        <h2 className="text-lg md:text-xl font-medium mb-8 text-white px-4">
          Measured. Tracked. Delivered.        </h2>
        <div className="w-full px-4  ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-22 text-white text-left">
            <div className="flex flex-col items-start">
              <GradientText className="text-3xl md:text-[55px] font-bold">5-7%</GradientText>
              <p className="text-[16px] text-left md:w-[90%] text-gray-300 mt-2">Monthly growth delivered consistently</p>
            </div>
            <div className="flex flex-col items-start">
              <GradientText className="text-3xl md:text-[55px] font-bold">3000+</GradientText>
              <p className="text-[16px] text-left md:w-[90%] text-gray-300 mt-2">Consultations in asset investments</p>
            </div>
            <div className="flex flex-col items-start">
              <GradientText className="text-3xl md:text-[55px] font-bold">5000+</GradientText>
              <p className="text-[16px] md:w-[90%] text-left text-gray-300 mt-2">Investors educated from all over the world</p>
            </div>
            {/* <div className="flex flex-col items-start">
              <GradientText className="text-3xl md:text-[55px] font-bold">7%</GradientText>
              <p className="text-[16px] text-left md:w-[90%] text-gray-300 mt-2">Lorem Ipsum is simply dummy text </p>
            </div> */}
          </div>
        </div>

      </div>


    </div>
  )
}
