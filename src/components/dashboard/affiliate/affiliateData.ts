import type { NavItem } from "../dashboardData";

export const affiliateNavItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "/images/dashboard/icons/nav-dashboard.svg",
    active: true,
  },
  {
    id: "payouts",
    label: "Payouts",
    icon: "/images/dashboard/icons/nav-payouts.svg",
  },
  {
    id: "support",
    label: "Customer Support",
    icon: "/images/dashboard/icons/nav-support.svg",
  },
];

export type PayoutStatus = "paid" | "pending";

export type Payout = {
  id: string;
  amount: string;
  date: string;
  status: PayoutStatus;
};

export const samplePayouts: Payout[] = [
  { id: "1", amount: "$123.00", date: "12 March 2026, 10:12 AM", status: "pending" },
  { id: "2", amount: "$281.00", date: "20 April 2026, 14:46 AM", status: "paid" },
  { id: "3", amount: "$29.00", date: "10 February 2026, 11:23 AM", status: "paid" },
];

export const affiliateStats = {
  totalEarnings: "$1,234.00",
  totalReferrals: "26",
  clicks: "1,522",
  currentBalance: "$671,00",
  earningsYear: "2025",
  earningsTotal: "$13.3k",
  earningsGrowth: "+1.3%",
  referralCode: "GAMER",
  referralUrl: "https://ogedge.com/en/login?referral=I28H0T",
  conversions: "1,522",
  friendsJoined: 3,
};

export type ConversionStatus = "confirmed" | "pending";

export type Conversion = {
  id: string;
  customer: string;
  date: string;
  orderValue: string;
  commissionEarned: string;
  status: ConversionStatus;
};

export const sampleConversions: Conversion[] = [
  { id: "1", customer: "User #4821", date: "Mar 20, 2026, 11:57 PM", orderValue: "$74.50", commissionEarned: "$8", status: "confirmed" },
  { id: "2", customer: "User #4821", date: "Mar 20, 2026, 11:57 PM", orderValue: "$74.50", commissionEarned: "$8", status: "pending" },
  { id: "3", customer: "User #4821", date: "Mar 20, 2026, 11:57 PM", orderValue: "$74.50", commissionEarned: "$8", status: "confirmed" },
  { id: "4", customer: "User #4821", date: "Mar 20, 2026, 11:57 PM", orderValue: "$74.50", commissionEarned: "$8", status: "pending" },
  { id: "5", customer: "User #4821", date: "Mar 20, 2026, 11:57 PM", orderValue: "$74.50", commissionEarned: "$8", status: "confirmed" },
  { id: "6", customer: "User #3192", date: "Mar 18, 2026, 09:23 AM", orderValue: "$120.00", commissionEarned: "$12", status: "confirmed" },
  { id: "7", customer: "User #5510", date: "Mar 15, 2026, 02:14 PM", orderValue: "$45.00", commissionEarned: "$4.50", status: "pending" },
  { id: "8", customer: "User #2847", date: "Mar 12, 2026, 06:41 PM", orderValue: "$89.99", commissionEarned: "$9", status: "confirmed" },
  { id: "9", customer: "User #6033", date: "Mar 10, 2026, 11:05 AM", orderValue: "$200.00", commissionEarned: "$20", status: "confirmed" },
  { id: "10", customer: "User #1294", date: "Mar 08, 2026, 04:32 PM", orderValue: "$55.00", commissionEarned: "$5.50", status: "pending" },
  { id: "11", customer: "User #7761", date: "Mar 05, 2026, 08:19 AM", orderValue: "$160.00", commissionEarned: "$16", status: "confirmed" },
  { id: "12", customer: "User #4488", date: "Mar 02, 2026, 10:55 PM", orderValue: "$33.00", commissionEarned: "$3.30", status: "confirmed" },
];

export const payoutPageStats = [
  { icon: "/images/dashboard/icons/stat-earnings.svg", label: "Total Earnings", value: "$1,234.00" },
  { icon: "/images/dashboard/icons/stat-pending-balance.svg", label: "Pending Balance", value: "$671.00" },
  { icon: "/images/dashboard/icons/stat-clicks.svg", label: "Total Conversions", value: "1,522" },
];
