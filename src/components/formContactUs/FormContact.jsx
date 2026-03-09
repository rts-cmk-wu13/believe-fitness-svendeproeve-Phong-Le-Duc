"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { contactSchema } from "@/lib/schemas";
import { z } from "zod/v4";
import { sendContactMessage } from "@/lib/dal/sendContactMessage";

export default function FormContact({ }) {
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const result = contactSchema.safeParse(data);

        if (!result.success) {
            const errors = z.treeifyError(result.error);
            setErrors(errors.properties || {});
            console.log("Validation failed:", errors.properties || {});
        } else {
            setErrors({});
            try {
                const response = await sendContactMessage(result.data);
                console.log("😁", result.data);
                if (response.ok) {
                    console.log("Message sent successfully!");
                    setSubmitted(true);
                    event.target.reset();
                    setTimeout(() => setSubmitted(false), 5000);
                } else {
                    console.log("Message sending failed. Server responded with:", response.status);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    }

    return (
        <section className="my-8 wrapper">
            <h3>Kontakt os</h3>

            <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md rounded-sm">
                <div className="flex flex-col w-full ">
                    <label htmlFor="name" className="mb-1 text-sm sr-only">Navn</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Navn"
                        className="bg-white border border-gray-300 text-black rounded-sm px-3 py-2 focus:outline-none focus:border-blue-400"
                    />
                    <p className="text-red-600 text-sm min-h-[1.5em]">{errors && errors?.name?.errors[0]}</p>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="email" className="mb-1 text-sm sr-only">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="bg-white border border-gray-300 text-black rounded-sm px-3 py-2 focus:outline-none focus:border-blue-400"
                    />
                    <p className="text-red-600 text-sm min-h-[1.5em]">{errors && errors?.email?.errors[0]}</p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="message" className="mb-1 text-sm sr-only">Besked</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Besked"
                        rows={4}
                        className="bg-white border border-gray-300 text-black rounded-sm px-3 py-2 focus:outline-none focus:border-blue-400"
                    ></textarea>
                    <p className="text-red-600 text-sm min-h-[1.5em]">{errors && errors?.message?.errors[0]}</p>
                </div>

                {submitted && (
                    <div className="text-green-600 text-center my-4">
                        Tak for din besked! Vi vender tilbage hurtigst muligt.
                    </div>
                )}

                <button type="submit" className="bg-blue-300 p-2 w-full mx-auto rounded-full" style={{ boxShadow: "0 8px 24px 0 rgba(0,0,0,0.5)" }}>
                    Send besked
                </button>
            </form>
        </section>
    );
}