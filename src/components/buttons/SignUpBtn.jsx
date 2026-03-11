"use client";

import { useState, useTransition } from "react";
import { signUpForClass, leaveClass } from "@/app/popular-classes/[id]/userAction";

export default function SignUpBtn({ classId, isEnrolled: initialEnrolled }) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState(null);
    const [enrolled, setEnrolled] = useState(initialEnrolled);

    const handleSignUp = async () => {
        setError(null);
        startTransition(async () => {
            try {
                await signUpForClass(classId);
                setEnrolled(true);
                console.log("User signed up for class:", classId);
            } catch (err) {
                setError(err.message || "Something went wrong");
            }
        });
    };

    const handleLeave = async () => {
        setError(null);
        startTransition(async () => {
            try {
                await leaveClass(classId);
                setEnrolled(false);
                console.log("User left class:", classId);
            } catch (err) {
                setError(err.message || "Something went wrong");
            }
        });
    };

    return (
        <div className="wrapper">
            {enrolled ? (
                <button
                    className="py-2 px-4 text-black rounded-full w-full"
                    style={{ backgroundColor: "var(--background-secondary)" }}
                    onClick={handleLeave}
                    disabled={isPending}
                >
                    {isPending ? "Leaving..." : "Leave Class"}
                </button>
            ) : (
                <button
                    className="py-2 px-4 text-black rounded-full w-full"
                    style={{ backgroundColor: "var(--background-secondary)" }}
                    onClick={handleSignUp}
                    disabled={isPending}
                >
                    {isPending ? "Signing up..." : "SIGN UP"}
                </button>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
