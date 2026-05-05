# Reviews (node 1644:23953)

Width 1920, height 1000. Bg `#111`.

## Layout (absolute positioning)

### Character (left, 525x504, top-left at x=201, y=129)
- `/images/characters/reviewer.png` — Valorant character thumbs-up
- Behind it: blurred glow circle, `#ff5c00` blur-107, size 317, rounded-full, positioned at x=344, y=280

### Header block (right, x=754, y=267)
- Title "What our players are saying" — Lexend Bold 36 white
- CTA card below:
  - Backdrop blur 3px, bg rgba(23,25,31,0.5)
  - Border 2px `#ff975d`, rounded-24, px-8 py-6
  - Drop-shadow orange
  - Inside: ⭐ "4.9 Star Rating" (Urbanist Bold 20 `#ff975d` text-shadow), "10k Reviews" white, " | ", "SEE ALL" (Urbanist Bold 20 white tracking 0.4 uppercase), arrow icon (Lucide ArrowRight)

### Review carousel row (x=155, y=516, gap 56)
- Left arrow button (64x64, rounded-full, backdrop-blur)
- 3 review cards horizontally
- Right arrow button (64x64, rounded-full, border `#ffa384`, bg rgba(255,255,255,0.1), drop-shadow orange) — this one is highlighted/active

### Review Card (430x355)
- Backdrop blur 12px
- Border 1px `#6d6d96` (default) or `#ff975d` (hover/active)
- Rounded 24, p-8
- Bg gradient `linear-gradient(117°, rgba(56,56,82,0.5), rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5))`
- Content (gap 16):
  - User row: 32px circular avatar + "Robert Johnson" Urbanist Medium 16 white + "Platinum III to Diamond III" Urbanist Regular 14 `#ff975d`
  - Rating row: 5 orange stars + date "2020-12-08" Urbanist Regular 14 `#aaa`
  - Comment: "Amazing experience..." Urbanist Regular 16 white
  - Purchase: "Purchased: Game" (label gray, value white)
  - Tags: 2 small pills — "Verified Purchase" green (`#1aad19` text on rgba(26,173,25,0.2)), "Rank Boost" gray
- Center card (index 1) is the active/hover state with orange border

For middle card, can include a small Lucide MousePointer icon hint at center (optional).
