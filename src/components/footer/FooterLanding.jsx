import Image from 'next/image';

export default function FooterLanding() {

    return (
        <footer className="text-center mt-4 pb-12">
            <p className="heroText" style={{ color: "var(--color-secondary)" }}>Believe Fitness</p>
            <p className="font-bold my-4">Train like a pro</p>
            <p>Rabalderstræde 48 ‧ 4000 Roskilde</p>
            <p>hello@believe-fitness.com</p>

        </footer>
    )
}