import type { Metadata } from "next";
import CustomerDashboardContent from "@/components/dashboard/CustomerDashboardContent";

export const metadata: Metadata = {
  title: "Customer Dashboard | OGEdge",
  description: "Manage your orders, loyalty rewards, and account settings on OGEdge.",
};

export default function CustomerDashboardPage() {
  return <CustomerDashboardContent />;
}
