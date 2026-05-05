import type { Metadata } from "next";
import { Lexend, Urbanist } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OGEdge — Your Competitive Edge, Delivered",
  description:
    "Two decades of dominance. Providing elite coaching, boosting, and leveling since 2006. Trusted by 10k+ players worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lexend.variable} ${urbanist.variable} h-full antialiased`}>
      <body className="min-h-full font-body bg-dark-main text-white">{children}</body>
    </html>
  );
}
