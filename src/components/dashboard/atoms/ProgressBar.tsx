type ProgressBarProps = {
  /** Percent 0..100. Values outside that range are clamped. */
  value: number;
  /** Tailwind height utility. Default "h-1". */
  heightClassName?: string;
  /** Tailwind border-radius utility. Default "rounded-full". */
  roundedClassName?: string;
  /** Rail (background) color CSS value. If omitted uses bg-dark-border token. */
  trackColor?: string;
  /** Fill color CSS value. Default brand orange. */
  fillColor?: string;
  className?: string;
};

export function ProgressBar({
  value,
  heightClassName = "h-1",
  roundedClassName = "rounded-full",
  trackColor,
  fillColor = "#ff5c00",
  className = "",
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`relative w-full ${heightClassName} ${roundedClassName} ${trackColor ? "" : "bg-dark-border"} ${className}`}
      style={trackColor ? { background: trackColor } : undefined}
      aria-hidden
    >
      <div
        className={`absolute left-0 top-0 ${heightClassName} ${roundedClassName}`}
        style={{ width: `${pct}%`, background: fillColor }}
      />
    </div>
  );
}
