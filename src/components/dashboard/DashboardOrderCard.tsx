import type { Order } from "./dashboardData";
import { orderStatusMap } from "./dashboardData";

type DashboardOrderCardProps = {
  order: Order;
};

export function DashboardOrderCard({ order }: DashboardOrderCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-dark-surface p-6 lg:p-8">
      {/* Top row: title + tags + actions */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-body text-base font-semibold text-white lg:text-xl">{order.title}</h3>
          <div className="flex flex-wrap items-center gap-2">
            {order.statuses.map((status) => {
              const config = orderStatusMap[status];
              return (
                <span
                  key={status}
                  className="rounded-lg px-2 py-1 font-body text-sm font-semibold uppercase"
                  style={{ background: config.bg, color: config.textColor }}
                >
                  {config.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="relative p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/notification.svg" alt="Notifications" className="h-6 w-6" />
            {order.hasNotification && (
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-main" />
            )}
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg px-4 py-3"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/open-view.svg" alt="" className="h-3.5 w-3.5" />
            <span className="font-body text-sm font-medium uppercase text-white">View</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg px-4 py-3"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/chat-icon.svg" alt="" className="h-3.5 w-3.5" />
            <span className="font-body text-sm font-medium uppercase text-white">Chat</span>
          </button>
        </div>
      </div>

      {/* Order ID */}
      <div className="flex items-center gap-2">
        <span className="font-body text-base text-white">{order.orderId}</span>
        <button type="button" aria-label="Copy order ID">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/copy-icon.svg" alt="" className="h-4 w-4 opacity-70" />
        </button>
      </div>
    </div>
  );
}
