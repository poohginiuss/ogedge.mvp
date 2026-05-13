type CtaCardSize = "lg" | "sm";

type CtaCardProps = {
  icon: string;
  title: string;
  /** Optional sub-line under the title (large variant only). */
  subtitle?: string;
  onClick?: () => void;
  /** "lg" = big stacked desktop tile; "sm" = compact h-12 mobile pill. */
  size?: CtaCardSize;
  className?: string;
};

export function CtaCard({
  icon,
  title,
  subtitle,
  onClick,
  size = "lg",
  className = "",
}: CtaCardProps) {
  const isLarge = size === "lg";
  const layoutCls = isLarge ? "gap-4 p-8" : "h-12 flex-1 justify-center gap-4 px-6 py-2";
  const iconCls = isLarge ? "h-[54px] w-[54px]" : "h-6 w-6";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center rounded-2xl ${layoutCls} ${className}`}
      style={{ background: "rgba(0,0,0,0.2)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" className={iconCls} />
      {isLarge ? (
        <div className="flex flex-col items-center gap-1">
          <span className="font-body text-2xl font-bold uppercase text-white">{title}</span>
          {subtitle && <span className="font-body text-sm text-white">{subtitle}</span>}
        </div>
      ) : (
        <span className="font-body text-base font-bold uppercase text-white">{title}</span>
      )}
    </button>
  );
}
