"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AccountDetailsPanel,
  DescriptionPanel,
  GameServiceHeroCard,
  OrderChatPanel,
  OrderDetailsPanel,
} from "../order-view";
import type { OrderHeroStatus } from "../order-view/orderViewData";
import { MobileDrawer } from "../organisms";
import type { BoosterOrderStatus } from "./boosterOrderViewData";
import { sampleBoosterOrderView } from "./boosterOrderViewData";

type Props = { orderId: string };

type StatusButtonDef = {
  label: string;
  bg: string;
  hoverBg: string;
  textColor: string;
  shadow: string;
  disabled?: boolean;
  onClick: () => void;
};

function mapBoosterStatusToHero(status: BoosterOrderStatus): OrderHeroStatus {
  switch (status) {
    case "not-started":
      return "not-started";
    case "started":
      return "in-progress";
    case "paused":
      return "paused";
    case "completed":
      return "complete";
  }
}

function SupportButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-[72px] cursor-pointer items-center gap-4 rounded-2xl border border-transparent px-8 transition-all hover:border-[#ff975d] hover:text-[#ff975d] hover:shadow-[0_4px_34px_rgba(255,92,0,0.3)] active:scale-[0.97]"
      style={{ background: "rgba(56,56,82,0.4)", backdropFilter: "blur(3px)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/dashboard/orderview/icons/toolbar-support.svg"
        alt=""
        className="h-7 w-7 shrink-0 transition-all group-hover:[filter:brightness(0)_saturate(100%)_invert(55%)_sepia(92%)_saturate(600%)_hue-rotate(340deg)_brightness(100%)_contrast(100%)]"
      />
      <span className="whitespace-nowrap font-body text-xl font-semibold text-white transition-colors group-hover:text-[#ff975d]">Support</span>
    </button>
  );
}

function StatusButton({ btn, size }: { btn: StatusButtonDef; size: "desktop" | "mobile" }) {
  const [hovered, setHovered] = useState(false);
  const isDesktop = size === "desktop";

  return (
    <button
      type="button"
      disabled={btn.disabled}
      onClick={btn.onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={
        isDesktop
          ? "flex h-[72px] items-center justify-center rounded-2xl px-6 font-body text-xl font-bold uppercase tracking-wide transition-all"
          : "flex h-12 flex-1 items-center justify-center rounded-2xl font-body text-base font-bold uppercase tracking-wide transition-all"
      }
      style={{
        background: !btn.disabled && hovered ? btn.hoverBg : btn.bg,
        color: btn.textColor,
        boxShadow: btn.shadow,
        opacity: btn.disabled ? 0.4 : 1,
        cursor: btn.disabled ? "not-allowed" : "pointer",
      }}
    >
      {btn.label}
    </button>
  );
}

function BoosterStatusActionBar({
  status,
  onStart,
  onPause,
  onUnpause,
  onComplete,
  onSupport,
}: {
  status: BoosterOrderStatus;
  onStart: () => void;
  onPause: () => void;
  onUnpause: () => void;
  onComplete: () => void;
  onSupport: () => void;
}) {
  const buttons: StatusButtonDef[] = [];

  switch (status) {
    case "not-started":
      buttons.push({
        label: "Start Order",
        bg: "#4285f4",
        hoverBg: "#3b78e0",
        textColor: "#ffffff",
        shadow: "0 4px 7px rgba(66,133,244,0.4)",
        onClick: onStart,
      });
      buttons.push({
        label: "Mark as Complete",
        bg: "#34a853",
        hoverBg: "#2d9248",
        textColor: "#ffffff",
        shadow: "0 4px 7px rgba(52,168,83,0.4)",
        disabled: true,
        onClick: onComplete,
      });
      break;
    case "started":
      buttons.push({
        label: "Pause",
        bg: "#ffb000",
        hoverBg: "#e6a000",
        textColor: "#17191f",
        shadow: "0 4px 7px rgba(255,176,0,0.4)",
        onClick: onPause,
      });
      buttons.push({
        label: "Mark as Complete",
        bg: "#34a853",
        hoverBg: "#2d9248",
        textColor: "#ffffff",
        shadow: "0 4px 7px rgba(52,168,83,0.4)",
        onClick: onComplete,
      });
      break;
    case "paused":
      buttons.push({
        label: "Unpause",
        bg: "#c2272d",
        hoverBg: "#a82025",
        textColor: "#ffffff",
        shadow: "0 4px 7px rgba(194,39,45,0.4)",
        onClick: onUnpause,
      });
      buttons.push({
        label: "Mark as Complete",
        bg: "#34a853",
        hoverBg: "#2d9248",
        textColor: "#ffffff",
        shadow: "0 4px 7px rgba(52,168,83,0.4)",
        disabled: true,
        onClick: onComplete,
      });
      break;
    case "completed":
      return null;
  }

  const completeBtn = buttons.find((b) => b.label.includes("Complete"));
  const actionBtn = buttons.find((b) => !b.label.includes("Complete"));

  return (
    <>
      {/* Desktop (1620px+) */}
      <div className="hidden items-stretch gap-4 min-[1620px]:flex">
        {buttons.map((btn) => (
          <StatusButton key={btn.label} btn={btn} size="desktop" />
        ))}
        <SupportButton onClick={onSupport} />
      </div>

      {/* Mobile + small laptop: COMPLETE pill + action icon + support icon */}
      <div className="flex items-center gap-2 min-[1620px]:hidden">
        {completeBtn && (
          <button
            type="button"
            disabled={completeBtn.disabled}
            onClick={completeBtn.onClick}
            className="flex h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-2xl px-5 font-body text-sm font-bold uppercase tracking-wide transition-all"
            style={{
              background: completeBtn.bg,
              color: completeBtn.textColor,
              boxShadow: completeBtn.shadow,
              opacity: completeBtn.disabled ? 0.4 : 1,
              cursor: completeBtn.disabled ? "not-allowed" : "pointer",
            }}
          >
            Complete
          </button>
        )}
        {actionBtn && (
          <button
            type="button"
            disabled={actionBtn.disabled}
            onClick={actionBtn.onClick}
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl transition-all active:scale-95"
            style={{
              background: actionBtn.bg,
              boxShadow: actionBtn.shadow,
              opacity: actionBtn.disabled ? 0.4 : 1,
              cursor: actionBtn.disabled ? "not-allowed" : "pointer",
            }}
            aria-label={actionBtn.label}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={status === "started" ? "/images/dashboard/orderview/icons/btn-pause.svg" : "/images/dashboard/orderview/icons/btn-play.svg"}
              alt=""
              className="h-6 w-6"
            />
          </button>
        )}
        <button
          type="button"
          onClick={onSupport}
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl transition-all hover:opacity-80 active:scale-95"
          style={{ background: "rgba(56,56,82,0.5)" }}
          aria-label="Support"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/orderview/icons/toolbar-support.svg" alt="" className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}

export default function BoosterOrderViewContent({ orderId: _orderId }: Props) {
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(false);
  const [boosterStatus, setBoosterStatus] = useState(sampleBoosterOrderView.boosterStatus);
  const handleSupport = () => router.push("/app/booster/support");
  const view = {
    ...sampleBoosterOrderView,
    hero: {
      ...sampleBoosterOrderView.hero,
      status: mapBoosterStatusToHero(boosterStatus),
    },
  };

  const leftColumn = (
    <div className="flex min-w-0 flex-1 flex-col gap-4 lg:gap-6">
      {/* Completion Time + Status Action Buttons — same row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex shrink-0 flex-col text-white">
          <span className="whitespace-nowrap font-body text-sm font-normal leading-5 min-[1620px]:text-2xl min-[1620px]:font-semibold min-[1620px]:leading-none">
            Completion Time
          </span>
          <span className="whitespace-nowrap font-heading text-lg font-bold leading-7 min-[1620px]:text-[32px] min-[1620px]:font-semibold min-[1620px]:leading-none min-[1620px]:mt-1">
            {view.completionTime}
          </span>
        </div>
        <BoosterStatusActionBar
          status={boosterStatus}
          onStart={() => setBoosterStatus("started")}
          onPause={() => setBoosterStatus("paused")}
          onUnpause={() => setBoosterStatus("started")}
          onComplete={() => setBoosterStatus("completed")}
          onSupport={handleSupport}
        />
      </div>

      <GameServiceHeroCard hero={view.hero} />

      <div className="h-[510px] lg:h-[600px] min-[1280px]:hidden">
        <OrderChatPanel view={view} role="booster" hideWarningBanner />
      </div>

      {view.showBoosterPoachingWarning && (
        <div
          className="flex items-center justify-between gap-4 rounded-2xl px-5 py-3 min-[1280px]:hidden"
          style={{
            background:
              "linear-gradient(97deg, rgba(255,151,93,0.2) 0%, rgba(255,92,0,0.2) 50%, rgba(163,45,5,0.2) 100%)",
          }}
        >
          <p className="font-body text-xs leading-snug text-white/80">
            Respect the customer and try to finish the order on time. Do not contact the customer
            outside the order chat, you will be heavily fined.
          </p>
          <button
            type="button"
            onClick={() => router.push("/app/booster/rules")}
            className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-2xl bg-[#17191f]/50 px-6 font-body text-sm font-medium uppercase text-white transition-all hover:text-[#ff975d] active:scale-[0.97]"
          >
            Rules
          </button>
        </div>
      )}

      <div className="min-[1620px]:hidden">
        <DescriptionPanel title={view.description.title} body={view.description.body} />
      </div>

      <div className="flex flex-col gap-4 min-[1620px]:flex-row min-[1620px]:gap-6">
        <div className="order-2 min-[1620px]:order-1 min-[1620px]:flex-1">
          <OrderDetailsPanel rows={view.orderDetails} />
        </div>
        <div className="order-1 min-[1620px]:order-2 min-[1620px]:flex-1">
          <AccountDetailsPanel rows={view.accountDetails} chips={view.accountDetailChips} />
        </div>
      </div>

      <div className="hidden min-[1620px]:block">
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
            <OrderChatPanel view={view} role="booster" />
          </div>
        </aside>
      </div>

      <MobileDrawer open={chatOpen} onClose={() => setChatOpen(false)}>
        <OrderChatPanel view={view} role="booster" inDrawer />
      </MobileDrawer>
    </>
  );
}
