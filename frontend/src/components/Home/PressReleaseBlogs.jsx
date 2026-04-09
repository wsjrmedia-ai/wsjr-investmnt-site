"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import PressReleaseSkeleton from "@/UI/PressReleaseSkeleton";
import ButtonWithImage from "@/UI/AnimatedButton";
import { getAllPressRelease } from "@/lib/pressrelease";

export default function PressReleaseBlogs() {
    const [press, setPress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDesktop, setIsDesktop] = useState(false);
    const scrollRef = useRef(null);
    const [duration, setDuration] = useState(30); // default

    useEffect(() => {
        const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        async function fetchPress() {
            try {
                const allPress = await getAllPressRelease();
                setPress(allPress.slice(0, 15));
            } catch (error) {
                console.error("Error fetching press releases:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPress();
    }, []);

    // --- ⭐ Calculate animation duration based on width ---
    useEffect(() => {
        if (!scrollRef.current) return;

        const container = scrollRef.current;
        const totalWidth = container.scrollWidth; // full width

        const speed = 60; // px per second → adjust speed here
        const calculatedDuration = totalWidth / speed;

        setDuration(calculatedDuration);
    }, [press, isDesktop]);

    if (loading) return <PressReleaseSkeleton />;
    if (press.length === 0) return null;

    const desktopSlide = isDesktop && press.length > 3;
    const mobileSlide = !isDesktop && press.length > 1;

    // Duplicate items only when auto scrolling
    const displayPress =
        desktopSlide || mobileSlide ? [...press, ...press] : press;

    return (
        <section className="bg-[#071E2F] text-white px-4 md:px-16 md:pb-16 pb-6  pt-16 md:pt-16 overflow-hidden">
            <div className="md:mb-10 mb-8">
                <ButtonWithImage text={"News / Press Release"} image={"none"} />
            </div>

            <div className="relative w-full overflow-hidden">
                <div
                    ref={scrollRef}
                    className={`flex gap-10 ${
                        desktopSlide || mobileSlide ? "auto-scroll" : ""
                    }`}
                    style={{
                        animationDuration:
                            desktopSlide || mobileSlide ? `${duration}s` : "0s",
                    }}
                >
                    {displayPress.map((item, idx) => (
                        <a
                            key={item.id + "-" + idx}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-4 md:w-[440px] w-[300px] shrink-0"
                        >
                            <div className="relative w-[100px] bg-white rounded-[8px] h-full shrink-0 md:w-[150px] md:h-full">
                                <Image
                                    src={item.image || "/gallery/News.png"}
                                    alt={item.title}
                                    fill
                                    className="object-contain rounded-md"
                                />
                            </div>

                            <div className="flex flex-col justify-between">
                                <div>
                                    <h4 className="text-[15px] md:text-lg font-medium leading-snug">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-white mt-2 line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                                <span className="text-xs text-white mt-3">
                                    {new Date(item.date).toLocaleDateString()}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes autoSlide {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .auto-scroll {
                    display: flex;
                    width: max-content;
                    animation-name: autoSlide;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </section>
    );
}
