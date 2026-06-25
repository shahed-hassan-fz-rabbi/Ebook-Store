import BrowseHero from "@/components/browse/BrowseHero";
import SearchBar from "@/components/browse/SearchBar";
import GenreChips from "@/components/browse/GenreChips";
import SortDropdown from "@/components/browse/SortDropdown";
import FeaturedBooks from "@/components/home/FeaturedBooks";

export default function BrowsePage() {
  return (
    <>
      <BrowseHero />

      <section className="section-padding">
        <div className="container">

          <SearchBar />

          <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <GenreChips />

            <SortDropdown />

          </div>

          <div className="mt-12">
            <FeaturedBooks />
          </div>

        </div>
      </section>
    </>
  );
}