"use server";

import { addUserToClass, deleteUserFromClass } from "@/lib/dal/user";
import { cookies } from "next/headers";


export async function signUpForClass(classId) {
    console.log('signUpForClass called with classId:', classId);
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    const token = cookieStore.get("token")?.value;

    if (!userId || !token) {
        throw new Error("Not authenticated");
    }
    return addUserToClass(userId, classId, token);
}


export async function leaveClass(classId) {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    const token = cookieStore.get("token")?.value;
    if (!userId || !token) {
        throw new Error("Not authenticated");
    }
    return deleteUserFromClass(userId, classId, token);
}
