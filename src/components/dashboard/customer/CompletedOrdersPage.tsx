"use client";

import { useRouter } from "next/navigation";
import { sampleCompletedTableOrders } from "../activeOrdersData";
import { CompletedOrdersTable } from "./CompletedOrdersTable";

export default function CompletedOrdersPage() {
  const router = useRouter();
  return (
    <CompletedOrdersTable
      orders={sampleCompletedTableOrders}
      onPurchaseBoost={() => router.push("/")}
      onSupport={() => router.push("/app/customer/support")}
    />
  );
}
