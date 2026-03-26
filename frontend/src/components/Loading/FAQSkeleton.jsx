'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonBox = styled.div`
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(90deg, #1a2b3a 25%, #263c51 50%, #1a2b3a 75%);
  background-size: 1000px 100%;
  border-radius: 4px;
`;

export default function FAQSkeleton() {
  return (
    <main className="bg-[#071E2F] text-white px-4 md:px-16 pb-16 py-16 md:py-20 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* LEFT SIDE */}
        <div>
          <div className="mb-8 w-24 h-10">
            <SkeletonBox className="w-full h-full" />
          </div>

          <div className="mb-4 h-8 w-[90%]">
            <SkeletonBox className="w-full h-full" />
          </div>

          <div className="h-4 w-[70%]">
            <SkeletonBox className="w-full h-full" />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="border-b border-gray-600 pb-4">
              <div className="flex justify-between items-start">
                <div className="w-[80%] h-5 mb-2">
                  <SkeletonBox className="w-full h-full" />
                </div>
                <div className="w-6 h-6 rounded-full border border-[#BA833C]">
                  <SkeletonBox className="w-full h-full rounded-full" />
                </div>
              </div>
              <div className="w-[90%] h-4 mt-2">
                <SkeletonBox className="w-full h-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
