
import FormContact from "@/components/formContactUs/FormContact";
import Hero from "@/components/hero";
import News from "@/components/news";
import Newsletter from "@/components/newsletter";
import TestimonialCarousel from "@/components/testemonialCarousel";
import { getAllTestimonials } from "@/lib/dal/testimonials";

export default async function Home() {

  const testimonials = await getAllTestimonials();



  return (
    <>
      <Hero />

      <main className="">

        <News />

        <div className="border-t-2 border-black my-4 w-12 mx-auto"></div>

        <Newsletter />

        <TestimonialCarousel testimonials={testimonials} />
        <FormContact />
        <div className="border-t-2 border-black my-4 w-12 mx-auto"></div>

      </main>
    </>
  );
}
