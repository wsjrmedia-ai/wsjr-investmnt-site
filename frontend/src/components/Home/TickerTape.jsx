'use client';

import { useEffect, useRef, useState } from 'react';

export default function TickerTape() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Only load TradingView widget when component is visible
    if (!isIntersecting || isLoaded) return;

    // Debounce script loading to avoid multiple loads
    const timeoutId = setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      
      // Optimized widget configuration
      script.innerHTML = JSON.stringify({
        symbols: [
          { "proName": "COINBASE:BTCUSD", "title": "Bitcoin" },
          { "proName": "COINBASE:ETHUSD", "title": "Ethereum" },
          { "proName": "COINBASE:XRPUSD", "title": "XRP" },
          { "proName": "COINBASE:ADAUSD", "title": "Cardano" },
          { "proName": "NASDAQ:NVDA", "title": "NVIDIA" },
          { "proName": "NASDAQ:HOOD", "title": "Robinhood" },
          { "proName": "NYSE:BAC", "title": "Bank of America" },
          { "proName": "NYSE:RTX", "title": "RTX Corp" },
          { "proName": "NYSE:GD", "title": "General Dynamics" },
          { "proName": "NYSE:BA", "title": "Boeing" },
          { "proName": "NASDAQ:META", "title": "Meta" }
        ],
        colorTheme: 'dark',
        locale: 'en',
        isTransparent: true,
        largeChartUrl: '',
        showSymbolLogo: true,
        displayMode: 'continuous',
        autosize: true,
      });

      const widgetContainer = containerRef.current;
      if (widgetContainer && !widgetContainer.querySelector('script')) {
        widgetContainer.innerHTML = '';
        widgetContainer.appendChild(script);
        setIsLoaded(true);
      }
    }, 300); // Small delay to prevent rapid loading

    return () => clearTimeout(timeoutId);
  }, [isIntersecting, isLoaded]);

  // Cleanup function to avoid memory leaks
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
<div
  className="relative mt-[-120px] h-[120px] lg:mt-[-130px] lg:h-[170px] 
             bottom-0 left-0 right-0
             flex overflow-hidden z-[70] bg-no-repeat bg-cover bg-bottom-center"
  style={{ backgroundImage: "url('/Hero/ticket2.png')" }}
>
      <div className="relative flex whitespace-nowrap w-full h-full items-center justify-center">
        <div
          ref={containerRef}
          className="tradingview-widget-container w-full h-full flex items-center justify-center"
        >
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
    </div>
  );
}
