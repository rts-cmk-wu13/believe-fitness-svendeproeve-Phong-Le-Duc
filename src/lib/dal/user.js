"use server";


export async function getSingleUser(userId, token) {
    // Fallback to cookies if parameters are not provided
    if (!userId || !token) {
        const cookieStore = await cookies();
        if (!userId) userId = cookieStore.get("userId")?.value;
        if (!token) token = cookieStore.get("token")?.value;
    }
    if (!userId) throw new Error("Missing userId");
    if (!token) throw new Error("Missing token");

    const res = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Status ${res.status}: ${body}`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        const data = await res.json();
        console.log("❤️getSingleUser data:", data);
        // Log the shape of each class
        if (Array.isArray(data.classes)) {
            data.classes.forEach((classObj, idx) => {
                console.log(`Class #${idx}:`, classObj);
            });
        }
        return data;
    }

    throw new Error("Not JSON");
}



export async function addUserToClass(userId, classId, token) {
    if (!userId) throw new Error("Missing userId");
    if (!classId) throw new Error("Missing classId");
    if (!token) throw new Error("Missing token");

    const res = await fetch(
        `http://localhost:4000/api/v1/users/${userId}/classes/${classId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
}


export async function deleteUserFromClass(userId, classId, token) {
    if (!userId) throw new Error("Missing userId");
    if (!classId) throw new Error("Missing classId");
    if (!token) throw new Error("Missing token");

    const res = await fetch(
        `http://localhost:4000/api/v1/users/${userId}/classes/${classId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return {};
}