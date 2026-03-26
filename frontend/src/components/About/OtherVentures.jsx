"use client";

import GradientBox from "@/UI/GradientBox";
import Image from "next/image";

export default function OtherVentures() {
  const ventures = [
    {
      title: "Wall Street Jr. School of Finance",
      desc: "A 360° financial education academy to upskill the next generation of investors",
      img: "/about/ventures/banking.png", // change with your image path
    },
    {
      title: "Wall Street Jr. Securities Platform",
      desc: "A licensed and regulated brokerage committed to providing a seamless trading platform for customers worldwide",
      img: "/about/ventures/platform.png", // change with your image path
    },
    {
      title: "A global private banking ecosystem",
      desc: "Designed to serve clients with the transparency, technology, and insight previously reserved for institutions",
      img: "/about/ventures/school.png", // change with your image path
    },
  ];

  return (
    <section className="w-full px-4 md:px-16  py-12 bg-[#071E2F] text-white">
      <h2 className="section-heading font-semibold mb-8">
        Other Ventures
      </h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {ventures.map((item, i) => {
    const isLast = i === ventures.length - 1;
    const needsColSpan = ventures.length % 2 !== 0 && isLast; // for md (2-cols)

    return (
      <GradientBox
        key={i}
        className={`relative pt-4 sm:pt-6 md:pt-8 pl-4 sm:pl-6 pr-0 pb-2 flex flex-col justify-between ${
          needsColSpan ? "md:col-span-2 lg:col-span-1" : ""
        }`}
        backgroundImage={item.img}
      >
        {/* Title */}
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#E7901F] mb-2 sm:mb-3 pr-2">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mb-10 sm:mb-12 md:mb-16 max-w-full sm:max-w-[90%] lg:max-w-[85%]">
          {item.desc}
        </p>
      </GradientBox>
    );
  })}
</div>

    </section>
  );
}
