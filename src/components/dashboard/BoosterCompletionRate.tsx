import { boosterProfile } from "./boosterData";

export function BoosterCompletionRate() {
  const { completionRate, totalOrders, activeOrders, completedOrders } = boosterProfile;

  const summaryRows = [
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
        <div className="relative h-1 w-full rounded-lg bg-dark-border">
          <div
            className="absolute left-0 top-0 h-1 rounded-lg"
            style={{ width: `${completionRate}%`, background: "#ff5c00" }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {summaryRows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-lg px-2 py-1"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              {row.label}
            </span>
            <span className="font-body text-base font-semibold" style={{ color: "#ff975d" }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
