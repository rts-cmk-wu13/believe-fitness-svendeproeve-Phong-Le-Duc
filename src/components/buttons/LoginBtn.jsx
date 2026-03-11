"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginBtn({ isLoggedIn }) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        router.push('/');
    };

    return (
        <div>
            {isLoggedIn ? (
                <button
                    onClick={handleLogout}
                    className="py-2 px-4 text-black rounded-full"
                    style={{ backgroundColor: "var(--background-secondary)" }}
                >
                    Log ud
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