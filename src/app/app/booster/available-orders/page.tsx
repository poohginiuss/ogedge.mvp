import AvailableOrdersPage from "@/components/dashboard/booster/AvailableOrdersPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Available Orders | OGEdge Booster",
  description: "Browse and claim available boosting orders.",
};

export default function Page() {
  return <AvailableOrdersPage />;
}
