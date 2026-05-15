"use client";

import { useRouter } from "next/navigation";
import { sampleTableOrders } from "../activeOrdersData";
import { ActiveOrdersTable } from "./ActiveOrdersTable";

export default function ActiveOrdersPage() {
  const router = useRouter();
  return (
    <ActiveOrdersTable
      orders={sampleTableOrders}
      onPurchaseBoost={() => router.push("/")}
      onSupport={() => router.push("/app/customer/support")}
    />
  );
}
