import Image from "next/image";
import { notFound } from "next/navigation";
import { getSingleClassById } from "@/lib/dal/classes";
import { getRatingByClassId } from "@/lib/dal/classRating";
import { getTrainerById } from "@/lib/dal/trainers";
import ClassRating from "@/components/class/classRating";

export default async function Page({ params }) {
    const { id } = await params;

    const classItem = await getSingleClassById(id);
    if (!classItem) notFound();

    const [ratings, trainer] = await Promise.all([
        getRatingByClassId(id),
        getTrainerById(classItem.trainerId),
    ]);

    const count = ratings.length;
    const total = ratings.reduce((sum, r) => sum + Number(r.rating || 0), 0);
    const average = count ? total / count : 0;

    return (
        <main className=" flex flex-col gap-4">
            <div className="relative">
                <Image
                    src={classItem.asset.url}
                    alt={classItem.className}
                    width={800}
                    height={600}
                    unoptimized
                    className="w-full h-80 object-cover brightness-85"
                />
                <div
                    className="absolute bottom-10 left-4 flex flex-col gap-8"
                    style={{ color: "var(--color-secondary)" }}
                >
                    <p className="heroText">{classItem.className}</p>
                    <ClassRating average={average} count={count} style={{ color: "var(--color-secondary)" }} />
                </div>
            </div>

            <section className="wrapper flex flex-col gap-4">
                <p>{classItem.classDay} - {classItem.classTime}</p>
                <p>{classItem.classDescription}</p>
                <h3 className="mt-4">Trainer</h3>
                {trainer && (
                    <div className="flex items-center gap-3">
                        <Image
                            src={trainer.asset.url}
                            alt={trainer.trainerName}
                            width={50}
                            height={50}
                            unoptimized
                            className="rounded-md w-18 h-18 object-cover"
                        />
                        <p className="font-bold">{trainer.trainerName}</p>
                    </div>
                )}
            </section>
        </main>
    );
}