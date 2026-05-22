import Image from "next/image";

const badges = [
  {
    icon: "/images/support/thunder.svg",
    label: "Avg. response time: 10 min",
    tooltip: "Our average first reply is under 10 minutes — day or night.",
  },
  {
    icon: "/images/support/support-icon.svg",
    label: "24/7 Support Team",
    tooltip: "Our dedicated team is available around the clock to help you with any issue.",
  },
  {
    icon: "/images/support/check-one.svg",
    label: "Satisfaction guarantee",
    tooltip: "Not satisfied? We'll make it right or refund your purchase.",
  },
];

export function SupportHero() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-dark-main py-16 md:py-24 lg:h-[400px] lg:py-0">
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-heading text-[28px] font-black leading-tight tracking-[-0.72px] text-white md:text-[36px]">
            How can we help you?
          </h1>
          <p className="max-w-[568px] font-body text-base font-normal text-white md:text-xl lg:text-2xl">
            Get answers to your questions or get in touch with our support team
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {badges.map((badge) => (
            <div key={badge.label} className="group/badge relative">
              <span
                className="inline-flex cursor-pointer items-center gap-2 rounded-3xl border border-transparent px-4 py-2.5 font-body text-sm font-medium text-white transition-all duration-200 hover:border-brand-light/40 hover:shadow-[0_0_16px_rgba(255,92,0,0.25)]"
                style={{
                  backgroundImage:
                    "linear-gradient(-25deg, rgba(23, 25, 31, 0.5) 0%, rgba(56, 56, 82, 0.5) 100%)",
                }}
              >
                <Image
                  src={badge.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                {badge.label}
              </span>
              <div
                className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-[220px] -translate-x-1/2 rounded-2xl border border-dark-border p-4 opacity-0 transition-opacity duration-200 group-hover/badge:pointer-events-auto group-hover/badge:opacity-100"
                style={{
                  background: "linear-gradient(-43deg, #17191f, #383852)",
                }}
              >
                <p className="font-body text-sm leading-5 text-white/90">
                  {badge.tooltip}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
