import ClassList from "@/components/class/classList";
import { getAllClasses } from "@/lib/dal/classes";
import { getRatingByClassId } from "@/lib/dal/classRating";
import SearchContainer from "@/components/search/SearchContainer";
import TrainerList from "@/components/class/trainer/trainerList";
import { getAllTrainers } from "@/lib/dal/trainers";

export default async function page() {
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

    const trainers = await getAllTrainers();

    return (
        <>
            <SearchContainer />
            <h3 className="mt-4 mb-2 wrapper">Popular classes</h3>
            <ClassList classesWithRatings={classesWithRatings} />
            <TrainerList trainers={trainers} />
        </>
    );
}