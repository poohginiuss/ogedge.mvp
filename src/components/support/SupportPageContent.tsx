"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Faq } from "@/components/sections/Faq";

import { CommunitySection } from "./CommunitySection";
import { SupportCards } from "./SupportCards";
import { SupportHero } from "./SupportHero";

export function SupportPageContent() {
  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <SupportHero />
        <SupportCards />
        <CommunitySection />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
