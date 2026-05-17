import { CheckoutDetailsContent } from "@/components/checkout/CheckoutDetailsContent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function CheckoutDetailsPage() {
  return (
    <>
      <Header />
      <main>
        <CheckoutDetailsContent />
      </main>
      <Footer />
    </>
  );
}
