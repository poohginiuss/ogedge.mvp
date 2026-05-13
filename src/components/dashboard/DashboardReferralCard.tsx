"use client";

import { useState } from "react";
import { ActionButton } from "./atoms";
import { userProfile } from "./dashboardData";

export function DashboardReferralCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userProfile.referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-dark-surface p-6">
      <div className="flex items-center gap-6">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/referral-people.svg" alt="" className="h-6 w-6" />
            <span className="font-body text-xs font-bold uppercase text-brand-light">
              Referral Program
            </span>
          </div>
          <p className="font-body text-lg font-bold text-white lg:text-xl lg:tracking-[-0.4px]">
            Earn <span className="text-brand-light">$10</span> per friend, give them{" "}
            <span className="text-brand-light">10% off</span>
          </p>
          <p className="font-body text-sm text-white">
            Share your code. They get a discount on their first order, you get rewarded right after
            they checkout.
          </p>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="h-[50px] w-px bg-dark-border" />
          <div className="flex flex-col items-center gap-1 whitespace-nowrap">
            <span
              className="font-body text-xs font-bold uppercase"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Your Code
            </span>
            <span className="font-heading text-[30px] font-bold uppercase leading-[38px] text-brand-main">
              {userProfile.referralCode}
            </span>
            <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              {userProfile.friendsJoined} friends joined
            </span>
          </div>
        </div>
      </div>

      {/* Mobile referral code */}
      <div className="flex items-center justify-between lg:hidden">
        <div className="flex flex-col items-center gap-1">
          <span
            className="font-body text-xs font-bold uppercase"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Your Code
          </span>
          <span className="font-heading text-2xl font-bold uppercase text-brand-main">
            {userProfile.referralCode}
          </span>
          <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            {userProfile.friendsJoined} friends joined
          </span>
        </div>
      </div>

      {/* Copy URL section */}
      <div
        className="flex items-center gap-6 rounded-2xl px-6 py-4"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <p className="flex-1 truncate font-mono text-sm text-white">{userProfile.referralUrl}</p>
        <ActionButton
          variant="brand"
          icon="/images/dashboard/icons/copy-white.svg"
          iconClassName="h-6 w-6"
          textClassName="font-body text-base font-bold uppercase tracking-[0.32px] text-white"
          className="shrink-0 gap-2.5 lg:h-[54px]"
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </ActionButton>
      </div>
    </div>
  );
}
