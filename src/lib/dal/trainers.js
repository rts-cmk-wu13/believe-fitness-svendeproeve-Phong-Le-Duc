"use server";

export async function getAllTrainers() {
    try {
        const res = await fetch("http://localhost:4000/api/v1/trainers");
        if (!res.ok) throw new Error("Something went wrong");

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await res.json();
        }

        throw new Error("Not JSON");
    } catch (error) {
        console.log("getAllTrainers error:", error);
        return [];
    }
}

export async function getTrainerById(id) {
    const res = await fetch(`http://localhost:4000/api/v1/trainers/${id}`);
    if (!res.ok) throw new Error("Something went wrong");
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await res.json();
    }
    throw new Error("Not JSON");
}