'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCollaborationBanners } from '@/lib/collaborations';

const IMAGE_HEIGHT = 121;
const LOGO_HEIGHT = 82;
const LOGO_WIDTH_DESKTOP = 180;
const LOGO_WIDTH_TABLET = 140;
const LOGO_WIDTH_MOBILE = 120;

export default function MediaBanner() {
  const [windowWidth, setWindowWidth] = useState(1920);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getAllCollaborationBanners();
        setBanners(data);
      } catch (error) {
        console.error('Failed to load banners:', error);
      }
    };
    fetchBanners();
  }, []);

  const slideActive =
    (windowWidth > 1024 && banners.length > 4) ||
    (windowWidth <= 1024 && banners.length > 3);

  let logoWidth = LOGO_WIDTH_DESKTOP;
  if (windowWidth <= 480) {
    logoWidth = LOGO_WIDTH_MOBILE;
  } else if (windowWidth <= 1024) {
    logoWidth = LOGO_WIDTH_TABLET;
  }
 if (banners.length === 0) return null;
  return (
   
    <div
      className={`relative overflow-hidden bg-[#071E2F] ${
        windowWidth <= 468 ? 'h-[100px]' : 'h-[242px]'
      }`}
    >
      {/* Text + Scrolling Logos */}
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex items-center px-5 md:px-16 z-10">
        <div className="overflow-hidden flex-1">
          <div
            className={`flex gap-[100px] md:gap-[60px] sm:gap-[40px] w-max ${
              slideActive ? 'animate-slide' : ''
            }`}
          >
            {banners.map((item, i) => (
              <div key={i} className="flex items-center justify-center flex-none">
                <Link href={item.link || '/'} passHref>
                  <Image
                    src={item.deskImgLink}
                    alt={item.bannerName}
                    width={logoWidth}
                    height={LOGO_HEIGHT}
                    style={{ objectFit: 'contain' }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom keyframes for animation */}
      <style jsx global>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
