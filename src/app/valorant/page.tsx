import { ValorantPageContent } from "@/components/games/valorant/ValorantPageContent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function ValorantPage() {
  return (
    <>
      <Header />
      <main>
        <ValorantPageContent />
      </main>
      <Footer />
    </>
  );
}
