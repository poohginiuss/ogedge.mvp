import ActiveOrdersPage from "@/components/dashboard/customer/ActiveOrdersPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Active Orders | OGEdge",
  description: "View and manage your active boosting orders on OGEdge.",
};

export default function Page() {
  return <ActiveOrdersPage />;
}
