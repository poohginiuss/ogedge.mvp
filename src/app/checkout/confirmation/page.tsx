import { CheckoutConfirmationContent } from "@/components/checkout/CheckoutConfirmationContent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function CheckoutConfirmationPage() {
  return (
    <>
      <Header />
      <main>
        <CheckoutConfirmationContent />
      </main>
      <Footer />
    </>
  );
}
