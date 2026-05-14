"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconChip } from "./atoms";
import { userProfile } from "./dashboardData";
import { ProfileIdentity } from "./molecules";
import {
  AccountDetailsPanel,
  DescriptionPanel,
  GameServiceHeroCard,
  OrderActionToolbar,
  OrderChatPanel,
  OrderDetailsPanel,
  sampleOrderView,
} from "./orderView";
import { DashboardShell, MobileDrawer } from "./organisms";

const TIER_CHIP_BG = "rgba(255,92,0,0.2)";
const TIER_CHIP_COLOR = "#ff5c00";
const WALLET_CHIP_BG = "rgba(52,168,83,0.2)";
const WALLET_CHIP_COLOR = "#34a853";

type Props = { orderId: string };

/**
 * Customer "View Order" page. Highlights `active-orders` in the sidebar
 * because every entry point lands here from the Active Orders list.
 *
 * Layout:
 *   - Desktop (lg+): two columns — left scroll-stack (identity, toolbar,
 *     hero, details, description); right is a sticky 490px chat panel.
 *   - Mobile: single column; chat is reachable via a drawer (📨 button
 *     on the toolbar's overflow menu) and is also stacked inline so the
 *     content order in the design (chat right after the hero) is kept.
 */
export default function CustomerOrderViewContent({ orderId: _orderId }: Props) {
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(false);
  // Until the real backend lands we render the sample view model;
  // `_orderId` is intentionally unused so the URL stays meaningful.
  const view = sampleOrderView;

  // Per Figma 1491:7440 the identity (welcome + @username) sits left and
  // the badges (NOVICE / wallet balance) sit on the right edge of the
  // same row — different from the customer dashboard's profile card
  // where badges sit *under* the name.
  const profileBadges = (
    <div className="flex items-center gap-2">
      <IconChip
        background={TIER_CHIP_BG}
        color={TIER_CHIP_COLOR}
        icon="/images/dashboard/icons/medal-star-orange.svg"
      >
        {userProfile.tierName}
      </IconChip>
      <IconChip
        background={WALLET_CHIP_BG}
        color={WALLET_CHIP_COLOR}
        icon="/images/dashboard/icons/wallet-green.svg"
        size="sm"
        weight="semibold"
      >
        {userProfile.walletBalance}
      </IconChip>
    </div>
  );

  const leftColumn = (
    <div className="flex min-w-0 flex-1 flex-col gap-4 lg:gap-6">
      <div
        className="flex items-center justify-between gap-4 overflow-hidden rounded-3xl px-4 py-4 lg:px-8 lg:py-6"
        style={{ background: "rgba(56,56,82,0.3)" }}
      >
        {/* Mobile renders the badges *inside* ProfileIdentity (under the
            username) per Figma 1619:6676. Desktop renders the badges as
            a separate sibling on the right edge per Figma 1491:7440. */}
        <ProfileIdentity
          avatarSrc={userProfile.avatarUrl}
          avatarSize={64}
          welcomeText="Welcome,"
          welcomeClassName="font-body text-xs leading-[18px] text-white lg:text-base"
          name={userProfile.username}
          nameClassName="font-body text-base font-bold leading-6 text-white lg:font-heading lg:text-2xl"
          meta={<div className="lg:hidden">{profileBadges}</div>}
          groupWelcomeName
        />
        <div className="hidden lg:block">{profileBadges}</div>
      </div>

      <OrderActionToolbar
        onMore={() => setChatOpen(true)}
        onAdditionalPayment={() => {
          // TODO: open AdditionalPayment modal (next iteration).
        }}
        onSupport={() => {
          // TODO: open Support ticket modal (next iteration).
        }}
        onReviewBooster={() => {
          // TODO: open ReviewBooster modal (next iteration).
        }}
        onPurchaseBoost={() => router.push("/")}
      />

      <GameServiceHeroCard hero={view.hero} />

      {/* Mobile-only inline chat — desktop renders it as the right column */}
      <div className="lg:hidden">
        <OrderChatPanel view={view} />
      </div>

      {/* Per Figma 1491:7440 the order/account detail panels sit ABOVE
          the description card. Mobile order (Figma 1619:6676) places
          Account Details first, then Order Details, then Description. */}
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div className="order-2 lg:order-1 lg:flex-1">
          <OrderDetailsPanel rows={view.orderDetails} />
        </div>
        <div className="order-1 lg:order-2 lg:flex-1">
          <AccountDetailsPanel rows={view.accountDetails} chips={view.accountDetailChips} />
        </div>
      </div>

      <DescriptionPanel title={view.description.title} body={view.description.body} />
    </div>
  );

  return (
    <DashboardShell
      contentClassName="flex flex-col gap-8 p-6 lg:p-16"
      activeView="active-orders"
      onViewChange={(id) => {
        // Sidebar nav on this page just routes back to the dashboard
        // tabs — there's no in-page tab state to worry about.
        if (id === "dashboard") router.push("/app/customer");
        else if (id === "active-orders") router.push("/app/customer");
        else if (id === "completed-orders") router.push("/app/customer");
        else if (id === "support") router.push("/app/customer");
      }}
      mobileDrawer={
        <MobileDrawer open={chatOpen} onClose={() => setChatOpen(false)}>
          <OrderChatPanel view={view} inDrawer />
        </MobileDrawer>
      }
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        {leftColumn}
        {/* Sticky chat column — Figma keeps the chat visible while the
            user scrolls the left column. `top-6` matches the page's
            `lg:p-16` content padding minus a touch. Height is capped so
            the inner message list (which has `min-h-0 overflow-y-auto`)
            scrolls instead of pushing the panel taller. */}
        <aside className="hidden lg:block lg:w-[490px] lg:shrink-0">
          <div className="sticky top-6 h-[calc(100vh-8rem)] max-h-[820px] min-h-[640px]">
            <OrderChatPanel view={view} />
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}
