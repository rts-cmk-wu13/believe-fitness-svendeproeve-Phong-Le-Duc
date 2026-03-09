import Image from 'next/image';

export default function FooterLanding() {

    return (
        <footer className='text-center mt-8 pb-12'>
            <figure className="flex justify-center mb-4">
                <Image src="/landrupLogo.png" alt="Logo" width={48} height={48} />
            </figure>
            <h4 className="mb-6">Landrup Dans</h4>
            <div className='my-10'>
                <p className="mt-6">Pulsen 8 . 4000 Roskilde</p>
                <p>Tlf. 3540 4550</p>
            </div>
        </footer>
    )
}