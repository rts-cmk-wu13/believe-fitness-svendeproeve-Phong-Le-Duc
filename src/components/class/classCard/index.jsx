import Image from 'next/image';

export default function ClassCard({ imageUrl, altText }) {
    return (
        <div className="shrink-0 w-60">
            <Image
                src={imageUrl}
                alt={altText}
                unoptimized
                width={500}
                height={400}
                className="w-full h-48 object-cover rounded-4xl rounded-br-none"
            />
        </div>
    );
}