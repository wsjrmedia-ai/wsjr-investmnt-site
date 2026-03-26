"use client";

import Link from "next/link";
import Image from "next/image";

export default function GradientButton({ href, children }) {
    return (
        <Link href={href}>
            <div className="relative rounded-xl overflow-hidden">
                {/* 🔹 Glassy gradient background */}
                <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                        background: `radial-gradient(circle at top left,
              rgba(165, 239, 255, 0.2) 0%,
              rgba(186, 131, 60, 0.2) 77%,
              rgba(186, 131, 60, 0.2) 100%)`,
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                    }}
                />

                {/* 🔹 Gradient border */}
                <div
                    className="absolute inset-0 rounded-xl p-[1px]"
                    style={{
                        background: `linear-gradient(90deg, #BA833C, #0062A7)`,
                        WebkitMask:
                            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                    }}
                />

                {/* 🔹 Button content */}
                <button className="
          relative z-10 flex 
          text-white font-medium
          cursor-pointer
          min-h-[32px] md:w-[210px] w-[177px] 3xl:w-[250px]
          gap-2 px-2 md:px-4 py-[12px] sm:py-[10px] rounded-[10px]
          max-w-full
          mobile:text-sm md:text-base 3xl:py-3 3xl:text-[1.25rem] 4k:text-xl
        ">
                    {children}

                    {/* 🔹 Arrow */}
                    <span className="
            absolute  right-2 top-1/2 transform -translate-y-1/2
            bg-[#0463A5] flex items-center justify-center
            w-8 h-8 rounded-lg
            2xl:w-8 2xl:h-8
          ">
                        <Image
                            src="/Hero/buttonarrow.png"
                            alt="Arrow"
                            width={24}
                            height={24}
                            className="2xl:w-[28px] 2xl:h-[28px]"
                        />
                    </span>
                </button>
            </div>
        </Link>
    );
}
