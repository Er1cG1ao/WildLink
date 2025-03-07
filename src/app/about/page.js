"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Scanner from "@/app/components/Scanner";
import TextWall2 from "@/app/components/TextWall2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function About() {
    const [opacity, setOpacity] = useState(1);
    const [isVisible, setIsVisible] = useState(true);
    const [showScanner, setShowScanner] = useState(false);
    const [showTextWall2, setShowTextWall2] = useState(false);

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
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
            {/* 🔹 Background Wrapper (Ensure Fullscreen) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {!showScanner && !showTextWall2 && (
                    <>
                        {/* 🔹 Sliding Image (Background - Behind Everything) */}
                        <div className="absolute top-0 left-0 w-full h-full z-0 flex items-center justify-center">
                            <Image
                                src="/Sliding.svg"
                                alt="Sliding Foreground"
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* 🔹 Swiper Video Carousel (Set Above Sliding.png & Interactive) */}
                        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-auto">
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                pagination={{ clickable: true }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="w-full h-full"
                            >
                                <SwiperSlide>
                                    <Image
                                        src="/remV1.gif"
                                        alt="GIF 1"
                                        fill
                                        className="object-contain cursor-pointer"
                                        unoptimized
                                        onClick={() => setShowScanner(true)}
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image
                                        src="/remV2.gif"
                                        alt="GIF 2"
                                        fill
                                        className="object-contain cursor-pointer"
                                        unoptimized
                                        onClick={() => setShowTextWall2(true)}
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </>
                )}
            </div>

            {/* 🔹 Entry Image (Fades Out) */}
            {isVisible && (
                <Image
                    src="/entryImg.svg"
                    alt="Wild Link"
                    fill
                    className="absolute z-50 transition-opacity duration-700 object-contain"
                    style={{ opacity }}
                />
            )}

            {/* 🔹 Scanner Component */}
            {showScanner && <Scanner onClose={() => setShowScanner(false)} />}

            {/* 🔹 TextWall2 Component */}
            {showTextWall2 && <TextWall2 onClose={() => setShowTextWall2(false)} />}
        </div>
    );
}