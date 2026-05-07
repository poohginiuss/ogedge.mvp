import { ArrowRightIcon, EyeIcon } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

type Article = {
  image: string;
  title: string;
  body: string;
  game: string;
  date: string;
};

const featuredArticle: Article = {
  image: "/images/blog/featured-post.png",
  title: "Call of Duty Boosting",
  body: "Pellentesque posuere ullamcorper nulla sed accumsan. Morbi id justo pharetra, faucibus urna vitae, mollis orci. Aliquam a imperdiet odio. Ut venenatis auctor sem, vel auctor nunc mattis quis.",
  game: "Call of Duty",
  date: "10.03.2026",
};

const articles: Article[] = [
  {
    image: "/images/characters/valorant-tournament.jpg",
    title: "Valorant Rank Boosting Guide",
    body: "Pellentesque posuere ullamcorper nulla sed accumsan. Morbi id justo pharetra, faucibus urna vitae, mollis orci. Aliquam a imperdiet odio. Ut venenatis auctor sem, vel auctor nunc mattis quis.",
    game: "Valorant",
    date: "10.03.2026",
  },
  {
    image: "/images/characters/valorant-tournament.jpg",
    title: "Placement Matches Strategy",
    body: "Pellentesque posuere ullamcorper nulla sed accumsan. Morbi id justo pharetra, faucibus urna vitae, mollis orci. Aliquam a imperdiet odio. Ut venenatis auctor sem, vel auctor nunc mattis quis.",
    game: "Valorant",
    date: "08.03.2026",
  },
  {
    image: "/images/characters/valorant-tournament.jpg",
    title: "Season 2026 Act 1 Updates",
    body: "Pellentesque posuere ullamcorper nulla sed accumsan. Morbi id justo pharetra, faucibus urna vitae, mollis orci. Aliquam a imperdiet odio. Ut venenatis auctor sem, vel auctor nunc mattis quis.",
    game: "Valorant",
    date: "05.03.2026",
  },
];

export function Articles() {
  return (
    <section className="w-full bg-dark-main">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-12 lg:px-0 lg:py-16">
        <h2 className="text-center font-heading text-3xl font-bold text-white md:text-4xl">
          Blog Posts
        </h2>

        {/* Featured / highlighted post */}
        <Link
          href="#"
          className="group mt-8 flex flex-col gap-6 overflow-hidden rounded-3xl border border-dark-border p-6 transition-colors hover:border-brand-light md:flex-row md:gap-8 md:p-8"
        >
          <div className="relative order-1 h-[260px] w-full overflow-hidden rounded-2xl md:order-2 md:h-[300px] md:w-1/2 md:shrink-0">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="order-2 flex flex-1 flex-col justify-between gap-6 md:order-1 md:py-2">
            <div className="flex flex-col gap-6">
              <p className="font-body text-xs leading-[18px] text-white/80">
                {featuredArticle.game}
                <span className="mx-2">●</span>
                {featuredArticle.date}
              </p>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-2xl font-bold leading-[38px] text-white md:text-[30px]">
                  {featuredArticle.title}
                </h3>
                <p className="font-body text-sm leading-5 text-white">{featuredArticle.body}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 font-body text-base font-bold uppercase tracking-[0.32px] text-white">
              Read More
              <ArrowRightIcon size={18} />
            </span>
          </div>
        </Link>

        {/* Blog post cards */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              href="#"
              key={article.title}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-dark-muted p-6 transition-colors hover:border-brand-light lg:p-8"
            >
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-[rgba(56,56,82,0.6)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}
                >
                  <EyeIcon size={28} className="text-white" />
                </div>
              </div>

              <div className="relative h-[200px] w-full overflow-hidden rounded-2xl lg:h-[240px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  unoptimized
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

        {/* View all button */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:text-brand-light"
          >
            View All Blog Posts
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
