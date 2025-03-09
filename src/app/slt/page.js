"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TextWall1 from "@/app/components/TextWall1";

export default function SelectLeftRight() {
    const [showTextWall1, setShowTextWall1] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Trigger fade-in effect after component mounts
        setFadeIn(true);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center text-white text-2xl overflow-hidden">

            {/* 🔹 Background Image & Buttons (Hide When TextWall1 is Open) */}
            {!showTextWall1 && (
                <>
                    <Image
                        src="/select.svg"
                        alt="Select Page Background"
                        fill
                        className="object-contain pointer-events-none"
                    />

                    {/* 🔹 Large Transparent Buttons */}
                    <div className="absolute flex gap-5 bottom-[10vh]">
                        <button
                            className="px-32 py-48 bg-transparent cursor-pointer"
                            onClick={() => alert("Still under development!")}
                        ></button>

                        <button
                            className="px-32 py-48 bg-transparent cursor-pointer"
                            onClick={() => setShowTextWall1(true)}
                        ></button>
                    </div>
                </>
            )}

            {/* 🔹 TextWall1 Component */}
            {showTextWall1 && <TextWall1 onClose={() => setShowTextWall1(false)} />}

            {/* 🔹 Fade-in effect */}
            <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-md aspect-[9/16]">
                    <div className={`transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
                        {/* Background container */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                                <div className="w-full max-w-[600px] h-full py-16 px-10 text-left">
                                    <h1 className="font-tan text-6xl text-white mb-3">Wild Link</h1>
                                    <p className="font-shs text-xl text-white mb-1">新型动物互动手链</p>
                                    <p className="font-shs text-xl text-white mb-3">
                                        New Interactive Animal Bracelets
                                    </p>
                                    <div className="w-100 h-1 bg-white mb-6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}