'use client';

import { getProcessTemplateByServiceName } from '@/lib/services';
import ButtonWithImage from '@/UI/AnimatedButton';
import Image from 'next/image';

export default function ProcessSectionTwo({ id }) {
    const details = getProcessTemplateByServiceName(id);
    const imagesrc = details?.processSection?.image;
    const process = details?.processSection?.process;
    const description = details?.processSection?.description;

    return (
        <section className="bg-[#071E2F] text-white px-4 md:px-16 py-22 bg-center bg-cover bg-no-repeat"  style={{ backgroundImage: "url('/process/processbg.png')" }}>
            <div className="space-y-10">
                {/* Top Headline and Subtitle */}
                <div className="text-center md:text-left">
                    <ButtonWithImage text={'The Process '} image={'none'} />
                    {/* <h2 className="text-xl md:text-3xl font-light mt-4 max-w-5xl text-left">
                        {description}
                    </h2> */}
                </div>

                <div className="lg:flex md:gap-[5%] lg:gap-[3%] items-start">
                    {/* Left: Image */}
                    <div className="lg:w-[25%] w-full md:hidden lg:block  sm:block">
                        <div className="w-full max-w-md overflow-hidden mx-auto md:mx-0">
                            <Image
                                src={imagesrc}
                                alt="Process visual"
                                width={600}
                                height={567}
                                className="md:w-[241px] md:h-[567px] h-[300px] w-[200px] object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Process Cards */}
                    <div className="lg:w-[75%] w-full grid sm:grid-cols-2 gap-10 mt-10 md:mt-0 md:h-[567px] justify-center items-center">
                        {process?.map((item, index) => (
                            <div key={index} className="space-y-2">
                                <span className="bg-gradient-to-r from-[#E4BC88] to-[#E7901F] bg-clip-text text-transparent text-[40px] md:text-[45px] 3xl:text-[55px] font-bold">
                                    {item.id}
                                </span>
                                <h3 className="section-heading font-semibold">{item?.heading}</h3>
                                <p className="text-[16px] text-gray-300 leading-relaxed">{item?.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
