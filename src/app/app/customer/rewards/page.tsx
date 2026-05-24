import CustomerRewardsPage from "@/components/dashboard/customer/CustomerRewardsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rewards | OGEdge",
  description: "Track your loyalty rank, seasonal cashback rewards, and OG points on OGEdge.",
};

export default function Page() {
  return <CustomerRewardsPage />;
}
