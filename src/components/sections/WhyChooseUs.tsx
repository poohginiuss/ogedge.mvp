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
      "Over 20 years of experience with thousands of orders successfully delivered for our customers worldwide.",
  },
  {
    icon: "/images/icons/why/support.svg",
    title: "24/7 Support",
    description:
      "Suspendisse porta erat at felis pretium ut ut nibh nec id varius nibh, in ut ut blandit dictum.",
  },
  {
    icon: "/images/icons/why/face-happy.svg",
    title: "Guaranteed Satisfaction",
    description:
      "Suspendisse porta erat at felis pretium ut ut nibh nec id varius nibh, in ut ut blandit dictum.",
  },
  {
    icon: "/images/icons/why/reorder.svg",
    title: "Order Tracking",
    description:
      "Suspendisse porta erat at felis pretium ut ut nibh nec id varius nibh, in ut ut blandit dictum.",
  },
  {
    icon: "/images/icons/why/safety.svg",
    title: "100% Safety",
    description:
      "Suspendisse porta erat at felis pretium ut ut nibh nec id varius nibh, in ut ut blandit dictum.",
  },
  {
    icon: "/images/icons/why/reward-stars.svg",
    title: "Loyalty Rewards",
    description:
      "Suspendisse porta erat at felis pretium ut ut nibh nec id varius nibh, in ut ut blandit dictum.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="w-full bg-bg-page">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-12 lg:px-20 lg:py-[120px]">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-lexend text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Why Choose <span className="text-brand">OGEdge</span>
            </h2>
            <p className="mt-4 font-urbanist text-base md:text-lg lg:text-xl text-white/90 leading-7 lg:leading-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-3 rounded-3xl p-8 min-h-[180px]"
                style={{
                  border: "1px solid #7e7eb8",
                  background:
                    "linear-gradient(-46deg, rgba(23,25,31,0.5) 0%, rgba(56,56,82,0.5) 100%)",
                  backdropFilter: "blur(7px)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.icon}
                  alt=""
                  loading="lazy"
                  className="h-6 w-6"
                />
                <h3 className="font-urbanist text-lg lg:text-xl font-bold text-brand">
                  {f.title}
                </h3>
                <p className="font-urbanist text-sm md:text-base text-white/80 leading-6">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
