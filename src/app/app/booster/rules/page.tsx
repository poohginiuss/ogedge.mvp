import BoosterRulesPage from "@/components/dashboard/booster/BoosterRulesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booster Rules | OGEdge",
  description: "Review the general and game-specific rules for OGEdge boosters.",
};

export default function BoosterRulesRoutePage() {
  return <BoosterRulesPage />;
}
