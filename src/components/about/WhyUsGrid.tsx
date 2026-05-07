const features = [
  {
    id: "experience",
    icon: "/images/icons/why/star-square.svg",
    title: "20 Years of Experience",
    description:
      "Over 20 years of experience, 50k orders and 10k positive reviews, guarantees you that your account is in good hands.",
  },
  {
    id: "support",
    icon: "/images/icons/why/support.svg",
    title: "24/7 Support",
    description: "Suspendisse porta purus massa, at pulvinar sem imperdiet in.",
  },
  {
    id: "satisfaction",
    icon: "/images/icons/why/face-happy.svg",
    title: "Guaranteed Satisfaction",
    description: "Suspendisse porta purus massa, at pulvinar sem imperdiet in.",
  },
  {
    id: "tracking",
    icon: "/images/icons/why/reorder.svg",
    title: "Order Tracking",
    description: "Suspendisse porta purus massa, at pulvinar sem imperdiet in.",
  },
  {
    id: "safety",
    icon: "/images/icons/why/safety.svg",
    title: "100% Safety",
    description: "Suspendisse porta purus massa, at pulvinar sem imperdiet in.",
  },
  {
    id: "rewards",
    icon: "/images/icons/why/reward-stars.svg",
    title: "Loyalty Rewards",
    description: "Suspendisse porta purus massa, at pulvinar sem imperdiet in.",
  },
];

export function WhyUsGrid() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-heading text-2xl font-bold text-white md:text-[32px] md:leading-8">
        Why Us
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col gap-2 rounded-3xl p-6"
            style={{
              background:
                "linear-gradient(153deg, rgba(56,56,82,0.3) 0%, rgba(43,45,77,0.3) 50%, rgba(13,15,21,0.3) 100%)",
              border: "1px solid var(--dark-border)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={feature.icon} alt="" className="h-6 w-6" loading="lazy" />
            <h3 className="mt-2 font-heading text-lg font-bold leading-7 text-white">
              {feature.title}
            </h3>
            <p className="font-body text-base leading-6 text-white/80">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
