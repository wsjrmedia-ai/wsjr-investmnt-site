// Lazy-loaded components for better performance
import dynamic from 'next/dynamic';

// Critical components (load immediately - above the fold)
export const Hero = dynamic(() => import('@/components/Home/Hero'), {
  loading: () => <div className="h-screen bg-[#071E2F] animate-pulse" />,
});

export const TickerTape = dynamic(() => import('@/components/Home/TickerTape'), {
  loading: () => <div className="h-[120px] bg-gray-800 animate-pulse" />,
});

export const FinanceSection = dynamic(() => import('@/components/Home/FinanceSection'), {
  loading: () => <div className="h-[400px] bg-gray-800 animate-pulse" />,
});

// Above the fold components
export const ResearchSection = dynamic(() => import('@/components/Home/ResearchSection'), {
  loading: () => <div className="h-[300px] bg-gray-800 animate-pulse" />,
});

export const AboutPage = dynamic(() => import('@/components/Home/About'), {
  loading: () => <div className="h-[500px] bg-gray-800 animate-pulse" />,
});

// Below the fold components (lazy load)
export const WhyWallStreet = dynamic(() => import('@/components/Home/WhyWallStreet'), {
  loading: () => <div className="h-[400px] bg-gray-800 animate-pulse" />,
});

export const ServiceSlider = dynamic(() => import('@/components/Home/ServiceSlider'), {
  loading: () => <div className="h-[300px] bg-gray-800 animate-pulse" />,
});

export const HomeCalculatorPage = dynamic(() => import('@/components/Home/HomeCalculatorPage'), {
  loading: () => <div className="h-[400px] bg-gray-800 animate-pulse" />,
});

export const CoreValues = dynamic(() => import('@/components/Home/CoreValues'), {
  loading: () => <div className="h-[300px] bg-gray-800 animate-pulse" />,
});

export const FutureAI = dynamic(() => import('@/components/Home/FutureAI'), {
  loading: () => <div className="h-[400px] bg-gray-800 animate-pulse" />,
});

export const CaseStudies = dynamic(() => import('@/components/Home/CaseStudies'), {
  loading: () => <div className="h-[500px] bg-gray-800 animate-pulse" />,
});

export const PressReleaseBlogs = dynamic(() => import('@/components/Home/PressReleaseBlogs'), {
  loading: () => <div className="h-[400px] bg-gray-800 animate-pulse" />,
});

export const FAQSection = dynamic(() => import('@/components/Home/FAQSection'), {
  loading: () => <div className="h-[300px] bg-gray-800 animate-pulse" />,
});

export const NewsletterSection = dynamic(() => import('@/components/Home/Newsletter'), {
  loading: () => <div className="h-[200px] bg-gray-800 animate-pulse" />,
});

export const RiskDisclosure = dynamic(() => import('@/components/common/RiskDisclosure'), {
  loading: () => <div className="h-[100px] bg-gray-800 animate-pulse" />,
});

export const FreeConsultationPopup = dynamic(() => import('@/components/common/FreeConsultationPopup'), {
  ssr: false, // Don't render on server for popup
  loading: () => null,
});

// Heavy components that should be loaded on demand
export const InvestmentApproach = dynamic(() => import('@/components/Home/InvestmentApproach'), {
  loading: () => <div className="h-[400px] bg-gray-800 animate-pulse" />,
});

export const TestimonialSlider = dynamic(() => import('@/components/Home/TestimonialSlider'), {
  loading: () => <div className="h-[300px] bg-gray-800 animate-pulse" />,
});

export const MediaBanner = dynamic(() => import('@/components/Home/MediaBanner'), {
  loading: () => <div className="h-[200px] bg-gray-800 animate-pulse" />,
});

// Calculator components
export const CalculatorPage = dynamic(() => import('@/components/Calculator/Calculator'), {
  loading: () => <div className="h-[600px] bg-gray-800 animate-pulse" />,
});

export const CalculatorBanner = dynamic(() => import('@/components/Calculator/CalculatorBanner'), {
  loading: () => <div className="h-[200px] bg-gray-800 animate-pulse" />,
});

export const CalendlyBanner = dynamic(() => import('@/components/CalendlyBanner/CalendlyBanner'), {
  loading: () => <div className="h-[200px] bg-gray-800 animate-pulse" />,
});

export const ServiceHome = dynamic(() => import('@/components/Home/ServiceHome'), {
  loading: () => <div className="h-[300px] bg-gray-800 animate-pulse" />,
});
