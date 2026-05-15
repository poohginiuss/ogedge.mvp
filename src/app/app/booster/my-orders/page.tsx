import MyOrdersPage from "@/components/dashboard/booster/MyOrdersPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | OGEdge Booster",
  description: "Manage your claimed boosting orders.",
};

export default function Page() {
  return <MyOrdersPage />;
}
