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

// create, update, delete class virker ikke endnu så er ikke implementeret i opgaven.

// export async function createClass(prevState, formData) {

//     const cookieStore = await cookies();
//     const token = cookieStore.get("token").value;

//     console.log("createClass called");
//     const formEntries = Object.fromEntries(formData);
//     console.log("FormData entries:", formEntries);

   
//     const requiredFields = [
//         "className",
//         "classDescription",
//         "classDay",
//         "classTime",
//         "maxParticipants",
//         "trainerId"
//     ];
//     const missingFields = requiredFields.filter((field) => !formEntries[field]);
//     if (missingFields.length > 0) {
//         const msg = `Følgende felter mangler: ${missingFields.join(", ")}`;
//         console.error(msg);
//         return { ok: false, error: msg };
//     }

    
//     const assetResponse = await fetch("http://localhost:4000/api/v1/assets", {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         body: formData
//     });
//     const assetData = await assetResponse.json();

//     if (!assetResponse.ok || !assetData.id) {
//         console.error("Failed to create asset:", assetData);
//         return { ok: false, error: "Failed to create asset", details: assetData };
//     }

    
//     const classFormData = new FormData();
//     for (const [key, value] of formData.entries()) {
//         if (key !== "file") {
//             classFormData.append(key, value);
//         }
//     }
//     classFormData.append("assetId", assetData.id);

  
//     const classFormEntries = {};
//     for (const [key, value] of classFormData.entries()) {
//         classFormEntries[key] = value;
//     }
//     console.log("classFormData to be sent:", classFormEntries);

  
//     const res = await fetch("http://localhost:4000/api/v1/classes", {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         body: classFormData
//     });

//     let resData;
//     let rawText;
//     try {
//         rawText = await res.text();
//         try {
//             resData = JSON.parse(rawText);
//         } catch (e) {
           
//             console.error("[createClass] No JSON response", {
//                 status: res.status,
//                 statusText: res.statusText,
//                 rawText
//             });
//             resData = { error: "No JSON response", status: res.status, statusText: res.statusText, rawText };
//         }
//     } catch (e) {
     
//         console.error("[createClass] Response body could not be read", {
//             status: res.status,
//             statusText: res.statusText,
//             error: e
//         });
//         resData = { error: "Response body could not be read", status: res.status, statusText: res.statusText };
//     }

//     if (!res.ok) {
//         console.error("Failed to create class:", resData);
//         return { ok: false, error: "Failed to create class", details: resData };
//     }

//     console.log("Class created successfully:", resData);
//     return { ok: true, data: resData };
// }
