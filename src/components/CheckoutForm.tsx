"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, LockKeyhole, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { products, variants, presentationByProductId } from "@/data/catalog";
import { submitCheckout } from "@/services/api";
import type { Address, OrderLine } from "@/types";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
const receiptKey = "marketlane-last-order-v1";

export function CheckoutForm() {
  const router = useRouter();
  const { user, signIn, updateAddress } = useAuth();
  const { entries, isReady, subtotal, clearCart } = useCart();
  const [name, setName] = useState(user?.profile?.name ?? "");
  const [email, setEmail] = useState(user?.profile?.email ?? "");
  const [phone, setPhone] = useState(user?.profile?.contact ?? "");
  const [street, setStreet] = useState(user?.addresses?.[0]?.street ?? "");
  const [city, setCity] = useState(user?.addresses?.[0]?.city ?? "Mumbai");
  const [state, setState] = useState(
    user?.addresses?.[0]?.state ?? "Maharashtra",
  );
  const [zip, setZip] = useState(user?.addresses?.[0]?.zip ?? "");
  const [paying, setPaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const items = entries.flatMap((entry): OrderLine[] => {
    const variant = variants.find(({ id }) => id === entry.variantId);
    const product = products.find(({ id }) => id === variant?.productId);
    if (!variant || !product) return [];
    return [
      {
        productId: product.id,
        variantId: entry.variantId,
        name: product.name,
        image: variant.image ?? "",
        unitPrice: variant.price,
        quantity: entry.quantity,
      },
    ];
  });
  const delivery = subtotal >= 999 ? 0 : 79;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPaying(true);
    setProgress(5);
    const interval = window.setInterval(
      () => setProgress((current) => Math.min(91, current + 6)),
      100,
    );
    try {
      const session = user ?? signIn(email, name);
      const address: Address = {
        id: `addr-${Date.now()}`,
        addressType: "HOME",
        street,
        city,
        state,
        country: "India",
        zip,
        default: true,
      };
      const customer = {
        ...session,
        profile: { ...session.profile, name, email, contact: phone },
        addresses: [address],
      };
      updateAddress(address);
      const receipt = await submitCheckout({ user: customer, address, items });
      window.clearInterval(interval);
      setProgress(100);
      sessionStorage.setItem(receiptKey, JSON.stringify(receipt));
      clearCart();
      router.push("/order-success");
    } catch (caught) {
      window.clearInterval(interval);
      setPaying(false);
      setProgress(0);
      setError(
        caught instanceof Error
          ? caught.message
          : "Payment could not be completed. Please try again.",
      );
    }
  }

  if (!isReady)
    return <div className="cart-loading" aria-label="Loading your bag" />;
  if (entries.length === 0)
    return (
      <div className="checkout-empty">
        <h2>Nothing to check out yet.</h2>
        <p>Your next everyday favourite is waiting.</p>
        <Link href="/#catalog" className="button-primary">
          Back to the edit
        </Link>
      </div>
    );

  return (
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <section className="checkout-section">
          <div className="checkout-step">
            <span>01</span>
            <div>
              <h2>Contact details</h2>
              <p>Where should your order updates go?</p>
            </div>
          </div>
          <div className="form-grid">
            <label className="field full-field">
              Full name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </label>
            <label className="field">
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label className="field">
              Mobile number
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                autoComplete="tel"
                pattern="[0-9+() -]{8,16}"
                placeholder="+91 98765 43210"
                required
              />
            </label>
          </div>
        </section>
        <section className="checkout-section">
          <div className="checkout-step">
            <span>02</span>
            <div>
              <h2>Delivery address</h2>
              <p>We’ll bring the good stuff to your door.</p>
            </div>
          </div>
          <div className="form-grid">
            <label className="field full-field">
              Flat, house no. and street
              <input
                value={street}
                onChange={(event) => setStreet(event.target.value)}
                autoComplete="street-address"
                required
              />
            </label>
            <label className="field">
              Town / city
              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                autoComplete="address-level2"
                required
              />
            </label>
            <label className="field">
              State
              <input
                value={state}
                onChange={(event) => setState(event.target.value)}
                autoComplete="address-level1"
                required
              />
            </label>
            <label className="field">
              PIN code
              <input
                value={zip}
                onChange={(event) => setZip(event.target.value)}
                inputMode="numeric"
                pattern="[0-9]{6}"
                autoComplete="postal-code"
                required
              />
            </label>
          </div>
        </section>
        <section className="checkout-section payment-section">
          <div className="checkout-step">
            <span>03</span>
            <div>
              <h2>Payment</h2>
              <p>Secure, encrypted checkout.</p>
            </div>
          </div>
          <div className="payment-method">
            <span className="payment-radio">
              <span />
            </span>
            <div>
              <strong>Card / UPI / net banking</strong>
              <small>All major payment methods</small>
            </div>
            <span className="payment-brands">UPI · VISA · RuPay</span>
          </div>
          {paying && (
            <div className="payment-progress">
              <div className="progress-copy">
                <span>
                  {progress < 100
                    ? "Authorizing your payment"
                    : "Payment approved"}
                </span>
                <span>{progress}%</span>
              </div>
              <div className="progress-track">
                <span style={{ width: `${progress}%` }} />
              </div>
              <small>
                {progress < 36
                  ? "Connecting securely…"
                  : progress < 70
                    ? "Confirming with your bank…"
                    : progress < 100
                      ? "Almost there…"
                      : "Order confirmed"}
              </small>
            </div>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
        </section>
        <button
          className="button-primary place-order"
          type="submit"
          disabled={paying}
        >
          {paying ? (
            <>
              <span className="spinner" /> Processing payment
            </>
          ) : (
            <>
              <LockKeyhole size={15} /> Pay {money.format(subtotal + delivery)}
            </>
          )}
        </button>
        <p className="secure-note checkout-security">
          <ShieldCheck size={14} /> Your payment details are encrypted and
          secure.
        </p>
      </form>
      <aside className="summary-panel checkout-summary">
        <p className="eyebrow">A QUICK RECAP</p>
        <h2>Your order</h2>
        <div className="checkout-lines">
          {items.map((item) => (
            <div className="checkout-line" key={item.variantId}>
              <span className="checkout-line-image">
                <img src={item.image} alt="" />
                <span>{item.quantity}</span>
              </span>
              <span className="checkout-line-name">
                {item.name}
                <small>{presentationByProductId[item.productId]?.brand}</small>
              </span>
              <strong>{money.format(item.unitPrice * item.quantity)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{money.format(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <span>
            {delivery ? (
              money.format(delivery)
            ) : (
              <b className="free-label">On us</b>
            )}
          </span>
        </div>
        <div className="summary-total">
          <span>Total due</span>
          <strong>{money.format(subtotal + delivery)}</strong>
        </div>
        <p className="summary-assurance">
          <Check size={14} /> Free, careful delivery over ₹999
        </p>
      </aside>
    </div>
  );
}
