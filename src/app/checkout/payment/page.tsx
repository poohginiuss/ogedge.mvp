import { CheckoutPaymentContent } from "@/components/checkout/CheckoutPaymentContent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function CheckoutPaymentPage() {
  return (
    <>
      <Header />
      <main>
        <CheckoutPaymentContent />
      </main>
      <Footer />
    </>
  );
}
