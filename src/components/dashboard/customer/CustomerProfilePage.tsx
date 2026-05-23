"use client";

import { useState } from "react";
import { IconChip } from "../atoms";
import { userProfile } from "../dashboardData";
import { AvatarSettingsModal } from "../molecules/AvatarSettingsModal";
import { DashboardReferralCard } from "./DashboardReferralCard";
import { EditPreferencesModal } from "./EditPreferencesModal";

const summaryRows = [
  { label: "Loyalty Points", value: "0" },
  { label: "Total Saved", value: "$0.00" },
  { label: "Completed Orders", value: "0" },
  { label: "Store Credit", value: "$0.00" },
];

const preferencesFields = [
  { label: "Game Preferences", value: "-" },
  { label: "Nickname", value: "-" },
  { label: "Timezone", value: "-" },
];

const contactFields = [
  { label: "Phone", value: "-" },
  { label: "Discord Username", value: "-" },
];

function SectionHeader({
  title,
  onEdit,
}: {
  title: string;
  onEdit?: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-body text-xl font-bold text-white lg:text-2xl lg:leading-8">
        {title}
      </h2>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/icons/edit-icon.svg"
            alt=""
            className="h-4 w-4"
          />
          <span className="font-body text-sm font-bold uppercase tracking-[0.56px] text-white lg:text-lg lg:tracking-[0.72px]">
            Edit
          </span>
        </button>
      )}
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-body text-xs font-bold uppercase leading-[18px] text-white lg:text-sm lg:leading-5">
        {label}
      </span>
      <span className="font-body text-lg font-bold leading-7 text-white">
        {value}
      </span>
    </div>
  );
}

