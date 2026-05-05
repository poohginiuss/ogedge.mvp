import { Articles } from "@/components/sections/Articles";
import { BottomText } from "@/components/sections/BottomText";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { OrderProcess } from "@/components/sections/OrderProcess";
import { Reviews } from "@/components/sections/Reviews";
import { ServicesConfig } from "@/components/sections/ServicesConfig";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export function ValorantPageContent() {
  return (
    <div className="bg-dark-main">
      <Hero />
      <ServicesConfig />
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
