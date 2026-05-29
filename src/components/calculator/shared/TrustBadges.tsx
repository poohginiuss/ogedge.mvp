"use client";

import { useEffect, useRef, useState } from "react";

export type TrustBadge = {
  icon: string;
  label: string;
  tooltip: string;
};

export const defaultTrustBadges: TrustBadge[] = [
  { icon: "/images/icons/services/lock-one.svg", label: "SSL Secure", tooltip: "All transactions are encrypted with industry-standard SSL for maximum protection." },
  { icon: "/images/icons/services/vpn.svg", label: "VPN", tooltip: "Our boosters use premium VPN connections to keep your account safe." },
  { icon: "/images/icons/services/safe-lock.svg", label: "Safest Service", tooltip: "Verified boosters, strict policies, and zero account bans on record." },
  { icon: "/images/icons/services/support.svg", label: "24/7 Support", tooltip: "Our support team is available around the clock via live chat and tickets." },
  { icon: "/images/icons/services/refund.svg", label: "Refund Guarantee", tooltip: "Not satisfied? Get a full refund — no questions asked." },
  { icon: "/images/icons/services/cash.svg", label: "Loyalty Rewards", tooltip: "Earn discounts, cashback, and exclusive perks with every order." },
];

function BadgeItem({ icon, label, tooltip }: TrustBadge) {
  const [showTip, setShowTip] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const updatePos = () => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setPos({ top: r.top - 8, left: r.left + r.width / 2 });
  };

  useEffect(() => {
    if (!showTip) return;
    const onScroll = () => updatePos();
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  });

  return (
    <div
      className="shrink-0"
      onMouseEnter={() => { updatePos(); setShowTip(true); }}
      onMouseLeave={() => setShowTip(false)}
    >
      <button
        ref={btnRef}
        type="button"
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-3xl border border-transparent px-4 font-body text-sm font-medium text-white transition-all duration-200 hover:border-brand-light/40 hover:shadow-[0_0_12px_rgba(255,92,0,0.2)] active:scale-[0.97]"
        style={{ background: "linear-gradient(-19deg, #17191f 0%, #383852 100%)" }}
        onClick={() => { updatePos(); setShowTip((v) => !v); }}
        onBlur={() => setShowTip(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" loading="lazy" className="h-4 w-4" />
        <span className="whitespace-nowrap">{label}</span>
      </button>

      {showTip && (
        <div
          className="fixed z-50 w-[220px] -translate-x-1/2 -translate-y-full rounded-2xl border border-dark-border p-4"
          style={{
            top: pos.top,
            left: pos.left,
            background: "linear-gradient(-43deg, #17191f, #383852)",
          }}
        >
          <p className="font-body text-sm leading-5 text-white/90">{tooltip}</p>
        </div>
      )}
    </div>
  );
}

type TrustBadgesProps = {
  badges?: TrustBadge[];
};

export function TrustBadges({ badges = defaultTrustBadges }: TrustBadgesProps) {
  return (
    <div className="flex gap-4 overflow-x-auto xl:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {badges.map((badge) => (
        <BadgeItem key={badge.label} {...badge} />
      ))}
    </div>
  );
}
