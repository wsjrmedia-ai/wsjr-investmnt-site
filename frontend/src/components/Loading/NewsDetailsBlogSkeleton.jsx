'use client';

import styled from 'styled-components';
import Header from '../Home/Header';

const StyledSearchInput = styled.div`
  padding: 0.5rem 1rem;
  font-weight: 500;
  background: #1f2d3d;
  border: none;
  color: white;
  border-radius: 10px;
  width: 100%;
  max-width: 339px;
  min-height: 45px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 768px) {
    max-width: 180px;
    min-height: 42px;
  }
`;

export default function NewsDetailsBlogSkeleton() {
  return (
    <main
      className="lg:min-h-screen  bg-cover bg-center text-white bg-[#071E2F] animate-pulse"
      style={{ backgroundImage: "url('/Hero/background.png')" }}
    >

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16">
        {/* Left Skeleton Content */}
        <div className="space-y-6 max-w-2xl">
          <div className="lg:pt-12 space-y-6">
            {/* Title Skeleton */}
            <div className="h-10 md:h-12 bg-[#1f2d3d] rounded w-3/4"></div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-[#1f2d3d] rounded w-full"></div>
              <div className="h-4 bg-[#1f2d3d] rounded w-5/6"></div>
            </div>

            {/* Writer + Date Skeleton */}
            <div className="flex flex-wrap md:gap-4 gap-2 items-center w-full">
              <StyledSearchInput className="bg-[#1f2d3d] text-transparent">
                &nbsp;
              </StyledSearchInput>
              <div className="bg-[#1f2d3d] w-[186px] min-h-[42px] rounded-[10px]">&nbsp;</div>
            </div>
          </div>
        </div>

        {/* Right Image Placeholder (if uncommented later) */}
        {/* <div className="h-[400px] w-full bg-[#1f2d3d] rounded-xl"></div> */}
      </section>
    </main>
  );
}
