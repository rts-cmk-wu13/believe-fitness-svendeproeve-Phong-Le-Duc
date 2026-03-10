import { FaStar } from "react-icons/fa";

export default function ClassRating({ average = 0, count = 0 }) {
    if (count === 0) {
        return <p className="text-sm text-gray-500">Not rated yet</p>;
    }

    const starCount = Math.round(average);

    return (
        <div className="flex items-center gap-1 text-sm text-gray-700">
            {[...Array(starCount)].map((_, i) => (
                <FaStar key={i} />
            ))}
            <span className="ml-1">({count})</span>
        </div>
    );
}