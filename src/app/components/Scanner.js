"use client";

import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Scanner({ onClose }) {
    const router = useRouter();
    const scannerRef = useRef(null);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    useEffect(() => {
        if (!scannerRef.current) return;

        console.log("Initializing QR Scanner..."); // Debugging log

        if (!document.getElementById("qr-reader")) {
            console.error("QR Reader element not found!");
            return;
        }

        const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });

        scanner.render(
            (decodedText) => {
                console.log("Scanned QR Code:", decodedText); // Debugging log
                if (decodedText === "wangshenyushishabi") {
                    sessionStorage.setItem("scannedQR", decodedText); // Store scanned data
                    router.push("/selectLeftRight"); // Navigate to the new page
                } else {
                    alert("Invalid QR Code. Try again!");
                }
            },
            (error) => {
                console.warn("QR Scan Error:", error);
            }
        );

        return () => {
            console.log("Cleaning up QR Scanner...");
            scanner.clear().catch(err => console.error("Error stopping scanner:", err));
        };
    }, [router]);

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-opacity-90 flex items-center justify-center z-50"
            onClick={onClose} // Click outside to close
        >
            {/* 🔹 Scanner UI (Scan.png as Full-Screen Background) */}
            <Image
                src="/Scan.svg" // Ensure Scan.png is in /public/
                alt="Scanner Interface"
                fill
                className="object-contain pointer-events-none"
            />

            {/* 🔲 QR Scanner Area */}
            <div
                className="absolute bottom-[20vh] w-[50vw] h-[30vh] max-w-48 max-h-48 min-w-16 min-h-16 bg-transparent cursor-pointer"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div id="qr-reader" className="w-full h-full"></div>
            </div>
            <div className="absolute top-[30%] left-0 w-full flex flex-col items-center text-center text-white z-30 px-6">
                <p className="font-shs text-xl mb-0">点击并扫描手链背面二维码</p>
                <p className="font-shs text-xl mb-0">与你的海洋生物互动并获取更多信息</p>
                <p className="font-shs text-sm mb-0">Click and scan the QR code on the back of the bracelet</p>
                <p className="font-shs text-sm">Interact with your sea creature and get more information</p>
            </div>
        </div>
    );
}