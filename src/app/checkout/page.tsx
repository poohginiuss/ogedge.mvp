import { CheckoutPageContent } from "@/components/checkout/CheckoutPageContent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main>
        <CheckoutPageContent />
      </main>
      <Footer />
    </>
  );
}
