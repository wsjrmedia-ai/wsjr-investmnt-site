"use client";

import React from "react";

const TradingViewEmbed = () => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <iframe
        src="https://www.tradingview.com/chart/BTCUSD/EWwbDO2n-BTC-BUY-Possible/"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        className="rounded-lg shadow-lg"
        title="TradingView Chart"
      ></iframe>
    </div>
  );
};

export default TradingViewEmbed;
