"use client";
import { useRouter } from "next/navigation";

export default function ParticipantsBtn({ classId }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/profile/${classId}`);
    };

    return (
        <button
            className="py-2 px-4 text-black rounded-full"
            style={{ backgroundColor: "var(--background-secondary)" }}
            onClick={handleClick}
        >
            Participants
        </button>
    );
}