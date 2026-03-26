'use client';

import Image from 'next/image';
import { getTextWithImageByServiceName } from '@/lib/services';

export default function TextWithImageThird({ id}) {

    const details = getTextWithImageByServiceName(id);
        const imageSrc =details?.textWithImageSection?.image;
        const paragraphs = details?.textWithImageSection?.paragraphs;
    

    return (
        <section className="bg-[#071E2F] text-white px-4 md:px-16 py-16">
            <div className="flex flex-col md:flex-row gap-6 ">
                {/* Image Block */}
                <div className="w-full md:w-[40%] rounded-xl overflow-hidden relative h-[400px] md:h-[500px]">
                    <Image
                        src={imageSrc}
                        alt="Descriptive Visual"
                        fill
                        className="object-cover rounded-xl"
                        priority
                    />
                </div>

                {/* Text Block */}
                <div className="w-full md:w-[60%] text-2xl md:text-3xl text-gray-300 leading-relaxed space-y-4">
                    {paragraphs.map((text, index) => (
                        <p key={index}>{text}</p>
                    ))}
                </div>
            </div>
        </section>
    );
}
