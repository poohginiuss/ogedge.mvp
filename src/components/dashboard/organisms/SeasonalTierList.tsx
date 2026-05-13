import { IconChip, PointPill, ProgressBar } from "../atoms";
import { seasonalTiers } from "../dashboardData";
import { TierShellCard } from "../molecules";

export function SeasonalTierList() {
  return (
    <div className="flex flex-col gap-2 px-6 pb-6 pt-4">
      {seasonalTiers.map((tier) => (
        <TierShellCard key={tier.tier} active={tier.status === "claimed"}>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm font-semibold uppercase text-white">
                Tier {tier.tier}
              </span>
              {tier.status === "claimed" ? (
                <IconChip
                  background="rgba(26,173,25,0.2)"
                  color="#1aad19"
                  icon="/images/dashboard/icons/check-all-green.svg"
                >
                  Claimed
                </IconChip>
              ) : (
                <IconChip background="rgba(23,25,31,0.4)" weight="semibold">
                  Active
                </IconChip>
              )}
            </div>
            <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
              {"Receive a "}
              <span className="font-bold">{tier.rewardAmount}</span>
              {" bonus when you\u2019ve spent "}
              <span className="font-bold">{tier.spendTarget}</span>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <ProgressBar value={tier.progress} />
            <div className="flex items-center justify-between">
              <div className="flex flex-1 items-center gap-2">
                <PointPill textSize="sm">{tier.currentSpent}</PointPill>
                <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {tier.status === "claimed" ? (
                    <>
                      <span className="font-bold">{tier.currentSpent}</span>
                      {" of "}
                      <span className="font-bold">{tier.spendTarget}</span>
                      {" spent"}
                      <br />
                      {"Reward claimed!"}
                    </>
                  ) : (
                    <>
                      <span className="font-bold">{tier.currentSpent}</span>
                      {" of "}
                      <span className="font-bold">{tier.spendTarget}</span>
                      {" spent, spend "}
                      <span className="font-bold">
                        $
                        {Number.parseInt(tier.spendTarget.replace("$", ""), 10) -
                          Number.parseInt(tier.currentSpent.replace("$", ""), 10)}
                      </span>
                      {" more to claim the reward"}
                    </>
                  )}
                </p>
              </div>
              <PointPill textSize="sm">{tier.spendTarget}</PointPill>
            </div>
          </div>
        </TierShellCard>
      ))}
    </div>
  );
}
