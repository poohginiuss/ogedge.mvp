import SupportPage from "@/components/dashboard/customer/SupportPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Support | OGEdge",
  description: "Get help with your OGEdge orders, payments, and account.",
};

export default function Page() {
  return <SupportPage />;
}
