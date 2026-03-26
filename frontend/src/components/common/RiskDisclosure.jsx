'use client';

import React, { useState } from 'react';

const RiskDisclosure = () => {
  const [expanded, setExpanded] = useState(false);

  return (

    <section className=" py-8 bg-[#071E2F]">

      <div className="relative md:px-6 px-4 py-6 text-white text-center text-sm 3xl:text-[18px] 3xl:py-8 bg-[#071E2F] overflow-hidden">
        {/* Top gradient border */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#071E2F] via-[#CCCCCC]/50 to-[#071E2F] pointer-events-none" />

        {/* Bottom gradient border */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#071E2F] via-[#CCCCCC] to-[#071E2F] pointer-events-none" />

        {/* Content */}
        <div
          className={`transition-all duration-300 ${expanded ? '' : 'line-clamp-2 md:line-clamp-none'
            }`}
        >
          <strong className="font-semibold">RISK DISCLOSURE:</strong>{' '}
          Investing in leveraged and non-leveraged instruments involves significant risk. These products are not suitable for all investors, and losses may exceed your initial capital. We encourage all clients to fully understand the nature of these instruments and assess their risk tolerance carefully. Independent financial advice should be considered where appropriate.
        </div>

        {/* Read More Button - shown only on small screens when not expanded */}
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="mt-2 text-[#CCCCCC] underline md:hidden cursor-pointer"
          >
            Read More
          </button>
        )}
      </div>
    </section>
  );
};

export default RiskDisclosure;
