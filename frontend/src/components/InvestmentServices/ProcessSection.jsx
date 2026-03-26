'use client';

import { getProcessTemplateByServiceName } from '@/lib/services';
import ButtonWithImage from '@/UI/AnimatedButton';
import Image from 'next/image';

export default function ProcessSection({ id }) {
  const details = getProcessTemplateByServiceName(id);
  const imagesrc = details?.processSection?.image;
  const process = details?.processSection?.process;
  const header = details?.processSection?.header;
  const description = details?.processSection?.description;

  return (
    <section className="bg-[#071E2F] text-white px-4 md:px-16 md:py-22 py-12">
      <ButtonWithImage text={header} image={'none'} />

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-stretch md:pt-12 pt-10">
        {/* Left Side (image visible on both mobile + desktop) */}
        {!description && <div className="relative w-full h-64 md:h-full">


            <Image
              src={imagesrc}
              alt="Core Process"
              fill
              priority
              className="md:object-contain md:object-left object-cover rounded-md" />

        </div>}

        {description &&
          <div className="w-full flex flex-col md:flex-col gap-6">
            {/* Description */}
            <h2 className="text-2xl md:text-3xl font-light max-w-2xl">
              {description}
            </h2>

            {/* Image */}
            <div className="relative h-64 md:h-[350px] md:w-[90%] w-full">
              <Image
                src={imagesrc}
                alt="Core Process"
                fill
                priority
                className="object-contain md:object-left rounded-md"
              />
            </div>
          </div>
        }

        {/* Right Side */}
        <div className="space-y-8">
          {process?.map((item, index) => (
            <div key={index} className="flex items-start gap-6">
              <span
                className={`bg-gradient-to-r from-[#E4BC88] to-[#E7901F] bg-clip-text text-transparent text-[45px] md:text-[55px] font-bold py-4 ${index === 0 ? 'p-1' : ''
                  }`}
              >
                {item.id}
              </span>
              <div className="mt-6">
                <h3 className="section-heading font-semibold">
                  {item?.heading}
                </h3>
                <p className="text-[16px] text-white mt-1 font-regular">
                  {item?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
