# Landrup Dans – Dokumentation  
Phong Le Duc

## Tech stack

- **Next.js** – Et moderne React-baseret framework med filbaseret routing, server-side rendering og stærk community support. Valgt for dets fleksibilitet og udbredelse på arbejdsmarkedet.
- **Tailwind CSS** – Utility-first CSS framework, der gør det hurtigt og nemt at style komponenter direkte i markup.
- **Zod** – Valideringsbibliotek til at sikre korrekt datahåndtering i forms og API-kald.
- **Eget REST API** – Node.js/Express backend med endpoints til aktiviteter, brugere og tilmeldinger.

## Struktur og konventioner

Projektet er opbygget med fokus på genbrugelige komponenter, klar mappestruktur og navngivningskonventioner, der gør det let at finde rundt og udvide projektet.  
Komponenter og logik er adskilt, så UI og datahåndtering ikke blandes unødigt.

## Eksempel på kode og detaljeret forklaring

[AuthContext.jsx](./src/context/AuthContext.jsx)
```javascript

"use client";

import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authData, setAuthData] = useState(null);

    return (
        <AuthContext.Provider value={{ authData, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
}
```

## forklaring
Koden ovenfor viser, hvordan jeg bruger Reacts Context API til at håndtere global state for brugerens login-information (auth data) i mit projekt.

**Hvad er det?**  
`AuthContext` er en global kontekst, der gør det muligt for alle komponenter i applikationen at tilgå og opdatere information om den aktuelle bruger (fx om brugeren er logget ind, og hvem brugeren er). Dette gøres uden at skulle sende data manuelt gennem props fra komponent til komponent.

**Hvordan fungerer det?**  
- Først oprettes en kontekst med `createContext(null)`.  
- `AuthProvider` er en komponent, der bruger Reacts `useState` til at holde styr på auth-data (`authData`) og en funktion til at opdatere denne (`setAuthData`).
- `AuthProvider` returnerer en `AuthContext.Provider`, hvor værdien (`value`) er et objekt med både `authData` og `setAuthData`.  
- Alle komponenter, der ligger indenfor denne provider (typisk hele appen), kan nu tilgå og opdatere auth-data ved at bruge Reacts `useContext(AuthContext)` hook.

**Hvorfor er det smart?**  
- Det gør det nemt at holde styr på, om en bruger er logget ind, og hvem brugeren er, på tværs af hele applikationen.
- Man undgår at skulle sende brugerdata gennem mange lag af props.
- Det gør det let at opdatere login-status ét sted og automatisk få det opdateret i alle relevante komponenter.

**Eksempel på brug:**  
Hvis en komponent skal vise brugerens navn eller logge brugeren ud, kan det typisk gøre det sådan her:

```javascript
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Profil() {
    const { authData, setAuthData } = useContext(AuthContext);

    if (!authData) return <p>Du er ikke logget ind.</p>;

    return (
        <div>
            <p>Velkommen, {authData.username}!</p>
            <button onClick={() => setAuthData(null)}>Log ud</button>
        </div>
    );
}
```
## Forklaring fortsat

Her ser vi, hvordan man bruger `AuthContext` til at tilgå og vise information om den aktuelle bruger samt give mulighed for at logge ud.

- Først importeres `useContext`-hooken samt selve `AuthContext` fra projektets context-mappe.
- Inde i komponenten hentes både `authData` og `setAuthData` fra context ved hjælp af `useContext(AuthContext)`.
- Hvis der ikke er nogen bruger logget ind (`!authData`), vises en besked om, at brugeren ikke er logget ind.
- Hvis brugeren er logget ind, vises en velkomstbesked med brugerens brugernavn (`authData.username`).
- Der vises også en "Log ud"-knap, som ved klik sætter `authData` til `null` via `setAuthData(null)`, hvilket logger brugeren ud i hele applikationen.
- Dette eksempel viser, hvordan Context API gør det nemt at tilgå og opdatere global state (her login-status) på tværs af hele applikationen, uden at skulle sende data gennem props. Det giver en mere overskuelig og vedligeholdelsesvenlig kodebase.

## Perspektivering

Dette projekt demonstrerer en moderne tilgang til webudvikling med Next.js og React, hvor fokus har været på struktur, genbrugelighed og skalerbarhed.

Kode-struktur og konventioner:
Projektet er organiseret i klare mapper for komponenter, kontekst, data-adgang (DAL) og skemaer. Det gør det let at navigere og udvide koden. Navngivning følger gennemgående konventioner, hvilket øger læsbarheden og gør det nemt for andre udviklere at bidrage.

Genbrugelige komponenter og funktioner:
Komponenter som InstructorCalenderClient, ActivityMembers og forms er bygget op, så de kan genbruges og tilpasses. Datahåndtering er adskilt fra UI, fx via DAL-funktioner som getAllActivities og createActivity, hvilket giver en fleksibel og testbar kodebase.

Global state management:
Med brugen af AuthContext håndteres login-status og brugerdata centralt, så alle dele af appen nemt kan reagere på ændringer. Det gør det let at bygge videre på fx adgangskontrol eller personaliserede features.

Validering og brugerfeedback:
Zod bruges til at validere input både på klienten og før data sendes til backend. Det sikrer høj datakvalitet og giver brugeren tydelig feedback, hvis noget mangler eller er forkert.

Klar til produktion:
Appen er bygget med tanke på deployment, hvor Next.js’ server-side rendering og API-integration gør det nemt at skalere og tilpasse til forskellige miljøer. Brug af Tailwind CSS sikrer et ensartet og responsivt design uden tung CSS.

Udvidelsesmuligheder:
Strukturen gør det nemt at tilføje nye features, fx flere brugerroller, flere aktiviteter eller integration til eksterne systemer. Komponentbaseret opbygning og central state management gør vedligeholdelse og videreudvikling effektiv.

Samlet set viser projektet, hvordan moderne webteknologier og gode kodeprincipper kan kombineres til at skabe en robust, brugervenlig og fremtidssikret platform.