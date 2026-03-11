

//husk lib mappen skal være under src mappen!
import { z } from "zod";




export const emailSchema = z.object({
    email: z.email("Invalid email address.")
});



export const contactSchema = z.object({
    name: z.string().min(2, "Navn skal være mindst 2 tegn langt"),
    email: z.email("Ugyldig email adresse").min(1),
    subject: z.string().min(5, "Emne skal være mindst 5 tegn langt").optional(),
    message: z.string().min(10, "Besked skal være mindst 10 tegn langt"),

});




export const registerSchema = z.object({
    firstname: z.string().min(2, "Fornavn skal være mindst 2 tegn langt"),
    email: z.string().email("Ugyldig email adresse"),
    password: z.string().min(4, "Adgangskode skal være mindst 4 tegn langt"),
    confirmPassword: z.string(),
}).refine(
    (data) => data.confirmPassword.length >= 4 && data.password === data.confirmPassword,
    {
        path: ["confirmPassword"],
        message: "Password does not match...",
    }
);


export const createActivitySchema = z.object({
    name: z.string().min(2, "Navn skal være mindst 2 tegn langt"),
    description: z.string().min(10, "Beskrivelse skal være mindst 10 tegn langt"),
    weekday: z.enum(["mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag", "søndag"], "Vælg en gyldig ugedag"),
    time: z.string().min(1, "Tidspunkt er påkrævet"),
    minAge: z.coerce.number().min(1, "Minimumsalder skal være mindst 1 år"),
    maxAge: z.coerce.number().min(1, "Maximumsalder skal være mindst 1 år"),
    instructor: z.string().min(2, "Instruktørnavn skal være mindst 2 tegn langt"),
    maxParticipants: z.coerce.number().min(1, "Max antal deltagere skal være mindst 1"),
});