"use server";

export async function getSingleUser(userId, token) {
    if (!userId) throw new Error("Missing userId");
    if (!token) throw new Error("Missing token");

    const res = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Status ${res.status}: ${body}`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        const data = await res.json();
        console.log("❤️getSingleUser data:", data); // temp debug
        return data;
    }

    throw new Error("Not JSON");
}

