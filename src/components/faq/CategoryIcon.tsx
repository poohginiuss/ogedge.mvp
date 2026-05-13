import type { CategoryId } from "./faqData";

/**
 * Inline category icons for the FAQ taxonomy. Stroked with `currentColor`
 * so they inherit whatever text color the surrounding chip / button uses
 * (white at rest, brand-main when active). Inline SVG keeps everything in
 * one file and avoids shipping seven near-identical single-colour assets.
 *
 * Shared between the dedicated `/faq` page (`FaqPageContent`) and the
 * marketing FAQ section (`components/sections/Faq.tsx`) so both surfaces
 * render the same glyph for the same category id.
 */
export function CategoryIcon({
  id,
  label,
  className,
}: {
  id: CategoryId;
  label: string;
  className?: string;
}) {
  const cls = className ?? "h-5 w-5";
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    role: "img" as const,
    "aria-label": label,
  };
  switch (id) {
    case "general":
      return (
        <svg {...common} className={cls}>
          <title>{label}</title>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8h.01M11 12h1v5h1" />
        </svg>
      );
    case "account-safety":
      return (
        <svg {...common} className={cls}>
          <title>{label}</title>
          <path d="M12 3l8 3v6c0 4.5-3.2 8.4-8 9-4.8-.6-8-4.5-8-9V6l8-3z" />
        </svg>
      );
    case "boosting":
      return (
        <svg {...common} className={cls}>
          <title>{label}</title>
          <path d="M4.5 16.5c-1.5 1-2 4-2 4s3-.5 4-2c.5-.8.5-2 0-2.8-.5-.7-1.7-.7-2-1.2" />
          <path d="M12 15l-3-3a11 11 0 016-8 11 11 0 015 5 11 11 0 01-8 6z" />
          <path d="M15 9a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
      );
    case "order-process":
      return (
        <svg {...common} className={cls}>
          <title>{label}</title>
          <path d="M9 4h6a1 1 0 011 1v1h2a1 1 0 011 1v13a1 1 0 01-1 1H6a1 1 0 01-1-1V7a1 1 0 011-1h2V5a1 1 0 011-1z" />
          <path d="M9 13l2 2 4-4" />
        </svg>
      );
    case "payments":
      return (
        <svg {...common} className={cls}>
          <title>{label}</title>
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M17 14a2 2 0 110-4M2 10h20" />
        </svg>
      );
    case "games-services":
      return (
        <svg {...common} className={cls}>
          <title>{label}</title>
          <path d="M6 8h12a4 4 0 014 4 4 4 0 01-4 4c-1.5 0-2.5-.7-3-1.5L13.5 13h-3l-1.5 1.5C8.5 15.3 7.5 16 6 16a4 4 0 01-4-4 4 4 0 014-4z" />
          <path d="M8 11v2M7 12h2M15 11h.01M17 13h.01" />
        </svg>
      );
    case "discounts":
      return (
        <svg {...common} className={cls}>
          <title>{label}</title>
          <path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0l-7-7A2 2 0 013 12.2V5a2 2 0 012-2h7.2c.5 0 1 .2 1.4.6l7 7a2 2 0 010 2.8z" />
          <circle cx="8.5" cy="8.5" r="1.2" />
        </svg>
      );
  }
}
