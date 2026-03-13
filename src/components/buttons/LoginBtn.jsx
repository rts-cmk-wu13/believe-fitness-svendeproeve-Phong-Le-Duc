"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function LoginBtn() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setIsLoggedIn(document.cookie.includes("token="));
        setHasMounted(true);
    }, []);

    const handleLogout = () => {
        if (!window.confirm("Log out?")) return;
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsLoggedIn(false);
        router.refresh();
    };

    if (!hasMounted) {
        return null;
    }

    return (
        <div>
            {isLoggedIn ? (
                <button
                    onClick={handleLogout}
                    className="py-2 px-4 text-black rounded-full"
                    style={{ backgroundColor: "var(--background-secondary)" }}
                >
                    Log out
                </button>
            ) : (
                <Link href="/login">
                    <button
                        className="py-2 px-4 text-black rounded-full"
                        style={{ backgroundColor: "var(--background-secondary)" }}
                    >
                        Log in
                    </button>
                </Link>
            )}
        </div>
    );
}