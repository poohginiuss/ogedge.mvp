import type { ReactNode } from "react";

type PanelHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Right-aligned slot (e.g. badge, stat, action). */
  trailing?: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export function PanelHeader({
  title,
  subtitle,
  trailing,
  className = "flex w-full items-center justify-between px-6 py-4",
  titleClassName = "font-body text-lg font-bold tracking-[-0.4px] text-white lg:text-xl",
  subtitleClassName = "font-body text-sm text-white",
}: PanelHeaderProps) {
  return (
    <div className={className}>
      <div className="flex flex-col items-start gap-1">
        <span className={titleClassName}>{title}</span>
        {subtitle && <span className={subtitleClassName}>{subtitle}</span>}
      </div>
      {trailing}
    </div>
  );
}
