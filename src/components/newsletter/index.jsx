"use client";

import { useState } from "react";
import { emailSchema } from "@/lib/schemas";
import { subscribeNewsletter } from "@/lib/dal/subscribeNewsletter";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = emailSchema.safeParse({ email });
        if (!result.success) {
            setMessage(result.error.issues?.[0]?.message || "forkert email");
            setIsSuccess(false);
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const result = await subscribeNewsletter(email);
            setMessage(result.message);
            setIsSuccess(result.success);
            if (result.success) {
                setEmail("");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <section className="wrapper">
            <h2 className="mt-8 pb-2 var(--background-secondary) ">Sign up for our newsletter</h2>
            <p className="mb-4">Sign up to receive the latest news and announcements from Believe Fitness</p>
            <div className="flex flex-col justify-center w-full ">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="email"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="p-2 rounded border border-gray-300 bg-white text-gray-700  w-full"
                    />
                    <button type="submit" disabled={isLoading} className="py-2 px-4 text-black rounded-full"
                        style={{
                            backgroundColor: "var(--background-secondary)"

                        }}>
                        {isLoading ? "Sender..." : "Tilmeld"}
                    </button>
                </form>
                <div className="h-8 mt-2">
                    {message && <p className={`text-sm ${isSuccess ? "text-green-600" : "text-red-600"}`}>{message}</p>}
                </div>
            </div>
        </section>
    );
}