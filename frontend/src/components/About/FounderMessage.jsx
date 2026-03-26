"use client";

import Image from "next/image";

export default function FounderMessage() {
  return (
    <main className="bg-[#071E2F] text-white lg:px-16 px-4 lg:min-h-auto">
      <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-[5%]">

        {/* Left Section (Quote + Text) */}
        <div className="lg:w-[50%] relative flex flex-col justify-start pt-10 lg:pt-20" id="left-section">
          
          {/* Inner wrapper to apply padding to quote + text */}
          <div className="relative">
            {/* Quote Background */}
            <div className="absolute top-0 left-0 -z-0">
              <Image
                src="/about/FounderMessage/quote.png"
                alt="quote icon"
                width={180}
                height={180}
                className="object-contain"
              />
            </div>

            {/* Text Content */}
            <div className="relative z-10 px-4 md:px-0">
              <h2 className="section-heading font-semibold mb-6 pt-12">
                A message from our founder,{" "}
                <span className="whitespace-nowrap">Vishnu Das</span>.
              </h2>

              <p className="text-white leading-relaxed mb-4 section-desc">
                <span className="font-bold">“</span>
                It all started with a vision. Build a world-class private banking
                ecosystem designed to serve a global clientele.<br /> The Wall
                Street Jr. Group was always meant to stand for more than financial
                guidance. We work to cultivate clarity, discipline and long-term
                value. Through our asset management advisory services, we help
                clients navigate markets with a firm purpose.
              </p>

              <p className="text-white leading-relaxed section-desc">
                As we expand into a global financial academy and shape the
                foundation of a next-generation private bank, our commitment
                remains unchanged: to elevate how the world invests
                <span className="font-bold">”</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (Founder Image Bottom Aligned) */}
       {/* Right Section (Founder Image Bottom Aligned) */}
<div className="lg:w-[45%] relative h-[420px] md:h-[550px] lg:h-[830px] flex items-end">
  <Image
    src="/about/FounderMessage/ceo.png"
    alt="Founder"
    fill
    className="rounded-xl object-contain object-bottom"
    quality={90}
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
    loading="lazy"
  />
</div>


      </div>
    </main>
  );
}
