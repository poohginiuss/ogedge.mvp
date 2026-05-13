import { seasonalTiers, userProfile } from "./dashboardData";

type DashboardSeasonalRewardsProps = {
  contentOnly?: boolean;
};

function SeasonalHeader() {
  return (
    <div className="flex w-full items-center justify-between px-6 py-4">
      <div className="flex flex-col items-start gap-1 text-white">
        <span className="font-body text-lg font-bold tracking-[-0.4px] lg:text-xl">
          Seasonal Rewards
        </span>
        <span className="font-body text-sm">
          Spend money to earn rewards!
        </span>
      </div>
      <div className="flex flex-col items-end whitespace-nowrap">
        <span className="font-body text-sm uppercase text-white">Season ends in</span>
        <span
          className="font-heading text-xl font-black lg:text-2xl"
          style={{ color: "#ff5c00", textShadow: "0px 0px 14px rgba(250,70,9,0.4)" }}
        >
          {userProfile.seasonEndsIn}
        </span>
      </div>
    </div>
  );
}

function SeasonalContent() {
  return (
    <div className="flex flex-col gap-2 px-6 pb-6 pt-4">
      {seasonalTiers.map((tier) => (
        <div
          key={tier.tier}
          className="flex flex-col gap-4 rounded-2xl p-4"
          style={{
            background: "#17191f",
            border: tier.status === "claimed" ? "1px solid var(--brand-light)" : "1px solid transparent",
          }}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm font-semibold uppercase text-white">
                Tier {tier.tier}
              </span>
              {tier.status === "claimed" ? (
                <span
                  className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-xs font-bold uppercase"
                  style={{ background: "rgba(26,173,25,0.2)", color: "#1aad19" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icons/check-all-green.svg" alt="" className="h-4 w-4" />
                  Claimed
                </span>
              ) : (
                <span
                  className="rounded-lg px-2 py-1 font-body text-xs font-semibold uppercase text-white"
                  style={{ background: "rgba(23,25,31,0.4)" }}
                >
                  Active
                </span>
              )}
            </div>
            <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
              {"Receive a "}<span className="font-bold">{tier.rewardAmount}</span>{" bonus when you\u2019ve spent "}<span className="font-bold">{tier.spendTarget}</span>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="relative h-1 w-full rounded-full bg-dark-border">
              <div
                className="absolute left-0 top-0 h-1 rounded-full bg-brand-main"
                style={{ width: `${tier.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-1 items-center gap-2">
                <div
                  className="flex items-center rounded-lg border border-dark-border px-2 py-1"
                  style={{ background: "#13151e" }}
                >
                  <span
                    className="font-body text-sm font-bold text-white"
                    style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}
                  >
                    {tier.currentSpent}
                  </span>
                </div>
                <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {tier.status === "claimed" ? (
                    <>
                      <span className="font-bold">{tier.currentSpent}</span>{" of "}
                      <span className="font-bold">{tier.spendTarget}</span>{" spent"}
                      <br />
                      {"Reward claimed!"}
                    </>
                  ) : (
                    <>
                      <span className="font-bold">{tier.currentSpent}</span>{" of "}
                      <span className="font-bold">{tier.spendTarget}</span>{" spent, spend "}
                      <span className="font-bold">
                        ${parseInt(tier.spendTarget.replace("$", "")) - parseInt(tier.currentSpent.replace("$", ""))}
                      </span>
                      {" more to claim the reward"}
                    </>
                  )}
                </p>
              </div>
              <div
                className="flex items-center rounded-lg border border-dark-border px-2 py-1"
                style={{ background: "#13151e" }}
              >
                <span
                  className="font-body text-sm font-bold text-white"
                  style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}
                >
                  {tier.spendTarget}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardSeasonalRewards({ contentOnly }: DashboardSeasonalRewardsProps) {
  const wrapperStyle = {
    background: "linear-gradient(180deg, rgba(255,151,93,0.1) 0%, rgba(255,92,0,0.1) 50%, rgba(163,45,5,0.1) 100%)",
  };

  if (contentOnly) {
    return (
      <>
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <SeasonalHeader />
        </div>
        <SeasonalContent />
      </>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-light" style={wrapperStyle}>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <SeasonalHeader />
      </div>
      <div className="hidden lg:block">
        <SeasonalContent />
      </div>
    </div>
  );
}
