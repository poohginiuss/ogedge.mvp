type CountdownBadgeProps = {
  /** Pre-formatted countdown string, e.g. "00:12:45:32". */
  value: string;
  /** Override the default responsive text size. */
  className?: string;
};

export function CountdownBadge({
  value,
  className = "font-heading text-xl font-black lg:text-2xl",
}: CountdownBadgeProps) {
  return (
    <span
      className={className}
      style={{ color: "#ff5c00", textShadow: "0px 0px 14px rgba(250,70,9,0.4)" }}
    >
      {value}
    </span>
  );
}
