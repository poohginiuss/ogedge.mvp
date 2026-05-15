import CompletedOrdersPage from "@/components/dashboard/booster/CompletedOrdersPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Completed Orders | OGEdge Booster",
  description: "View your completed boosting orders and earnings.",
};

export default function Page() {
  return <CompletedOrdersPage />;
}
