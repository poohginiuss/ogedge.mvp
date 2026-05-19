"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Faq } from "@/components/sections/Faq";
import { Reviews } from "@/components/sections/Reviews";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

import { ApplyForm } from "./ApplyForm";
import { HowItWorks } from "./HowItWorks";
import { JobsHero } from "./JobsHero";
import { NowHiring } from "./NowHiring";
import { OrderProcess } from "./OrderProcess";

export function JobsPageContent() {
  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <JobsHero />
        <HowItWorks />
        <NowHiring />
        <OrderProcess />
        <WhyChooseUs />
        <Reviews />
        <ApplyForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
