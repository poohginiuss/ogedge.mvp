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
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex h-[72px] items-center gap-4 rounded-2xl px-8 transition-colors"
      style={{ background: hovered ? "#2d2d40" : "rgba(56,56,82,0.3)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/dashboard/orderview/icons/toolbar-support.svg"
        alt=""
        className="h-7 w-7"
      />
      <span className="whitespace-nowrap font-body text-xl font-semibold text-white">Support</span>
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

  return (
    <>
      {/* Desktop */}
      <div className="hidden items-stretch gap-4 lg:flex">
        {buttons.map((btn) => (
          <StatusButton key={btn.label} btn={btn} size="desktop" />
        ))}
        <SupportButton onClick={onSupport} />
      </div>

      {/* Mobile */}
      <div className="flex items-center gap-2 lg:hidden">
        {buttons.map((btn) => (
          <StatusButton key={btn.label} btn={btn} size="mobile" />
        ))}
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
      {/* Completion Time + Status Action Buttons — same row on desktop */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="flex items-center justify-between gap-4 lg:shrink-0">
          <div className="flex flex-col text-white">
            <span className="font-body text-sm font-normal leading-5 lg:text-2xl lg:font-semibold lg:leading-none">
              Completion Time
            </span>
            <span className="font-heading text-lg font-bold leading-7 lg:text-[32px] lg:font-semibold lg:leading-none lg:mt-1">
              {view.completionTime}
            </span>
          </div>
          <div className="lg:hidden">
            <button
              type="button"
              onClick={handleSupport}
              className="flex h-10 items-center gap-2 rounded-2xl px-4 transition-colors hover:bg-[#2d2d40]"
              style={{ background: "rgba(56,56,82,0.3)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dashboard/orderview/icons/toolbar-support.svg"
                alt=""
                className="h-5 w-5"
              />
              <span className="font-body text-sm font-semibold text-white">Support</span>
            </button>
          </div>
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

      <div className="h-[600px] lg:hidden">
        <OrderChatPanel view={view} role="booster" />
      </div>

      <div className="lg:hidden">
        <DescriptionPanel title={view.description.title} body={view.description.body} />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div className="order-2 lg:order-1 lg:flex-1">
          <OrderDetailsPanel rows={view.orderDetails} />
        </div>
        <div className="order-1 lg:order-2 lg:flex-1">
          <AccountDetailsPanel rows={view.accountDetails} chips={view.accountDetailChips} />
        </div>
      </div>

      <div className="hidden lg:block">
        <DescriptionPanel title={view.description.title} body={view.description.body} />
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        {leftColumn}
        <aside className="hidden lg:block lg:w-[490px] lg:shrink-0">
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
