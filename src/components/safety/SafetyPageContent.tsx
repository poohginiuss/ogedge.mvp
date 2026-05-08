import { RatingCards } from "@/components/about/RatingCards";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";

import { PlayerReviews } from "./PlayerReviews";

const bulletItems = [
  "Etiam imperdiet tortor metus, in auctor odio blandit ut.",
  "Nunc et consequat ipsum, quis rutrum erat. Nunc id est ac ligula lobortis porta.",
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
  "Nunc consequat ante in risus sagittis placerat.",
];

export function SafetyPageContent() {
  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <PageHero title="Safety" backgroundImage="/images/heroes/safety-hero.png" />

        <section className="w-full bg-dark-main">
          <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-12 lg:px-0">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-[115px]">
              <div className="flex w-full flex-col gap-8 lg:w-[850px]">
                {/* General Information */}
                <div className="flex flex-col gap-6">
                  <h2 className="font-body text-2xl font-medium leading-8 text-white">
                    General Information
                  </h2>
                  <div className="flex flex-col gap-6 font-body text-base leading-6 text-white">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante ex,
                      aliquam vitae diam at, maximus ultrices lorem. Fusce quis vehicula dolor. Cras
                      non maximus leo. Vivamus augue justo, gravida sit amet pellentesque malesuada,
                      fermentum et turpis. Sed nec porta sem, quis fermentum lectus. Proin non
                      rhoncus orci, non consequat ante. Duis tortor odio, euismod eget libero sed,
                      rutrum finibus mi.
                    </p>
                    <p>
                      Etiam lacinia interdum nibh, nec feugiat turpis. Integer non libero
                      scelerisque, mattis libero in, convallis risus. Mauris quis orci varius,
                      ultrices nunc eu, cursus lectus. Praesent nec imperdiet felis, quis mattis
                      nisi. Aliquam imperdiet sapien sed elit sagittis, in aliquet erat pretium.
                      Donec sollicitudin nibh sed leo egestas fermentum. Class aptent taciti
                      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    </p>
                  </div>
                </div>

                {/* Order Process Safety */}
                <div className="flex flex-col gap-6">
                  <h2 className="font-body text-2xl font-medium leading-8 text-white">
                    Order Process Safety
                  </h2>
                  <p className="font-body text-base leading-6 text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante ex, aliquam
                    vitae diam at, maximus ultrices lorem. Fusce quis vehicula dolor. Cras non
                    maximus leo. Vivamus augue justo, gravida sit amet pellentesque malesuada,
                    fermentum et turpis. Sed nec porta sem, quis fermentum lectus. Proin non rhoncus
                    orci, non consequat ante. Duis tortor odio, euismod eget libero sed, rutrum
                    finibus mi.
                  </p>
                  <div
                    className="flex flex-col gap-1 rounded-2xl px-6 py-4"
                    style={{ background: "rgba(56,56,82,0.3)" }}
                  >
                    {bulletItems.map((text) => (
                      <div key={text} className="flex items-center gap-4">
                        <span
                          className="h-[9px] w-[9px] shrink-0 rounded-full"
                          style={{ background: "#fa4609" }}
                        />
                        <p className="min-w-0 flex-1 font-body text-base leading-6 text-white">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payments Safety */}
                <div className="flex flex-col gap-6">
                  <h2 className="font-body text-2xl font-medium leading-8 text-white">
                    Payments Safety
                  </h2>
                  <div className="flex flex-col gap-6 font-body text-base leading-6 text-white">
                    <p>
                      Suspendisse porta purus massa, at pulvinar sem imperdiet in. Ut nec est vitae
                      nunc commodo posuere ut elementum odio. Suspendisse dapibus mi metus, eget
                      porta purus vehicula a. Etiam commodo, quam nec volutpat scelerisque, nibh
                      nisi mollis nibh, non imperdiet sem nisi at elit. Suspendisse eu molestie
                      neque, id ultrices diam. Donec a lorem at orci tempor mollis vel eget diam.
                    </p>
                    <p>
                      Nulla sit amet ante diam. In sagittis diam quis posuere lacinia. Mauris
                      gravida, risus sed euismod consectetur, nibh eros lacinia nulla, sit amet
                      mattis quam est non risus. Suspendisse potenti. Nam in ante vitae purus luctus
                      blandit id eget nulla. Donec venenatis magna dui, ut suscipit tortor commodo
                      id. Aliquam lacinia mauris at orci pellentesque euismod.
                    </p>
                  </div>
                </div>

                {/* Problems & Refunds */}
                <div className="flex flex-col gap-6">
                  <h2 className="font-body text-2xl font-medium leading-8 text-white">
                    Problems &amp; Refunds
                  </h2>
                  <p className="font-body text-base leading-6 text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante ex, aliquam
                    vitae diam at, maximus ultrices lorem. Fusce quis vehicula dolor. Cras non
                    maximus leo. Vivamus augue justo, gravida sit amet pellentesque malesuada,
                    fermentum et turpis. Sed nec porta sem, quis fermentum lectus. Proin non rhoncus
                    orci, non consequat ante. Duis tortor odio, euismod eget libero sed, rutrum
                    finibus mi.
                  </p>
                </div>
              </div>

              <aside className="flex w-full shrink-0 flex-col gap-12 lg:w-[315px]">
                <RatingCards />
                <PlayerReviews />
              </aside>
            </div>
          </div>
        </section>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
