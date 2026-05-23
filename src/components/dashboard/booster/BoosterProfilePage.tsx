"use client";

import { useState } from "react";
import { IconChip } from "../atoms";
import { AvatarSettingsModal } from "../molecules/AvatarSettingsModal";
import { boosterProfile } from "./boosterData";

const specializations = [
  "Valorant",
  "League of Legends",
  "Apex Legends",
  "Dota 2",
  "Fortnite",
  "World of Warcraft",
];

const summaryRows = [
  {
    label: "Rating",
    custom: (
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dashboard/icons/stars-5-orange.svg"
          alt="5 stars"
          className="h-4 w-[90px] lg:w-[115px]"
        />
        <span className="font-body text-base font-semibold text-brand-light">5</span>
      </div>
    ),
  },
  { label: "Reviews", value: "23" },
  { label: "Completed Orders", value: "27" },
  { label: "Active orders", value: "2" },
  { label: "Total Earnings", value: "$234" },
  { label: "Avg. Completion Time", value: "12h" },
];

const preferencesFields = [
  { label: "Commission %", value: "50%" },
  { label: "Max Concurrent Orders", value: "3" },
  { label: "Available for Orders", value: "Yes" },
];

const disciplinaryFields = [
  { label: "Warnings", value: "0" },
  { label: "Suspended", value: "No" },
  { label: "Suspended Until", value: "-" },
];

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-body text-xs font-bold uppercase leading-[18px] text-white lg:text-sm lg:leading-5">
        {label}
      </span>
      <span className="font-body text-lg font-bold leading-7 text-white">{value}</span>
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
          {"custom" in row && row.custom ? (
            row.custom
          ) : (
            <span className="font-body text-base font-semibold text-brand-light">
              {row.value}
            </span>
          )}
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
        <img src="/images/dashboard/icons/lock-icon.svg" alt="" className="h-6 w-6" />
        <span className="font-body text-base font-bold uppercase tracking-[0.32px] text-brand-light">
          Change Password
        </span>
      </button>
    </div>
  );
}

function BoosterReferralCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-dark-surface p-6">
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/referral-people.svg" alt="" className="h-6 w-6" />
          <span className="font-body text-xs font-bold uppercase text-brand-light">
            Referral Program
          </span>
        </div>
        <p className="font-body text-lg font-bold text-white lg:text-xl lg:tracking-[-0.4px]">
          For every recommendation you can earn up to{" "}
          <span className="text-brand-light">$50</span> after the first{" "}
          <span className="text-brand-light">10</span> completed orders
        </p>
        <p className="font-body text-sm text-white">
          Contact your supervisor if you have recommendations
        </p>
      </div>
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
          src={boosterProfile.avatarUrl}
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
          <img src="/images/dashboard/icons/edit-icon.svg" alt="Edit" className="h-3 w-3" />
        </button>
        {/* Desktop edit badge */}
        <button
          type="button"
          onClick={onAvatarEdit}
          className="absolute top-10 right-[-15px] hidden items-center rounded-full border-4 border-dark-surface bg-dark-border p-1 transition-colors hover:bg-brand-main lg:flex"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/edit-icon.svg" alt="Edit" className="h-4 w-4" />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="font-body text-base font-bold leading-6 text-white lg:font-heading lg:text-[32px] lg:font-semibold lg:leading-normal">
              Test Booster
            </h1>
            <span className="hidden rounded-lg bg-brand-main/20 px-2 py-1 font-body text-xs font-bold uppercase text-brand-main lg:inline-flex">
              Booster
            </span>
          </div>
          <p className="font-body text-xs text-white lg:text-xl lg:font-bold">
            testbooster@emailexample.com
          </p>
          <p className="font-body text-xs text-white/60 lg:hidden">Member since May 2025</p>
        </div>
        {/* Desktop member since */}
        <div className="hidden lg:block">
          <span className="rounded-lg bg-dark-border px-2 py-1 font-body text-sm font-bold leading-5 text-white/60">
            Member since May 2025
          </span>
        </div>
        {/* Mobile badges */}
        <div className="flex items-center gap-2 lg:hidden">
          <span className="rounded-lg bg-brand-main/20 px-2 py-1 font-body text-xs font-bold uppercase text-brand-main">
            Booster
          </span>
          <IconChip
            background="rgba(52,168,83,0.2)"
            color="#34a853"
            icon="/images/dashboard/icons/wallet-green.svg"
            size="sm"
            weight="semibold"
          >
            $12.00
          </IconChip>
        </div>
      </div>
    </div>
  );
}

function SpecializationTags() {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-body text-xs font-bold uppercase leading-[18px] text-white lg:text-sm lg:leading-5">
        Specializations
      </span>
      <div className="flex flex-wrap gap-1 lg:gap-2">
        {specializations.map((game) => (
          <span
            key={game}
            className="rounded-2xl border border-dark-border p-3 font-body text-sm font-bold leading-5 text-white"
            style={{
              background: "rgba(0,0,0,0.2)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            {game}
          </span>
        ))}
      </div>
    </div>
  );
}

function PreferencesSection() {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <h2 className="font-body text-xl font-bold text-white lg:text-2xl lg:leading-8">
        Preferences and Settings
      </h2>
      <div className="flex flex-col gap-2 rounded-3xl bg-dark-surface p-6 lg:p-8">
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-0">
          {preferencesFields.map((field) => (
            <div key={field.label} className="flex-1">
              <FieldRow label={field.label} value={field.value} />
            </div>
          ))}
        </div>
        <SpecializationTags />
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <h2 className="font-body text-xl font-bold text-white lg:text-2xl lg:leading-8">
        Contact Information
      </h2>
      <div className="rounded-3xl bg-dark-surface p-6 lg:p-8">
        <FieldRow label="Discord Username" value="-" />
      </div>
    </div>
  );
}

function DisciplinarySection() {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="flex flex-col gap-0.5">
        <h2 className="font-body text-xl font-bold text-white lg:text-2xl lg:leading-8">
          Disciplinary
        </h2>
        <p className="font-body text-sm font-bold text-white lg:text-base">
          Warnings and suspensions (staff-managed)
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-3xl bg-dark-surface p-6 lg:p-8">
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-0">
          {disciplinaryFields.map((field) => (
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
      <BoosterReferralCard />
      <SummaryCard />
      <ChangePasswordButton />
    </div>
  );
}

export default function BoosterProfilePage() {
  const [avatarOpen, setAvatarOpen] = useState(false);

  return (
    <>
      {/* Mobile: single column */}
      <div className="flex flex-col gap-6 xl:hidden">
        <ProfileCard card={false} onAvatarEdit={() => setAvatarOpen(true)} />
        <BoosterReferralCard />
        <SummaryCard />
        <ChangePasswordButton />
      </div>

      {/* Two-column layout on desktop */}
      <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex flex-1 flex-col gap-8">
          <div className="hidden xl:block">
            <ProfileCard onAvatarEdit={() => setAvatarOpen(true)} />
          </div>
          <PreferencesSection />
          <ContactSection />
          <DisciplinarySection />
        </div>

        <div className="hidden xl:block xl:w-[490px] xl:shrink-0">
          <DesktopSidebar />
        </div>
      </div>

      <AvatarSettingsModal
        open={avatarOpen}
        onClose={() => setAvatarOpen(false)}
        currentAvatar={boosterProfile.avatarUrl}
      />
    </>
  );
}
