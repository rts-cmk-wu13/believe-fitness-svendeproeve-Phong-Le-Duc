"use server"
import { z } from "zod"
import { cookies } from "next/headers"
import { login } from "@/lib/dal/login"

const loginSchema = z.object({
    username: z.string().min(1, "Indtast et brugernavn."),
    password: z.string().min(4, "Password skal være mindst 4 karakterer.")
})

export async function loginUser(prevState, formData) {
    const cookieStore = await cookies()
    const username = formData.get("username")
    const password = formData.get("password")



    const result = loginSchema.safeParse({ username, password })

    if (!result.success) {
        return {
            values: { username, password },
            errors: z.flattenError(result.error).fieldErrors
        }
    }

    const response = await login(username, password)
    console.log("API response data:", response.data)

    if (!response.success) {
        return {
            values: { username, password },
            errors: { form: [response.message] }
        }
    }

    cookieStore.set("token", response.data.token)
    cookieStore.set("username", username)
    cookieStore.set("role", response.data.role)
    cookieStore.set("userId", String(response.data.userId))

    return {
        success: true,
        user: response.data,
        token: response.data.token,
        values: { username, password }
    }
}