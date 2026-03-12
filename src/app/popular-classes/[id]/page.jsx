import Image from "next/image";
import { notFound } from "next/navigation";
import { getSingleClassById } from "@/lib/dal/classes";
import { getRatingByClassId } from "@/lib/dal/classRating";
import { getTrainerById } from "@/lib/dal/trainers";
import ClassRating from "@/components/class/classRating";
import SignUpBtn from "@/components/buttons/SignUpBtn";
import { getSingleUser } from "@/lib/dal/user";
import { cookies } from "next/headers";

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

    // Determine if user is enrolled in this class
    let isEnrolled = false;
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get("userId")?.value;
        const token = cookieStore.get("token")?.value;
        if (userId && token) {
            const user = await getSingleUser(userId, token);
            isEnrolled = user.classes.some((c) => String(c.id) === String(classItem.id));
        }
    } catch (e) {
        // Not logged in or error, isEnrolled stays false
    }

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

            <section className="wrapper flex flex-col gap-4 mb-6">
                <p>{classItem.classDay} - {classItem.classTime}</p>
                <p>{classItem.classDescription}</p>
                <h3 className="mt-4">Trainer</h3>
                {trainer && (
                    <div className="flex items-center gap-3">
                        <div className="relative w-22 h-22 overflow-hidden rounded-md shrink-0">
                            <Image
                                src={trainer.asset.url}
                                alt={trainer.trainerName}
                                fill
                                unoptimized
                                className="object-cover h-auto w-auto"
                            />
                        </div>
                        <p className="font-bold">{trainer.trainerName}</p>
                    </div>
                )}
            </section>
            <SignUpBtn
                classId={classItem.id}
                isEnrolled={isEnrolled}
                joinedCount={classItem.users?.length || 0}
                maxParticipants={classItem.maxParticipants}
            />
        </main>
    );
}