import type { TicketStatus } from "../supportData";

export type TicketMessage = {
  id: string;
  role: "user" | "admin";
  name: string;
  avatar: string;
  timeAgo: string;
  body: string;
  isOriginal?: boolean;
  originalTitle?: string;
  attachments?: { name: string; file: string }[];
};

export type TicketViewModel = {
  ticketId: string;
  status: TicketStatus;
  createdAt: string;
  messages: TicketMessage[];
};

export const sampleTicketView: TicketViewModel = {
  ticketId: "#123456",
  status: "open",
  createdAt: "March 5, 2026, 5:45PM",
  messages: [
    {
      id: "m1",
      role: "user",
      name: "You",
      avatar: "/images/dashboard/support-view/avatar-user.png",
      timeAgo: "2h ago",
      isOriginal: true,
      originalTitle: "Question about my order",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "m2",
      role: "admin",
      name: "Robert (Admin)",
      avatar: "/images/dashboard/support-view/avatar-admin.png",
      timeAgo: "25m ago",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "m3",
      role: "user",
      name: "You",
      avatar: "/images/dashboard/support-view/avatar-user.png",
      timeAgo: "10m ago",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      attachments: [
        { name: "Screenshot 1234.png", file: "Screenshot 1234.png" },
        { name: "Screenshot lorem ips... .png", file: "screenshot-lorem.png" },
      ],
    },
  ],
};
