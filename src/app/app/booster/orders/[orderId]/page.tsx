import BoosterOrderViewContent from "@/components/dashboard/booster/BoosterOrderViewContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details | OGEdge Booster",
  description: "Manage your boosting order — start, pause, resume or complete.",
};

type PageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function BoosterOrderViewPage({ params }: PageProps) {
  const { orderId } = await params;
  return <BoosterOrderViewContent orderId={orderId} />;
}
