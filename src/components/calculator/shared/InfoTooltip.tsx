import type { ReactNode } from "react";

type InfoTooltipProps = {
  label: string;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
};

export function InfoTooltip({
  label,
  children,
  className = "",
  panelClassName = "",
}: InfoTooltipProps) {
  const wrapperClassName = className || "relative";

  return (
    <span className={`group inline-flex ${wrapperClassName}`}>
      <button
        type="button"
        aria-label={label}
        className="inline-flex rounded-full text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light/70"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/services/info.svg"
          alt=""
          loading="lazy"
          className="h-[18px] w-[18px]"
        />
      </button>
      <span
        role="tooltip"
        className={`pointer-events-none absolute z-30 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 ${panelClassName}`}
      >
        {children}
      </span>
    </span>
  );
}
