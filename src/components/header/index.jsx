"use client";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import BurgerMenu from "@/components/navigation/BurgerNav";

const TITLES = {
    "/": "Home",
    "/popular-classes": "Popular Classes",
    "/search": "Search",
    "/profile": "My Profile",

};

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const title = TITLES[pathname] || "Believe Fitness";

    const isHome = pathname === "/";
    const headerRouteLocation = isHome
        ? "fixed top-0 left-0 right-0 z-50"
        : "relative";

    return (
        <header className={`flex gap-4 items-center bg-transparent w-full p-4  ${headerRouteLocation}`}>
            <button
                onClick={() => router.back()}
                className="bg-none border-none cursor-pointer p-0"
            >
                <FaArrowLeft />
            </button>

            <span className="text-center">{title}</span>
            <BurgerMenu />
        </header>
    );
}