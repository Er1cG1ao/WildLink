"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Scanner from "@/app/components/Scanner"; // Import Scanner
import TextWall2 from "@/app/components/TextWall2"; // Import TextWall2
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function About() {
    const [opacity, setOpacity] = useState(1);
    const [isVisible, setIsVisible] = useState(true);
    const [showScanner, setShowScanner] = useState(false);
    const [showTextWall2, setShowTextWall2] = useState(false); // Controls TextWall2 visibility

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setOpacity(0);
        }, 500);

        const removeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 1200);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    return (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* 🔹 Show Video Carousel & Sliding.png only when Scanner and TextWall2 are NOT visible */}
            {!showScanner && !showTextWall2 && (
                <>
                    {/* 🔹 Swiper Video Carousel */}
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="absolute w-full h-full z-10"
                    >
                        <SwiperSlide>
                            <Image
                                src="/remV1.gif"
                                alt="GIF 1"
                                fill
                                className="object-contain cursor-pointer"
                                unoptimized
                                onClick={() => setShowScanner(true)} // Open Scanner
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src="/remV2.gif"
                                alt="GIF 2"
                                fill
                                className="object-contain cursor-pointer"
                                unoptimized
                                onClick={() => setShowTextWall2(true)} // Open TextWall2
                            />
                        </SwiperSlide>
                    </Swiper>

                    {/* 🔹 Sliding Image Overlay */}
                    <div className="absolute w-full h-full flex items-center justify-center pointer-events-none z-0">
                        <Image
                            src="/Sliding.svg"
                            alt="Sliding Foreground"
                            fill
                            className="object-contain"
                        />
                    </div>
                </>
            )}

            {/* 🔹 Entry Image (Fades Out) */}
            {isVisible && (
                <Image
                    src="/entryImg.png"
                    alt="Wild Link"
                    fill
                    className="absolute z-50 transition-opacity duration-700 object-contain"
                    style={{ opacity }}
                />
            )}

            {/* 🔹 Scanner Component (Only visible when showScanner is true) */}
            {showScanner && <Scanner onClose={() => setShowScanner(false)} />}

            {/* 🔹 TextWall2 Component (Only visible when showTextWall2 is true) */}
            {showTextWall2 && <TextWall2 onClose={() => setShowTextWall2(false)} />}
        </div>
    );
}