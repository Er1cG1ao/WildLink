"use client";

import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Scanner({ onClose }) {
    const router = useRouter();
    const [isScanning, setIsScanning] = useState(false);
    const html5QrCodeInstance = useRef(null);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                stopScanner();
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    useEffect(() => {
        if (!isScanning) return;

        console.log("Requesting Camera Permissions...");
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(() => {
                console.log("Camera permission granted.");
                startScanner();
            })
            .catch((err) => {
                console.error("Camera permission denied:", err);
                alert("Please allow camera access to scan QR codes.");
                setIsScanning(false);
            });

        return () => stopScanner();
    }, [isScanning]);

    function startScanner() {
        console.log("Initializing QR Scanner...");

        const scannerContainer = document.getElementById("qr-reader");
        if (!scannerContainer) {
            console.error("QR Reader container not found!");
            return;
        }

        if (!html5QrCodeInstance.current) {
            html5QrCodeInstance.current = new Html5Qrcode("qr-reader");
        }

        html5QrCodeInstance.current.start(
            { facingMode: "environment" }, // Use back camera
            {
                fps: 2,
                qrbox: { width: 250, height: 250 },
            },
        (decodedText) => {
            console.log("Scanned QR Code:", decodedText);
            if (decodedText === "wangshenyushishabi") {
                sessionStorage.setItem("scannedQR", decodedText);
                stopScanner(); // Stop scanning immediately after detection
                router.push("/slt");
            }
        },
            (error) => {
                console.warn("QR Scan Error:", error);
            }
        ).catch((err) => {
            console.error("Camera initialization failed:", err);
            alert("Failed to access camera. Please check permissions.");
            setIsScanning(false);
        });
    }

    function stopScanner() {
    if (html5QrCodeInstance.current) {
        console.log("Stopping QR Scanner...");
        html5QrCodeInstance.current
            .stop()
            .then(() => {
                console.log("QR Scanner stopped.");
                html5QrCodeInstance.current = null; // Reset instance after stopping
            })
            .catch((err) => console.error("Error stopping scanner:", err));
    }
    setIsScanning(false); // Ensure UI updates correctly
}

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => {
                stopScanner(); // Ensure the scanner stops before closing
                onClose();
            }}
        >
            <Image
                src="/Scan.svg"
                alt="Scanner Interface"
                fill
                className="object-contain pointer-events-none"
            />

            {/* Start Scanning Button */}
            {!isScanning && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsScanning(true);
                    }}
                    className="absolute bottom-[20vh] px-24 py-24 z-10 bg-transparent text-white text-xl rounded-md"
                >
                    Scan
                </button>
            )}

            {/* QR Scanner Area */}
            <div
                className="absolute bottom-[20vh] w-[50vw] h-[30vh] max-w-48 max-h-48 min-w-16 min-h-16 bg-transparent"
                onClick={(e) => e.stopPropagation()}
            >
                <div id="qr-reader" className={`w-full h-full ${isScanning ? '' : 'hidden'}`}></div>
            </div>

            {/* Instruction Text */}
            <div className="absolute top-[30%] left-0 w-full flex flex-col items-center text-center text-white z-30 px-6">
                <p className="font-shs text-xl mb-0">点击并扫描手链背面二维码</p>
                <p className="font-shs text-xl mb-0">与你的海洋生物互动并获取更多信息</p>
                <p className="font-shs text-sm mb-0">Click and scan the QR code on the back of the bracelet</p>
                <p className="font-shs text-sm">Interact with your sea creature and get more information</p>
            </div>
        </div>
    );
}