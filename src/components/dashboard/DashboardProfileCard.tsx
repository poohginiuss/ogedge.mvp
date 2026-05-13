import { userProfile } from "./dashboardData";

export function DashboardProfileCard() {
  return (
    <div
      className="flex flex-col gap-6 overflow-hidden rounded-3xl px-4 py-6 lg:px-8"
      style={{ background: "rgba(56,56,82,0.3)" }}
    >
      {/* Desktop: single row with user info left, action buttons right */}
      <div className="hidden lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userProfile.avatarUrl}
            alt="Avatar"
            className="h-[90px] w-[90px] rounded-full"
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-col text-white">
              <span className="font-body text-xl">Welcome,</span>
              <span className="font-heading text-[32px] font-semibold leading-none">
                {userProfile.username}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-xs font-bold uppercase"
                style={{ background: "rgba(255,92,0,0.2)", color: "#ff5c00" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/icons/medal-star-orange.svg" alt="" className="h-4 w-4" />
                {userProfile.tierName}
              </span>
              <span
                className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-sm font-semibold uppercase"
                style={{ background: "rgba(52,168,83,0.2)", color: "#34a853" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/icons/wallet-green.svg" alt="" className="h-4 w-4" />
                {userProfile.walletBalance}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            className="flex items-center gap-4 rounded-2xl p-8"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/pen-new-order.svg" alt="" className="h-[54px] w-[54px]" />
            <div className="flex flex-col items-center gap-1">
              <span className="font-body text-2xl font-bold uppercase text-white">New Order</span>
              <span className="font-body text-sm text-white">Get Started</span>
            </div>
          </button>
          <button
            type="button"
            className="flex items-center gap-4 rounded-2xl p-8"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/support-icon.svg" alt="" className="h-[54px] w-[54px]" />
            <div className="flex flex-col items-center gap-1">
              <span className="font-body text-2xl font-bold uppercase text-white">Customer Support</span>
              <span className="font-body text-sm text-white">Create Ticket</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="flex flex-col gap-6 lg:hidden">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userProfile.avatarUrl}
            alt="Avatar"
            className="h-16 w-16 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-col text-white">
              <span className="font-body text-xs leading-[18px]">Welcome,</span>
              <span className="font-body text-base font-bold leading-6">
                {userProfile.username}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-xs font-bold uppercase"
                style={{ background: "rgba(255,92,0,0.2)", color: "#ff5c00" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/icons/medal-star-orange.svg" alt="" className="h-4 w-4" />
                {userProfile.tierName}
              </span>
              <span
                className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-sm font-semibold uppercase"
                style={{ background: "rgba(52,168,83,0.2)", color: "#34a853" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/icons/wallet-green.svg" alt="" className="h-4 w-4" />
                {userProfile.walletBalance}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-12 flex-1 items-center justify-center gap-4 rounded-2xl px-6 py-2"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/pen-new-order.svg" alt="" className="h-6 w-6" />
            <span className="font-body text-base font-bold uppercase text-white">New Order</span>
          </button>
          <button
            type="button"
            className="flex h-12 flex-1 items-center justify-center gap-4 rounded-2xl px-6 py-2"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/support-icon.svg" alt="" className="h-6 w-6" />
            <span className="font-body text-base font-bold uppercase text-white">Support</span>
          </button>
        </div>
      </div>
    </div>
  );
}
