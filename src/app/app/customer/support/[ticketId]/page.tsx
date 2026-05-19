import { TicketViewContent } from "@/components/dashboard/support-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Ticket | OGEdge",
  description: "View and respond to your OGEdge support ticket.",
};

type PageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function SupportTicketViewPage({ params }: PageProps) {
  const { ticketId } = await params;
  return <TicketViewContent ticketId={ticketId} />;
}
