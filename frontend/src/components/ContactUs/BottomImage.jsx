'use client';

import Image from 'next/image';

export default function BottomImage() {



    return (
        <section className="bg-[#071E2F] text-white px-4 md:px-16 py-12">
            <div className="w-full rounded-xl overflow-hidden relative h-[271px]">
                <Image
                    src='/contactus/image.png'
                    alt="Descriptive Visual"
                    fill
                    className="object-cover rounded-xl"
                    priority
                />
            </div>
        </section>
    );
}
