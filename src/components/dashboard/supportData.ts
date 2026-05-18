export type TicketStatus = "open" | "on-hold" | "closed";
export type ChatStatus = "new" | "unread" | "replied" | "none";

export type SupportTicket = {
  id: string;
  ticketId: string;
  title: string;
  subtitle: string;
  status: TicketStatus;
  lastUpdated: string;
  dateCreated: string;
  chatStatus: ChatStatus;
};

export const TICKET_STATUS_THEME: Record<
  TicketStatus,
  { label: string; bg: string; color: string }
> = {
  open: { label: "OPEN", bg: "rgba(38,86,151,0.2)", color: "#4285f4" },
  "on-hold": { label: "ON HOLD", bg: "rgba(255,176,0,0.2)", color: "#ffb000" },
  closed: { label: "CLOSED", bg: "rgba(45,194,39,0.2)", color: "#2dc227" },
};

export const CHAT_STATUS_THEME: Record<
  ChatStatus,
  { label: string; bg: string; color: string } | null
> = {
  new: { label: "NEW", bg: "#34a853", color: "#fff" },
  unread: { label: "UNREAD", bg: "#fa4609", color: "#fff" },
  replied: { label: "REPLIED", bg: "#4285f4", color: "#fff" },
  none: null,
};

export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "t1",
    ticketId: "#123456",
    title: "Hello",
    subtitle: "Question about my order.",
    status: "open",
    lastUpdated: "2 hours ago",
    dateCreated: "Mar 5, 2026",
    chatStatus: "new",
  },
  {
    id: "t2",
    ticketId: "#123457",
    title: "Valorant Rank Boosting",
    subtitle: "Silver II — Platinum III",
    status: "on-hold",
    lastUpdated: "3 hours ago",
    dateCreated: "Mar 5, 2026",
    chatStatus: "unread",
  },
  {
    id: "t3",
    ticketId: "#123458",
    title: "Valorant Rank Boosting",
    subtitle: "Silver II — Platinum III",
    status: "closed",
    lastUpdated: "31 minutes ago",
    dateCreated: "Mar 5, 2026",
    chatStatus: "replied",
  },
];
