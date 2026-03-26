'use client';

import { getWhyChooseSectionByServiceName } from '@/lib/services';
import ButtonWithImage from '@/UI/AnimatedButton';
import GradientBox from '@/UI/GradientBox';
import React from 'react';
import CapitalCode from './CapitalCode';
import Link from 'next/link';

const groupPattern = [2, 3, 2, 3];

export default function WhyUsSection({ id }) {
  const whyChoose = getWhyChooseSectionByServiceName(id);
  const description = whyChoose?.description;
  const features = whyChoose?.features;
  const header = whyChoose?.header;
  const button = whyChoose?.button;
  const disclaimer = whyChoose?.disclaimer;
  let currentIndex = 0;


  if (features.length === 0) {
    return (
      <section className="bg-[#071E2F] text-white px-4 md:px-16 md:py-16 w-full pt-12">
        {disclaimer && (
          <>
            <Link
              href="/contact-us"
              className="w-[138px] h-[42px] py-2 flex items-center justify-center rounded-md bg-gradient-to-r from-[#FBAA4E] to-[#0075B7] text-white font-semibold"
            >
              Get Started
            </Link>

            <p className="text-[12px] 3xl:text-[14px] text-[#999] max-w-md italic pt-4">
              <span className="font-bold not-italic">Disclaimer:</span> {disclaimer}
            </p>
          </>
        )}
      </section>
    );
  }


  return (
    <section className="bg-[#071E2F] text-white px-4 md:px-16 md:py-16 w-full pt-12">
      {/* Button + Heading */}
      <div className="space-y-6 max-w-8xl py-4">
        <ButtonWithImage text={header} image={'none'} />
        {/* <h2 className="text-2xl md:text-3xl font-light max-w-6xl pt-4">
          {description}
        </h2> */}
      </div>

      {/* Feature Box Rows */}
      <div className="mt-10 space-y-6 w-full">
        {groupPattern.map((count, groupIndex) => {
          const group = features.slice(currentIndex, currentIndex + count);
          currentIndex += count;

          return (
            <div key={groupIndex} className="flex w-full justify-between flex-wrap gap-4">
              {group.map((feature, index) => (
                <>
                  {/* Desktop */}
                  <GradientBox
                    key={feature.heading + -index}
                    className="hidden md:flex flex-col text-white py-4 px-2 md:px-4 md:py-6 text-center cursor-pointer rounded-md md:text-[16px] text-[14px] min-h-[100px] shadow-sm transition-all bg-cover bg-center items-center justify-center flex-1"
                  >
                    <h3 className="font-semibold text-base md:text-lg">
                      {feature.heading}
                    </h3>
                    <p className="text-sm md:text-[14px] font-light mt-1">
                      {feature.description}
                    </p>
                  </GradientBox>

                  {/* Mobile */}
                  <GradientBox
                    key={index + 'mobile'}
                    className="md:hidden flex flex-col px-2 w-full py-4 text-white text-center cursor-pointer rounded-md text-[14px] shadow-sm border transition-all bg-cover bg-center items-center justify-center"

                  >
                    <h3 className="font-semibold text-base">
                      {feature.heading}
                    </h3>
                    <p className="text-sm font-light mt-1">
                      {feature.description}
                    </p>
                  </GradientBox>
                </>
              ))}
            </div>
          );
        })}
      </div>
      {(disclaimer) && (
        <>

          <Link
            href="/contact-us"
            className="w-[138px] h-[42px] py-2 flex items-center justify-center rounded-md bg-gradient-to-r from-[#FBAA4E] to-[#0075B7] text-white font-semibold"
          >
            Get Started
          </Link>

          {disclaimer && (
            <p className="text-[12px] 3xl:text-[14px] text-[#999] max-w-md italic pt-4">
              <span className="font-bold not-italic">Disclaimer:</span> {disclaimer}
            </p>
          )}
        </>
      )}
    </section>
  );
}
