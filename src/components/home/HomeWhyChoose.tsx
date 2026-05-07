import Image from "next/image";

type Feature = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    id: "support",
    icon: "/images/home/why-choose/support.svg",
    title: "24/7 Live Support",
    description: "Real humans, real help—anytime you need it.",
  },
  {
    id: "protection",
    icon: "/images/home/why-choose/protection.svg",
    title: "Order Protection Guarantee",
    description: "You only pay when the job is done—period.",
  },
  {
    id: "experience",
    icon: "/images/home/why-choose/check.svg",
    title: "20+ Years of Experience",
    description: "Proven expertise you can trust.",
  },
  {
    id: "secure",
    icon: "/images/home/why-choose/secured.svg",
    title: "Secure Boosting",
    description: "100% safe methods—no bots, no shortcuts.",
  },
  {
    id: "usa",
    icon: "/images/home/why-choose/flag.svg",
    title: "USA-Based Operations",
    description: "Reliable service backed by a trusted location.",
  },
  {
    id: "rewards",
    icon: "/images/home/why-choose/rewards.svg",
    title: "Loyalty Rewards",
    description: "Get rewarded for staying with us.",
  },
];

export function HomeWhyChoose() {
  return (
    <section className="relative w-full overflow-hidden bg-dark-main">
      {/* Mobile layout */}
      <div className="flex flex-col items-center lg:hidden">
        <div className="relative h-[420px] w-full overflow-hidden">
          <div
            className="absolute right-[10%] top-1/3 h-[200px] w-[150px] -translate-y-1/2 rounded-full"
            style={{ background: "#ff5c00", filter: "blur(80px)" }}
          />
          <Image
            src="/images/home/why-choose/character.png"
            alt="OGEdge character"
            width={790}
            height={621}
            sizes="(max-width: 1024px) 100vw, 0vw"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-[50%] w-full"
            style={{
              background: "linear-gradient(to top, var(--dark-main) 0%, transparent 100%)",
            }}
          />
        </div>

        <div className="-mt-10 relative z-10 flex flex-col items-center px-6 pb-16">
          <h2 className="text-center font-heading text-2xl font-bold text-white md:text-3xl">
            <span className="text-brand-main">Why</span> Customers Choose{" "}
            <span className="text-brand-main">OGEdge</span>
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {features.map((feature) => (
              <div key={feature.id} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-main/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={feature.icon} alt="" className="h-6 w-6" loading="lazy" />
                </div>
                <h3 className="mt-3 font-body text-base font-bold leading-6 text-brand-main">
                  {feature.title}
                </h3>
                <p className="mt-1 font-body text-sm leading-5 text-white/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="mx-auto hidden w-full max-w-[1440px] items-start gap-8 px-6 py-20 md:px-12 lg:flex lg:px-[60px] lg:py-[100px]">
        <div className="flex w-[55%] shrink-0 flex-col gap-10">
          <h2 className="font-heading text-4xl font-bold text-white">
            <span className="text-brand-main">Why</span> Customers Choose{" "}
            <span className="text-brand-main">OGEdge</span>
          </h2>

          <div className="grid grid-cols-2 gap-x-16 gap-y-10">
            {features.map((feature) => (
              <div key={feature.id} className="flex flex-col gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-main/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={feature.icon} alt="" className="h-7 w-7" loading="lazy" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-body text-xl font-bold leading-7 text-brand-main">
                    {feature.title}
                  </h3>
                  <p className="font-body text-base leading-6 text-white/80">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex w-[45%] items-end justify-end self-center">
          <div
            className="absolute right-[10%] top-1/2 h-[300px] w-[200px] -translate-y-1/2 rounded-full"
            style={{ background: "#ff5c00", filter: "blur(100px)", opacity: 0.4 }}
          />
          <Image
            src="/images/home/why-choose/character.png"
            alt="OGEdge character"
            width={790}
            height={621}
            sizes="45vw"
            className="relative h-auto w-full max-w-[650px] object-contain"
          />
          <div
            className="pointer-events-none absolute -bottom-[70px] left-0 h-[172px] w-full"
            style={{ background: "var(--dark-main)", filter: "blur(35px)" }}
          />
        </div>
      </div>
    </section>
  );
}
