import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { Reviews } from "@/components/sections/Reviews";

import { ContactMethods } from "./ContactMethods";
import { RatingCards } from "./RatingCards";
import { WhoWeAre } from "./WhoWeAre";
import { WhyUsGrid } from "./WhyUsGrid";

export function AboutPageContent() {
  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <PageHero title="About Us" backgroundImage="/images/heroes/about-hero.png" />

        <section className="w-full bg-dark-main">
          <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-12 lg:px-0">
            <div className="mb-10 lg:hidden">
              <RatingCards />
            </div>

            <div className="flex gap-[115px]">
              <div className="flex w-full flex-col gap-16 lg:w-[850px]">
                <WhoWeAre />
                <WhyUsGrid />
              </div>

              <aside className="hidden w-[315px] shrink-0 flex-col gap-12 lg:flex">
                <RatingCards />
                <ContactMethods />
              </aside>
            </div>

            <div className="mt-10 lg:hidden">
              <ContactMethods />
            </div>
          </div>
        </section>

        <Faq />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
