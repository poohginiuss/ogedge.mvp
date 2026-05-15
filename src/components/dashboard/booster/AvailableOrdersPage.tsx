"use client";

import { useRouter } from "next/navigation";
import { BoosterOrdersTable } from "./BoosterOrdersTable";
import { boosterAvailableTableOrders } from "./boosterTableData";

export default function AvailableOrdersPage() {
  const router = useRouter();
  return (
    <BoosterOrdersTable
      variant="available"
      orders={boosterAvailableTableOrders}
      onSupport={() => router.push("/app/booster/support")}
    />
  );
}
