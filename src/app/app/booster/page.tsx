import BoosterDashboardContent from "@/components/dashboard/BoosterDashboardContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booster Dashboard | OGEdge",
  description: "Manage your boosting orders, track completion rate, and view customer reviews.",
};

export default function BoosterDashboardPage() {
  return <BoosterDashboardContent />;
}
