"use client";

// Needs `"use client"` because the customer variant calls `useRouter()`
// to navigate to `/app/customer/orders/{id}` when the user taps `View`.
// Both dashboard hosts (Customer + Booster) are already client components,
// so this doesn't introduce a new client boundary in practice.
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { BoosterOrder } from "../booster/boosterData";
import type { Order } from "../dashboardData";
import { ChatIcon } from "../orderTableShared";
import { OrderActionGroup, OrderIdRow, StatusBadgeGroup } from "../molecules";
import { ActionButton } from "../atoms";

type CustomerVariantProps = {
  variant: "customer";
  order: Order;
};
type BoosterVariantProps = {
  variant: "booster";
  order: BoosterOrder;
  boosterSection?: "available" | "my-orders" | "completed";
};
type OrderCardProps = CustomerVariantProps | BoosterVariantProps;

function EarningRow({ order, size }: { order: BoosterOrder; size: "lg" | "sm" }) {
  const textCls = size === "lg" ? "font-body text-xl font-semibold" : "font-body text-lg font-bold";
  const containerCls = size === "lg" ? "flex items-center gap-4" : "flex items-center gap-2";
  return (
    <div className={containerCls}>
      {order.earning && (
        <span className={textCls} style={{ color: "#34a853" }}>
          {order.earning}
        </span>
      )}
      {order.totalEarning && (
        <span className={textCls} style={{ color: "#ff975d" }}>
          {order.totalEarning}
        </span>
      )}
    </div>
  );
}

export function OrderCard(props: OrderCardProps) {
  const router = useRouter();

  if (props.variant === "customer") {
    const { order } = props;
    // Strip the leading `#` from `#ORD-123456` for use in the URL; the
    // backend route only cares about the bare id.
    const navigateToOrder = () => router.push(`/app/customer/orders/${order.id}`);
    return (
      <div className="flex flex-col gap-4 rounded-3xl bg-dark-surface p-6 lg:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-body text-base font-semibold text-white lg:text-xl">
              {order.title}
            </h3>
            <StatusBadgeGroup statuses={order.statuses} />
          </div>
          <div className="hidden md:block">
            <OrderActionGroup
              chatActive={order.hasNotification}
              onView={navigateToOrder}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <OrderIdRow orderId={order.orderId} />
          <div className="md:hidden">
            <OrderActionGroup
              chatActive={order.hasNotification}
              onView={navigateToOrder}
              className="flex shrink-0 items-center gap-0.5"
            />
          </div>
        </div>
      </div>
    );
  }

  const { order, boosterSection } = props;
  const isAvailable = boosterSection === "available";
  const isMyOrders = boosterSection === "my-orders";
  const isCompleted = boosterSection === "completed";

  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-dark-surface p-4 lg:p-8">
      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="font-body text-xl font-semibold text-white">{order.title}</h3>
            <StatusBadgeGroup statuses={order.statuses} />
          </div>
          {!isCompleted && (
            <div className="flex shrink-0 items-center gap-3">
              <ChatIcon active={order.hasNotification} />
              {isAvailable && (
                <button
                  type="button"
                  onClick={() => {}}
                  className="group flex cursor-pointer items-center gap-2 rounded-2xl px-6 py-2 font-body text-sm font-bold uppercase tracking-wide text-white transition-all duration-200 hover:bg-[linear-gradient(90deg,#ff5c00_0%,#a32d05_100%)] hover:shadow-[0_4px_22px_rgba(255,92,0,0.3)] active:scale-95"
                  style={{
                    background: "rgba(23,25,31,0.5)",
                    border: "1px solid #ff975d",
                    backdropFilter: "blur(3px)",
                    boxShadow: "0 4px 44px rgba(255,92,0,0.2)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(23,25,31,0.5)"; }}
                >
                  <Image src="/images/dashboard/icons/check-all.svg" alt="" width={18} height={18} />
                  Claim
                </button>
              )}
              {isMyOrders && (
                <ActionButton
                  icon="/images/dashboard/icons/open-view.svg"
                  onClick={() => router.push(`/app/booster/orders/${order.orderId}`)}
                >
                  View Order
                </ActionButton>
              )}
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <OrderIdRow orderId={order.orderId} />
          <EarningRow order={order} size="lg" />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-2 lg:hidden">
        <div className="flex items-center justify-between">
          <StatusBadgeGroup statuses={order.statuses} weight="medium" />
          <EarningRow order={order} size="sm" />
        </div>
        <p className="font-body text-base font-medium text-white">{order.title}</p>
        <OrderIdRow orderId={order.orderId} idClassName="font-body text-sm text-white" />
        {isAvailable && (
          <button
            type="button"
            className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#ff975d] py-2.5 font-body text-base font-bold uppercase text-white transition-all active:scale-[0.97]"
            style={{ background: "rgba(23,25,31,0.5)", backdropFilter: "blur(3px)", boxShadow: "0 4px 44px rgba(255,92,0,0.2)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(23,25,31,0.5)"; }}
          >
            <Image src="/images/dashboard/icons/check-all.svg" alt="" width={20} height={20} />
            CLAIM
          </button>
        )}
        {isMyOrders && (
          <button
            type="button"
            onClick={() => router.push(`/app/booster/orders/${order.orderId}`)}
            className="mt-1 flex w-full cursor-pointer items-center justify-center rounded-2xl py-3 font-body text-base font-bold uppercase tracking-wide text-white transition-all hover:text-[#ff975d] hover:border-[#ff975d] hover:shadow-[0_0_12px_rgba(255,92,0,0.3)] active:scale-[0.97]"
            style={{
              background: "linear-gradient(-19deg, #17191f 0%, #383852 100%)",
              border: "1px solid #6d6d96",
            }}
          >
            VIEW ORDER
          </button>
        )}
      </div>
    </div>
  );
}
