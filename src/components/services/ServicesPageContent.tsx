import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Articles } from "@/components/sections/Articles";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { OrderProcess } from "@/components/sections/OrderProcess";
import { Reviews } from "@/components/sections/Reviews";

import { SecurityAndMore } from "./SecurityAndMore";
import { ServicesGrid } from "./ServicesGrid";

/**
 * Public `/services` hub. The Figma source (file
 * `HnWxsTgaSJq8dqsOviG7Zx`, nodes 837:24410 desktop / 1494:19584 mobile)
 * composes mostly existing marketing sections; only the services grid
 * and the "Security and more" callout are new and live next to this
 * file under `src/components/services/`.
 */
export function ServicesPageContent() {
  return (
    <>
      <Header />
      <main className="bg-dark-main">
        {/* The /services hero is copy-less per the latest comp: only the
            character lineup background renders, and the cards from
            <ServicesGrid> overlap the hero's bottom edge. */}
        <Hero title="" subtitle="" backgroundImage="/images/services/services-hero-bg.png" />
        <ServicesGrid />
        <OrderProcess />
        <Reviews />
        <SecurityAndMore />
        <Highlights />
        <Faq />
        <Articles />
      </main>
      <Footer />
    </>
  );
}
