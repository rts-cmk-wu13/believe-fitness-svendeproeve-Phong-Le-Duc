"use client";

import { z } from "zod/v4"; // Importer zod for at kunne bruge z.treeifyError
import { registerSchema } from "@/lib/schemas";
import { useState } from "react";
import { registerUser } from "@/lib/dal/registerUser";

import { useRouter } from "next/navigation";

export default function FormRegisterUser() {
    const [errors, setErrors] = useState({});
    const router = useRouter();

    async function handleRegister(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        console.log('Form data:', data); // Add this line
        const result = registerSchema.safeParse(data);

        if (!result.success) {
            const errors = z.treeifyError(result.error);
            console.log('Zod error object:', errors);
            setErrors(errors.properties || {});
        } else {
            setErrors({});

            const { confirmPassword, ...userWithoutConfirm } = result.data;

            const response = await registerUser(userWithoutConfirm);

            if (!response.ok) {
                setErrors({ form: { errors: [response.data.message || response.data.error || "Please fill out all fields"] } });
            } else {
                router.replace("/login");
            }
        }
    }

    return (

        <>
            <h1 className=" wrapper" style={{ color: "var(--color-secondary)" }}>Believe <br /> Fitness</h1>
            <div className="flex items-center gap-2 mt-4 mb-16"    >
                <hr style={{ border: "1px solid #000000", width: "10%" }} />
                <h3 className="">Train like a pro</h3>
            </div>
            <section className="my-8 wrapper">

                <h3 className="mb-4">Sign up as a new user</h3>

                <form onSubmit={handleRegister} className="flex flex-col  max-w-md rounded-sm">

                    <div className="flex flex-col w-full">
                        <label htmlFor="username" className="mb-1 text-sm sr-only">Fornavn</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your name..."
                            className="bg-white border border-gray-300 text-black rounded-full px-3 py-2 focus:outline-none focus:border-blue-400"
                        />
                        <p className="text-red-600 text-sm min-h-[1.5em]">{errors && errors?.username?.errors[0]}</p>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="email" className="mb-1 text-sm sr-only">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email..."
                            className="bg-white border border-gray-300 text-black rounded-full px-3 py-2 focus:outline-none focus:border-blue-400"
                        />
                        <p className="text-red-600 text-sm min-h-[1.5em]">{errors && errors?.email?.errors[0]}</p>
                    </div>

                    {/* <div className="flex flex-col w-full">
                    <label htmlFor="username" className="mb-1 text-sm sr-only">Brugernavn</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Brugernavn"
                        className="bg-white border border-gray-300 text-black rounded-full px-3 py-2 focus:outline-none focus:border-blue-400"
                    />
                    <p className="text-red-600 text-sm min-h-[1.5em]">{errors && errors?.username?.errors[0]}</p>
                </div> */}
                    {/* 
                <div className="flex flex-col w-full">
                    <label htmlFor="age" className="mb-1 text-sm sr-only">Alder</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Alder"
                        className="bg-white border border-gray-300 text-black rounded-sm px-3 py-2 focus:outline-none focus:border-blue-400"
                    />
                    <p className="text-red-600 text-sm min-h-[1.5em]">{errors && errors?.age?.errors[0]}</p>
                </div> */}

                    <div className="flex flex-col w-full">
                        <label htmlFor="password" className="mb-1 text-sm sr-only">Adgangskode</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password..."
                            className="bg-white border border-gray-300 text-black rounded-full px-3 py-2 focus:outline-none focus:border-blue-400"
                        />
                        <p className="text-red-600 text-sm min-h-[1.5em]">{errors && errors?.password?.errors[0]}</p>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="confirmPassword" className="mb-1 text-sm sr-only">Bekræft adgangskode</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Repeat your password..."
                            className="bg-white border border-gray-300 text-black rounded-full px-3 py-2 focus:outline-none focus:border-blue-400"
                        />
                        <p className="text-red-600 text-sm min-h-[1.5em]">
                            {errors && errors?.confirmPassword?.errors[0]}
                        </p>
                    </div>

                    <button type="submit" className=" p-2 mx-auto w-full rounded-full" style={{ backgroundColor: "var(--background-secondary)" }} >
                        SIGN UP
                    </button>
                    <p className="text-red-600 text-sm min-h-[1.5em]">{errors && errors?.form?.errors[0]}</p>
                </form>
            </section >
        </>
    )
}