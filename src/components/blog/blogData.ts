export type BlogCategory = "News" | "Guides" | "Support";

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: BlogCategory;
  body: {
    intro: string;
    callout: string;
    paragraphs: readonly string[];
    bullets: readonly string[];
    closing: readonly string[];
  };
};

export const blogTopicFilters = [
  { label: "All News", count: 20, accent: "orange" as const },
  { label: "News", count: 15, accent: "slate" as const },
  { label: "Guides", count: 3, accent: "green" as const },
  { label: "Support", count: 2, accent: "orange" as const },
] as const;

export const blogGames = [
  { label: "Apex Legends", count: 15 },
  { label: "Call of Duty: Black Ops Cold War", count: 12 },
  { label: "Call of Duty: Modern Warfare", count: 3 },
  { label: "Destiny 2", count: 2 },
  { label: "DOTA2", count: 10 },
  { label: "Escape From Tarkov", count: 15 },
  { label: "Everquest", count: 11 },
  { label: "FIFA 21", count: 5 },
  { label: "Final Fantasy XIV", count: 15 },
  { label: "Fortnite", count: 9 },
  { label: "General Misc", count: 15 },
  { label: "Genshin Impact", count: 1 },
  { label: "Guild Wars 2", count: 15 },
  { label: "League of Legends", count: 3 },
  { label: "League of Legends Wild Rift", count: 15 },
  { label: "Overwatch", count: 11 },
  { label: "Teamfight Tactics", count: 15 },
  { label: "Valorant", count: 2 },
  { label: "World of Warcraft Classic", count: 15 },
] as const;

const sharedBody = {
  intro:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu commodo augue, a tempus neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus tincidunt a nisl nec auctor. Suspendisse maximus, erat sed pretium placerat, metus urna scelerisque turpis, sit amet efficitur metus dui ut nisi. Aenean finibus lacus augue, vel molestie mauris ullamcorper at. Phasellus rutrum vestibulum ornare. Phasellus sodales metus ac tellus elementum imperdiet. Etiam imperdiet tortor metus, in auctor odio blandit ut. Nunc et consequat ipsum, quis rutrum erat. Nunc id est ac ligula lobortis porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc consequat ante in risus sagittis placerat. Nullam ligula sapien, ultricies a ligula nec, gravida condimentum metus. Vestibulum malesuada quam eros, ac feugiat tortor maximus at. Maecenas efficitur facilisis quam, vitae mollis augue sollicitudin in.",
  callout:
    "Phasellus sodales metus ac tellus elementum imperdiet. Etiam imperdiet tortor metus, in auctor odio blandit ut. Nunc et consequat ipsum, quis rutrum erat. Nunc id est ac ligula lobortis porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc consequat ante in risus sagittis placerat.",
  paragraphs: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu commodo augue, a tempus neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus tincidunt a nisl nec auctor. Suspendisse maximus, erat sed pretium placerat, metus urna scelerisque turpis, sit amet efficitur metus dui ut nisi. Aenean finibus lacus augue, vel molestie mauris ullamcorper at. Phasellus rutrum vestibulum ornare. Phasellus sodales metus ac tellus elementum imperdiet.",
    "Etiam imperdiet tortor metus, in auctor odio blandit ut. Nunc et consequat ipsum, quis rutrum erat. Nunc id est ac ligula lobortis porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc consequat ante in risus sagittis placerat. Nullam ligula sapien, ultricies a ligula nec, gravida condimentum metus. Vestibulum malesuada quam eros, ac feugiat tortor maximus at. Maecenas efficitur facilisis quam, vitae mollis augue sollicitudin in.",
  ],
  bullets: [
    "Etiam imperdiet tortor metus, in auctor odio blandit ut.",
    "Nunc et consequat ipsum, quis rutrum erat. Nunc id est ac ligula lobortis porta.",
    "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    "Nunc consequat ante in risus sagittis placerat.",
  ],
  closing: [
    "Praesent porttitor mi sagittis, facilisis purus nec, finibus quam. Nam fringilla vitae turpis in porta. Fusce quis ante ac sem tristique dignissim. Nam condimentum leo tristique, malesuada lacus et, commodo dui. Donec malesuada, lectus non euismod tincidunt, massa magna mollis erat, quis fermentum nibh libero vitae elit. Sed ultrices efficitur nisl, non interdum risus fermentum id. Cras sed ipsum lobortis felis accumsan auctor. In porttitor in ante vel lacinia. Etiam in metus risus. Vivamus mattis dapibus mattis.",
    "In hac habitasse platea dictumst. Duis varius non lorem tristique dapibus. In ac faucibus ex. Vivamus viverra pulvinar nisl eu tincidunt. Fusce dictum sem vel felis tristique, ac faucibus libero fringilla. Vestibulum eu sapien eu velit aliquet ornare quis eget tortor. Mauris at tempus augue, nec rhoncus elit. Duis fringilla molestie felis, nec aliquet tellus sodales vel. Aliquam egestas sollicitudin eros, vitae feugiat velit consectetur ut.",
  ],
} as const;

