import { EyeIcon } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

type Article = {
  image: string;
  title: string;
  body: string;
  game: string;
  date: string;
};

const articles: Article[] = [
  {
    image: "/images/characters/valorant-tournament.jpg",
    title: "Valorant Rank Boosting Guide",
    body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae.",
    game: "Valorant",
    date: "10.03.2026",
  },
  {
    image: "/images/characters/valorant-tournament.jpg",
    title: "Placement Matches Strategy",
    body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae.",
    game: "Valorant",
    date: "08.03.2026",
  },
  {
    image: "/images/characters/valorant-tournament.jpg",
    title: "Season 2026 Act 1 Updates",
    body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae.",
    game: "Valorant",
    date: "05.03.2026",
  },
];

export function Articles() {
  return (
    <section className="w-full bg-dark-main">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-12 lg:px-20 lg:py-[70px]">
        <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-white">
          Articles
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              href="#"
              key={article.title}
              className="group relative flex flex-col gap-4 rounded-3xl p-6 lg:p-8 overflow-hidden border border-[#6d6d96] hover:border-[#ff975d] transition-colors"
            >
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-[rgba(56,56,82,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <EyeIcon size={28} className="text-white" />
                </div>
              </div>

              <div className="relative h-[200px] lg:h-[240px] w-full overflow-hidden rounded-2xl">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <h3 className="font-body text-lg font-medium leading-7 text-white">
                {article.title}
              </h3>
              <p className="font-body text-sm leading-5 text-white/90">{article.body}</p>
              <p className="font-body text-xs leading-[18px] text-white/80">
                {article.game}
                <span className="mx-2">•</span>
                {article.date}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2.5">
          <div className="h-[5px] w-10 rounded-full bg-brand-deep" />
          <div className="h-[5px] w-10 rounded-full bg-[#333]" />
          <div className="h-[5px] w-10 rounded-full bg-[#333]" />
        </div>
      </div>
    </section>
  );
}
