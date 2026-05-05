# Highlights — "We provide fast, easy and secure boost" (node 1644:24494)

Width 1920, height 800. Bg `#111`. Padding `px-[320px] py-[120px]`.

## Layout (centered, w 1211, h 461 main row)

### Left column
- Big "01" — Lexend Bold 36 `#232330` (very dark, almost invisible — semi-decorative numeral)
- Title (multi-line, Lexend Bold 36 white):
  - "We provide **fast**, **easy**" (fast and easy in `#ff975d`)
  - "and **secure** boost" (secure in `#ff975d`)
- Description — Urbanist Regular 18/28 white (w-400)
- Pagination dashes:
  - 1 active dash w-80 h-2 `#ff975d`
  - 3 inactive dashes w-20 h-2 `#383852`

### Right column (game logo posters)
The original Figma has very complex layered SVGs depicting two game logo cards (Cold War / Valorant style). 
**Implement as two stylized rectangle cards** with placeholder game-art look:
- Container: 477px wide, ~429px tall
- Two stacked/overlapping cards rendered as dark rounded rectangles with orange borders, each containing a label like "CHOOSE YOUR GAME" and a faux logo block

Alternative: render the right side as an empty area with a few floating orange-tinted blurred circles to suggest depth.

## Background decoration
3 orange blurred circles (size 256, blur 107) positioned around the section to add ambient glow:
- Circle 1: bg rgba(255,92,0,0.2) at left=-112, top=280
- Circle 2: at left=956, top=179
- Circle 3: at left=520, top=-71

## Navigation arrows row (below)
- Left arrow at x=64, right arrow at x=1536 (both 64x64 rounded-full)
- The right arrow is the "active" version with orange border `#ffa384` and orange shadow.
