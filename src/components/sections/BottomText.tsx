import Image from "next/image";

const blocks = [
  {
    image: "/images/characters/reyna.jpg",
    title: "What is Valorant Boosting",
    body: "Valorant boosting is a service where a professional player (booster) plays on your account or with you to increase your competitive rank. Whether you are stuck in a rank or want to reach a higher tier, boosting helps you get there faster and more efficiently. OGEdge provides safe, reliable, and affordable Valorant boosting services with experienced players who know the game inside and out. Our boosters use advanced strategies and game knowledge to ensure your rank improves consistently.",
    imageLeft: true,
  },
  {
    image: "/images/characters/patch-notes-vip.jpg",
    title: "Why Valorant Boosting by OGEdge",
    body: "OGEdge stands out as the premier destination for Valorant boosting because of our commitment to quality, safety, and customer satisfaction. We employ only the most skilled boosters who have proven track records in competitive play. Our service includes VPN protection, offline mode, and full account security measures. With over 20 years of experience in the gaming industry, we understand what players need and deliver results that exceed expectations. Join thousands of satisfied customers who have trusted OGEdge with their ranking journey.",
    imageLeft: false,
  },
] as const;

export function BottomText() {
  return (
    <section className="w-full bg-dark-main">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-12 lg:px-20 lg:py-[120px]">
        <div className="flex flex-col gap-12 lg:gap-[48px]">
          {blocks.map((block) => (
            <div
              key={block.title}
              className={`relative flex flex-col gap-6 lg:gap-0 ${
                block.imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-stretch`}
            >
              <div className="relative w-full lg:w-[575px] shrink-0 overflow-hidden rounded-3xl">
                <Image
                  src={block.image}
                  alt={block.title}
                  width={575}
                  height={500}
                  className="h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover rounded-3xl"
                />
              </div>

              <div
                className={`relative z-10 flex flex-col justify-center rounded-3xl bg-dark-main px-6 py-8 md:px-10 md:py-10 lg:px-16 lg:py-12 ${
                  block.imageLeft ? "lg:-ml-16" : "lg:-mr-16"
                } lg:my-12`}
              >
                <h3 className="font-heading text-2xl md:text-[30px] font-bold leading-tight text-white">
                  {block.title}
                </h3>
                <p className="mt-4 font-body text-sm md:text-base leading-6 text-white/90">
                  {block.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
