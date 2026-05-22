"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Faq } from "@/components/sections/Faq";
import { Reviews } from "@/components/sections/Reviews";
import { AffiliateHero } from "./AffiliateHero";
import { AffiliateHowItWorks } from "./AffiliateHowItWorks";
import { WhyPartner } from "./WhyPartner";
import { AffiliateApplyForm } from "./AffiliateApplyForm";
import { DashboardPreview } from "./DashboardPreview";

export function AffiliatePageContent() {
  return (
    <>
      <Header />
      <main className="relative bg-dark-main">
        {/* Global glow orbs */}
        <div className="gpu-blur pointer-events-none absolute -right-[100px] top-[1488px] h-[446px] w-[446px] rounded-full bg-brand-main opacity-20 blur-[200px]" />
        <div className="gpu-blur pointer-events-none absolute -left-[375px] top-[1488px] h-[446px] w-[446px] rounded-full bg-brand-main opacity-20 blur-[200px]" />

        <AffiliateHero />
        <AffiliateHowItWorks />
        <WhyPartner />
        <AffiliateApplyForm />
        <DashboardPreview />
        <Reviews />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
