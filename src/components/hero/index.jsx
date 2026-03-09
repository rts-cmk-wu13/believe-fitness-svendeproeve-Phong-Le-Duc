"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import LoginBtn from "../buttons/loginBtn";
import { AuthContext } from "@/context/AuthContext";

export default function Hero() {
    const { authData } = useContext(AuthContext);

    return (
        <div className="relative w-full h-screen">
            <Image
                src="/assets/heroimg.jpg"
                alt="Hero Image"
                fill={true}
                objectFit="cover"
                className="z-0" />

            <div className="absolute z-10 top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center h-screen pt-20 pb-20">

                <figure className="mx-auto mb-4">
                    <Image src="/landrupLogo.png" alt="Logo" width={48} height={48} />
                </figure>
                <figure className="mx-auto mb-4">
                    <Image src="/landrupDans.png" alt="Logo" width={148} height={148} />
                </figure>

                <div className="absolute right-0 top-48 border-t-4 border-white border-solid w-70"></div>
                <LoginBtn />

                {authData && (
                    <Link href="/user-kalender">
                        <p className="cursor-pointer mt-8 p-2 w-52 text-center bg-blue-950/50 rounded-md">eller gå til profil her</p>
                    </Link>
                )}
            </div>
        </div>
    );
}