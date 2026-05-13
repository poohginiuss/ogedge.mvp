import type { BoosterOrder } from "./boosterData";
import { orderStatusMap } from "./boosterData";

type BoosterOrderCardProps = {
  order: BoosterOrder;
};

export function BoosterOrderCard({ order }: BoosterOrderCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-dark-surface p-4 lg:p-8">
      {/* Desktop layout */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="font-body text-xl font-semibold text-white">{order.title}</h3>
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
            {order.canClaim && (
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-brand-light px-4 py-3"
                style={{ background: "rgba(0,0,0,0.2)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/icons/claim-icon.svg" alt="" className="h-3.5 w-3.5" />
                <span className="font-body text-sm font-medium uppercase text-white">Claim</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-body text-base text-white">{order.orderId}</span>
            <button type="button" aria-label="Copy order ID">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/icons/copy-icon.svg" alt="" className="h-4 w-4 opacity-70" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            {order.earning && (
              <span className="font-body text-xl font-semibold" style={{ color: "#34a853" }}>
                {order.earning}
              </span>
            )}
            {order.totalEarning && (
              <span className="font-body text-xl font-semibold" style={{ color: "#ff975d" }}>
                {order.totalEarning}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col gap-2 lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {order.statuses.map((status) => {
              const config = orderStatusMap[status];
              return (
                <span
                  key={status}
                  className="rounded-lg px-2 py-1 font-body text-sm font-medium uppercase"
                  style={{ background: config.bg, color: config.textColor }}
                >
                  {config.label}
                </span>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            {order.earning && (
              <span className="font-body text-lg font-bold" style={{ color: "#34a853" }}>
                {order.earning}
              </span>
            )}
            {order.totalEarning && (
              <span className="font-body text-lg font-bold" style={{ color: "#ff975d" }}>
                {order.totalEarning}
              </span>
            )}
          </div>
        </div>

        <p className="font-body text-base font-medium text-white">{order.title}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-body text-sm text-white">{order.orderId}</span>
            <button type="button" aria-label="Copy order ID">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/icons/copy-icon.svg" alt="" className="h-4 w-4 opacity-70" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg p-2"
              style={{ background: "rgba(56,56,82,0.6)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/icons/notification.svg" alt="" className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg p-2"
              style={{ background: "rgba(56,56,82,0.6)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/icons/open-view.svg" alt="" className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg p-2"
              style={{ background: "rgba(56,56,82,0.6)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/icons/chat-icon.svg" alt="" className="h-4 w-4" />
            </button>
          </div>
        </div>

        {order.canClaim && (
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-brand-light px-4 py-3"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/claim-icon.svg" alt="" className="h-3.5 w-3.5" />
            <span className="font-body text-sm font-medium uppercase text-white">Claim</span>
          </button>
        )}
      </div>
    </div>
  );
}
