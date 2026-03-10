import { getAllClasses } from "@/lib/dal/classes";
import { getRatingByClassId } from "@/lib/dal/classRating";
import ClassCard from "@/components/class/classCard";
import ClassRandom from "@/components/class/classRandom";
import ClassRating from "@/components/class/classRating";

export default async function Page() {
    const classes = await getAllClasses();

    const classesWithRatings = await Promise.all(
        classes.map(async (classItem) => {
            const ratings = await getRatingByClassId(classItem.id);
            const count = ratings.length;
            const total = ratings.reduce((sum, r) => sum + Number(r.rating || 0), 0);
            const average = count ? total / count : 0;

            return { ...classItem, average, count };
        })
    );

    return (

        <main className="mt-4">
            <ClassRandom classes={classesWithRatings} />
            <h3 className="mt-10 mb-2 wrapper">Classes for you</h3>
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
        </main>
    );
}