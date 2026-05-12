import { CodMwPageContent } from "@/components/games/cod-mw/CodMwPageContent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "COD: Modern Warfare Boosting | OGEdge",
  description:
    "Professional Call of Duty: Modern Warfare boosting services. Camo boosts, bundles, and more.",
};

export default function CodModernWarfarePage() {
  return (
    <>
      <Header />
      <CodMwPageContent />
      <Footer />
    </>
  );
}
