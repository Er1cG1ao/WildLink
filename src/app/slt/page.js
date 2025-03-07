"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import router for navigation
import Image from "next/image";
import TextWall1 from "@/app/components/TextWall1"; // Import TextWall1

export default function SelectLeftRight() {
    const [showTextWall1, setShowTextWall1] = useState(false); // State to control TextWall1 visibility
    const router = useRouter(); // Next.js router for navigation

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center text-white text-2xl">
            {/* 🔹 Back Button (Top-Left Corner) */}
            <button
                className="absolute top-3 left-3 w-12 h-12 border border-white bg-opacity-50 text-white text-lg rounded-full flex items-center justify-center hover:bg-opacity-70 transition"
                onClick={() => router.push("/about")} // Navigate back to About page
            >
                ⬅
            </button>

            {/* 🔹 Show Background Image & Buttons only when TextWall1 is NOT visible */}
            {!showTextWall1 && (
                <>
                    {/* 🔹 Background Image (select.png with object-contain) */}
                    <Image
                        src="/select.svg" // Ensure select.png is in /public/
                        alt="Select Page Background"
                        fill
                        className="object-contain pointer-events-none"
                    />

                    {/* 🔹 Large Transparent Left/Right Buttons */}
                    <div className="absolute flex gap-5 bottom-[10vh]">
                        {/* 🔵 Left Button - Show Alert */}
                        <button
                            className="px-32 py-48 bg-transparent cursor-pointer"
                            onClick={() => alert("Still under development!")}
                        ></button>

                        {/* 🟢 Right Button - Show TextWall1 */}
                        <button
                            className="px-32 py-48 bg-transparent cursor-pointer"
                            onClick={() => setShowTextWall1(true)}
                        ></button>
                    </div>
                </>
            )}

            {/* 🔹 TextWall1 Component (Only visible when showTextWall1 is true) */}
            {showTextWall1 && <TextWall1 onClose={() => setShowTextWall1(false)} />}
        </div>
    );
}