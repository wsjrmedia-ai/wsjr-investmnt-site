'use client';

import ButtonWithImage from '@/UI/AnimatedButton';
import Image from 'next/image';

export default function CapitalCode() {
    return (
        <section className="relative bg-[#071E2F] text-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/CapitalCode/capitalcode1.png"
                    alt="Descriptive Visual"
                    fill
                    className="object-fill"
                    priority
                />
               
            </div>

            {/* Text Overlay */}
            <div className="relative z-10 h-full flex items-center px-4 py-16 md:px-16">
                
                <div className="space-y-6  text-gray-300">
                    <ButtonWithImage text="CapitalCode" image={'none'} />
                    <p className="leading-relaxed heading-sub">
                        Built to turn ambition into a code for better financial success. CapitalCode as a Service is Wall Street Jr.’s proprietary framework that blends financial intelligence, data-driven insights, and structured portfolio strategies into a modular service model.
                    </p>
                    <p className="leading-relaxed mt-6 heading-sub">
                        It’s not just advisory; it’s a repeatable code-a set of principles and strategies that can be applied to create consistency in wealth building, regardless of market noise.
                    </p>
                </div>
            </div>
        </section>
    );
}
