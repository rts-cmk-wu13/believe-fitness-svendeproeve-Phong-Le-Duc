"use client";
import React, { useEffect, useState } from "react";

const splashImages = [
    "/assets/splash_1.png",
    "/assets/splash_2.png"
];

export default function SplashScreen({ onFinish }) {
    const [show, setShow] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        // Only show splash if not shown before
        if (!localStorage.getItem("splashShown")) {
            setShow(true);
            setImageIndex(Math.floor(Math.random() * splashImages.length));
            const timer = setTimeout(() => setShowButton(true), 700);
            return () => clearTimeout(timer);
        } else {
            // If already shown, immediately finish
            if (onFinish) onFinish();
        }
    }, [onFinish]);

    const handleStart = () => {
        localStorage.setItem("splashShown", "true");
        setShow(false);
        if (onFinish) onFinish();
    };

    if (!show) return null;

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "#000", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", zIndex: 9999
        }}>
            <img
                src={splashImages[imageIndex]}
                alt="Splash"
                style={{ maxWidth: "80vw", maxHeight: "60vh", borderRadius: "1rem" }}
            />
            {showButton && (
                <button
                    onClick={handleStart}
                    style={{
                        marginTop: "2rem",
                        padding: "1rem 2rem",
                        fontSize: "1.2rem",
                        borderRadius: "0.5rem",
                        border: "none",
                        background: "#fff",
                        color: "#222",
                        cursor: "pointer"
                    }}
                >
                    Start Training
                </button>
            )}
        </div>
    );
}

