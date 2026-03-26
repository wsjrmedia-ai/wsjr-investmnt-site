'use client';

import ButtonWithImage from '@/UI/AnimatedButton';

export default function Discover() {
    return (
        <main className="min-h-screen bg-[#071E2F] text-white lg:px-16 px-4 py-22">
            {/* Top Header Button */}
            <div className="md:mb-8 mb-6">
                <ButtonWithImage text={'Discover'} />
            </div>

            {/* Intro Text */}
            <h1 className="section-heading max-w-6xl font-light leading-relaxed">
                Unlock the power of strategic investing, real-world insights, and advanced financial tools all designed to grow, protect, and simplify your wealth journey. Experience a platform built by real investors, for real results.
            </h1>

            {/* Wave Banner with Video */}
            {/* <div className="w-full mt-10 mb-8 h-[550px] rounded-[10px] relative overflow-hidden">
                <video
                    className="w-full h-full object-cover "
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/about/discover.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div> */}
        </main>
    );
}
