import { BlogPostPageContent } from "@/components/blog/BlogPostPageContent";
import { blogArticles, getBlogArticleBySlug } from "@/components/blog/blogData";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return {
      title: "Blog Post | OGEdge",
    };
  }

  return {
    title: `${article.title} | OGEdge`,
    description: article.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <BlogPostPageContent article={article} />;
}
