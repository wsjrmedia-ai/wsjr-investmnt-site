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
  VideoTestimonialSection,
  NewsletterSection,
  RiskDisclosure,
  FreeConsultationPopup,
  MediaBanner,
} from "@/components/LazyComponents";
import TradingViewIdea from '@/components/Home/TradingViewIdea';

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
