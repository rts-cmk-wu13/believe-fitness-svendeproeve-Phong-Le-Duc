"use client";
import React, { useState } from "react";
import SplashScreen from "@/components/splashScreen";
import Hero from "@/components/hero";
import News from "@/components/news";
import Newsletter from "@/components/newsletter";
import TestimonialCarousel from "@/components/testemonialCarousel";
import FormContact from "@/components/formContactUs/FormContact";
import FooterLanding from "@/components/footer/FooterLanding";

export default function HomeClient({ testimonials }) {
    const [splashDone, setSplashDone] = useState(false);

    if (!splashDone) {
        return <SplashScreen onFinish={() => setSplashDone(true)} />;
    }

    return (
        <>
            <Hero />
            <main>
                <News />
                <div className="border-t-2 border-black my-4 w-12 mx-auto"></div>
                <Newsletter />
                <TestimonialCarousel testimonials={testimonials} />
                <FormContact />
                <div className="border-t-2 border-black my-4 w-12 mx-auto"></div>
                <FooterLanding />
            </main>
        </>
    );
}