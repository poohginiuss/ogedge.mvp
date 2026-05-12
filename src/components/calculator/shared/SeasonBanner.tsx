type SeasonBannerProps = {
  title: string;
  daysLeftLabel: string;
  progressPercent: number;
};

export function SeasonBanner({ title, daysLeftLabel, progressPercent }: SeasonBannerProps) {
  return (
    <div
      className="relative rounded-3xl p-8"
      style={{
        border: "2px solid #ff975d",
        background: "rgba(0,0,0,0.4)",
        boxShadow: "0 4px 44px rgba(255,92,0,0.2)",
        backdropFilter: "blur(12px)",
      }}
    >
      <button
        type="button"
        aria-label="More info"
        className="absolute right-4 top-4 text-white/70 hover:text-white"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/services/info.svg"
          alt=""
          loading="lazy"
          className="h-[18px] w-[18px]"
        />
      </button>
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
