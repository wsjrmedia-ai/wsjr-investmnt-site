"use client";

import Image from "next/image";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Header from "../Home/Header";
import { useEffect, useState } from "react";
import { getAboutBanner } from "@/lib/getAboutBanner";

const gradientBorder = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

export const AnimatedButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
  font-weight: 500;
  background: transparent;
  border: none;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  z-index: 0;
  min-height: 42px;
  width: 180px;

  @media (min-width: 700px) { width: 200px; }
  @media (min-width: 1920px) { width: 245px; min-height: 56px; font-size: 1.25rem; }
  @media (min-width: 2560px) { width: 260px; min-height: 64px; font-size: 1.4rem; }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    background: linear-gradient(90deg, #BA833C, #0062A7);
    border-radius: 0.5rem;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }

  span.arrow {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: #0463A5;
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export default function Hero() {


  const [banner, setBanner] = useState(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const setBannerList = async () => {
      try {
        const data = await getAboutBanner()
        setBanner(data)
      } catch (error) {
        console.error("Error fetching banner:", error)
      }
    }
    setBannerList()

    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])


  return (
    <main
      className="relative md:min-h-screen h-[90vh] xl:px-16 lg:px-12 px-4 xl:py-10 py-4 
      text-white  overflow-hidden"
    >
      {/* ✅ Optimized background */}
      <div className="absolute inset-0 -z-10 bg-[#071E2F]">
        {banner && (
          <Image
            src={isDesktop ? banner.deskImgLink : banner.mobImgLink}
            alt="Hero background"
            fill
            priority={isDesktop}       // eager load on desktop
            quality={95}
            sizes="100vw"
            placeholder="blur" // can be "blur" if API gives blurDataURL
            blurDataURL="/about/new-bg-stock.png"
            className="object-cover object-top md:object-bottom bg-[#071E2F]"
          />
        )}
      </div>

      <div className="md:px-0">
        <Header />
      </div>

      <section
        className="
          flex flex-col 
          md:justify-center 
          min-h-screen mt-7
          md:-mt-32 lg:-mt-40
        "
      >
        {/* Left Content */}
        <div className="space-y-6 max-w-6xl 3xl:max-w-6xl xl:px-0 lg:px-4 md:px-6 md:w-[500px] sm:w-[400px] lg:w-auto">
          <div className="xl:pt-12 space-y-6 pt-10 ">
            <h1 className="main-heading font-light leading-snug pt-8">
              Empowering <span className="font-bold">Smart Investment</span>{" "}
              <br /> Redefining <span className="font-bold">Wealth</span>
            </h1>

            <p className="text-white text-fluid">
              Our platform blends AI, strategy, and ethical finance to guide
              investors with clarity, control, and confidence.
            </p>

            <div className="flex flex-wrap md:gap-4 gap-2 items-center md:text-base text-sm 3xl:text-lg 4k:text-xl">
              {/* <a
                href="https://calendly.com/d/csds-vxm-ckw/call-with-wall-street-jr"
                target="_blank"
                rel="noopener noreferrer"
              > */}
                <Link href="#contact" scroll={true}>
                  <AnimatedButton>
                    Contact Us
                    <span className="arrow">
                      <Image
                        src="/Hero/buttonarrow.png"
                        alt="Arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </AnimatedButton>
                </Link>
              {/* </a> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
