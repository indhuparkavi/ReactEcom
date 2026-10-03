import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { CheckoutForm } from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="page-wrap checkout-page">
      <div className="page-kicker">
        <Link href="/cart">
          <ArrowLeft size={14} /> Back to bag
        </Link>
        <span>CHECKOUT / SECURE PAYMENT</span>
      </div>
      <div className="cart-title-row">
        <div>
          <p className="eyebrow">A FEW DETAILS AND YOU’RE THERE</p>
          <h1>
            Checkout<span>.</span>
          </h1>
        </div>
        <span className="checkout-lock">
          <LockKeyhole size={13} /> Encrypted checkout
        </span>
      </div>
      <CheckoutForm />
    </div>
  );
}
