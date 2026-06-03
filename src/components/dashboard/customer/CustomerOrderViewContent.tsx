"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { userProfile } from "../dashboardData";
import { ProfileIdentity } from "../molecules";
import {
  AccountDetailsPanel,
  DescriptionPanel,
  GameServiceHeroCard,
  OrderActionToolbar,
  OrderChatPanel,
  OrderDetailsPanel,
  sampleOrderView,
  sampleUnpaidOrderView,
} from "../order-view";
import { MobileDrawer } from "../organisms";

type Props = { orderId: string };

function ChallengerBadge({ size = "lg", id = "desktop" }: { size?: "sm" | "lg"; id?: string }) {
  const isLg = size === "lg";
  const gradId = `hex-challenger-${id}`;
  const hexW = isLg ? 48 : 28;
  const hexH = isLg ? 48 : 28;
  const iconSz = isLg ? "h-[28px] w-[28px]" : "h-[16px] w-[16px]";
  const glowSz = isLg ? 50 : 30;
  return (
    <div className={`flex items-center ${isLg ? "flex-col gap-0.5" : "flex-row gap-2"}`}>
      <div className="relative flex items-center justify-center">
        <div
          aria-hidden
          className="animate-orb-breathe pointer-events-none absolute rounded-full"
          style={{
            width: glowSz,
            height: glowSz,
            background: "#658dda",
            filter: `blur(${isLg ? 18 : 14}px)`,
            "--orb-opacity": "0.4",
          } as React.CSSProperties}
        />
        <svg width={hexW} height={hexH} viewBox="0 0 80 92" className="relative z-10" fill="none">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7ba0e0" />
              <stop offset="100%" stopColor="#4a6aaa" />
            </linearGradient>
          </defs>
          <polygon points="40,0 77.32,20 77.32,72 40,92 2.68,72 2.68,20" fill={`url(#${gradId})`} />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/rewards/tier-bolt.svg" alt="" className={`absolute z-20 ${iconSz}`} />
      </div>
      <span className={`relative z-10 font-body font-bold text-white ${isLg ? "text-sm" : "text-xs"}`}>
        Challenger
      </span>
    </div>
  );
}

