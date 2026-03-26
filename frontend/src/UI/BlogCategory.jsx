'use client';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

const gradientBorder = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

export const AnimatedButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* <-- Add this line */
  padding: 0.7rem;
  font-weight: 500;
  background: transparent;
  border: none;
  color: white;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  z-index: 0;
  min-height: 35px;
  max-width: 350px;
  min-width: 93px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1.5px;
    background: linear-gradient(270deg, #BA833C, #0062A7);
    background-size: 400% 400%;
    animation: ${gradientBorder} 10s linear infinite;
    border-radius: 0.5rem;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
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
  }
`;


export default function BlogCategoryButton({text}) {
  return (
    <AnimatedButton>
      {text}
    </AnimatedButton>
  );
}
