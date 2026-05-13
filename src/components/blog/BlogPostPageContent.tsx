import { ArrowRightIcon } from "@/components/icons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

import { type BlogArticle, blogAuthor, getMostPopularBlogArticles } from "./blogData";

function MostPopularCard({ article }: { article: BlogArticle }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="flex flex-col gap-4 rounded-3xl p-4 transition-colors hover:bg-white/[0.02]"
    >
      <div className="relative h-[175px] overflow-hidden rounded-3xl">
        <Image
          src={article.image}
          alt={article.title}
          fill
          unoptimized
          sizes="315px"
          className="object-cover"
        />
      </div>
      <h3 className="font-body text-base font-medium leading-6 text-white">{article.title}</h3>
    </Link>
  );
}

function AuthorCard() {
  return (
    <div className="rounded-3xl bg-[rgba(56,56,82,0.3)] p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Image
            src={blogAuthor.image}
            alt={blogAuthor.name}
            width={64}
            height={64}
            unoptimized
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="text-white">
            <p className="font-body text-sm leading-5">{blogAuthor.role}</p>
            <p className="font-body text-lg leading-7">{blogAuthor.name}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-white">
          <h2 className="font-body text-lg font-medium leading-7 md:text-xl md:leading-[30px]">
            {blogAuthor.ctaTitle}
          </h2>
          <p className="font-body text-xs leading-[18px] md:text-base md:leading-6">
            {blogAuthor.ctaBody}
          </p>
        </div>

        <Button href="/valorant" variant="secondary" size="sm" className="w-full justify-center">
          Buy Boosting
        </Button>
      </div>
    </div>
  );
}

export function BlogPostPageContent({ article }: { article: BlogArticle }) {
  const mostPopularArticles = getMostPopularBlogArticles();

  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <PageHero
          title={article.title}
          subtitle={article.category}
          backgroundImage="/images/blog/blog-hero.png"
        />

        <section className="w-full bg-dark-main">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 py-12 md:px-12 lg:flex-row lg:items-start lg:justify-between lg:px-0 lg:py-16">
            <article className="flex w-full flex-col gap-8 lg:max-w-[850px]">
              {/* Back-to-blog link — designer flagged the article page as
                  missing a way to navigate back (Slack msgs #6 and #42). */}
              <Link
                href="/blog"
                className="inline-flex w-fit items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.32px] text-white/80 transition-colors hover:text-brand-light"
              >
                <ArrowRightIcon size={16} className="rotate-180" />
                Back to Blog
              </Link>

              <div className="relative h-[240px] overflow-hidden rounded-3xl md:h-[474px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 850px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-6 text-white md:gap-8">
                <p className="font-body text-sm leading-5 md:text-base md:leading-6">
                  {article.body.intro}
                </p>

                {/* Info callout — softened from solid `bg-brand-main` to a
                    translucent tint per designer feedback that the highlight
                    was "too orange, too bright" (Slack msg #6). */}
                <div className="rounded-2xl bg-[rgba(56,56,82,0.5)] p-4">
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{ background: "rgba(255,92,0,0.2)", color: "#ff975d" }}
                    >
                      i
                    </span>
                    <p className="font-body text-sm font-medium leading-5 md:text-base md:leading-6">
                      {article.body.callout}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 font-body text-sm leading-5 md:text-base md:leading-6">
                  {article.body.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <ul className="flex flex-col gap-2">
                  {article.body.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-4">
                      <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-[#fa4609]" />
                      <span className="font-body text-sm leading-5 md:text-base md:leading-6">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-4 font-body text-sm leading-5 md:text-base md:leading-6">
                  {article.body.closing.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="lg:hidden">
                <AuthorCard />
              </div>

              <div className="flex flex-col gap-6 lg:hidden">
                <h2 className="font-body text-2xl font-medium leading-8 text-white">
                  Most Popular
                </h2>
                <div className="flex flex-col gap-1">
                  {mostPopularArticles.map((popularArticle) => (
                    <MostPopularCard key={popularArticle.slug} article={popularArticle} />
                  ))}
                </div>
              </div>
            </article>

            <aside className="hidden w-[315px] shrink-0 flex-col gap-12 lg:flex">
              <AuthorCard />

              <div className="flex flex-col gap-6">
                <h2 className="font-body text-2xl font-medium leading-8 text-white">
                  Most Popular
                </h2>
                <div className="flex flex-col gap-1">
                  {mostPopularArticles.map((popularArticle) => (
                    <MostPopularCard key={popularArticle.slug} article={popularArticle} />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