export default function CustomerOrderViewContent({ orderId: _orderId }: Props) {
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(false);
  const isUnpaidOrder = _orderId === "4269525";
  const view = isUnpaidOrder ? sampleUnpaidOrderView : sampleOrderView;

  const leftColumn = (
    <div className="flex min-w-0 flex-1 flex-col gap-4 lg:gap-6">
      <div
        className="flex items-center justify-between gap-4 overflow-hidden rounded-3xl px-4 py-4 lg:px-8 lg:py-6"
        style={{ background: "rgba(56,56,82,0.3)" }}
      >
        <ProfileIdentity
          avatarSrc={userProfile.avatarUrl}
          avatarSize={64}
          welcomeText="Welcome,"
          welcomeClassName="font-body text-xs leading-[18px] text-white lg:text-base"
          name={userProfile.username}
          nameClassName="font-body text-base font-bold leading-6 text-white lg:font-heading lg:text-2xl"
          meta={<div className="lg:hidden"><ChallengerBadge size="sm" id="mobile" /></div>}
          groupWelcomeName
          onAvatarClick={() => router.push("/app/customer/profile")}
        />
        <div className="hidden lg:block"><ChallengerBadge size="lg" /></div>
      </div>

      <OrderActionToolbar
        onAdditionalPayment={() => {}}
        onSupport={() => {}}
        onReviewBooster={() => {}}
        onPurchaseBoost={() => router.push("/")}
      />

      {view.isUnpaid && (
        <div
          className="relative overflow-hidden rounded-3xl border-2 px-6 py-6 lg:px-8 lg:py-6"
          style={{
            background: "rgba(56,56,82,0.3)",
            borderColor: "rgba(163,45,5,0.4)",
          }}
        >
          {/* Decorative background money-off icon — desktop only */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-15 min-[1620px]:block"
          >
            <div className="flex h-[118px] w-[118px] items-center justify-center">
              <span className="absolute inset-0 rounded-full border-2 border-white/20" />
              <span className="absolute inset-[-4px] rounded-full border border-white/10" />
              <span
                className="flex h-[70px] w-[70px] items-center justify-center rounded-2xl border border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dashboard/orderview/icons/status-not-started.svg"
                  alt=""
                  className="h-[50px] w-[50px]"
                />
              </span>
            </div>
          </div>

          <div className="relative flex flex-col gap-6 min-[1620px]:flex-row min-[1620px]:items-center min-[1620px]:justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading text-2xl font-semibold text-white min-[1620px]:text-[32px]">
                Awaiting Payment
              </h2>
              <p className="font-body text-base text-white min-[1620px]:text-lg">
                Complete your payment to start your boosting order
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-body text-sm font-medium uppercase text-white">total</span>
                <span className="font-heading text-[30px] font-bold leading-[38px] text-brand-main">
                  {view.unpaidTotal}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4 min-[1620px]:w-[300px] min-[1620px]:shrink-0">
              <button
                type="button"
                className="flex items-center justify-center gap-4 rounded-3xl bg-[rgba(56,56,82,0.3)] px-8 py-6 font-body text-xl font-bold text-white transition-all hover:bg-[rgba(56,56,82,0.6)] hover:shadow-[0_0_12px_rgba(255,255,255,0.05)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/icons/cancel-icon.svg" alt="" className="h-6 w-6" />
                Cancel Order
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-4 rounded-3xl border border-brand-light bg-[rgba(23,25,31,0.5)] px-8 py-6 font-body text-xl font-bold tracking-[0.4px] text-white shadow-[0_4px_44px_rgba(255,92,0,0.2)] backdrop-blur-[3px] transition-all hover:bg-[rgba(23,25,31,0.8)] hover:shadow-[0_4px_44px_rgba(255,92,0,0.4)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dashboard/icons/check-all-white.svg"
                  alt=""
                  className="h-6 w-6"
                />
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={view.isUnpaid ? "pointer-events-none opacity-40" : ""}>
        <GameServiceHeroCard hero={view.hero} />
      </div>

      <div className="h-[510px] lg:h-[600px] min-[1280px]:hidden">
        <OrderChatPanel view={view} hideWarningBanner />
      </div>

      {/* Mobile: report warning below chat to save vertical space */}
      {view.showBoosterPoachingWarning && (
        <div
          className="flex items-center justify-between gap-4 rounded-2xl px-5 py-3 min-[1280px]:hidden"
          style={{
            background:
              "linear-gradient(97deg, rgba(255,151,93,0.2) 0%, rgba(255,92,0,0.2) 50%, rgba(163,45,5,0.2) 100%)",
          }}
        >
          <p className="font-body text-[11px] leading-snug text-white/85">
            Has a booster contacted you after your order? This violates our terms. Report it to earn
            a <span className="font-semibold text-white">$75–$150</span> reward and help keep the
            platform safe.
          </p>
          <button
            type="button"
            className="group flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-2xl bg-[#17191f]/50 px-6 font-body text-sm font-medium uppercase text-white transition-all hover:text-[#ff975d] active:scale-[0.97]"
          >
            Report
          </button>
        </div>
      )}

      {/* Mobile + small laptop: description right after chat */}
      <div className={`min-[1620px]:hidden ${view.isUnpaid ? "pointer-events-none opacity-40" : ""}`}>
        <DescriptionPanel title={view.description.title} body={view.description.body} />
      </div>

      <div className={`flex flex-col gap-4 min-[1620px]:flex-row min-[1620px]:gap-6 ${view.isUnpaid ? "pointer-events-none opacity-40" : ""}`}>
        <div className="order-2 min-[1620px]:order-1 min-[1620px]:flex-1">
          <OrderDetailsPanel rows={view.orderDetails} />
        </div>
        <div className="order-1 min-[1620px]:order-2 min-[1620px]:flex-1">
          <AccountDetailsPanel rows={view.accountDetails} chips={view.accountDetailChips} />
        </div>
      </div>

      <div className={`hidden min-[1620px]:block ${view.isUnpaid ? "pointer-events-none opacity-40" : ""}`}>
        <DescriptionPanel title={view.description.title} body={view.description.body} />
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-6 min-[1280px]:flex-row min-[1280px]:items-start min-[1280px]:gap-8">
        {leftColumn}
        <aside className="hidden min-[1280px]:block min-[1280px]:w-[400px] min-[1280px]:shrink-0 min-[1620px]:w-[490px]">
          <div className="sticky top-6 h-[calc(100vh-6rem)] max-h-[960px] min-h-[720px]">
            <OrderChatPanel view={view} />
          </div>
        </aside>
      </div>

      <MobileDrawer open={chatOpen} onClose={() => setChatOpen(false)}>
        <OrderChatPanel view={view} inDrawer />
      </MobileDrawer>
    </>
  );
}
