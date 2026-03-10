import { FaStar } from "react-icons/fa";

export default function ClassRating({ average = 0, count = 0, className = "" }) {
    if (count === 0) {
        return <p className={`text-sm ${className}`}>Not rated yet</p>;
    }

    const starCount = Math.round(average);

    return (
        <div className={`flex items-center gap-1 text-sm ${className}`}>
            {[...Array(starCount)].map((_, i) => (
                <FaStar key={i} />
            ))}
            <span className="ml-1">({count})</span>
        </div>
    );
}