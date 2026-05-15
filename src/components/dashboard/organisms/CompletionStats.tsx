import { ProgressBar } from "../atoms";
import { boosterProfile } from "../booster/boosterData";
import { StatRow } from "../molecules";

export function CompletionStats() {
  const { completionRate, totalOrders, activeOrders, completedOrders } = boosterProfile;
  const rows = [
    { label: "Total Orders", value: totalOrders },
    { label: "Active", value: activeOrders },
    { label: "Completed", value: completedOrders },
  ];

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-dark-surface px-4 py-6 lg:rounded-2xl lg:px-6 lg:py-8">
      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="font-body text-base font-bold uppercase text-white">Completion Rate</p>
          <p className="font-body text-sm font-medium text-white">{completionRate}%</p>
        </div>
        <ProgressBar value={completionRate} roundedClassName="rounded-lg" />
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <StatRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </div>
  );
}
