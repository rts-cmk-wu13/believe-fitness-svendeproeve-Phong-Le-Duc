"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signUpForClass, leaveClass } from "@/app/popular-classes/[id]/userAction";

export default function SignUpBtn({ classId, isEnrolled, joinedCount, maxParticipants }) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState(null);
    const [enrolled, setEnrolled] = useState(isEnrolled);
    const router = useRouter();

    const isFull = joinedCount >= maxParticipants;

    const handleSignUp = async () => {
        setError(null);
        startTransition(async () => {
            try {
                await signUpForClass(classId);
                setEnrolled(true);
                router.refresh();
            } catch (err) {
                setError(err.message || "Something went wrong");
            }
        });
    };

    const handleLeave = async () => {
        if (!window.confirm("Leave class?")) return;
        setError(null);
        startTransition(async () => {
            try {
                await leaveClass(classId);
                setEnrolled(false);
                router.refresh();
            } catch (err) {
                setError(err.message || "Something went wrong");
            }
        });
    };

    return (
        <div>
            {isFull ? (
                <div>
                    <p className="text-red-600 mt-2 text-center">All spots for this class are now occupied.</p>
                    {enrolled && (
                        <button
                            className="py-2 px-4 text-black rounded-full w-full mt-2"
                            style={{ backgroundColor: "var(--background-secondary)" }}
                            onClick={handleLeave}
                            disabled={isPending}
                        >
                            {isPending ? "Leaving..." : "Leave Class"}
                        </button>
                    )}
                </div>
            ) : enrolled ? (
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
