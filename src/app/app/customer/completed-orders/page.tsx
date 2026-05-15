import CompletedOrdersPage from "@/components/dashboard/customer/CompletedOrdersPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Completed Orders | OGEdge",
  description: "View your completed boosting orders on OGEdge.",
};

export default function Page() {
  return <CompletedOrdersPage />;
}
