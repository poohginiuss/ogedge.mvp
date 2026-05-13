import { loyaltyTiers, userProfile } from "./dashboardData";

type DashboardLoyaltyProgramProps = {
  contentOnly?: boolean;
};

function LoyaltyHeader() {
  return (
    <div className="flex w-full items-center justify-between px-6 py-4">
      <div className="flex flex-col items-start gap-1 text-white">
        <span className="font-body text-lg font-bold tracking-[-0.4px] lg:text-xl">
          Loyalty Program
        </span>
        <span className="font-body text-sm">
          Earn OG points and receive discounts forever.
        </span>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/og-point-coin.png" alt="" className="h-6 w-[18px] object-cover" />
          <span
            className="font-heading text-2xl font-black text-white"
            style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}
          >
            {userProfile.ogPoints}
          </span>
        </div>
        <span
          className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-xs font-bold uppercase"
          style={{ background: "rgba(255,92,0,0.2)", color: "#ff5c00" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/medal-star-orange.svg" alt="" className="h-4 w-4" />
          {userProfile.tierName}
        </span>
      </div>
    </div>
  );
}

function LoyaltyContent() {
  return (
    <div className="flex flex-col gap-6 px-6 pb-6 pt-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
            {"Get "}<span className="font-bold">10</span>{" more points to reach next tier"}
          </p>
          <span
            className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-xs font-bold uppercase"
            style={{ background: "rgba(66,133,244,0.2)", color: "#4285f4" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/stars-fill-blue.svg" alt="" className="h-4 w-4" />
            Advanced
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative h-1 w-full rounded-full bg-dark-border">
            <div
              className="absolute left-0 top-0 h-1 rounded-full bg-brand-main"
              style={{ width: `${userProfile.loyaltyProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 rounded-lg border border-dark-border px-2 py-1" style={{ background: "#13151e" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/icons/og-point-coin.png" alt="" className="h-6 w-[18px] object-cover" />
              <span
                className="font-body text-base font-bold text-white"
                style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}
              >
                {userProfile.loyaltyCurrentPoints}
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-dark-border px-2 py-1" style={{ background: "#13151e" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/icons/og-point-coin.png" alt="" className="h-6 w-[18px] object-cover" />
              <span
                className="font-body text-base font-bold text-white"
                style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}
              >
                {userProfile.loyaltyNextTierPoints}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {loyaltyTiers.map((tier) => (
          <div
            key={tier.tier}
            className="flex items-center justify-between rounded-2xl p-4"
            style={{
              background: "#17191f",
              border: tier.current ? "1px solid var(--brand-light)" : "1px solid transparent",
            }}
          >
            <div className="flex items-center gap-4">
              <span className="font-body text-sm font-semibold uppercase text-white">
                Tier {tier.tier}
              </span>
              <span
                className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-xs font-bold uppercase"
                style={{ background: tier.bgColor, color: tier.color }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tier.icon} alt="" className="h-4 w-4" />
                {tier.name}
              </span>
            </div>
            <span className="font-heading text-2xl font-bold" style={{ color: tier.color }}>
              {tier.discount}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
          {"For each $1 spent, you will receive "}
          <span className="inline-flex items-center gap-1 align-middle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/og-point.png" alt="" className="inline-block h-2.5 w-4 object-cover" />
            <span
              className="font-body text-base font-bold text-white"
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

export function DashboardLoyaltyProgram({ contentOnly }: DashboardLoyaltyProgramProps) {
  if (contentOnly) {
    return (
      <>
        <div className="border-b border-dark-border">
          <LoyaltyHeader />
        </div>
        <LoyaltyContent />
      </>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-light bg-dark-surface">
      <div className="border-b border-dark-border">
        <LoyaltyHeader />
      </div>
      <div className="hidden lg:block">
        <LoyaltyContent />
      </div>
    </div>
  );
}
