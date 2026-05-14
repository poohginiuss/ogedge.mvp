"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { useState } from "react";

import { ReviewList } from "./ReviewList";
import { ReviewStats } from "./ReviewStats";

export function ReviewsPageContent() {
  const [starFilter, setStarFilter] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <PageHero
          title="Customer Reviews"
          subtitle="Thousands of verified reviews from real customers"
          backgroundImage="/images/heroes/reviews-hero.png"
        />
        <ReviewStats
          activeStarFilter={starFilter}
          onStarFilter={(stars) => setStarFilter((prev) => (prev === stars ? null : stars))}
        />
        <ReviewList starFilter={starFilter} />
        <div className="py-10" />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
