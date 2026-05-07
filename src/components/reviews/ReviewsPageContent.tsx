import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";

import { ReviewList } from "./ReviewList";
import { ReviewStats } from "./ReviewStats";

export function ReviewsPageContent() {
  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <PageHero
          title="Customer Reviews"
          subtitle="Thousands of verified reviews from real customers"
          backgroundImage="/images/heroes/reviews-hero.png"
        />
        <ReviewStats />
        <ReviewList />
        <div className="py-10" />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
