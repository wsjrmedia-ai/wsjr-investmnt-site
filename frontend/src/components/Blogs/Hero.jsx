'use client';

import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Header from '../Home/Header';

const StyledSearchInput = styled.input`
  padding: 0.5rem 1rem;
  font-weight: 500;
  background: transparent;
  border: none;
  color: white;
  border-radius: 10px;
  width: 100%;
  max-width: 339px;
  min-height: 45px;
  outline: none;
  background-image: url('/button/blogbuttonbg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 2px solid transparent;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 768px) {
    max-width: 180px;
    min-height: 42px;
    background-image: url('/button/buttonbg.png');
  }
`;

export default function Hero({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchText); // 🔁 Pass search text to parent
    }
  };

  return (
    <main
      className="lg:min-h-screen lg:px-16 lg:py-10 px-4 py-4 bg-cover bg-center text-white bg-[#071E2F]"
      style={{ backgroundImage: "url('/Hero/background.png')" }}
    >
      <Header />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16">
        {/* Left Content */}
        <div className="space-y-6 max-w-2xl">
          <div className="lg:pt-12 space-y-6">
            <h1 className="main-heading font-light leading-snug pt-8">
              <span className="font-bold">Smart</span> Portfolios <br />
              Stronger <span className="font-bold">Returns</span>
            </h1>

            <p className="text-gray-300 text-fluid">
              Our expert team actively manages your investments, optimizing performance while balancing risk and aligning with your goals.
            </p>

            {/* Search Input and Button */}
            <div className="flex flex-wrap md:gap-4 gap-2 items-center md:text-base text-sm w-full">
              <StyledSearchInput
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
              />

              <button
                onClick={handleSearchClick}
                className="bg-gradient-to-r from-[#A27335] to-[#0862A0] text-white font-medium px-4 py-2 rounded-[10px] md:w-[186px] min-h-[42px]
             cursor-pointer transition-all duration-200 hover:brightness-110 active:scale-95 focus-visible:outline-none"
              >
                Search
              </button>

            </div>
          </div>
        </div>

        {/* Right Image */}
        {/* <div className="flex justify-center md:justify-end">
          <Image
            src="/Hero/hero.png"
            alt="Hero Image"
            width={600}
            height={691}
            className="max-w-full h-auto object-contain rounded-xl"
            priority
          />
        </div> */}
      </section>
    </main>
  );
}
