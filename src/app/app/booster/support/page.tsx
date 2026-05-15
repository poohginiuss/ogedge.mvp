import SupportPage from "@/components/dashboard/booster/SupportPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booster Support | OGEdge",
  description: "Get help with your boosting orders, payouts, and account.",
};

export default function Page() {
  return <SupportPage />;
}
