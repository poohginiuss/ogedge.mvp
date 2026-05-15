"use client";

import { useRouter } from "next/navigation";
import { BoosterOrdersTable } from "./BoosterOrdersTable";
import { boosterCompletedTableOrders } from "./boosterTableData";

export default function CompletedOrdersPage() {
  const router = useRouter();
  return (
    <BoosterOrdersTable
      variant="completed"
      orders={boosterCompletedTableOrders}
      onSupport={() => router.push("/app/booster/support")}
    />
  );
}
