import Footer from "@/components/common/Footer";
import "./globals.css";
import GoldenMouseLight from "@/components/common/GoldenMouseLight";
import RiskDisclosure from "@/components/common/RiskDisclosure";
import PerformanceMonitor from "@/components/common/PerformanceMonitor";
import ClientSideOptimizations from "@/components/common/ClientSideOptimizations";
import { Montserrat } from "next/font/google";
import BotPenguinWidget from "@/components/BotPenguinWidget";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans"
});

export const metadata = {
  title: "Wall Street Jr | Strategic Investment Solutions & Financial Advisory",
  description:
    "Struggling to navigate investments? Wall Street Jr helps you gain clarity and growth through AI-driven insights, crypto solutions, and personalized financial strategies. Partner with experts to simplify your wealth journey and build financial confidence.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "investment strategies",
    "financial advisory",
    "AI finance tools",
    "crypto investment",
    "portfolio management",
    "Wall Street Jr",
    "multi-asset investment",
    "financial planning",
    "data-driven investing",
    "personalized wealth management",
  ],
    verification: {
    google: "AqJ2bpT5i45N7s4WIR4pFq4zDEub1ALSNW-UY-9rR6Y",
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.botpenguin.com" />
        <link rel="preconnect" href="https://s3.tradingview.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//freedreamedu.s3.ap-south-1.amazonaws.com" />
        <link rel="dns-prefetch" href="//wallstreetjr.s3.me-central-1.amazonaws.com" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        {/* Optimized BotPenguin Widget Script - load with lower priority */}

        <script 
          id="messenger-widget-b" 
          src="https://cdn.botpenguin.com/website-bot.js" 
          defer 
          data-load-strategy="idle"
        >
          68949246831c330376305b47,683d2cced58c28b3539c9d61
        </script>
      </head>
      <body className="antialiased">
        <PerformanceMonitor />
        <ClientSideOptimizations />
        {children}
        <GoldenMouseLight />
        <BotPenguinWidget />
        <Footer />
      </body>
    </html>
  );
}
