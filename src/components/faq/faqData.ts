/**
 * Shared FAQ data — single source of truth for both:
 *   - `/faq` page (`FaqPageContent`)
 *   - the FAQ section on the marketing pages (`components/sections/Faq.tsx`)
 *
 * Previously, the home FAQ section hard-coded its own 3 tabs ("Getting
 * Started", "Boosting Related Questions", "Payment Related Questions") and
 * a separate static array of six questions. Designer feedback was that the
 * two surfaces should use the same taxonomy so categories don't drift
 * between the marketing teaser and the dedicated `/faq` page.
 */

export const faqCategories = [
  { id: "general", label: "General", count: 25 },
  { id: "account-safety", label: "Account Safety", count: 18 },
  { id: "boosting", label: "Boosting", count: 20 },
  { id: "order-process", label: "Order Process", count: 15 },
  { id: "payments", label: "Payments", count: 12 },
  { id: "games-services", label: "Games & Services", count: 10 },
  { id: "discounts", label: "Discounts & Loyalty", count: 8 },
] as const;

export type CategoryId = (typeof faqCategories)[number]["id"];

export type FaqItem = {
  id: string;
  categoryId: CategoryId;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "g1",
    categoryId: "general",
    question: "What is OGEdge?",
    answer:
      "OGEdge is a professional game boosting platform connecting players with vetted boosters across popular titles. We focus on fast delivery, account safety, and transparent communication.",
  },
  {
    id: "g2",
    categoryId: "general",
    question: "Which regions do you support?",
    answer:
      "We support customers worldwide. Boosters use VPN routing aligned with your region when playing on your account to reduce risk and match typical login patterns.",
  },
  {
    id: "g3",
    categoryId: "general",
    question: "How do I create an account?",
    answer:
      "Sign up with email or your preferred OAuth provider, verify your email, and you can place orders from your dashboard. Returning customers can log in anytime to track active boosts.",
  },
  {
    id: "g4",
    categoryId: "general",
    question: "Do you offer customer support?",
    answer:
      "Yes. Our sales and support team is available 24/7 via live chat and email for questions about services, pricing, or an active order.",
  },
  {
    id: "g5",
    categoryId: "general",
    question: "Can I request a specific booster?",
    answer:
      "When available, you can pick a booster from our roster or describe preferences such as playstyle and schedule. We match you with someone who fits your requirements.",
  },
  {
    id: "g6",
    categoryId: "general",
    question: "What games do you cover?",
    answer:
      "We cover major competitive titles including FPS and MOBA games. Game-specific pages list rank systems, optional extras, and estimated completion times.",
  },
  {
    id: "g7",
    categoryId: "general",
    question: "Is there a minimum order value?",
    answer:
      "Minimums depend on the game and service type. Small wins-only orders may have a floor—your cart will show any requirement before checkout.",
  },
  {
    id: "g8",
    categoryId: "general",
    question: "How fast do boosters respond after assignment?",
    answer:
      "Most boosters acknowledge within the dashboard within minutes to an hour. Peak times may vary; priority orders are expedited in the queue.",
  },
  {
    id: "g9",
    categoryId: "general",
    question: "Can I cancel before work starts?",
    answer:
      "If no booster has begun play on your order, you can cancel per our refund policy. Once progress has started, partial refunds may apply depending on work completed.",
  },
  {
    id: "g10",
    categoryId: "general",
    question: "Do you stream or record games?",
    answer:
      "Streaming or recording may be available as an add-on for some games. Ask support before purchase if you need VODs or live viewing.",
  },
  {
    id: "g11",
    categoryId: "general",
    question: "Where can I read reviews?",
    answer:
      "Verified purchase reviews are published on our reviews page. They reflect real orders completed through OGEdge.",
  },

  {
    id: "as1",
    categoryId: "account-safety",
    question: "How do you protect my account?",
    answer:
      "We combine offline mode when applicable, regional VPNs, limited login exposure, and strict booster vetting. Boosters follow protocols tailored to each title.",
  },
  {
    id: "as2",
    categoryId: "account-safety",
    question: "Will boosters use cheats?",
    answer:
      "No. Our boosters play legitimately. Using cheats would jeopardize customer accounts and our reputation—we prohibit any third-party cheating software.",
  },
  {
    id: "as3",
    categoryId: "account-safety",
    question: "Should I change my password after boosting?",
    answer:
      "Changing credentials after service completion is a sensible precaution. We recommend enabling two-factor authentication where the game platform supports it.",
  },
  {
    id: "as4",
    categoryId: "account-safety",
    question: "Who has access to my login?",
    answer:
      "Only your assigned booster and secure internal tooling used for dispatching credentials. Access is minimized and audited.",
  },
  {
    id: "as5",
    categoryId: "account-safety",
    question: "What if my account gets flagged?",
    answer:
      "Contact support immediately with details. While risk cannot be zero in any boosting scenario, we investigate incidents and work with you on next steps.",
  },
  {
    id: "as6",
    categoryId: "account-safety",
    question: "Can I stay offline on friends lists?",
    answer:
      "Yes—many customers prefer appearing offline to friends. Mention this in order notes and your booster will comply where the client allows.",
  },
  {
    id: "as7",
    categoryId: "account-safety",
    question: "Do you use fresh IPs?",
    answer:
      "Boosters route through IPs consistent with your region rather than random datacenter hops, which helps mimic organic login patterns.",
  },
  {
    id: "as8",
    categoryId: "account-safety",
    question: "Is duo boosting safer than account sharing?",
    answer:
      "Duo boosting avoids sharing credentials since you play on your own machine. It can reduce certain risks and is a popular alternative.",
  },
  {
    id: "as9",
    categoryId: "account-safety",
    question: "How do you vet boosters?",
    answer:
      "Applicants demonstrate rank history, complete trials, and agree to conduct rules. Poor performance or safety violations lead to removal from the roster.",
  },
  {
    id: "as10",
    categoryId: "account-safety",
    question: "Can I limit which agents or champions are played?",
    answer:
      "Absolutely—leave detailed preferences in your order. Boosters will stick to your pool unless you approve exceptions.",
  },

  {
    id: "b1",
    categoryId: "boosting",
    question: "What is rank boosting?",
    answer:
      "Rank boosting is playing ranked matches on your behalf—or with you in duo—until your account reaches the purchased division or rating.",
  },
  {
    id: "b2",
    categoryId: "boosting",
    question: "How long does a typical boost take?",
    answer:
      "Time varies by starting rank, target rank, and LP gains. Estimates are shown before checkout and updates appear on your dashboard.",
  },
  {
    id: "b3",
    categoryId: "boosting",
    question: "Can I pause my boost?",
    answer:
      "Yes—message your booster or support to schedule breaks around your own play sessions or maintenance windows.",
  },
  {
    id: "b4",
    categoryId: "boosting",
    question: "What if I demote during service?",
    answer:
      "Boosters continue until the purchased outcome is achieved. Talk to support if something unusual happens so we can adjust the plan.",
  },
  {
    id: "b5",
    categoryId: "boosting",
    question: "Do you offer placements?",
    answer:
      "Placement bundles place out your provisional matches toward a strong starting rank. Requirements differ per title—check the game page.",
  },
  {
    id: "b6",
    categoryId: "boosting",
    question: "What are net wins?",
    answer:
      "Net wins mean your booster secures more wins than losses by the purchased margin, counting only progress toward that balance.",
  },
  {
    id: "b7",
    categoryId: "boosting",
    question: "Can I spectate while someone plays?",
    answer:
      "Spectating depends on the game\u2019s client features. Some titles allow spectating friends\u2019 games; otherwise duo queue offers live participation.",
  },
  {
    id: "b8",
    categoryId: "boosting",
    question: "Do boosters use voice chat?",
    answer:
      "Usually boosters remain silent or mute voice to avoid unnecessary exposure. Specify preferences when ordering duo sessions.",
  },
  {
    id: "b9",
    categoryId: "boosting",
    question: "What happens at high elo?",
    answer:
      "Queues can be longer and games harder—completion estimates widen accordingly. We assign proven boosters for those brackets.",
  },
  {
    id: "b10",
    categoryId: "boosting",
    question: "Can I order coaching instead?",
    answer:
      "Coaching-focused sessions may be listed separately. Ask live chat if you want replay reviews or structured lessons instead of pure rank gains.",
  },
  {
    id: "b11",
    categoryId: "boosting",
    question: "Are unrated or swift play orders supported?",
    answer:
      "Where offered, casual queues help grind XP or complete missions. Availability depends on the specific game\u2019s catalog.",
  },

  {
    id: "op1",
    categoryId: "order-process",
    question: "How do I place an order?",
    answer:
      "Pick your game and service, configure rank range or wins, add notes, then checkout. You\u2019ll receive dashboard access immediately after payment.",
  },
  {
    id: "op2",
    categoryId: "order-process",
    question: "When does my order start?",
    answer:
      "Most orders begin within two hours; priority slots aim for under thirty minutes. You\u2019ll see assignment status in real time.",
  },
  {
    id: "op3",
    categoryId: "order-process",
    question: "How do I track progress?",
    answer:
      "The dashboard shows match history summaries, chat with your booster, and percentage completion when applicable.",
  },
  {
    id: "op4",
    categoryId: "order-process",
    question: "Can I change notes after purchase?",
    answer:
      "Minor edits are fine via dashboard chat before heavy progress. Major scope changes may need support to adjust pricing or timelines.",
  },
  {
    id: "op5",
    categoryId: "order-process",
    question: "What if my booster goes offline?",
    answer:
      "Temporary gaps happen—boosters sleep too. If stalls exceed norms, ping support and we\u2019ll reassign or escalate.",
  },
  {
    id: "op6",
    categoryId: "order-process",
    question: "Do you offer refunds?",
    answer:
      "Eligible refunds follow our policy based on work delivered and dispute review. Start with support for the fastest resolution.",
  },
  {
    id: "op7",
    categoryId: "order-process",
    question: "Can I upgrade mid-order?",
    answer:
      "Often yes—support can quote the delta to extend targets or add duo. Completed portions remain billed accordingly.",
  },
  {
    id: "op8",
    categoryId: "order-process",
    question: "How do screenshots work?",
    answer:
      "Boosters may upload proof of rank milestones to your order timeline so you can verify progress without logging in mid-session.",
  },
  {
    id: "op9",
    categoryId: "order-process",
    question: "What happens when my boost completes?",
    answer:
      "You\u2019ll get a completion notice, final screenshot where applicable, and a prompt to confirm satisfaction or open a ticket if something\u2019s off.",
  },
  {
    id: "op10",
    categoryId: "order-process",
    question: "Can companies or teams bulk order?",
    answer:
      "Contact sales for volume pricing or roster coordination—we\u2019ll structure timelines across multiple accounts.",
  },

  {
    id: "p1",
    categoryId: "payments",
    question: "Which payment methods do you accept?",
    answer:
      "We accept major cards and popular processors shown at checkout. Region-specific methods appear when supported.",
  },
  {
    id: "p2",
    categoryId: "payments",
    question: "Is checkout secure?",
    answer:
      "Payments run through PCI-compliant providers—we don\u2019t store raw card data on our servers.",
  },
  {
    id: "p3",
    categoryId: "payments",
    question: "Can I pay in installments?",
    answer:
      "Installments depend on your processor or wallet. If available, you\u2019ll see BNPL options during payment.",
  },
  {
    id: "p4",
    categoryId: "payments",
    question: "Do prices include taxes?",
    answer:
      "Taxes or VAT follow local rules and appear before you confirm payment where applicable.",
  },
  {
    id: "p5",
    categoryId: "payments",
    question: "What currency am I charged in?",
    answer:
      "Your cart displays the billing currency. FX conversions are handled by your bank if paying internationally.",
  },
  {
    id: "p6",
    categoryId: "payments",
    question: "Will I get an invoice?",
    answer: "Receipts are emailed post-payment; businesses can request formal invoices through support.",
  },
  {
    id: "p7",
    categoryId: "payments",
    question: "Can I use store credit?",
    answer:
      "Account credits from promotions or resolutions apply at checkout when active on your profile.",
  },
  {
    id: "p8",
    categoryId: "payments",
    question: "Why was my payment declined?",
    answer:
      "Issuers sometimes flag digital purchases—try another card or verify 3-D Secure prompts. Support cannot override bank decisions.",
  },
  {
    id: "p9",
    categoryId: "payments",
    question: "Do you offer cryptocurrency?",
    answer: "Availability varies—ask live chat for current pilot programs or regional rollout.",
  },
  {
    id: "p10",
    categoryId: "payments",
    question: "Are there hidden fees?",
    answer:
      "All mandatory fees are summarized before you pay. Optional add-ons are clearly labeled in the configurator.",
  },

  {
    id: "gs1",
    categoryId: "games-services",
    question: "Do you support consoles?",
    answer:
      "Console coverage depends on the title and cross-play rules—filter catalog entries by platform or ask support.",
  },
  {
    id: "gs2",
    categoryId: "games-services",
    question: "Can I order multiple games at once?",
    answer:
      "Yes—each game uses its own order so boosters with the right expertise get assigned per title.",
  },
  {
    id: "gs3",
    categoryId: "games-services",
    question: "What about seasonal resets?",
    answer:
      "Season transitions change ladders—check banners on game pages for rollover discounts or paused queues.",
  },
  {
    id: "gs4",
    categoryId: "games-services",
    question: "Are region locks respected?",
    answer:
      "Orders default to the region tied to your account. Misconfigured regions slow progress—double-check before buying.",
  },
  {
    id: "gs5",
    categoryId: "games-services",
    question: "Do you handle missions or battle passes?",
    answer:
      "Mission farming appears where listed. Specify objectives in notes so boosters prioritize them.",
  },
  {
    id: "gs6",
    categoryId: "games-services",
    question: "Can I mix ranked and unrated?",
    answer: "Some bundles combine queues—where unsupported, split separate orders for clarity.",
  },
  {
    id: "gs7",
    categoryId: "games-services",
    question: "Are esports league accounts eligible?",
    answer:
      "Competitive league accounts may have additional restrictions—disclose league status up front to avoid eligibility issues.",
  },
  {
    id: "gs8",
    categoryId: "games-services",
    question: "What if a game patches mid-order?",
    answer:
      "Meta shifts can extend timelines—we communicate delays when patches materially affect climb speed.",
  },
  {
    id: "gs9",
    categoryId: "games-services",
    question: "Can you login via Steam or Riot clients?",
    answer:
      "Login flows mirror whatever the publisher requires. Follow credential prompts from your booster via secure channels.",
  },
  {
    id: "gs10",
    categoryId: "games-services",
    question: "Do you sell accounts?",
    answer: "No—we boost accounts you already own. We don\u2019t broker account sales.",
  },

  {
    id: "d1",
    categoryId: "discounts",
    question: "Do you have promo codes?",
    answer:
      "Seasonal codes appear in newsletters or partner campaigns—enter them at checkout before paying.",
  },
  {
    id: "d2",
    categoryId: "discounts",
    question: "Is there a loyalty program?",
    answer:
      "Returning customers may earn tier perks such as cashback or faster assignment—check your dashboard promotions tab.",
  },
  {
    id: "d3",
    categoryId: "discounts",
    question: "Can I combine discounts?",
    answer:
      "Usually one promo applies per order unless explicitly stated otherwise in the campaign rules.",
  },
  {
    id: "d4",
    categoryId: "discounts",
    question: "Do referrals earn rewards?",
    answer:
      "Referral credits may be available periodically—ask support for the active structure and payout timing.",
  },
  {
    id: "d5",
    categoryId: "discounts",
    question: "Are bulk purchases discounted?",
    answer:
      "Large bundles or multi-account deals can qualify for sales quotes—email sales with scope.",
  },
  {
    id: "d6",
    categoryId: "discounts",
    question: "Why didn\u2019t my code work?",
    answer:
      "Codes expire, hit usage caps, or exclude certain SKUs. Error messages at checkout hint at the reason.",
  },
  {
    id: "d7",
    categoryId: "discounts",
    question: "Do influencers get codes?",
    answer:
      "Creator partnerships run through our marketing team—reach out via the partnerships inbox linked in the footer.",
  },
  {
    id: "d8",
    categoryId: "discounts",
    question: "Will Black Friday stack with loyalty?",
    answer:
      "Stacking rules are defined per event—we publish clear terms on banners during the sale window.",
  },
];
