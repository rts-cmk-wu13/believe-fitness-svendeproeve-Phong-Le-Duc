"use client";
import Image from "next/image";
import Link from "next/link";

import LoginBtn from "../buttons/LoginBtn";
import ClassesBtn from "../buttons/ClassesBtn";



export default function Hero() {


    return (
        <div className="relative w-full h-[40vh]">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/assets/welcome.jpg"
                    alt="Hero Image"
                    priority
                    fill={true}
                    sizes="100vw"
                    className="object-cover"
                />

            </div>

            <div className="absolute inset-x-0 bottom-12 left-8 z-10 flex flex-col gap-2">
                <p className="heroText" style={{ color: "var(--color-secondary)" }}>Welcome to <br /> Believe Fitness</p>
                <div className="flex gap-2 mt-4">
                    <ClassesBtn />
                    <LoginBtn />
                </div>AC
            </div>
        </div>
    );
}