import RulesPage from "@/components/dashboard/customer/RulesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Duties | OGEdge",
  description: "Review the rules and duties for OGEdge customers.",
};

export default function CustomerRulesPage() {
  return <RulesPage />;
}
