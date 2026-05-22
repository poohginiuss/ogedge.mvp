import Image from "next/image";

const communities = [
  {
    icon: "/images/support/discord.svg",
    name: "Discord",
    description: "Join 12345+ members",
    href: "#discord",
  },
  {
    icon: "/images/support/x-icon.svg",
    name: "X",
    description: "Check latest updates",
    href: "#twitter",
  },
  {
    icon: "/images/support/instagram.svg",
    name: "Instagram",
    description: "Lorem Ipsum",
    href: "#instagram",
  },
  {
    icon: "/images/support/facebook.svg",
    name: "Facebook",
    description: "Lorem Ipsum",
    href: "#facebook",
  },
];

const CARD_GRADIENT =
  "linear-gradient(104deg, rgba(56, 56, 82, 0.5) 0.7%, rgba(35, 35, 48, 0.5) 50.4%, rgba(23, 25, 31, 0.5) 100%)";

export function CommunitySection() {
  return (
    <section className="w-full bg-dark-main">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-12 lg:px-20 lg:py-16">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Join our Community
            </h2>
            <p className="font-body text-base font-normal text-white">
              Connect with us and other gamers
            </p>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {communities.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex cursor-pointer items-center gap-4 rounded-3xl border border-[#2d2d42] px-6 py-5 transition-all duration-200 hover:border-[#ff975d] hover:shadow-[0_0_16px_rgba(255,92,0,0.15)] lg:px-8 lg:py-6"
                style={{ backgroundImage: CARD_GRADIENT }}
              >
                <div className="flex size-[50px] shrink-0 items-center justify-center rounded-2xl border border-[#383852]">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-body text-xl font-bold leading-[30px] text-white">
                    {item.name}
                  </span>
                  <span className="font-body text-base font-normal leading-6 text-white">
                    {item.description}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
