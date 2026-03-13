import { cookies } from "next/headers";
import Link from "next/link";
import FormCreateClass from "@/components/formCreateClass/FormCreateClass";
import { getSingleUser } from "@/lib/dal/user";

export default async function Page() {

    const cookieStore = await cookies();
    const role = cookieStore.get("role")?.value;
    const userId = cookieStore.get("userId")?.value;
    const user = await getSingleUser()

    return (role !== "admin") ? (
        <main className="p-4">
            <p>You do not have permission to access this page.</p>
            <Link href="/profile" className="text-blue-500 underline">Go back to profile</Link>
        </main>
    ) : (

        <div className="wrapper">
            <h2>Create a new class</h2>
            <FormCreateClass userId={userId} trainerName={user?.trainerName} />
        </div>
    )
}