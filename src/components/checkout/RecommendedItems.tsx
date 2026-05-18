import Image from "next/image";

export type RecommendedItem = {
  id: string;
  gameImage: string;
  gameLogo: string;
  discount: string;
  serviceType: string;
  serviceName: string;
  estimatedTime: string;
  href?: string;
};

const MOCK_ITEMS: RecommendedItem[] = [
  {
    id: "r1",
    gameImage: "/images/home/games/valorant-backing.png",
    gameLogo: "/images/home/games/valorant-logo.png",
    discount: "-20%",
    serviceType: "Rank Boost",
    serviceName: "Rank up to Radiant",
    estimatedTime: "36 hours",
    href: "/valorant",
  },
  {
    id: "r2",
    gameImage: "/images/home/games/valorant-backing.png",
    gameLogo: "/images/home/games/valorant-logo.png",
    discount: "-20%",
    serviceType: "Win Boost",
    serviceName: "Win 5 games",
    estimatedTime: "36 hours",
    href: "/valorant",
  },
  {
    id: "r3",
    gameImage: "/images/home/games/valorant-backing.png",
    gameLogo: "/images/home/games/valorant-logo.png",
    discount: "-20%",
    serviceType: "Rank Boost",
    serviceName: "Rank up to Radiant",
    estimatedTime: "36 hours",
    href: "/valorant",
  },
  {
    id: "r4",
    gameImage: "/images/home/games/valorant-backing.png",
    gameLogo: "/images/home/games/valorant-logo.png",
    discount: "-20%",
    serviceType: "Rank Boost",
    serviceName: "Rank up to Radiant",
    estimatedTime: "36 hours",
    href: "/valorant",
  },
  {
    id: "r5",
    gameImage: "/images/home/games/valorant-backing.png",
    gameLogo: "/images/home/games/valorant-logo.png",
    discount: "-20%",
    serviceType: "Rank Boost",
    serviceName: "Rank up to Radiant",
    estimatedTime: "36 hours",
    href: "/valorant",
  },
];

function RecommendedCard({ item }: { item: RecommendedItem }) {
  const Wrapper = item.href ? "a" : "div";
  return (
    <Wrapper
      href={item.href}
      className="flex min-w-[180px] flex-1 flex-col overflow-hidden rounded-2xl bg-[rgba(56,56,82,0.3)] transition-transform hover:scale-[1.02]"
    >
      {/* Image area */}
      <div className="relative h-[140px] w-full">
        <Image src={item.gameImage} alt={item.serviceName} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        {/* Discount badge */}
        <div className="absolute right-2 top-2 rounded-lg bg-[#fa4609] px-2 py-1">
          <span className="font-body text-xs font-medium text-white">{item.discount}</span>
        </div>
        {/* Game logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={item.gameLogo}
            alt=""
            width={100}
            height={60}
            className="h-auto w-[50%] object-contain"
          />
        </div>
      </div>
      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-1">
          <span className="font-body text-sm font-normal text-white">{item.serviceType}</span>
          <span className="font-body text-xl font-medium text-white">{item.serviceName}</span>
        </div>
        <div className="flex items-center gap-1">
          <Image src="/images/icons/checkout/clock.svg" alt="" width={16} height={16} />
          <span className="font-body text-sm font-normal text-white/60">{item.estimatedTime}</span>
        </div>
      </div>
    </Wrapper>
  );
}

export function RecommendedItems({
  items = MOCK_ITEMS,
  title = "What other customers also order",
  subtitle = "Add now and get a discount",
}: {
  items?: RecommendedItem[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="mt-12">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-medium text-white">{title}</h2>
        <p className="mt-1 font-body text-base font-normal text-white/60">{subtitle}</p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 lg:gap-6">
        {items.map((item) => (
          <RecommendedCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
