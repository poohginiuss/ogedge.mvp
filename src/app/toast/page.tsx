"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast, type ToastVariant, type ToastAction } from "@/components/ui/Toast";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Sample toast configs                                               */
/* ------------------------------------------------------------------ */

interface ToastSample {
  label: string;
  description: string;
  category: string;
  variant: ToastVariant;
  title: string;
  body: string;
  duration?: number;
  icon?: ReactNode;
  action?: ToastAction;
}

const SAMPLES: ToastSample[] = [
  {
    label: "Booster Assigned",
    description: "Orange toast — booster has been assigned to the order",
    category: "Order",
    variant: "orange",
    title: "Booster Assigned",
    body: "LonelyStar will start your order shortly",
  },
  {
    label: "Order Started",
    description: "Blue toast — booster has started playing",
    category: "Order",
    variant: "blue",
    title: "Order Started",
    body: "Your booster is now playing. Silver II → Platinum II",
  },
  {
    label: "Order Paused",
    description: "Yellow toast — order has been paused",
    category: "Order",
    variant: "yellow",
    title: "Order Paused",
    body: "Order is paused, booster will be back in 2 hours.",
  },
  {
    label: "Order Completed",
    description: "Green toast with action — review and confirm",
    category: "Order",
    variant: "green",
    title: "Order Completed",
    body: "Please review and confirm within 72h.",
    action: { label: "Confirm Now", href: "#" },
    duration: 8000,
  },
  {
    label: "Payment Declined",
    description: "Red toast with action — retry payment",
    category: "Payment",
    variant: "red",
    title: "Payment Declined",
    body: "Please try another method.",
    action: { label: "Retry Payment", href: "#" },
    duration: 8000,
  },
  {
    label: "Payment Received",
    description: "Green toast — payment confirmation",
    category: "Payment",
    variant: "green",
    title: "Payment Received",
    body: "Your payment of $49.99 has been processed",
  },
  {
    label: "Tip Sent",
    description: "Green toast — tip sent to booster",
    category: "Payment",
    variant: "green",
    title: "Tip Sent!",
    body: "$5.00 tip sent to LonelyStar",
  },
  {
    label: "New Message",
    description: "Blue toast — new chat message",
    category: "Notification",
    variant: "blue",
    title: "New Message",
    body: "LonelyStar: Hey, starting your order now!",
  },
  {
    label: "Rank Update",
    description: "Blue toast — rank progression",
    category: "Notification",
    variant: "blue",
    title: "Rank Update",
    body: "You've progressed from Silver III to Gold I",
  },
  {
    label: "Payout Approved",
    description: "Green toast — affiliate payout approved",
    category: "Affiliate",
    variant: "green",
    title: "Payout Approved",
    body: "Your $120.00 payout is being processed",
  },
  {
    label: "New Referral",
    description: "Blue toast — new referral signup",
    category: "Affiliate",
    variant: "blue",
    title: "New Referral!",
    body: "Someone signed up with your referral link",
  },
  {
    label: "Order Claimed",
    description: "Orange toast — booster claimed an order",
    category: "Booster",
    variant: "orange",
    title: "Order Claimed",
    body: "You've claimed order #ORD-1234",
  },
  {
    label: "Review Received",
    description: "Green toast — booster received a review",
    category: "Booster",
    variant: "green",
    title: "Review Received",
    body: "You received a 5-star review from a customer",
  },
  {
    label: "Session Expired",
    description: "Red toast with action — login again",
    category: "System",
    variant: "red",
    title: "Session Expired",
    body: "Please log in again to continue",
    action: { label: "Log In", href: "#" },
  },
  {
    label: "Connection Lost",
    description: "Red toast — network error",
    category: "System",
    variant: "red",
    title: "Connection Lost",
    body: "Unable to reach the server. Retrying…",
  },
  {
    label: "Quick Toast (3s)",
    description: "Short-lived yellow toast — 3 second duration",
    category: "System",
    variant: "yellow",
    title: "Quick Notification",
    body: "This disappears in 3 seconds",
    duration: 3000,
  },
  {
    label: "Long Toast (10s)",
    description: "Long-lived blue toast — 10 second duration",
    category: "System",
    variant: "blue",
    title: "Slow Notification",
    body: "This stays for 10 seconds",
    duration: 10000,
  },
];

/* ------------------------------------------------------------------ */
/*  Button card                                                        */
/* ------------------------------------------------------------------ */

function TriggerButton({
  sample,
  onClick,
}: {
  sample: ToastSample;
  onClick: () => void;
}) {
  const dotColor: Record<ToastVariant, string> = {
    orange: "bg-[#ff5c00]",
    blue: "bg-[#4285f4]",
    green: "bg-[#34a853]",
    red: "bg-[#c2272d]",
    yellow: "bg-[#ffb000]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-dark-border p-5 text-left transition-all hover:border-[#ff975d] hover:shadow-[0_0_16px_rgba(255,92,0,0.15)]"
      style={{
        backgroundImage:
          "linear-gradient(145deg, rgba(56,56,82,0.3) 0%, rgba(35,35,48,0.3) 100%)",
      }}
    >
      <div className="flex items-center gap-2">
        <span className={`size-2.5 rounded-full ${dotColor[sample.variant]}`} />
        <span className="font-body text-base font-semibold text-white">
          {sample.label}
        </span>
      </div>
      <span className="font-body text-xs text-white/50">
        {sample.description}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ToastPage() {
  const { toast } = useToast();

  const categories = [...new Set(SAMPLES.map((s) => s.category))];

  function fire(sample: ToastSample) {
    toast({
      title: sample.title,
      description: sample.body,
      variant: sample.variant,
      duration: sample.duration,
      icon: sample.icon,
      action: sample.action,
    });
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark-main">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 lg:px-0">
          <div className="mb-12">
            <h1 className="font-heading text-4xl font-bold text-white lg:text-5xl">
              Toast Notifications
            </h1>
            <p className="mt-3 font-body text-lg text-white/60">
              Click any button below to preview the toast notification
              component. Toasts slide in from the right and auto-dismiss
              with a progress bar.
            </p>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="mb-6 font-heading text-2xl font-semibold text-white">
                {cat}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {SAMPLES.filter((s) => s.category === cat).map((s) => (
                  <TriggerButton
                    key={s.label}
                    sample={s}
                    onClick={() => fire(s)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
