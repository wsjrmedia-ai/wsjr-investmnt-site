'use client';

import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

export default function TradingViewPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('NASDAQ:NVDA');
  const chartRef = useRef(null);

  const loadTradingViewWidget = () => {
    if (document.getElementById('tv-script')) return;

    const script = document.createElement('script');
    script.id = 'tv-script';
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => renderChart();
    document.body.appendChild(script);
  };

  const renderChart = () => {
    if (window.TradingView && chartRef.current) {
      new window.TradingView.widget({
        container_id: chartRef.current.id,
        symbol: selectedSymbol,
        interval: '1',
        theme: 'dark',
        style: '1',
        locale: 'en',
        width: '100%',
        height: '100%',
        hide_side_toolbar: false,
        allow_symbol_change: true,
        studies: ['Volume@tv-basicstudies'],
        backgroundColor: '#000',
      });
    }
  };

  useEffect(() => {
    if (showPopup) {
      if (window.TradingView) {
        renderChart();
      } else {
        loadTradingViewWidget();
      }
    }
  }, [showPopup, selectedSymbol]);

  // 🔒 Lock/unlock body scroll when popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPopup]);

  return (
    <>
      {/* Trade Symbol Button */}
      <div
        onClick={() => setShowPopup(true)}
        className="cursor-pointer w-[60px] h-[60px] rounded-full bg-center bg-contain bg-no-repeat transition duration-300 hover:shadow-[0_0_12px_6px_rgba(255,215,0,0.5)]"
        style={{ backgroundImage: "url('/tradeview/button.png')" }}
      ></div>

      {/* Chart Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-90 h-screen flex flex-col">
          {/* Top bar with close */}
          <div className="flex justify-between items-center p-4 bg-black">
            <button onClick={() => setShowPopup(false)} className="text-white">
              <IoClose size={28} />
            </button>
          </div>

          {/* Chart Container */}
          <div className="flex-1" id="tv_chart_container" ref={chartRef}></div>
        </div>
      )}
    </>
  );
}
