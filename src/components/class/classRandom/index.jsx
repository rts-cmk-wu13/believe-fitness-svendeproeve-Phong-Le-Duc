import Image from "next/image";
import ClassRating from "@/components/class/classRating";

export default function ClassRandom({ classes = [] }) {
    if (!classes.length) return null;

    // Pick one random class
    const randomClass = classes[Math.floor(Math.random() * classes.length)];

    return (
        <figure className="wrapper relative">
            <Image
                src={randomClass.asset.url}
                alt={randomClass.className}
                width={800}
                height={600}
                unoptimized
                className="w-full h-auto object-cover rounded-4xl"
            />
            <div className="absolute bottom-0 left-0 p-4  rounded-4xl rounded-br-none rounded-tl-none z-10"
                style={{
                    backgroundColor: "var(--background-secondary)"
                }} >
                <figcaption>{randomClass.className}</figcaption>
                <ClassRating average={randomClass.average} count={randomClass.count} />
            </div>
        </figure>
    );
}


