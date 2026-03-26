'use client';

import ButtonWithImage from '@/UI/AnimatedButton';
import Image from 'next/image';
import { FaHandshake, FaChartLine, FaCoins } from 'react-icons/fa';

export default function CoreValues() {
    return (
        <main className=" bg-[#071E2F] text-white md:px-16 px-4 md:py-16 py-8">
            {/* Top Header Button */}
            <div className="md:mb-8 mb-6">
                <ButtonWithImage text={'Core Values at'} />
            </div>

            {/* Intro Text */}
            <h1 className="section-heading max-w-6xl leading-relaxed">
                Our comprehensive suite of services is designed to provide you with the expertise and guidance needed to achieve your financial goals.
            </h1>

            {/* Wave Banner */}
            <div
                className="w-full mt-10 mb-8 h-40 sm:h-60 rounded-xl relative overflow-hidden bg-no-repeat bg-cover bg-center"
            >
                <video
                    src="https://wallstreetjr.s3.me-central-1.amazonaws.com/animations/abstract-futuristic-particles-wave-lines-flow-of-p-2025-08-04-04-29-53-utc(1)(1).mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="opacity-70 w-full h-full object-cover"
                />

            </div>



            <section className="text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Risk Assessment - 25% */}
                    <div
                        className="rounded-xl p-6 relative group min-h-[245px] flex flex-col justify-start overflow-hidden
  bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center bg-no-repeat
  md:col-span-1 lg:col-span-1"
                    >
                        {/* Heading */}
                        <h2 className="font-semibold text-lg mb-4 z-10 relative text-left">
                            Trust & transparency
                        </h2>

                        {/* Image in Between */}
                        <div className="relative w-[65px] h-[65px] mb-4">
                            <Image
                                src="/corevalues/trust.png"
                                alt="Trust"
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Paragraph */}
                        <p className="text-sm text-gray-300 z-10 relative font-semibold text-left">
                            All investments are held in the investor’s name. Wall Street Jr. does not accept or hold client funds-investors retain full custody and control at all times
                        </p>
                    </div>


                    {/* Integrity - 25% */}
                    <div
                        className="rounded-xl p-6 relative group min-h-[245px] flex flex-col justify-between bg-cover bg-center
      md:col-span-1 lg:col-span-1"
                        style={{ backgroundImage: "url('/corevalues/integritybg.png')" }}
                    >
                        <Image src="/corevalues/integrity.png" alt="wave" layout="fill" objectFit="cover" />
                        <h2 className="font-semibold text-lg mb-2 z-10 relative">Integrity</h2>
                        <p className="text-sm text-gray-300 z-10 relative font-semibold">
                            Our team is committed to legal and ethical investing practices
                        </p>
                    </div>

                    {/* Commitment - 50% */}
                    <div
                        className="rounded-xl p-6 relative group min-h-[245px] flex flex-col justify-between bg-cover bg-no-repeat 
      md:col-span-2 lg:col-span-2"
                        style={{ backgroundImage: "url('/corevalues/investbg.png')" }}
                    >
                        <h2 className="font-semibold text-lg mb-2 z-10 relative">Commitment</h2>
                        <p className="text-sm text-gray-300 z-10 relative font-semibold max-w-[70%]">
                            Our strategy will be based on real world experience and prevailing market realities.
                        </p>

                        <img
                            src="/corevalues/coin.png"
                            alt="coin"
                            className="absolute bottom-4 right-4 z-0 object-cover pointer-events-none h-[140px] lg:h-auto"
                        />
                    </div>
                </div>
            </section>

        </main>
    );
}
