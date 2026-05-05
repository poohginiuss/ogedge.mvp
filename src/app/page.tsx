import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServicesConfig } from "@/components/sections/ServicesConfig";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Reviews } from "@/components/sections/Reviews";
import { OrderProcess } from "@/components/sections/OrderProcess";
import { BottomText } from "@/components/sections/BottomText";
import { Highlights } from "@/components/sections/Highlights";
import { Faq } from "@/components/sections/Faq";
import { Articles } from "@/components/sections/Articles";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesConfig />
        <WhyChooseUs />
        <Reviews />
        <OrderProcess />
        <BottomText />
        <Highlights />
        <Faq />
        <Articles />
      </main>
      <Footer />
    </>
  );
}
