"use client";

import { useEffect, useRef, memo } from "react";

function TopStories() {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      displayMode: "adaptive",
      feedMode: "all_symbols",
      colorTheme: "light",
      isTransparent: false,
      locale: "en",
      width: "100%",
      height: "100%",
    });

    container.current.innerHTML = ""; // Clear old widget if re-render
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/news-flow/?priority=top_stories"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <span className="blue-text">Top stories by TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TopStories);
