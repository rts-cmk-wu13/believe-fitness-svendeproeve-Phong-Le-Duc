import ClassCard from "@/components/class/classCard";
import ClassRating from "@/components/class/classRating";

export default function ClassList({ classesWithRatings }) {
    return (
        <>

            <div className="flex overflow-x-auto gap-4 px-4">
                {classesWithRatings.map((classItem) => (
                    <div key={classItem.id} className="relative min-w-fit">
                        <ClassCard
                            classId={classItem.id}
                            imageUrl={classItem.asset.url}
                            altText={classItem.className}
                        />
                        <div className="absolute w-full bottom-0 left-0 p-4 rounded-4xl rounded-br-none rounded-tl-none z-10"
                            style={{
                                backgroundColor: "var(--background-secondary)"
                            }}>
                            <p className="m-0">{classItem.className}</p>
                            <ClassRating average={classItem.average} count={classItem.count} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}