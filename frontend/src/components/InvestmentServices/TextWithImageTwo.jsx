'use client';

import Image from 'next/image';
import { getTextWithImageByServiceName } from '@/lib/services';

export default function TextWithImageTwo({ id }) {
  const details = getTextWithImageByServiceName(id);
  const imageSrc = details?.textWithImageSection?.image;
  const paragraphs = details?.textWithImageSection?.paragraphs;
  return (
    <section className="relative bg-[#071E2F]  text-white  ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt="Descriptive Visual"
          fill
          className="object-fill  opacity-30"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0  bg-opacity-30" />
      </div>

      {/* Text Overlay */}
      <div className="relative z-10 h-full flex items-center px-4 md:px-16 py-12">
        <div className="space-y-6 heading-sub text-gray-300 ">
          {paragraphs.map((text, index) => (
            <p className='leading-relaxed' key={index}>{text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
