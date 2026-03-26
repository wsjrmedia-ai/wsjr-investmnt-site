'use client'

import Image from 'next/image'
import Header from './Header'
import Link from 'next/link'
import { getBanner } from '@/lib/getHerobanners'
import { useEffect, useState } from 'react'
import GradientButton from '@/UI/GradientButton'

export default function Hero() {
  const [banner, setBanner] = useState(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const setBannerList = async () => {
      try {
        const data = await getBanner()
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
    <main className="relative md:min-h-screen h-[90vh] xl:px-16 lg:px-12 px-4 xl:py-10 py-4 text-white overflow-hidden">

      {/* ✅ Fixed background container */}
      <div className="absolute inset-0 -z-10 bg-[#071E2F]">
        {banner && (
          <Image
            src={isDesktop ? banner.deskImgLink : banner.mobImgLink}
            alt="Hero background"
            fill
            priority={isDesktop}       // eager load on desktop
            quality={95}
            sizes="100vw"
            placeholder="empty" // can be "blur" if API gives blurDataURL
            className="object-cover object-top md:object-bottom bg-[#071E2F]"
          />
        )}
      </div>

      <div className="md:px-0"><Header /></div>

      <section className="flex flex-col md:justify-center min-h-screen mt-7 md:-mt-32 lg:-mt-40">
        {/* Left Content */}
        <div className="space-y-6 max-w-3xl 3xl:max-w-6xl xl:px-0 lg:px-4 md:px-6 md:w-[500px] sm:w-[400px] lg:w-auto">
          <div className="xl:pt-12 space-y-6 pt-10 ">
            <h1 className="main-heading font-light leading-snug pt-8">
              <span className="font-bold">Rethink Potential</span>
            </h1>

            <p className="text-white text-fluid">
              Wall Street Jr. is founded by an experienced Wall Street professional
            </p>

            <div className="flex flex-wrap md:gap-4 gap-2 items-center md:text-base text-sm 3xl:text-lg 4k:text-xl">


              <GradientButton href="/contact-us">
                Get Appointment
              </GradientButton>

              <Link href="/calculator">
                <div className="flex items-center gap-2 px-2 md:px-4 py-[12px] sm:py-[10px] rounded-[10px] bg-gradient-to-r from-[#A27335] to-[#0862A0] text-white font-medium text-[12px] mobile:text-sm md:text-base 3xl:py-3 3xl:text-[1.25rem] 4k:text-xl cursor-pointer transition hover:opacity-90">
                  Portfolio Calculator
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
