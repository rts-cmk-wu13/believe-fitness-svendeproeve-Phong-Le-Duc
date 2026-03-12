import Link from "next/link";

export default function CreateClassBtn() {
    return (
        <Link
            href="/create-class"
            className="py-2 px-4 text-black rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--background-secondary)" }}
        >
            <span>ADD CLASS</span>
        </Link>
    );
}