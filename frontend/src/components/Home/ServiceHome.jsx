'use client';

import React, { useRef } from 'react';

const ServiceHome = () => {
  const cardsRef = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-[#222]">
      <div className="flex justify-center items-center gap-12 flex-wrap p-4">
        {['#0f0', '#ff0'].map((color, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            style={{ '--clr': color }}
            className="relative w-80 h-[400px] rounded-2xl overflow-hidden bg-[rgba(45,45,45,1)] before:content-[''] before:absolute before:top-[var(--y)] before:left-[var(--x)] before:translate-x-[-50%] before:translate-y-[-50%] before:bg-[radial-gradient(var(--clr),transparent,transparent)] before:w-[700px] before:h-[700px] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 after:content-[''] after:absolute after:inset-[2px] after:rounded-[18px] after:bg-[rgba(45,45,45,0.75)]"
          />
        ))}
      </div>
    </main>
  );
};

export default ServiceHome;
