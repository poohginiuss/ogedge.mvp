# OGEdge Valorant Boosting Page — Implementation Brief

## Goal
Implement the Valorant Boosting service page from Figma at pixel-perfect parity for desktop (1920) with responsive support for mobile (390).

## Tech Stack (already installed)
- **Next.js 16.2.4** with App Router (NOT classic — use Server Components)
- **React 19.2.4**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **TypeScript 5**
- Path alias: `@/*` → `./src/*`

**IMPORTANT:** This is Next.js 16. Read `node_modules/next/dist/docs/01-app/index.md` and other relevant docs in that folder if you need to verify modern Next.js conventions. Use `Image` from `next/image` for all images. Use `next/font/google` (already set up for Geist; we'll add Lexend + Urbanist).

## Visual References
- `docs/figma-screenshots/main-page.png` — full page screenshot (PRIMARY visual reference)
- `docs/figma-screenshots/components.png` — component states reference
- `docs/figma-screenshots/mobile.png` — mobile responsive layout

## Section Briefs (read each before building)
- `01-header.md`
- `02-hero.md`
- `03-services-config.md` ← biggest, most complex
- `04-why-choose-us.md`
- `05-reviews.md`
- `06-order-process.md`
- `07-bottom-text.md`
- `08-highlights.md`
- `09-faq.md`
- `10-articles.md`
- `11-footer.md`

## Design Tokens

### Colors
| Token             | Value              | Usage                                        |
|-------------------|--------------------|----------------------------------------------|
| `--bg-page`       | `#111111`          | Main page background                         |
| `--bg-header`     | `#232330`          | Header background                            |
| `--bg-surface-1`  | `#17191F`          | Info/banner cards                            |
| `--bg-surface-2`  | `#383852`          | Dividers, subtle bg                          |
| `--border-subtle` | `#383852`          | Default 1px borders                          |
| `--border-muted`  | `#6D6D96`          | Card borders                                 |
| `--border-light`  | `#7E7EB8`          | Alt card borders                             |
| `--brand`         | `#FF5C00`          | Primary orange (CTAs, highlights, accents)   |
| `--brand-light`   | `#FF975D`          | Light orange (active states, secondary text) |
| `--brand-deep`    | `#FA4609`          | Deep orange (slider, footer headings)        |
| `--brand-dark`    | `#A32D05`          | Gradient end                                 |
| `--success`       | `#1AAD19`          | "Verified Purchase" / max discount banner    |
| `--text-muted`    | `#AAAAAA`          | Subtle/labels                                |
| `--text-faint`    | `#999999`          | Footer copyright                             |

Use both as Tailwind utility classes (via `@theme inline` in globals.css) AND via inline `style={{ color: 'var(--brand)' }}` where simpler.

### Typography
- **Lexend** (Bold, SemiBold, Black) — display/heading
- **Urbanist** (Regular, Medium, SemiBold, Bold, ExtraBold) — body, UI

Both load from Google Fonts via `next/font/google`. Add to `src/app/layout.tsx` like the existing Geist setup. Expose via CSS variables `--font-lexend` and `--font-urbanist`.

Common scales:
| Token            | Family   | Weight | Size | Line height |
|------------------|----------|--------|------|-------------|
| display/lg/bold  | Lexend   | 700    | 48px | normal      |
| display/md/bold  | Lexend   | 700    | 36px | normal      |
| display/sm/bold  | Lexend   | 700    | 30px | 38px        |
| text/xxl/medium  | Urbanist | 500    | 24px | 32px        |
| text/xxl/regular | Urbanist | 400    | 24px | 32px        |
| text/xl/bold     | Urbanist | 700    | 20px | 30px        |
| text/xl/medium   | Urbanist | 500    | 20px | 30px        |
| text/xl/regular  | Urbanist | 400    | 20px | 30px        |
| text/lg/bold     | Urbanist | 700    | 18px | 28px        |
| text/lg/regular  | Urbanist | 400    | 18px | 28px        |
| text/md/medium   | Urbanist | 500    | 16px | 24px        |
| text/md/regular  | Urbanist | 400    | 16px | 24px        |
| text/sm/medium   | Urbanist | 500    | 14px | 20px        |
| text/sm/regular  | Urbanist | 400    | 14px | 20px        |
| text/xs/medium   | Urbanist | 500    | 12px | 18px        |

## Layout & Container
- Desktop max width: 1920px (full bleed). Most content sections have `padding: 120px 320px` (vertical/horizontal).
- For < 1920 viewports, the design should still feel full-width — the figma uses `px-[320px]`. Replace with a responsive container that maxes content at `max-w-[1280px]` and centers it.
- Use `mx-auto` for content blocks; use full-width backgrounds on outer wrappers.

## Asset Inventory (already downloaded to `public/images/`)
```
public/images/
├── hero-valorant-bg.png        ← hero background
├── order-process-bg.png         ← order process bg
├── characters/
│   ├── reviewer.png             ← reviews section character
│   ├── reyna.png                ← bottom text block 1
│   ├── patch-notes-vip.png      ← bottom text block 2
│   ├── valorant-tournament.png  ← article cards
│   └── weekly-event.png         ← weekly event card character
├── ranks/
│   ├── iron.png, bronze.png, silver.png, gold.png,
│   ├── platinum.png, diamond.png, ascendant.png,
│   └── immortal.png, radiant.png
├── logos/
│   ├── logo-white.png           ← header
│   └── logo-red.png             ← footer
├── payments/
│   ├── visa.png, mastercard.png, paypal.png, applepay.png,
│   ├── gpay.png, crypto.png, skrill.png, venmo.png,
│   └── zelle.png, klarna.png, wechatpay.png
├── social/
│   ├── facebook.png, twitter.png, instagram.png,
│   └── discord.png, skype.png, whatsapp.png
└── icons/
    └── flag-us.png              ← language switcher flag
```

## Icon Strategy
Install `lucide-react` for all UI icons (lock, info, arrows, support, shield, rocket, crown, etc.). Do NOT try to recreate the small Figma SVG glyph fragments — Lucide equivalents look cleaner and ship as React components. Section briefs above mention specific Lucide icon names.

```bash
npm install lucide-react
```

## Component Architecture

Build under `src/components/`:
```
src/
├── app/
│   ├── layout.tsx        ← register fonts (Lexend, Urbanist), keep <html>/<body>
│   ├── page.tsx          ← assembles all sections in order
│   └── globals.css       ← tokens, base styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ServicesConfig.tsx          ← THE big interactive panel
│   │   ├── WhyChooseUs.tsx
│   │   ├── Reviews.tsx
│   │   ├── OrderProcess.tsx
│   │   ├── BottomText.tsx
│   │   ├── Highlights.tsx
│   │   ├── Faq.tsx
│   │   └── Articles.tsx
│   └── ui/
│       ├── Button.tsx          ← primary/secondary/orange-bordered variants
│       ├── Card.tsx            ← shared card with gradient + border
│       ├── Toggle.tsx          ← switch component
│       ├── Slider.tsx          ← range slider for "Number of Wins"
│       └── Pill.tsx            ← chip / badge
```

The page itself can be a server component. Sections that are purely visual should also be server components. The `ServicesConfig` section that has interactive elements (rank selector, slider, toggles, dropdowns) MUST be `"use client"`.

For the FAQ section (expand/collapse), use `"use client"` for the questions list (or use details/summary HTML elements for a server-only solution).

## Page Section Order (top to bottom)
1. `<Header />`
2. `<Hero />`
3. **Services Configuration Panel** — overlaps with Hero bottom (use negative `mt-` to pull up over the hero gradient)
4. `<WhyChooseUs />`
5. `<Reviews />`
6. `<OrderProcess />`
7. `<BottomText />`  (the "What is" / "Why" blocks)
8. `<Highlights />` (the "We provide fast, easy and secure boost")
9. `<Faq />`
10. `<Articles />`
11. `<Footer />`

## Responsive Strategy
The Figma mobile screenshot shows everything stacked vertically. For now, focus on:
- **Desktop (≥ 1280px)**: pixel-perfect replica of `main-page.png`
- **Tablet (768–1279)**: collapse 6-card grid to 3×2 then 2×3, then stack
- **Mobile (< 768)**: single-column stack everywhere; header collapses to logo + hamburger; services config panel becomes a single column with order summary at the bottom

Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`). Don't worry about exact mobile pixel-perfection if it would block desktop completion — get desktop right first, then mobile reasonable.

## Functionality Notes
This is a STATIC marketing/sales page. No real backend or data fetching. All interactions are visual:
- Tab switching (FAQ tabs, category tabs in services config) — local React state
- Toggles (Extra Options) — local React state
- Rank selector — local state, default selected: Bronze, division III
- Number of Wins slider — local state, default: 3
- Platform selector — local state, default: PC
- Dropdowns — for now, render as static styled `<button>` with chevron; do not implement actual open/close menus unless trivial (you can leave click handlers as no-ops or use `<select>` styled to match)
- Buy / Add to cart buttons — no-op handlers
- Carousel arrows — no-op for now (don't implement carousel logic)

## Implementation Order (suggested)
1. Set up `globals.css` with tokens and reset; add Lexend + Urbanist fonts in `layout.tsx`; install `lucide-react`
2. Build shared UI primitives (`Card`, `Button`, `Pill`)
3. Build sections in this order (easier → harder):
   - `Footer` → `Header` → `Hero` → `WhyChooseUs` → `OrderProcess` → `Articles` → `Reviews` → `Faq` → `BottomText` → `Highlights` → **`ServicesConfig` last** (most complex)
4. Wire them all in `page.tsx`
5. Run `npm run build` and `npm run lint` and fix issues
6. Compare visually against `docs/figma-screenshots/main-page.png` and adjust

## Quality Bar
- TypeScript strict — no `any`
- Pass `npm run lint`
- Pass `npm run build` (no errors)
- Use Tailwind utilities — only drop to inline `style={{}}` for things hard to express (custom gradients, multi-stop)
- Don't over-comment; only comment non-obvious decisions
- Use semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, etc.)

## Important
- The current `src/app/page.tsx` and `src/app/layout.tsx` are the Next.js create-app starter; **fully replace them**.
- Do not modify `package.json` except via `npm install lucide-react`.
- Do not change `next.config.ts`, `tsconfig.json`, `postcss.config.mjs` (already correct).
- The `.next/` folder and `node_modules/` are auto-generated — do not modify.
- Keep the `docs/`, `scripts/` folders as references; do not delete.
