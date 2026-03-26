'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Slide-in from right
const slideIn = keyframes`
  from {
    transform: translateX(150%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
`;

// Slide-out to right
const slideOut = keyframes`
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(150%);
    opacity: 0;
  }
`;

// Styled component with prop filtering
const AnimatedWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'closing',
})`
  position: fixed;
  bottom: 3rem;
  right: 1rem;
  z-index: 70;
  width: 90%;
  max-width: 448px;

  animation: ${slideIn} 0.6s ease-out forwards;

  ${(props) =>
    props.closing &&
    css`
      animation: ${slideOut} 0.5s ease-in forwards;
    `}
`;

export default function FreeConsultationPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 500); // match slideOut duration
  };

  if (!showPopup) return null;

  return (
    <AnimatedWrapper closing={closing}>
      <div className="flex flex-col justify-end h-full z-[9999]">
        <div className="relative bg-[#0B1F2D] border border-gray-700 rounded-xl p-6 md:p-8 w-full shadow-lg">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-semibold cursor-pointer"
          >
            &times;
          </button>

          {/* Content */}
          <h3 className="text-lg font-semibold mb-2">Free Consultation</h3>
          <p className="text-sm text-gray-400 mb-6">
            Need expert investment advice? <br />
            Our specialists are ready to help you.
          </p>
          <Link href="/contact-us">
            <button
              className="w-full h-[42px] py-2 rounded-md bg-gradient-to-r from-[#FBAA4E] to-[#0075B7] text-white font-semibold"
            >
              Contact Now
            </button>
          </Link>
        </div>
      </div>
    </AnimatedWrapper>
  );
}
