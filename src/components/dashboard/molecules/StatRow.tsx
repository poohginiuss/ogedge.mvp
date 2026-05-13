type StatRowProps = {
  label: string;
  value: string | number;
  /** Value text color CSS value. */
  valueColor?: string;
  className?: string;
};

export function StatRow({ label, value, valueColor = "#ff975d", className = "" }: StatRowProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg px-2 py-1 ${className}`}
      style={{ background: "rgba(0,0,0,0.2)" }}
    >
      <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
        {label}
      </span>
      <span className="font-body text-base font-semibold" style={{ color: valueColor }}>
        {value}
      </span>
    </div>
  );
}
