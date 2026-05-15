"use client";

import { useRouter } from "next/navigation";
import { BoosterOrdersTable } from "./BoosterOrdersTable";
import { boosterMyTableOrders } from "./boosterTableData";

export default function MyOrdersPage() {
  const router = useRouter();
  return (
    <BoosterOrdersTable
      variant="my-orders"
      orders={boosterMyTableOrders}
      onSupport={() => router.push("/app/booster/support")}
    />
  );
}
