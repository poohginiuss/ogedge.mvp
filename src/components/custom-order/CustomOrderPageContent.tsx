"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/sections/PageHero";

import { CustomOrderForm } from "./CustomOrderForm";
import { CustomOrderInfo } from "./CustomOrderInfo";

export function CustomOrderPageContent() {
  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <PageHero
          title="Custom Order"
          backgroundImage="/images/heroes/reviews-hero.png"
        />
        <section className="w-full bg-dark-main">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-6 py-10 md:px-12 lg:flex-row lg:gap-8 lg:px-0 lg:py-16">
            <div className="flex-1 lg:max-w-[758px]">
              <CustomOrderInfo />
            </div>
            <div className="w-full lg:w-[490px]">
              <CustomOrderForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
