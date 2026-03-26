'use client';

import { getTextWithImageByServiceName } from '@/lib/services';
import Image from 'next/image';
import CapitalCode from './CapitalCode';
import RiskDomains from './RiskDomains';

export default function TextWithImage({ id }) {

    const details = getTextWithImageByServiceName(id);
    const imageSrc = details?.textWithImageSection?.image;
    const paragraphs = details?.textWithImageSection?.paragraphs;
    const name = details?.textWithImageSection?.name;

    return (
        <>
            <section className="bg-[#071E2F] text-white px-4 md:px-16 md:py-16 pt-12">
                <div className="w-full rounded-xl overflow-hidden relative h-[271px]">
                    <Image
                        src={imageSrc}
                        alt="Descriptive Visual"
                        fill
                        className="object-cover rounded-xl"
                        priority
                    />
                </div>

                <div className="mt-8  space-y-6 heading-sub leading-relaxed text-gray-300">
                    {paragraphs?.map((text, index) => (
                        <p key={index}>{text}</p>
                    ))}
                </div>

            </section>
            {name === 'CapitalCode' &&
                <CapitalCode />
            }
                        {name === 'Risk Management' &&
                <RiskDomains />
            }
            
        </>
    );
}
