import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Genres from "@/components/home/Genres";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import TopWriters from "@/components/home/TopWriters";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Genres />
      <FeaturedBooks />
      <TopWriters />
      <Testimonials />
      <CTA />
    </>
  );
}