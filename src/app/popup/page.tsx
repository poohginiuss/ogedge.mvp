"use client";

import { useState } from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ReviewPopup,
  SendTipPopup,
  PauseOrderPopup,
  ExtraPaymentPopup,
  SupportTicketPopup,
  ReportBoosterPopup,
  OrderCompletedPopup,
  AddOnPaymentPopup,
  ClaimOrderPopup,
  CompleteOrderPopup,
  ContactAdminPopup,
  AccountLoginPopup,
  CustomOrderRequestPopup,
  RequestCreatedPopup,
  RequestCreatedNoSignPopup,
  TicketCreatedPopup,
} from "@/components/popups";

type PopupType =
  | "review"
  | "sendTip"
  | "pauseOrder"
  | "extraPayment"
  | "supportTicket"
  | "reportBooster"
  | "orderCompleted"
  | "addOnPayment"
  | "claimOrder"
  | "completeOrder"
  | "contactAdmin"
  | "accountLogin"
  | "customOrderRequest"
  | "requestCreated"
  | "requestCreatedNoSign"
  | "ticketCreated"
  | null;

interface PopupButtonProps {
  label: string;
  description: string;
  onClick: () => void;
  category: string;
}

function PopupButton({ label, description, onClick }: PopupButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-[#383852] p-5 text-left transition-all hover:border-[#ff975d] hover:shadow-[0_0_16px_rgba(255,92,0,0.15)]"
      style={{
        backgroundImage:
          "linear-gradient(145deg, rgba(56,56,82,0.3) 0%, rgba(35,35,48,0.3) 100%)",
      }}
    >
      <span className="font-body text-base font-semibold text-white">{label}</span>
      <span className="font-body text-xs text-white/50">{description}</span>
    </button>
  );
}

const POPUP_BUTTONS: PopupButtonProps[] = [
  {
    label: "Review Booster",
    description: "Rate and review your booster's performance",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Order Completed",
    description: "Order completion with review prompt",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Send Tip",
    description: "Send a tip to your booster with payment options",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Extra Payment",
    description: "Choose between add-on payment or tip",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Add-on Payment",
    description: "Send additional payment for the order",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Pause Order",
    description: "Request a break with duration selection",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Support Ticket",
    description: "Create a support ticket with details",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Ticket Created",
    description: "Confirmation after support ticket creation",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Report Booster",
    description: "Report booster for contacting outside platform",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Account Login",
    description: "Provide account login info for booster",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Custom Order Request",
    description: "Submit a custom order request form",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Request Created",
    description: "Confirmation after custom order request",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Request Created No Sign",
    description: "Request received — prompt to sign in or dismiss",
    onClick: () => {},
    category: "Customer",
  },
  {
    label: "Claim Order",
    description: "Confirm claiming an order (booster)",
    onClick: () => {},
    category: "Booster",
  },
  {
    label: "Complete Order",
    description: "Mark order as complete with checklist (booster)",
    onClick: () => {},
    category: "Booster",
  },
  {
    label: "Contact Admin",
    description: "Contact managers on Discord (booster)",
    onClick: () => {},
    category: "Booster",
  },
];

export default function PopupPage() {
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  const popupTypeMap: Record<string, PopupType> = {
    "Review Booster": "review",
    "Order Completed": "orderCompleted",
    "Send Tip": "sendTip",
    "Extra Payment": "extraPayment",
    "Add-on Payment": "addOnPayment",
    "Pause Order": "pauseOrder",
    "Support Ticket": "supportTicket",
    "Ticket Created": "ticketCreated",
    "Report Booster": "reportBooster",
    "Account Login": "accountLogin",
    "Custom Order Request": "customOrderRequest",
    "Request Created": "requestCreated",
    "Request Created No Sign": "requestCreatedNoSign",
    "Claim Order": "claimOrder",
    "Complete Order": "completeOrder",
    "Contact Admin": "contactAdmin",
  };

  const customerButtons = POPUP_BUTTONS.filter((b) => b.category === "Customer");
  const boosterButtons = POPUP_BUTTONS.filter((b) => b.category === "Booster");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark-main">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 lg:px-0">
          <div className="mb-12">
            <h1 className="font-heading text-4xl font-bold text-white lg:text-5xl">
              Pop-ups
            </h1>
            <p className="mt-3 font-body text-lg text-white/60">
              Click any button below to preview the popup modals used throughout the platform.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="mb-6 font-heading text-2xl font-semibold text-white">
              Customer Pop-ups
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {customerButtons.map((btn) => (
                <PopupButton
                  key={btn.label}
                  {...btn}
                  onClick={() => setActivePopup(popupTypeMap[btn.label])}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-heading text-2xl font-semibold text-white">
              Booster Pop-ups
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {boosterButtons.map((btn) => (
                <PopupButton
                  key={btn.label}
                  {...btn}
                  onClick={() => setActivePopup(popupTypeMap[btn.label])}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <ReviewPopup
        isOpen={activePopup === "review"}
        onClose={() => setActivePopup(null)}
      />
      <SendTipPopup
        isOpen={activePopup === "sendTip"}
        onClose={() => setActivePopup(null)}
      />
      <PauseOrderPopup
        isOpen={activePopup === "pauseOrder"}
        onClose={() => setActivePopup(null)}
      />
      <ExtraPaymentPopup
        isOpen={activePopup === "extraPayment"}
        onClose={() => setActivePopup(null)}
      />
      <SupportTicketPopup
        isOpen={activePopup === "supportTicket"}
        onClose={() => setActivePopup(null)}
      />
      <ReportBoosterPopup
        isOpen={activePopup === "reportBooster"}
        onClose={() => setActivePopup(null)}
      />
      <OrderCompletedPopup
        isOpen={activePopup === "orderCompleted"}
        onClose={() => setActivePopup(null)}
      />
      <AddOnPaymentPopup
        isOpen={activePopup === "addOnPayment"}
        onClose={() => setActivePopup(null)}
      />
      <ClaimOrderPopup
        isOpen={activePopup === "claimOrder"}
        onClose={() => setActivePopup(null)}
      />
      <CompleteOrderPopup
        isOpen={activePopup === "completeOrder"}
        onClose={() => setActivePopup(null)}
      />
      <ContactAdminPopup
        isOpen={activePopup === "contactAdmin"}
        onClose={() => setActivePopup(null)}
      />
      <AccountLoginPopup
        isOpen={activePopup === "accountLogin"}
        onClose={() => setActivePopup(null)}
      />
      <CustomOrderRequestPopup
        isOpen={activePopup === "customOrderRequest"}
        onClose={() => setActivePopup(null)}
      />
      <RequestCreatedPopup
        isOpen={activePopup === "requestCreated"}
        onClose={() => setActivePopup(null)}
      />
      <RequestCreatedNoSignPopup
        isOpen={activePopup === "requestCreatedNoSign"}
        onClose={() => setActivePopup(null)}
      />
      <TicketCreatedPopup
        isOpen={activePopup === "ticketCreated"}
        onClose={() => setActivePopup(null)}
      />
    </>
  );
}
