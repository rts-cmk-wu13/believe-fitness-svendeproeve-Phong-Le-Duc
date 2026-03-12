import { getAllClasses } from "@/lib/dal/classes";
import { getRatingByClassId } from "@/lib/dal/classRating";
import ClassCard from "@/components/class/classCard";
import ClassRandom from "@/components/class/classRandom";
import ClassRating from "@/components/class/classRating";
import ClassList from "@/components/class/classList";

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
            <h2 className="mt-4 mb-2 wrapper">Popular classes</h2>
            <ClassRandom classes={classesWithRatings} />
            <h3 className="mt-8 mb-2 wrapper">Classes for you</h3>
            <ClassList classesWithRatings={classesWithRatings} />
        </main>
    );
}