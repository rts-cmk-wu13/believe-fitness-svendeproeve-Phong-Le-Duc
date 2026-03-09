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

        <section className="mt-12">
            <h3 className="mt-8 pb-2">Nyhedsbrev</h3>
            <p className="mb-4">Få direkte besked når vi har sæsonstart eller afholder arrangementer.</p>
            <div className="flex flex-col justify-center w-full ">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="p-2 rounded border border-gray-300 bg-white text-gray-700  w-full"
                    />
                    <button type="submit" disabled={isLoading} className="bg-white text-black text-dinmaegler-blue p-2 rounded disabled:opacity-50">
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