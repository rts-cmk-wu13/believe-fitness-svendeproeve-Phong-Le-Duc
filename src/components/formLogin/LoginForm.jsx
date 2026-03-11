"use client";
import { useActionState } from "react";
import { loginUser } from "./login-action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
    values: {
        username: "",
        password: ""
    },
    errors: undefined
};

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginUser, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            router.push("/profile");
        }
    }, [state.success, router]);

    return (
        <section className="my-8 wrapper">
            <h3>Log ind</h3>
            <form action={formAction} noValidate className="flex flex-col gap-2 max-w-md rounded-sm">
                <div className="flex flex-col w-full">
                    <label htmlFor="username" className="mb-1 text-sm sr-only">Username:</label>
                    <input type="text"
                        name="username"
                        placeholder="Brugernavn"
                        defaultValue={state.values?.username}
                        className="bg-white border border-gray-300 text-black rounded-sm px-3 py-2 focus:outline-none focus:border-blue-400" />
                    {state.errors?.username && <p style={{ color: "red" }}>{state.errors.username}</p>}
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="password" className="mb-1 text-sm sr-only">Password:</label>
                    <input type="password"
                        name="password"
                        placeholder="Password"
                        defaultValue={state.values?.password}
                        className="bg-white border border-gray-300 text-black rounded-sm px-3 py-2 focus:outline-none focus:border-blue-400" />
                    {state.errors?.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
                </div>
                {state.errors?.form && <p style={{ color: "red" }}>{state.errors.form}</p>}
                <button type="submit" disabled={isPending} className="bg-blue-300 p-2 w-1/2 mx-auto rounded-md disabled:bg-gray-400">{isPending ? "Logging in..." : "Log ind"}</button>
            </form>
        </section>
    );
}