export const blogArticles: BlogArticle[] = [
  {
    slug: "competitive-policies-rules-valorant-esports",
    title: "Competitive Policies & Rules for Valorant Esports",
    excerpt:
      "Aenean finibus lacus augue, vel molestie mauris ullamcorper at. Phasellus rutrum vestibulum ornare. Phasellus sodales metus ac tellus elementum imperdiet. Etiam imperdiet tortor metus, in auctor odio blandit ut. Nunc et consequat ipsum, quis rutrum erat. Nunc id est ac ligula lobortis porta.",
    image: "/images/blog/posts/competitive-policies.png",
    category: "Guides",
    body: sharedBody,
  },
  {
    slug: "valorant-boosting",
    title: "Valorant Boosting",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu commodo augue, a tempus neque. Pellentesque habitant morbi tristique senectus et.",
    image: "/images/blog/posts/valorant-boosting.png",
    category: "Guides",
    body: sharedBody,
  },
  {
    slug: "how-to-order-busting",
    title: "How to order Busting",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu commodo augue, a tempus neque. Pellentesque habitant morbi tristique senectus et.",
    image: "/images/blog/posts/how-to-order-busting.png",
    category: "Support",
    body: sharedBody,
  },
  {
    slug: "best-rell-builds",
    title: "League of Legends: The Best Rell Builds According to Pro Players",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu commodo augue, a tempus neque. Pellentesque habitant morbi tristique senectus et.",
    image: "/images/blog/posts/rell-builds.png",
    category: "Support",
    body: sharedBody,
  },
  {
    slug: "cod-black-ops-cold-war-battle-pass-overview",
    title: "CoD: Black Ops Cold War and Warzon Season One Battle Pass Overview",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu commodo augue, a tempus neque. Pellentesque habitant morbi tristique senectus et.",
    image: "/images/blog/posts/cod-battle-pass.png",
    category: "News",
    body: sharedBody,
  },
] as const;

export const featuredBlogArticleSlug = "competitive-policies-rules-valorant-esports";

export const mostPopularBlogSlugs = [
  "cod-black-ops-cold-war-battle-pass-overview",
  "how-to-order-busting",
  "best-rell-builds",
] as const;

export const blogAuthor = {
  name: "Rocket",
  role: "Author",
  image: "/images/blog/authors/rocket.png",
  ctaTitle: "Like This Guide?",
  ctaBody:
    "Get your weapon camos, account levels, missions, challenges and more, boosted quickly, safely and completely. anonymously.",
} as const;

export function getBlogArticleBySlug(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

export function getFeaturedBlogArticle() {
  return getBlogArticleBySlug(featuredBlogArticleSlug) ?? blogArticles[0];
}

export function getListingBlogArticles() {
  return blogArticles.filter((article) => article.slug !== featuredBlogArticleSlug);
}

export function getMostPopularBlogArticles() {
  return mostPopularBlogSlugs
    .map((slug) => getBlogArticleBySlug(slug))
    .filter((article): article is BlogArticle => Boolean(article));
}
