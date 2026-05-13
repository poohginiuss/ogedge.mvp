import { PointPill, ProgressBar } from "../atoms";

type ProgressWithMarkersProps = {
  /** Progress percent 0..100. */
  value: number;
  startLabel: string | number;
  endLabel: string | number;
  /** Optional icons rendered inside each marker pill. */
  startIcon?: string;
  endIcon?: string;
  pillTextSize?: "sm" | "base";
  className?: string;
};

export function ProgressWithMarkers({
  value,
  startLabel,
  endLabel,
  startIcon,
  endIcon,
  pillTextSize = "base",
  className = "flex flex-col gap-2",
}: ProgressWithMarkersProps) {
  return (
    <div className={className}>
      <ProgressBar value={value} />
      <div className="flex items-center justify-between">
        <PointPill icon={startIcon} textSize={pillTextSize}>
          {startLabel}
        </PointPill>
        <PointPill icon={endIcon} textSize={pillTextSize}>
          {endLabel}
        </PointPill>
      </div>
    </div>
  );
}
