export type TrustBadge = {
  icon: string;
  label: string;
};

export const defaultTrustBadges: TrustBadge[] = [
  { icon: "/images/icons/services/lock.svg", label: "SSL Secure" },
  { icon: "/images/icons/services/vpn.svg", label: "VPN" },
  { icon: "/images/icons/services/safe-lock.svg", label: "Safest Service" },
  { icon: "/images/icons/services/support.svg", label: "24/7 Support" },
  { icon: "/images/icons/services/refund.svg", label: "Refund Guarantee" },
  { icon: "/images/icons/services/cash.svg", label: "Loyalty Rewards" },
];

type TrustBadgesProps = {
  badges?: TrustBadge[];
};

export function TrustBadges({ badges = defaultTrustBadges }: TrustBadgesProps) {
  return (
    <div className="flex gap-4 overflow-x-auto md:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {badges.map(({ icon, label }) => (
        <div
          key={label}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-3xl px-4"
          style={{
            background: "linear-gradient(-19deg, #17191f 0%, #383852 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} alt="" loading="lazy" className="h-4 w-4" />
          <span className="whitespace-nowrap font-body text-sm font-medium text-white">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
