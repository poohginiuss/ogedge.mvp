"use client";

// Needs `"use client"` because the customer variant calls `useRouter()`
// to navigate to `/app/customer/orders/{id}` when the user taps `View`.
// Both dashboard hosts (Customer + Booster) are already client components,
// so this doesn't introduce a new client boundary in practice.
import { useRouter } from "next/navigation";
import { ActionButton, IconButton } from "../atoms";
import type { BoosterOrder } from "../booster/boosterData";
import type { Order } from "../dashboardData";
import { OrderActionGroup, OrderIdRow, StatusBadgeGroup } from "../molecules";

type CustomerVariantProps = {
  variant: "customer";
  order: Order;
};
type BoosterVariantProps = {
  variant: "booster";
  order: BoosterOrder;
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
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-body text-base font-semibold text-white lg:text-xl">
              {order.title}
            </h3>
            <StatusBadgeGroup statuses={order.statuses} />
          </div>
          <OrderActionGroup
            hasNotification={order.hasNotification}
            onView={navigateToOrder}
            onChat={navigateToOrder}
          />
        </div>
        <OrderIdRow orderId={order.orderId} />
      </div>
    );
  }

  const { order } = props;
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-dark-surface p-4 lg:p-8">
      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="font-body text-xl font-semibold text-white">{order.title}</h3>
            <StatusBadgeGroup statuses={order.statuses} />
          </div>
          <OrderActionGroup hasNotification={order.hasNotification} canClaim={order.canClaim} />
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
        <div className="flex items-center justify-between">
          <OrderIdRow orderId={order.orderId} idClassName="font-body text-sm text-white" />
          <div className="flex items-center gap-1">
            <IconButton
              icon="/images/dashboard/icons/notification.svg"
              aria-label="Notifications"
            />
            <IconButton icon="/images/dashboard/icons/open-view.svg" aria-label="View" />
            <IconButton icon="/images/dashboard/icons/chat-icon.svg" aria-label="Chat" />
          </div>
        </div>
        {order.canClaim && (
          <ActionButton
            icon="/images/dashboard/icons/claim-icon.svg"
            variant="outline"
            className="w-full rounded-2xl"
          >
            Claim
          </ActionButton>
        )}
      </div>
    </div>
  );
}
