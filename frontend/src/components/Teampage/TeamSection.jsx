"use client";

import { useEffect, useState } from "react";
import ButtonWithImage from "@/UI/AnimatedButton";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { getTeams } from "@/lib/Teams"; // adjust path if needed

export const AnimatedButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-weight: 500;
  background: transparent;
  border: none;
  color: white;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  z-index: 0;
  min-height: 42px;
  width: 151px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px;
    background-image: url("/button/contactbg.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    border-radius: 0.5rem;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }

  span.arrow {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, color 0.3s;

    img {
      width: 24px;
      height: 24px;
    }
  }
`;

const TeamSection = () => {
  const [images, setImages] = useState({
    founderImageUrl: "",
    teamImageUrl: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await getTeams();
      setImages(data);
      setLoading(false);
    };
    fetchImages();
  }, []);

  return (
    <div className="bg-[#071E2F] py-12 px-4 md:px-16 text-white relative">
      <div className="md:mb-8 mb-6">
        <ButtonWithImage text="Team at" />
      </div>
      <h1 className="section-heading font-light leading-relaxed max-w-6xl mb-12 mt-2">
        Real Results. Proven Strategies. Discover client success stories backed
        by data, execution, and measurable growth outcomes.
      </h1>

      {/* Skeleton Loader */}
      {loading ? (
        <div className="flex flex-col gap-6 w-full py-8 px-8 bg-[#0d2a3e] rounded-[10px] animate-pulse">
          <div className="w-full h-[300px] md:h-[539px] bg-gray-700 rounded-lg" />
          <div className="w-full h-[300px] md:h-[539px] bg-gray-700 rounded-lg" />
          <div className="mt-10 w-full px-6 py-4 bg-gray-700 rounded-lg" />
        </div>
      ) : (
        <div
          className="flex flex-col gap-6 w-full bg-cover py-8 px-8 bg-bottom bg-no-repeat rounded-[10px]"
          style={{ backgroundImage: 'url("/teams/cardbg.png")' }}
        >
          <div className="relative w-full h-[300px] md:h-[539px] overflow-hidden">
            {images.founderImageUrl && (
              <Image
                src={images.founderImageUrl}
                alt="Founder"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                priority
              />
            )}
          </div>

          <div className="relative w-full h-[300px] md:h-[539px] overflow-hidden">
            {images.teamImageUrl && (
              <Image
                src={images.teamImageUrl}
                alt="Team"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                priority
              />
            )}
          </div>

          <div className="mt-10 w-full px-6 rounded-lg flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left text-[24px] md:text-lg font-semibold">
              Interested in joining us? <br />
              <span className="text-[16px] font-light">
                Share your details with your resume to hr@wallstreetjr.com
              </span>
            </div>
            <Link href="mailto:hr@wallstreetjr.com">
              <AnimatedButton>
                Write Us
                <span className="arrow">
                  <Image
                    src="/teams/buttonarrow.png"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </span>
              </AnimatedButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSection;
