import { IconChip } from "../atoms";
import { loyaltyTiers, userProfile } from "../dashboardData";
import { ProgressWithMarkers, TierShellCard } from "../molecules";

export function LoyaltyTierList() {
  return (
    <div className="flex flex-col gap-6 px-6 pb-6 pt-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
            {"Get "}
            <span className="font-bold">10</span>
            {" more points to reach next tier"}
          </p>
          <IconChip
            background="rgba(66,133,244,0.2)"
            color="#4285f4"
            icon="/images/dashboard/icons/stars-fill-blue.svg"
          >
            Advanced
          </IconChip>
        </div>

        <ProgressWithMarkers
          value={userProfile.loyaltyProgress}
          startLabel={userProfile.loyaltyCurrentPoints}
          endLabel={userProfile.loyaltyNextTierPoints}
          startIcon="/images/dashboard/icons/og-point-coin.png"
          endIcon="/images/dashboard/icons/og-point-coin.png"
        />
      </div>

      {/* Full tier ladder (Novice → Ultimate). The current tier is
          highlighted by `TierShellCard`'s `active` prop, which draws the
          brand-light border; the rest render with a transparent border so
          the user can see both their current discount and what they're
          progressing toward. */}
      <div className="flex flex-col gap-1">
        {loyaltyTiers.map((tier) => (
          <TierShellCard
            key={tier.tier}
            active={tier.current}
            className="flex items-center justify-between rounded-2xl p-4"
          >
            <div className="flex items-center gap-4">
              <span className="font-body text-sm font-semibold uppercase text-white">
                Tier {tier.tier}
              </span>
              <IconChip background={tier.bgColor} color={tier.color} icon={tier.icon}>
                {tier.name}
              </IconChip>
            </div>
            <span className="font-heading text-2xl font-bold" style={{ color: tier.color }}>
              {tier.discount}
            </span>
          </TierShellCard>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
          {"For each $1 spent, you will receive "}
          <span className="inline-flex items-center gap-1 align-middle">
            {/* Footer uses the same OG coin asset (orange logo) as the
                header and progress markers — the previous `og-point.png`
                was a blank/white sprite and the `h-2.5 w-4 object-cover`
                sizing cropped it further. `object-contain` keeps the
                logo intact at body-text scale. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dashboard/icons/og-point-coin.png"
              alt="OG"
              className="inline-block h-3 w-[18px] shrink-0 object-contain"
            />
            <span
              className="font-body text-sm font-bold text-white"
              style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}
            >
              1
            </span>
          </span>
          {" point."}
        </p>
        <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
          {"Your discount is applied automatically at checkout whenever you\u2019re logged in."}
        </p>
      </div>
    </div>
  );
}
