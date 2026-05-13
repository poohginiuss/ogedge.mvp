import { IconChip } from "../atoms";
import type { OrderStatus } from "../dashboardData";
import { orderStatusMap } from "../dashboardData";

type StatusBadgeGroupProps = {
  statuses: OrderStatus[];
  /** Defaults to "semibold" (matches desktop). Use "medium" for mobile. */
  weight?: "medium" | "semibold" | "bold";
  className?: string;
};

export function StatusBadgeGroup({
  statuses,
  weight = "semibold",
  className = "flex flex-wrap items-center gap-2",
}: StatusBadgeGroupProps) {
  return (
    <div className={className}>
      {statuses.map((status) => {
        const config = orderStatusMap[status];
        return (
          <IconChip
            key={status}
            background={config.bg}
            color={config.textColor}
            size="sm"
            weight={weight}
          >
            {config.label}
          </IconChip>
        );
      })}
    </div>
  );
}
