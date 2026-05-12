import { Articles } from "@/components/sections/Articles";
import { BottomText } from "@/components/sections/BottomText";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { OrderProcess } from "@/components/sections/OrderProcess";
import { Reviews } from "@/components/sections/Reviews";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

import { CodMwConfigurator } from "./CodMwConfigurator";

export function CodMwPageContent() {
  return (
    <div className="bg-dark-main">
      <Hero
        title="COD: Modern Warfare Boosting"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        backgroundImage="/images/hero-cod-modern-warfare-bg.png"
      />
      <CodMwConfigurator />
      <WhyChooseUs />
      <Reviews />
      <OrderProcess />
      <BottomText />
      <Highlights />
      <Faq />
      <Articles />
    </div>
  );
}
