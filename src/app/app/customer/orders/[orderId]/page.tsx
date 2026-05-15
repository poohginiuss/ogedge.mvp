import CustomerOrderViewContent from "@/components/dashboard/customer/CustomerOrderViewContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details | OGEdge",
  description: "Track progress, chat with your booster and manage payments for your OGEdge order.",
};

type PageProps = {
  // Next 15+ async route params API. The orderId comes from the
  // `[orderId]` dynamic segment; we just hand it off to the client
  // component so the data layer can hydrate the right order.
  params: Promise<{ orderId: string }>;
};

export default async function CustomerOrderViewPage({ params }: PageProps) {
  const { orderId } = await params;
  return <CustomerOrderViewContent orderId={orderId} />;
}
