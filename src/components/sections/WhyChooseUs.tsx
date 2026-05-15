import Image from "next/image";

type Feature = {
  icon: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: "/images/icons/why/star-square.svg",
    title: "20 Years of Experience",
    description:
      "Over 20 years of experience, 50k orders and 10k positive reviews, guarantees you that your account is in good hands.",
  },
  {
    icon: "/images/icons/why/support.svg",
    title: "24/7 Support",
    description: "Suspendisse porta purus massa, at pulvinar sem imperdiet in.",
  },
  {
    icon: "/images/icons/why/face-happy.svg",
    title: "Guaranteed Satisfaction",
    description: "Suspendisse porta purus massa, at pulvinar sem imperdiet in.",
  },
  {
    icon: "/images/icons/why/reorder.svg",
    title: "Order Tracking",
    description: "Suspendisse porta purus massa, at pulvinar sem imperdiet in.",
  },
  {
    icon: "/images/icons/why/safety.svg",
    title: "100% Safety",
    description: "Suspendisse porta purus massa, at pulvinar sem imperdiet in.",
  },
  {
    icon: "/images/icons/why/reward-stars.svg",
    title: "Loyalty Rewards",
    description: "Suspendisse porta purus massa, at pulvinar sem imperdiet in.",
  },
];

function FeatureCard({ f }: { f: Feature }) {
  return (
    <div
      className="flex min-h-[104px] flex-col gap-2 rounded-[24px] p-4 lg:min-h-[180px] lg:rounded-[32px] lg:p-8"
      style={{
        border: "1px solid #7e7eb8",
        background: "linear-gradient(-46deg, rgba(23,25,31,0.5) 0%, rgba(56,56,82,0.5) 100%)",
        backdropFilter: "blur(7px)",
      }}
    >
      <div className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={f.icon} alt="" loading="lazy" className="h-5 w-5 lg:h-6 lg:w-6" />
        <h3 className="font-body text-base font-bold leading-5 text-brand-main lg:text-xl lg:leading-6">
          {f.title}
        </h3>
      </div>
      <p className="font-body text-xs leading-[18px] text-white/80 md:text-sm lg:text-base lg:leading-6">
        {f.description}
      </p>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section id="about" className="relative isolate w-full overflow-hidden bg-dark-main">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(40,30,20,0.6) 0%, rgba(23,25,31,0) 70%)",
        }}
      />

      {/* Orange blur orb - desktop right side, mobile top center */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[8%] -z-10 h-[260px] w-[190px] -translate-x-1/2 rounded-full opacity-70 lg:left-auto lg:right-[8%] lg:top-[30%] lg:h-[400px] lg:w-[250px] lg:translate-x-0 lg:opacity-100"
        style={{
          background: "#ff5c00",
          filter: "blur(107px)",
        }}
      />

      {/* Character - desktop: absolute right, mobile: cropped top artwork */}
      <div className="relative mx-auto h-[320px] overflow-hidden lg:hidden">
        <Image
          src="/images/sections/why-choose-character.png"
          alt=""
          width={520}
          height={497}
          unoptimized
          className="absolute bottom-[-74px] left-1/2 h-[400px] w-auto -translate-x-1/2 object-contain"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[115px] w-full"
          style={{
            background:
              "linear-gradient(to top, #17191f 0%, rgba(23,25,31,0.92) 35%, transparent 100%)",
          }}
        />
      </div>

      {/* Desktop character */}
      <Image
        src="/images/sections/why-choose-character.png"
        alt=""
        width={745}
        height={712}
        unoptimized
        className="pointer-events-none absolute -z-10 hidden select-none object-contain lg:right-[-250px] lg:top-[60px] lg:block lg:h-[750px] lg:w-auto"
      />

      {/* Bottom gradient fade for desktop character */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 -z-10 hidden h-[220px] w-[600px] lg:block"
        style={{
          background:
            "linear-gradient(to top,rgb(23, 25, 31) 0%, rgb(23, 25, 31) 20%, rgba(23, 25, 31, 0.84) 60%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] bg-dark-main px-4 pb-10 pt-4 md:px-12 lg:bg-transparent lg:px-20 lg:py-[120px]">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="lg:max-w-[60%]">
            <h2 className="font-heading text-base font-bold text-white md:text-4xl lg:text-5xl">
              Why Choose <span className="text-brand-main">OGEdge</span>
            </h2>
            <p className="mt-4 font-body text-xs leading-[18px] text-white/90 md:text-lg lg:text-xl lg:leading-[30px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed felis vel eros
              eleifend fermentum. Nulla id iaculis dui. Morbi maximus placerat augue, in euismod
              felis facilisis sit amet. Quisque efficitur egestas magna nec posuere.
            </p>
          </div>

          {/* Mobile: single column. Desktop: 3-col grid */}
          <div className="flex flex-col gap-4 lg:hidden">
            {features.map((f) => (
              <FeatureCard key={f.title} f={f} />
            ))}
          </div>
          <div className="hidden gap-6 lg:grid lg:grid-cols-3">
            {features.map((f) => (
              <FeatureCard key={f.title} f={f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
