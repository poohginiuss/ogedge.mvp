# Services Configuration Panel (node 1644:23400)

This is THE main interactive component. Sits over the hero/services boundary, dark backdrop.
Container width: 1410px, total height ~1459px. Outer position: x=255, y=820 (centered ish).

## A. Top Banner Row (height 194px, gap 24px)

### A1. Season pill (left, w 241px)
- Border: 2px `#ff975d`, rounded 24px, p-8
- Text: "Season 2026: Act 1" — Lexend Bold 30px white, leading 38
- Subtitle: "6 days left" — Urbanist Regular 18px white uppercase
- Progress bar: bg `#383852` h-1 rounded-10, with `#ff5c00` filled portion (88%)
- Info icon top-right (Lucide Info)

### A2. Weekly Event card (flex-1)
- Bg: rgba(0,0,0,0.2), border 2px `#ff975d`, rounded 24px, p-8
- Left: character image `/images/characters/weekly-event.png` (negative margin top -103, w 259, h 262)
- Center: title "Valorant Weekly Event" Lexend Bold 30/38 white; description Urbanist Regular 18/28 white (408w)
- Right: "EVENT ENDS IN" Urbanist Regular 14 white uppercase, "00:12:45:32" Lexend Bold 48 `#ff5c00` text-shadow

## B. Trust badges row (gap 16px)
6 pill chips, each: gradient bg `linear-gradient(-X°, #17191F, #383852)`, h-10, rounded-24, px-4 py-3, gap-2
- 🔒 SSL Secure (Lucide Lock)
- 🛡 VPN (Lucide ShieldCheck)
- 🔐 Safest Service (Lucide ShieldLock)
- 🎧 24/7 Support (Lucide Headphones)
- 💳 Refund Guarantee (Lucide RefreshCcw)
- 💰 Loyalty Rewards (Lucide DollarSign)
Each label: Urbanist Medium 14 white

## C. Category tabs (gap 8px)
4 chips, w-auto h-50, bg rgba(0,0,0,0.2), border `#383852`, rounded 16, p-4, gap-2
- Rank Boost (Lucide Shield)
- Placement Boost (Lucide Rocket)
- **Boost per Win (SELECTED)** — border `#ff975d`, drop-shadow orange, text `#ff5c00`
- Unrated Matches (Lucide ListOrdered)
Label: Urbanist Medium 16 white

## D. Main content row — split (gap 24px)

### D1. Left big card (w 890px)
- Border 2px `#6d6d96`, rounded 24, p-[60px_50px], gradient bg `linear-gradient(109°, rgba(56,56,82,0.5), rgba(43,45,77,0.5), rgba(13,15,21,0.5))`
- Internal sections (gap 32):

#### Current Rank (gap 16)
- Header: "Current Rank" Urbanist SemiBold 24 white; subtitle "Select your current rank" Urbanist SemiBold 16 white/50%
- 9 rank icons in a row (each in a flex-1 box, h-76, bg rgba(0,0,0,0.2), border `#383852`, rounded 16, p-4):
  - iron, **bronze (selected: orange tint bg)**, silver, gold, platinum, diamond, ascendant, immortal, radiant
  - Each rank img with characteristic colored shadow (use the rank color)
  - Use `/images/ranks/{name}.png`
- 3 division boxes below (I, II, III) — flex-1 boxes h-56, **III is selected** (bg-orange-tinted, has check icon)

#### Number of Wins (gap 8)
- Title + subtitle (same pattern as above)
- Slider: shows "1" — track — "5", with orange filled portion to ~58%, plus a "3" pill on the right (border `#ff975d`, px-4, h-44, w-75)
- Slider thumb: bg `#ff5c00` 32x24 rounded-8 with white tally marks

#### Game Configuration (gap 16)
- Title "Game Configuration" Urbanist Medium 24 white; subtitle "Enter game details" Urbanist Medium 16 white/50%
- Two dropdowns side by side:
  - "Server" → "Europe" (selected)
  - "Queue" → "Lorem Ipsum"
  - Each dropdown: label above, then border `#383852` rounded-16 p-4 h-56, bg gradient `linear-gradient(-19°, rgb(23,25,31), rgb(56,56,82))`, with chevron-down on right
- Platform label "Platform *" (asterisk in `#ff5c00`)
- 4 platform pills: PC (selected, orange border, Windows icon, label `#ff5c00`), Xbox, PlayStation, Nintendo Switch
- Info banner: bg `#17191F`, rounded-16, p-4
  - Icon + "We guarantee 5/4 wins in your placements" Urbanist Medium 16 white
  - Sub: "If the booster loses more than 1 games..." Urbanist Regular 14 white/90%

#### Requirements & What Do I Get (two columns side by side, gap 24)
- Each column: title + 4 bullet lines with orange checkmark icons
- Title Urbanist Medium 16 white
- Lines Urbanist Regular 14 white/90%
- Use Lucide CheckCircle2 in `#ff5c00` for bullets

### D2. Right Order Summary (w 490px, sticky)
- Border 2px `#6d6d96`, rounded 24, p-6, gradient bg
- Header row:
  - Left: "Order Summary" Urbanist Regular 14 white/80%; "Boost Per Win" Urbanist SemiBold 24 white
  - Right: "~1day, 12h" Urbanist Bold 18 `#ff975d` text-shadow orange + info icon; below "**2h** until start time" Urbanist Regular 14 white/80% (2h is bold white)
- Summary list (5 rows, alternating bg rgba(0,0,0,0.2)):
  - Current Rank → Bronze II
  - Number of Wins → 3
  - Server → Europe
  - Queue → Lorem Ipsum
  - Platform → PlayStation
  - Each: label Urbanist Regular 14 white/80%, value Urbanist SemiBold 16 white
- Divider `#383852`
- Coupon row: input "SALE5" + "APPLY" button (gradient dark) + delete button (red-tinted Lucide Trash2)
- Divider
- "Extra Options" Urbanist Medium 16 white
  - 4 toggles (alternating bg rgba(0,0,0,0.2) and bordered):
    - Offline Mode (toggled ON, label `#ff975d`) — FREE (`#ff975d`)
    - Streaming (off) — +25% cost
    - Priority (toggled ON, label `#ff975d`) — +20% cost
    - Rush Completion (off) — +25% cost
- Divider
- Discount banners (stack of 2):
  - "15% discount applied to your order" — bg `#383852`, "15% discount applied" `#ff975d` text-shadow + " to your order" white/80%
  - "Maximum discount reached!" — bg rgba(26,173,25,0.2), text `#1aad19` SemiBold 16 centered
- Final summary list (3 rows alternating):
  - Discount → -15% (`#ff975d`)
  - Promo Code → -5% (`#ff975d`)
  - Total Amount → €327.00 (`#ff975d`)
- Two buttons row:
  - "ADD TO CART" — bg rgba(23,25,31,0.5) backdrop-blur, border 2px `#ff975d`, rounded 24, px-8 py-6, white text uppercase
  - "BUY NOW (€327.00)" — gradient `linear-gradient(to right, #ff5c00, #a32d05)`, border 2px `#ff975d`, same shape, white text
- Payment row:
  - Green checkbox icon (rounded-8 bg rgba(26,173,25,0.2), p-2, Lucide ShieldCheck in `#1aad19`)
  - "Secured and trusted checkout with:" Urbanist Regular 14 white/80%
  - 8 payment icons in a row (each ~31x20): visa, mastercard, paypal, applepay, gpay, crypto, venmo, zelle (use `/images/payments/*.png`)
