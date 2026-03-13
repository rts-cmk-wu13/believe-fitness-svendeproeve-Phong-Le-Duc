'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from "next/link";
import styles from './BurgerNav.module.css';

export default function BurgerNav() {
    const pathname = usePathname();
    const isWhiteText = pathname === '/' || pathname.startsWith('/popular-classes/');

    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setIsLoggedIn(document.cookie.includes("token="));
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
        <>
            <button
                className={styles.burgerButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                <Image
                    src={isOpen ? '/assets/burger_close_nav.png' : '/assets/burger_nav.png'}
                    alt={isOpen ? 'close menu' : 'menu'}
                    width={22}
                    height={22}
                    style={{ filter: isWhiteText ? 'none' : 'invert(1)' }}
                />
            </button>

            {isOpen && (
                <div className={styles.overlay}>
                    <button
                        className={styles.closeButton}
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                    >
                        <Image
                            src='/assets/burger_close_nav.png'
                            alt='close menu'
                            width={22}
                            height={22}
                        />
                    </button>
                    <nav className={styles.nav}>
                        <Link href="/" className={styles.navLink} onClick={() => setIsOpen(false)}>Home</Link>
                        <Link href="/popular-classes" className={styles.navLink} onClick={() => setIsOpen(false)}>Popular Classes</Link>
                        <Link href="/search" className={styles.navLink} onClick={() => setIsOpen(false)}>Search</Link>
                        <Link href="/profile" className={styles.navLink} onClick={() => setIsOpen(false)}>My Profile</Link>
                        {isLoggedIn ? (
                            <button
                                className={styles.navLink}
                                onClick={() => {
                                    if (!window.confirm("Log out?")) return;
                                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                    setIsOpen(false);
                                    window.location.replace("/"); // Hard reload to update UI
                                }}
                            >
                                Log out
                            </button>
                        ) : (
                            <Link href="/login" className={styles.navLink} onClick={() => setIsOpen(false)}>
                                Log In
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </>
    );
}