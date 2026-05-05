import { Articles } from "@/components/sections/Articles";
import { Faq } from "@/components/sections/Faq";
import { Highlights } from "@/components/sections/Highlights";
import { Reviews } from "@/components/sections/Reviews";

import { GamesGrid } from "./GamesGrid";
import { HomeHero } from "./HomeHero";
import { HomeSteps } from "./HomeSteps";
import { HomeWhyChoose } from "./HomeWhyChoose";

export function HomePageContent() {
  return (
    <div className="bg-dark-main">
      <HomeHero />
      <GamesGrid />
      <HomeWhyChoose />
      <Reviews />
      <HomeSteps />
      <Highlights />
      <Faq />
      <Articles />
    </div>
  );
}
