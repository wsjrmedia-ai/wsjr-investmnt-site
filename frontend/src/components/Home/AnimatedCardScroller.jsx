'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

export const AnimatedCardScroller = ({ onCardSelect, showParentCard }) => {
    const allCards = [
        {
            id: 1,
            title: "Strategic",
            shortdec: "Investment Planning & Market Positioning",
            color: "#E3B977",
            description: "We begin with a thorough assessment of your current financial situation, goals, and risk tolerance to develop a customized strategy that aligns with your objectives and constraints."
        },
        {
            id: 2,
            title: "Ethical",
            shortdec: "Compliance & Transparent Investment Standards",
            color: "#E3B977",
            description: "We adhere to strict ethical standards, ensuring transparency and accountability in our investment processes."
        },
        {
            id: 3,
            title: "Innovative",
            shortdec: "Technology-Driven Investment Solutions",
            color: "#E3B977",
            description: "We leverage cutting-edge technology to provide innovative investment solutions that optimize returns and minimize risks."
        },
        {
            id: 4,
            title: "Global",
            shortdec: "Market Expansion & Diversification",
            color: "#E3B977",
            description: "We expand our investment portfolio to include a diverse range of global assets, ensuring a well-rounded investment strategy."
        },
        {
            id: 5,
            title: "Secure",
            shortdec: "Risk-Managed Investment Portfolios",
            color: "#E3B977",
            description: "We design and manage risk-managed investment portfolios, ensuring that your investments are well-protected against potential losses."
        }
    ]

    const [currentlyHiddenId, setCurrentlyHiddenId] = useState(null);
    const [visibleIndices, setVisibleIndices] = useState([0, 1]);
    const containerRef = useRef(null);
    const intervalRef = useRef(null);

    const [gradientPos, setGradientPos] = useState(0);

    // Select first card initially
    useEffect(() => {
        const firstCard = allCards[0];
        setCurrentlyHiddenId(firstCard.id);
        setVisibleIndices([0, 1]);
        onCardSelect(firstCard.title, firstCard.shortdec, firstCard.description);
    }, []);


    // Get currently visible cards (all except the currently hidden one)
    const visibleCards = allCards.filter(card => card.id !== currentlyHiddenId);

    // Auto-scroll effect
    useEffect(() => {
        // Only auto-scroll if we have at least 2 cards
        if (visibleCards.length >= 2) {
            intervalRef.current = setInterval(() => {
                setVisibleIndices(prev => {
                    const nextFirst = (prev[0] + 1) % visibleCards.length;
                    const nextSecond = (prev[1] + 1) % visibleCards.length;
                    return [nextFirst, nextSecond];
                });
            }, 3000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [visibleCards.length]);

    // Animated gradient effect
    useEffect(() => {
        const gradientInterval = setInterval(() => {
            setGradientPos(prev => (prev + 5) % 100);
        }, 100);

        return () => clearInterval(gradientInterval);
    }, []);

    const handleCardClick = (card) => {
        // Set the currently hidden card (this will automatically unhide any previously hidden card)
        setCurrentlyHiddenId(card.id);

        // Reset visible indices to start from beginning
        setVisibleIndices([0, 1]);

        // Pass data to parent
        onCardSelect(card.title, card.shortdec, card.description);
    };

    return (
        <div className="relative h-[200px] overflow-hidden" ref={containerRef}>
            {allCards.map((card) => {
                // Find the index in visibleCards if the card is visible
                const visibleIndex = visibleCards.findIndex(c => c.id === card.id);
                const isVisible = visibleIndex !== -1;
                const isCurrentlyDisplayed = isVisible && visibleIndices.includes(visibleIndex);

                return (
                    <div
                        key={card.id}
                        className={`absolute rounded-xl md:p-4 p-3 bg-[#163952] flex justify-between items-center group hover:bg-[#123a5d] transition-all duration-500 w-full text-[14px] h-[60px] md:text-[15px] cursor-pointer
                            ${isVisible ? (isCurrentlyDisplayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full') : 'hidden'}
                            ${isVisible && visibleIndex === visibleIndices[0] ? 'top-0' : 'md:top-[70px] top-[80px]'}
                        `}
                        style={{
                            transition: 'all 0.5s ease',
                            zIndex: isCurrentlyDisplayed ? 10 : 0
                        }}
                        onClick={() => handleCardClick(card)}
                    >
                        <span className="relative">
                            <span
                                className="text-[14px] md:text-[15px] font-semibold "
                                style={{
                                    color: card.color,
                                    backgroundImage: isCurrentlyDisplayed && visibleCards.length >= 2
                                        ? `linear-gradient(90deg, white ${gradientPos}%, ${card.color} ${gradientPos + 20}%)`
                                        : undefined,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundSize: '200% auto',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: '0% center',
                                    transition: 'background-image 0.3s ease'
                                }}
                            >
                                {card.title}
                            </span>
                            {' ' + card.shortdec}
                        </span>
                        <button
                            className="cursor-pointer border border-[#BA833C] md:w-[27px] md:h-[27px] w-[25px] h-[25px] flex items-center justify-center rounded-full shadow-m transition hover:bg-[#BA833C]"
                            onClick={() => handleCardClick(card)}
                        >
                            <Image
                                src="/service/arrowright.png"
                                alt="Scroll Right"
                                width={23}
                                height={23}
                                className="filter brightness-0 invert"
                            />
                        </button>
                    </div>
                );
            })}

            {visibleCards.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    No cards to display
                </div>
            )}
        </div>
    )
}