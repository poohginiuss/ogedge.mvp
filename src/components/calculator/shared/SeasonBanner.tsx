import { InfoTooltip } from "./InfoTooltip";

type SeasonBannerProps = {
  title: string;
  daysLeftLabel: string;
  progressPercent: number;
};

export function SeasonBanner({ title, daysLeftLabel, progressPercent }: SeasonBannerProps) {
  return (
    <div
      className="relative rounded-3xl p-8 transition-all duration-200 hover:shadow-[0_4px_24px_rgba(255,92,0,0.3)]"
      style={{
        border: "2px solid #ff975d",
        background: "rgba(0,0,0,0.25)",
        boxShadow: "0 4px 44px rgba(255,92,0,0.2)",
        backdropFilter: "blur(12px)",
      }}
    >
      <InfoTooltip
        label="Season event details"
        className="absolute right-4 top-4"
        panelClassName="bottom-full right-[-12px] mb-4 w-[248px] translate-y-2 text-left"
      >
        <span
          className="block rounded-3xl p-6"
          style={{
            border: "2px solid #6d6d96",
            background: "#17191f",
            boxShadow: "0 4px 44px rgba(0,0,0,0.3)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span className="block font-heading text-xl font-bold leading-7 text-white">{title}</span>
          <span className="mt-1 block font-body text-sm uppercase text-white">{daysLeftLabel}</span>
          <span className="mt-4 block h-1 w-full rounded-full bg-dark-border">
            <span
              className="block h-1 rounded-full bg-brand-main"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </span>
          <span className="mt-3 flex justify-between font-body text-xs leading-5 text-white">
            <span>
              March 3,
              <br />
              2026
            </span>
            <span className="text-right">
              June 1,
              <br />
              2026
            </span>
          </span>
          <span className="mt-5 block font-body text-xs leading-5 text-white/70">
            It is advisable not to wait until the very last moment of the season to order a Boosting
            service, as the last 2-5 days tend to be more crowded with orders.
          </span>
        </span>
      </InfoTooltip>
      <h3 className="font-heading text-2xl font-bold leading-9 text-white">{title}</h3>
      <p className="mt-2 font-body text-sm uppercase text-white">{daysLeftLabel}</p>
      <div className="mt-4 h-1 w-full rounded-full bg-dark-border">
        <div
          className="h-1 rounded-full bg-brand-main"
          style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
        />
      </div>
    </div>
  );
}