function SummaryCard() {
  return (
    <div
      className="flex flex-col gap-2 overflow-hidden rounded-3xl p-6 lg:p-8"
      style={{ background: "rgba(56,56,82,0.3)" }}
    >
      {summaryRows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between rounded-lg px-2 py-1"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <span
            className="font-body text-sm font-bold"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            {row.label}
          </span>
          <span className="font-body text-base font-semibold text-brand-light">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function ChangePasswordButton() {
  return (
    <div
      className="overflow-hidden rounded-3xl p-6 lg:p-8"
      style={{ background: "rgba(56,56,82,0.3)" }}
    >
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-brand-light px-6 py-5 transition-colors hover:bg-brand-light/10"
        style={{ background: "rgba(23,25,31,0.5)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dashboard/icons/lock-icon.svg"
          alt=""
          className="h-6 w-6"
        />
        <span className="font-body text-base font-bold uppercase tracking-[0.32px] text-brand-light">
          Change Password
        </span>
      </button>
    </div>
  );
}

function ProfileCard({ card = true, onAvatarEdit }: { card?: boolean; onAvatarEdit?: () => void }) {
  return (
    <div
      className={
        card
          ? "flex gap-4 overflow-hidden rounded-3xl p-6 lg:items-center lg:gap-8 lg:py-8 lg:pl-8 lg:pr-16"
          : "flex gap-4"
      }
      style={card ? { background: "rgba(56,56,82,0.3)" } : undefined}
    >
      {/* Avatar with edit badge */}
      <div className="relative shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={userProfile.avatarUrl}
          alt="Avatar"
          className="h-16 w-16 rounded-full object-cover lg:h-[120px] lg:w-[120px]"
        />
        {/* Mobile edit badge */}
        <button
          type="button"
          onClick={onAvatarEdit}
          className="absolute bottom-4 left-[20px] flex items-center rounded-full border-2 border-dark-surface bg-dark-border p-1 transition-colors hover:bg-brand-main lg:hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/icons/edit-icon.svg"
            alt="Edit avatar"
            className="h-3 w-3"
          />
        </button>
        {/* Desktop edit badge */}
        <button
          type="button"
          onClick={onAvatarEdit}
          className="absolute top-10 right-[-15px] hidden items-center rounded-full border-4 border-dark-surface bg-dark-border p-1 transition-colors hover:bg-brand-main lg:flex"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/icons/edit-icon.svg"
            alt="Edit avatar"
            className="h-4 w-4"
          />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col">
          <h1 className="font-body text-base font-bold leading-6 text-white lg:font-heading lg:text-[32px] lg:font-semibold lg:leading-normal">
            Test Customer
          </h1>
          <p className="font-body text-xs text-white lg:text-xl lg:font-bold">
            testcustomer@emailexample.com
          </p>
          <p className="font-body text-xs text-white/60 lg:hidden">
            Member since May 2025
          </p>
        </div>
        {/* Desktop: member since badge + wallet */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <span className="rounded-lg bg-dark-border px-2 py-1 font-body text-sm font-bold leading-5 text-white/60">
            Member since May 2025
          </span>
          <WalletBadge />
        </div>
        {/* Mobile: rank + wallet badges */}
        <div className="flex items-center gap-2 lg:hidden">
          <RankBadge size="sm" />
          <WalletBadge />
        </div>
      </div>

      {/* Desktop rank badge */}
      <div className="hidden shrink-0 flex-col items-center gap-2 lg:flex">
        <RankBadge size="lg" />
      </div>
    </div>
  );
}

function WalletBadge() {
  return (
    <IconChip
      background="rgba(52,168,83,0.2)"
      color="#34a853"
      icon="/images/dashboard/icons/wallet-green.svg"
      size="sm"
      weight="semibold"
    >
      {userProfile.walletBalance}
    </IconChip>
  );
}

function RankBadge({ size = "lg" }: { size?: "sm" | "lg" }) {
  const isLg = size === "lg";
  return (
    <div className="relative flex flex-col items-center gap-1">
      {isLg && (
        <div
          className="gpu-blur pointer-events-none absolute left-1/2 top-[38%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(120, 140, 210, 0.48) 0%, rgba(100, 120, 200, 0.07) 40%, transparent 60%)",
          }}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/dashboard/icons/rank-challenger.svg"
        alt="Challenger"
        className={isLg ? "relative h-[84px] w-[83px]" : "h-[25px] w-[25px]"}
      />
      {isLg && (
        <span className="relative font-body text-xl font-bold leading-[30px] text-white">
          Challenger
        </span>
      )}
    </div>
  );
}

function PreferencesSection({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Preferences and Settings" onEdit={onEdit} />
      <div className="flex flex-col gap-2 rounded-3xl bg-dark-surface p-6 lg:p-8">
        {/* Desktop: three columns on top row */}
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-0">
          {preferencesFields.map((field) => (
            <div key={field.label} className="flex-1">
              <FieldRow label={field.label} value={field.value} />
            </div>
          ))}
        </div>
        <FieldRow label="About Me" value="-" />
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Contact Information" onEdit={() => {}} />
      <div className="rounded-3xl bg-dark-surface p-6 lg:p-8">
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-0">
          {contactFields.map((field) => (
            <div key={field.label} className="flex-1">
              <FieldRow label={field.label} value={field.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopSidebar() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardReferralCard />
      <SummaryCard />
      <ChangePasswordButton />
    </div>
  );
}

export default function CustomerProfilePage() {
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  return (
    <>
      {/* Mobile: single column */}
      <div className="flex flex-col gap-6 xl:hidden">
        <ProfileCard card={false} onAvatarEdit={() => setAvatarOpen(true)} />
        <DashboardReferralCard />
        <SummaryCard />
        <ChangePasswordButton />
      </div>

      {/* Two-column layout on desktop */}
      <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
        {/* Left: profile card + sections */}
        <div className="flex flex-1 flex-col gap-8">
          <div className="hidden xl:block">
            <ProfileCard onAvatarEdit={() => setAvatarOpen(true)} />
          </div>
          <PreferencesSection onEdit={() => setPrefsOpen(true)} />
          <ContactSection />
        </div>

        {/* Right: desktop sidebar */}
        <div className="hidden xl:block xl:w-[490px] xl:shrink-0">
          <DesktopSidebar />
        </div>
      </div>

      <EditPreferencesModal open={prefsOpen} onClose={() => setPrefsOpen(false)} />
      <AvatarSettingsModal
        open={avatarOpen}
        onClose={() => setAvatarOpen(false)}
        currentAvatar={userProfile.avatarUrl}
      />
    </>
  );
}
