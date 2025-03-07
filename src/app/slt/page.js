"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TextWall1 from "@/app/components/TextWall1";

export default function SelectLeftRight() {
    const [showTextWall1, setShowTextWall1] = useState(false);
    const router = useRouter();

    return (
        <div className="fixed inset-0 flex items-center justify-center text-white text-2xl overflow-hidden">
            {/* 🔹 Back Button (Top-Left Corner) */}
            <button
                className="absolute top-5 left-5 w-12 h-12 bg-white bg-opacity-20 text-white border border-white text-lg rounded-full flex items-center justify-center hover:bg-opacity-70 transition"
                onClick={() => router.push("/about")}
            >
                ⬅
            </button>

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
        </div>
    );
}