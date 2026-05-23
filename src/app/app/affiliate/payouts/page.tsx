import AffiliatePayoutPage from "@/components/dashboard/affiliate/AffiliatePayoutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payouts | Affiliate Dashboard | OGEdge",
};

export default function Page() {
  return <AffiliatePayoutPage />;
}
