import { FifaPageContent } from "@/components/games/fifa21/FifaPageContent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIFA 21 Boosting | OGEdge",
  description: "Professional FIFA 21 boosting services. FUT Champions, Division Rivals and more.",
};

export default function FifaPage() {
  return (
    <>
      <Header />
      <FifaPageContent />
      <Footer />
    </>
  );
}
