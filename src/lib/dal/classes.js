"use server";
import { cookies } from "next/headers";


export async function getAllClasses() {
    try {
        const res = await fetch("http://localhost:4000/api/v1/classes");
        if (!res.ok) {
            throw new Error("Something went wrong");
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            console.log("getAllClasses data:", data);
            return data;
        }

        throw new Error("Not JSON");
    } catch (error) {
        console.log("getAllClasses error:", error);
        return [];
    }
}

export async function getSingleClassById(id) {
    try {
        const res = await fetch(`http://localhost:4000/api/v1/classes/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch class ${id} (${res.status})`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Not JSON");
        }

        return await res.json();
    } catch (error) {
        console.log("getClassById error:", error);
        return null;
    }
}


export async function createClass(prevState, formData) {

    const cookieStore = await cookies();
    const token = cookieStore.get("token").value;

    console.log("createClass called");
    console.log(Object.fromEntries(formData));



    const assetResponse = await fetch("http://localhost:4000/api/v1/assets", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData
    });
    const assetData = await assetResponse.json();

    if (!assetResponse.ok || !assetData.id) {
        console.error("Failed to create asset:", assetData);
        throw new Error("Failed to create asset");
    }


    const classFormData = new FormData();
    for (const [key, value] of formData.entries()) {
        if (key !== "file") {
            classFormData.append(key, value);
        }
    }
    classFormData.append("assetId", assetData.id);


    const res = await fetch("http://localhost:4000/api/v1/classes", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: classFormData
    });
}
