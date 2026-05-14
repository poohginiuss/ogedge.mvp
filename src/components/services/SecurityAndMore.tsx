import Image from "next/image";

import { securityItems } from "./servicesData";

/**
 * "Security and more" — direct port of Figma node 837:25069.
 *
 * Layout:
 * - Full-bleed background image (shield + binary code on the left half,
 *   dark-red mood elsewhere). On desktop the text content lives on the
 *   right half so the shield reads clearly.
 * - On mobile the shield is hidden via the bg crop and the title +
 *   items stack normally over the dark-red wash, matching the mobile
 *   comp (file `HnWxsTgaSJq8dqsOviG7Zx`, node 1494:19584).
 */
export function SecurityAndMore() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-dark-main">
      <Image
        src="/images/services/services-security-bg.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className="-z-10 object-cover"
        // Pin to the left so the shield artwork sits behind the
        // negative space next to the text on desktop; on mobile this
        // turns into a soft "scenery" backdrop.
        style={{ objectPosition: "left center" }}
      />
      {/* Right-side fade so the icon-text rows always have enough
          contrast against the busy shield artwork. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(23,25,31,0) 35%, rgba(23,25,31,0.6) 60%, rgba(23,25,31,0.9) 100%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-12 lg:px-20 lg:py-[89px]">
        {/* Two-column layout on desktop pushes content into the right
            ~60% to mirror the Figma's x=941 anchor; on mobile we use
            the full width so nothing gets cropped under the shield. */}
        <div className="lg:ml-auto lg:w-[60%] lg:max-w-[716px]">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-[36px] lg:leading-[normal]">
            Security and more
          </h2>

          <ul className="mt-8 flex flex-col gap-6 lg:mt-12 lg:gap-8">
            {securityItems.map((item) => (
              <li key={item.title} className="flex items-center gap-6 lg:gap-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.icon}
                  alt=""
                  className="h-10 w-10 shrink-0 lg:h-[50px] lg:w-[50px]"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="font-body text-base font-bold leading-7 text-brand-light lg:text-lg lg:leading-7">
                    {item.title}
                  </p>
                  <p className="font-body text-sm leading-6 text-white lg:text-lg lg:leading-7">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
