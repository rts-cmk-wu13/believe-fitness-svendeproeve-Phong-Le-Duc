

# Believe Fitness – Dokumentation  
Phong Le Duc

## Bemærk: ændring i backend... 
[user.controller.js]
```js
async function createSingleUser(req, res, next) {
    try {
        let user = await User.create({
            username: req.fields.username,
            // Tilføjet for at acceptere userFirstName, så det kan sættes til samme værdi som username i registeruser.js,
            // så navnet kan vises på profilsiden
            userFirstName: req.fields.userFirstName,
            password: hashSync(req.fields.password, 15),
            role: "default"
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}
```
Feltet role bruges til at bestemme brugertypen. Før blev der brugt navne som "default" og "admin", men nu kan man nemt bruge mere sigende navne som "member" og "trainer".

[src/app/profile/page.jsx.]
```js
<p className="text-sm">
  {user.role === "default" ? "member" : user.role === "admin" ? "instructor" : user.role}
</p>
```


## Tech stack
- **Next.js** – Et moderne React-baseret framework med filbaseret routing, server-side rendering og stærk community support. Valgt for dets fleksibilitet og udbredelse på arbejdsmarkedet.
- **Tailwind CSS** – Utility-first CSS framework, der gør det hurtigt og nemt at style komponenter direkte i markup.
- **Zod** – Valideringsbibliotek til at sikre korrekt datahåndtering i forms og API-kald.







## Eksempel på kode og detaljeret forklaring 
### Visning af brugerens tilmeldte hold
[profile/page.jsx]
```javascript
{user.classes.length === 0 ? (
    <p>Du er ikke tilmeldt nogen hold endnu.</p>
) : (
    <ul>
        {user.classes.map((classItem) => (
            <li key={classItem.id}>
                <p>{classItem.className}</p>
                <p>{classItem.classDay} kl. {classItem.classTime}</p>
                <a href={`/popular-classes/${classItem.id}`}>Se hold</a>
                <SignUpBtn
                    classId={classItem.id}
                    isEnrolled={true}
                    joinedCount={classItem.users?.length || 0}
                    maxParticipants={classItem.maxParticipants}
                >
                    Forlad
                </SignUpBtn>
            </li>
        ))}
    </ul>
)}
```

**Forklaring:**
Dette kodeeksempel viser, hvordan brugerens tilmeldte hold vises dynamisk, og hvordan brugeren kan forlade et hold direkte fra sin profilside. Hvert hold vises med navn, tidspunkt og et link til holdets detaljer. Derudover vises en knap, hvor brugeren kan forlade holdet.

Først tjekkes det, om brugeren er tilmeldt nogen hold. Hvis ikke, vises en besked. Ellers mappes der over brugerens hold, og for hvert hold vises information samt en “Forlad”-knap.
### Knap-komponent til at tilmelde/forlade et hold
[components/buttons/SignUpBtn.jsx]
```javascript
export default function SignUpBtn({ classId, isEnrolled, joinedCount, maxParticipants }) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState(null);
    const [enrolled, setEnrolled] = useState(isEnrolled);
    const router = useRouter();

    const isFull = joinedCount >= maxParticipants;

    const handleSignUp = async () => {
        setError(null);
        startTransition(async () => {
            try {
                await signUpForClass(classId);
                setEnrolled(true);
                router.refresh();
            } catch (err) {
                setError(err.message || "Noget gik galt");
            }
        });
    };
    // ...
}
```

**Forklaring:**
Knap-komponenten `SignUpBtn` modtager data om det aktuelle hold via props. Den bruger React state til at holde styr på, om brugeren er tilmeldt, og om der er en fejl. Når brugeren klikker på knappen, kaldes en funktion, der forsøger at tilmelde brugeren (eller framelde, hvis det implementeres). Hvis det lykkes, opdateres UI'et automatisk. Komponentens fleksibilitet skyldes netop brugen af props, så den kan bruges til alle hold.

## Forklaring

**Hvad er det?**  
Dette kodeeksempel viser, hvordan brugerens tilmeldte hold vises dynamisk, og hvordan brugeren kan forlade et hold direkte fra sin profilside. Hvert hold vises med navn, tidspunkt og et link til holdets detaljer. Derudover vises en knap, hvor brugeren kan forlade holdet.

**Hvordan fungerer det?**  
Først tjekkes det, om brugeren er tilmeldt nogen hold. Hvis ikke, vises en besked. Ellers mappes der over brugerens hold, og for hvert hold vises information samt en “Forlad”-knap. Knap-komponenten (`SignUpBtn`) håndterer logikken for at forlade holdet – den kalder en funktion, der opdaterer backend og UI, så brugeren ikke længere står som tilmeldt.

Der er brugt en ternary operator (betinget operator) til at vælge mellem at vise beskeden eller listen over hold, alt efter om brugeren er tilmeldt nogen hold eller ej.

**Om props:**  
Props (properties) bruges til at sende data fra en forælder-komponent til en child-komponent. I eksemplet får `SignUpBtn` flere props, fx `classId`, `isEnrolled`, `joinedCount` og `maxParticipants`. Det gør knappen fleksibel, fordi den kan genbruges til forskellige hold og altid får de rigtige data med fra det aktuelle hold. Props er grundlæggende for at lave dynamiske og genanvendelige React-komponenter.

**Hvorfor er det smart?**  
Det giver en god brugeroplevelse, fordi brugeren hurtigt kan få overblik over sine hold og nemt kan melde sig fra, hvis planer ændrer sig. Koden er genanvendelig og adskiller visning (UI) fra logik (tilmelding/framelding), hvilket gør det let at vedligeholde og udvide.


## Refleksion
I denne opgave har jeg udviklet en webapplikation til Believe Fitness, hvor brugere kan oprette sig, logge ind, tilmelde og framelde sig hold, samt administrere deres profil. Projektet er bygget med moderne teknologier som Next.js, React og Tailwind CSS, hvilket har givet en fleksibel og skalerbar løsning med et brugervenligt interface.

Undervejs har jeg haft fokus på at lave genanvendelige komponenter, adskille logik og præsentation, og sikre en klar mappestruktur. Jeg har også arbejdet med validering af brugerinput (zod) og håndtering af brugerens session via cookies.

Hvis jeg skulle forbedre projektet yderligere, kunne jeg:
- Implementere mere avanceret validering og feedback til brugeren, fx med stepvis validering i formularer.
- Tilføje flere tests (unit/integration) for at sikre stabilitet ved ændringer.
- Optimere performance, fx ved at bruge lazy loading af billeder og komponenter.
- Gøre designet endnu mere responsivt og tilgængeligt for alle brugere.
- Udvide med flere features, fx notifikationer, venteliste på hold eller integration med eksterne kalendere.

Overordnet set er jeg tilfreds med resultatet, men der er altid mulighed for at bygge videre og gøre løsningen endnu mere robust og brugervenlig.

Jeg er klar over, at der findes mange andre værktøjer og frameworks til at bygge lignende løsninger, men jeg har valgt at fokusere på Next.js og React i dette skoleprojekt. Jeg glæder mig dog til at udforske flere teknologier fremover og udvide min værktøjskasse.

Eksempler på andre værktøjer og frameworks, man kunne bruge til lignende projekter:
- Vue.js (frontend)
- Angular (frontend)
- Firebase (backend/hosting)
- Supabase (backend/hosting)


---

Tak fordi du har læst min dokumentation.  
Lad jobsøgningen begynde!

De bedste hilsner  
Phong Le Duc



