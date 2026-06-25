import Categories from "@/components/home/Categories";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import Hero from "@/components/home/Hero";
import TopWriters from "@/components/home/TopWriters";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedBooks />
      <TopWriters />
      <Categories />
      <CTA />
    </>
  );
}