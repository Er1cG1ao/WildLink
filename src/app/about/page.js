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
import Head from "next/head";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="preload" href="/remV1.gif" as="image" type="image/gif" />
                <link rel="preload" href="/remV2.gif" as="image" type="image/gif" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default function About() {
    const [opacity, setOpacity] = useState(1);
    const [isVisible, setIsVisible] = useState(true);
    const [showComponent, setShowComponent] = useState(null);
    const [hideCarousel, setHideCarousel] = useState(false);
    const [hideText, setHideText] = useState(false);
    const [fadeIn, setFadeIn] = useState(false); // Fade-in effect state

    useEffect(() => {
        // Ensure entryImg loads immediately
        setIsVisible(true);

        const fadeTimer = setTimeout(() => {
            setOpacity(0);
        }, 500);

        const removeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 1200);

        // Trigger fade-in effect for the rest of the content **1 second later**
        setTimeout(() => {
            setFadeIn(true);
        }, 1000); // Delay increased to 1 second

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
            <div className="relative w-full max-w-md aspect-[9/16]">
                {/* Apply fade-in effect to all content except entryImg */}
                <div className={`transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
                    {/* 背景容器：包含 Sliding.svg 与文字 */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 z-20 flex items-center justify-center">
                            <div className="w-full max-w-[600px] h-full py-16 px-10 text-left">
                                <h1 className="font-tan text-6xl text-white mb-3">Wild Link</h1>
                                {!hideText && (
                                    <>
                                        <p className="font-shs text-xl text-white mb-1">新型动物互动手链</p>
                                        <p className="font-shs text-xl text-white mb-3">
                                            New Interactive Animal Bracelets
                                        </p>
                                        <div className="w-100 h-1 bg-white mb-6"></div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 渐隐的 Entry Image (Now Preloaded & Instantly Visible) */}
                {isVisible && (
                    <Image
                        src="/entryImg.svg"
                        alt="Wild Link"
                        fill
                        priority // Preload the image so there's no delay
                        className="absolute z-50 transition-opacity duration-700 object-contain"
                        style={{ opacity }}
                    />
                )}
            </div>

            {/* Hide video carousel when a component is shown */}
            {!hideCarousel && (
                <div className={`absolute inset-0 z-10 pointer-events-auto transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
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
                                onClick={() => {
                                    setShowComponent("scanner");
                                    setHideCarousel(true);
                                }}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src="/remV2.gif"
                                alt="GIF 2"
                                fill
                                className="object-contain cursor-pointer"
                                unoptimized
                                onClick={() => {
                                    setShowComponent("textwall");
                                    setHideCarousel(true);
                                    setHideText(true);
                                }}
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            )}

            {/* Conditionally render components */}
            {showComponent === "scanner" && (
                <Scanner
                    onClose={() => {
                        setShowComponent(null);
                        setHideCarousel(false);
                    }}
                />
            )}
            {showComponent === "textwall" && (
                <TextWall2
                    onClose={() => {
                        setShowComponent(null);
                        setHideCarousel(false);
                        setHideText(false);
                    }}
                />
            )}
        </div>
    );
}