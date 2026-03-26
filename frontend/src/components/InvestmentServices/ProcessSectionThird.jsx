'use client';

import { getProcessTemplateByServiceName } from '@/lib/services';
import ButtonWithImage from '@/UI/AnimatedButton';



export default function ProcessSectionThird({ id }) {

    const details = getProcessTemplateByServiceName(id);
    const imagesrc = details?.processSection?.image;
    const process = details?.processSection?.process;
    const description = details?.processSection?.description


    return (
        <section className="bg-[#071E2F] text-white px-4 md:px-16 py-20 md:pb-40 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/process/processbg.png')" }}>
            <div className="">
                {/* Header */}
                <div className="mb-12">
                    <ButtonWithImage text={'Process at'} />
                    <h2 className="text-xl md:text-3xl font-light md:mt-12 mt-6 max-w-4xl">
                        {description}                    </h2>
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-8">
                    {process?.map((item, index) => (
                        <div key={index} className="relative">
                            {/* Content Box with background image and hover effect */}
                            <div
                                className="w-full h-auto bg-[url('/card-bg.jpg')] bg-cover bg-center p-6 rounded-lg   hover:border-[#E4BC88] cursor-pointer transition-all duration-300"
                            >
                                <h3 className="text-xl font-semibold">{item?.heading}</h3>
                                <p className="text-sm text-gray-300 leading-relaxed mt-2">{item?.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block relative py-40">
                    {/* Timeline line */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#FFFFFF] z-0 my-6" />

                    {/* Dots */}
                    <div className="absolute top-1/2 left-0 xl:ml-60 lg:ml-40 md:ml-30 z-10 w-[70%] gap-2 flex justify-between items-center">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="flex justify-center">
                                <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[#E4BC88] to-[#E7901F] my-3" />
                            </div>
                        ))}
                    </div>


                    {/* Cards */}
                    <div className="grid grid-cols-5 w-full gap-x-1">
                        {process?.map((item, index) => {
                            const isTop = index % 2 === 0;
                            return (
                                <div
                                    key={index}
                                    className={`relative xl:w-[460px] lg:w-[400px] md:w-[320px]  w-[320px] h-[180px] bg-[url('/service/processcard.png')] bg-cover bg-center p-6 rounded-lg   flex flex-col justify-center hover:border-[#E4BC88] cursor-pointer transition-all duration-300 ${isTop ? '-translate-y-[150px]' : 'translate-y-[200px]'}`}
                                >
                                    <h3 className="text-xl font-semibold">{item?.heading}</h3>
                                    <p className="text-sm text-gray-300 leading-relaxed mt-2">{item?.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
