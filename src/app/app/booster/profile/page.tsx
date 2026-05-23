import BoosterProfilePage from "@/components/dashboard/booster/BoosterProfilePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | OGEdge Booster",
  description: "Manage your OGEdge booster profile, preferences and contact information.",
};

export default function BoosterProfileRoute() {
  return <BoosterProfilePage />;
}
