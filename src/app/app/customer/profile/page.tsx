import CustomerProfilePage from "@/components/dashboard/customer/CustomerProfilePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | OGEdge",
  description: "Manage your OGEdge customer profile, preferences and contact information.",
};

export default function CustomerProfileRoute() {
  return <CustomerProfilePage />;
}
