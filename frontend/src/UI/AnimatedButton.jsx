'use client';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

const gradientBorder = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const AnimatedButton = styled.button`
  position: relative;
  padding: 0.7rem 0.7rem 0.7rem 0.7rem;
  display: flex;
  font-weight: 500;
  color: white;
  background: transparent;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  z-index: 0;
  cursor: pointer;
  min-width: 150px;
  max-width: 350px;
  text-align: center;
  justify-content: center;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    background: linear-gradient(270deg, #BA833C, #0062A7);
    background-size: 400% 400%;
    animation: ${gradientBorder} 8s linear infinite;
    border-radius:10px;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
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
    background-color: #0463A5;
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, color 0.3s;

    &:hover {
      background-color: white;
      color: #081E2F;
    }

    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export default function ButtonWithImage({ text, image }) {
  return (
    <AnimatedButton>
      {text}
      {image !== "none" && (
        <span className="ml-2 font-semibold italic">
          <Image src="/Hero/wallstreetbutton.png" alt="Arrow" width={100} height={17} />
        </span>
      )}
    </AnimatedButton>
  );
}
