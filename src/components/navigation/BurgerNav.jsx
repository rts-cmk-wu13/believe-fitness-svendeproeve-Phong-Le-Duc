'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './BurgerNav.module.css';

export default function BurgerNav() {
    const pathname = usePathname();
    const isWhiteText = pathname === '/' || pathname.startsWith('/popular-classes/');
    const [isOpen, setIsOpen] = useState(false);

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
                    <nav className={styles.nav}>
                        <a href="/" className={styles.navLink}>Home</a>
                        <a href="/popular-classes" className={styles.navLink}>Popular Classes</a>
                        <a href="/search" className={styles.navLink}>Search</a>
                        <a href="/profile" className={styles.navLink}>My Profile</a>
                        <button className={styles.logoutButton}>Log Out</button>
                    </nav>
                </div>
            )}
        </>
    );
}