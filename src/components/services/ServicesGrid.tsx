import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

import {
  SERVICE_BADGE_STYLES,
  type ServiceCard,
  type ServiceCardBadgeType,
  services,
} from "./servicesData";

function ServiceBadge({ type, label }: { type: ServiceCardBadgeType; label: string }) {
  const style = SERVICE_BADGE_STYLES[type];
  return (
    <span
      className="inline-flex w-fit max-w-full items-center gap-1 self-start rounded-lg px-2 py-1.5"
      style={{ background: style.background }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={style.icon} alt="" className="h-4 w-4 shrink-0" />
      <span
        className="whitespace-nowrap font-body text-xs font-medium leading-[18px]"
        style={{ color: style.color }}
      >
        {label}
      </span>
    </span>
  );
}

function ServiceCardItem({ card }: { card: ServiceCard }) {
  return (
    <Link
      href={card.href}
      className="group relative flex h-[307px] flex-col gap-2 overflow-hidden rounded-3xl border border-transparent p-6 transition-all duration-200 hover:border-[#ff975d] hover:shadow-[0_0_24px_0_rgba(255,92,0,0.4)]"
      style={{
        background: "rgba(35,35,48,0.5)",
        backdropFilter: "blur(5px)",
      }}
    >
      {/* Decorative warm-glow blob anchored to the lower-right corner.
          Three stacked radial stops give the red→orange→yellow sunset
          look the latest comp specifies — `closest-side` keeps the
          gradient compact so it reads as a glow under the emblem, not
          as a wash over the whole card. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-10 h-[200px] w-[200px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,196,76,0.6) 0%, rgba(255, 122, 40, 0.47) 40%, rgba(250,70,9,0.15) 65%, rgba(163,45,5,0) 90%)",
        }}
      />

      {/* Arrow circle button revealed on hover — the Figma comp shows it
          baked-in on the "Updated Rank Boost" card to demo the hover
          state; here we use real CSS hover so every card lights up. */}
      <span
        aria-hidden
        className="absolute right-5 top-5 z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-[#ffa384] bg-black/10 backdrop-blur-[3px] shadow-[0_0_18px_0_rgba(250,70,9,0.45)] group-hover:flex"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/services/icon-arrow.svg" alt="" className="h-7 w-[16px]" />
      </span>

      {/* Badge: absolutely pinned to the top-right corner on mobile (so
          it sits beside the title on the same row, per the latest
          mobile comp) and falls back to its natural top-of-flow slot on
          tablet/desktop where the comp keeps it stacked above the
          title. */}
      {card.badge && (
        <div className="absolute right-5 top-5 z-10 md:static md:right-auto md:top-auto md:self-start">
          <ServiceBadge type={card.badge.type} label={card.badge.label} />
        </div>
      )}

      <div className="relative z-[1] flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-4">
          {/* `pr-36` reserves room for the absolutely-positioned badge
              on mobile; reset to `pr-0` from md+ where the badge is
              back in the flex flow above the title. */}
          <h3 className="pr-36 font-heading text-2xl font-bold leading-8 text-white md:pr-0">
            {card.title}
          </h3>
          {/* Bullets are clipped to the left half of the card so the
              emblem in the bottom-right has space to breathe — mirrors
              the Figma's 220px text column inside the 268px card. */}
          <ul className="flex flex-col gap-2 pr-10">
            {card.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/services/icon-arrow.svg"
                  alt=""
                  className="h-3 w-[6px] shrink-0"
                />
                <span className="font-body text-sm leading-5 text-white">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <span className="font-body text-xs leading-[18px] text-white">Starting from</span>
          <span className="font-heading text-lg font-bold leading-7 text-brand-main">
            {card.startingPrice}
          </span>
        </div>
      </div>

      {/* Emblem image — anchored bottom-right; the eagle emblem is
          wider (162px) so we let its intrinsic width drive layout while
          the radiant gold / bronze hex stay at 112px. The drop-shadow
          gives the warm glow seen on each card in the Figma. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-3 bottom-3 z-0 flex items-end"
        style={{ filter: "drop-shadow(0 4px 24px rgba(255,176,0,0.4))" }}
      >
        <Image
          src={card.image}
          alt=""
          width={card.imageWidth}
          height={card.imageHeight}
          unoptimized
          className="block h-auto w-auto"
          style={{ maxHeight: 110 }}
        />
      </div>
    </Link>
  );
}

function CustomOfferBanner() {
  return (
    <div
      className="relative isolate flex w-full flex-col gap-4 overflow-hidden rounded-3xl px-6 py-6 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8 lg:py-6"
      style={{
        background: "rgba(56,56,82,0.3)",
        border: "2px solid rgba(163,45,5,0.4)",
      }}
    >
      {/* Soft orange ellipse glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[50%] top-1/2 h-[333px] w-[333px] -translate-y-1/3 rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(255,92,0,0.55) 0%, rgba(255,92,0,0) 70%)",
        }}
      />

      {/* Character image — hidden on mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute hidden lg:block lg:bottom-auto lg:right-[160px] lg:top-6 lg:h-[350px] lg:w-[350px] xl:right-[300px]"
        style={{
          backgroundImage: "url('/images/services/services-custom-offer-character.png')",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div className="relative z-[1] flex flex-col gap-1 lg:max-w-[520px]">
        <h3 className="font-heading text-xl font-bold leading-7 text-white md:text-2xl md:leading-8">
          Create Your Custom Offer
        </h3>
        <p className="font-body text-sm leading-5 text-white/90 md:text-base md:leading-6">
          Explain what you&rsquo;re looking for, and we&rsquo;ll create a custom solution with the
          best price, fast ETA, and PRO-level support.
        </p>
      </div>

      <div className="relative z-[1] flex flex-col items-stretch gap-2 lg:items-center">
        <Button href="#contact" variant="primary" size="lg" className="w-full lg:w-auto">
          Request custom offer
        </Button>
        <p className="text-center font-body text-sm leading-5 text-white">
          <span className="font-bold">2 minutes</span> average time to reply
        </p>
      </div>
    </div>
  );
}

export function ServicesGrid() {
  return (
    /* Section background is transparent and the whole block is shifted
       up with a negative top margin so the first row of cards visually
       overlays the hero image (Figma `2nd SCREEN` overlap of ~150px).
       The bottom keeps a dark backdrop so the next section reads
       cleanly. */
    <section className="relative -mt-72 w-full md:-mt-96 lg:-mt-[420px]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[320px] -z-10 bg-dark-main md:top-[340px] lg:top-[380px]" />
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-16 md:px-12 lg:px-20 lg:pb-[120px]">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {services.map((card) => (
              <ServiceCardItem key={card.id} card={card} />
            ))}
          </div>

          <CustomOfferBanner />
        </div>
      </div>
    </section>
  );
}
