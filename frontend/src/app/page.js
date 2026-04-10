"use client";

import { Suspense } from 'react';
import Image from "next/image";

// Import lazy-loaded components for better performance
import {
  Hero,
  TickerTape,
  FinanceSection,
  ResearchSection,
  AboutPage,
  WhyWallStreet,
  ServiceSlider,
  HomeCalculatorPage,
  CoreValues,
  FutureAI,
  CaseStudies,
  PressReleaseBlogs,
  NewsletterSection,
  RiskDisclosure,
  FreeConsultationPopup,
  MediaBanner,
} from "@/components/LazyComponents";
import TradingViewIdea from '@/components/Home/TradingViewIdea';
// Direct (non-dynamic) import for VideoTestimonialSection. The dynamic()
// wrapper in LazyComponents used a generic gray loading fallback which did
// not match the component's own SSR-rendered skeleton cards, causing a React
// hydration mismatch that silently unmounted the whole section in production
// (console errors are stripped by next.config.mjs `removeConsole`, so the
// failure had zero visible diagnostics).
import VideoTestimonialSection from "@/components/Home/VideoTestimonialSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <TickerTape />
      <FinanceSection />
      <ResearchSection />
      <PressReleaseBlogs />
      <AboutPage />
      <WhyWallStreet />
      <ServiceSlider />
      <HomeCalculatorPage />
      {/* <CalendlyBanner /> */}

      <CoreValues />
      {/* <InvestmentApproach /> */}
      {/* <TestimonialSlider /> */}
      <FutureAI />
      <MediaBanner />
      <CaseStudies />
      {/* <TradingViewIdea /> */}

      <NewsletterSection />

      {/* Customer video testimonials — placed as the last content section
          so it sits directly above the RiskDisclosure band + Footer */}
      <VideoTestimonialSection />

      <RiskDisclosure />
      <FreeConsultationPopup />

    </div>
  );
}
