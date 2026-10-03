"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { variants, products, presentationByProductId } from "@/data/catalog";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function CartPage() {
  const { entries, isReady, subtotal, setQuantity, removeItem } = useCart();
  const savings = entries.reduce((total, entry) => {
    const variant = variants.find(({ id }) => id === entry.variantId);
    const original =
      presentationByProductId[variant?.productId ?? ""]?.compareAtPrice ??
      variant?.price ??
      0;
    return total + (original - (variant?.price ?? 0)) * entry.quantity;
  }, 0);
  const delivery = subtotal >= 999 || subtotal === 0 ? 0 : 79;

  return (
    <div className="page-wrap cart-page">
      <div className="page-kicker">
        <Link href="/">
          <ArrowLeft size={14} /> Keep browsing
        </Link>
        <span>
          YOUR BAG / {entries.length} {entries.length === 1 ? "ITEM" : "ITEMS"}
        </span>
      </div>
      <div className="cart-title-row">
        <div>
          <p className="eyebrow">A VERY GOOD START</p>
          <h1>
            Your bag<span>.</span>
          </h1>
        </div>
        <span className="cart-title-count">
          {entries.reduce((total, entry) => total + entry.quantity, 0)} pieces
        </span>
      </div>
      {!isReady ? (
        <div className="cart-loading" aria-label="Loading your bag" />
      ) : !entries.length ? (
        <div className="empty-bag">
          <div className="empty-bag-mark">m.</div>
          <h2>Your bag is taking a breather.</h2>
          <p>Find something useful, lovely, or a little bit of both.</p>
          <Link className="button-primary" href="/#catalog">
            Explore the edit
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your bag">
            <div className="cart-table-head">
              <span>ITEM</span>
              <span>QUANTITY</span>
              <span>PRICE</span>
            </div>
            {entries.map((entry) => {
              const variant = variants.find(({ id }) => id === entry.variantId);
              const product = products.find(
                ({ id }) => id === variant?.productId,
              );
              if (!variant || !product) return null;
              return (
                <article className="cart-item" key={entry.variantId}>
                  <img src={variant.image} alt={product.name} />
                  <div className="cart-item-info">
                    <span className="cart-brand">
                      {presentationByProductId[product.id]?.brand}
                    </span>
                    <h2>{product.name}</h2>
                    <p>
                      {product.subCategory.name} · {variant.type}
                    </p>
                    <button
                      className="text-action"
                      onClick={() => removeItem(entry.variantId)}
                      type="button"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(entry.variantId, entry.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{entry.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(entry.variantId, entry.quantity + 1)
                      }
                      aria-label="Increase quantity"
                      disabled={
                        entry.quantity >= variant.stock.quantityAvailable
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <strong className="cart-line-price">
                    {money.format(variant.price * entry.quantity)}
                  </strong>
                </article>
              );
            })}
            <div className="cart-footnote">
              <Truck size={16} /> Complimentary delivery when you spend ₹999 or
              more.
            </div>
          </section>
          <aside className="summary-panel">
            <p className="eyebrow">THE NUMBERS</p>
            <h2>Order summary</h2>
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
            <div className="summary-row saved-row">
              <span>You save</span>
              <span>-{money.format(savings)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{money.format(subtotal + delivery)}</strong>
            </div>
            <Link href="/checkout" className="button-primary checkout-button">
              Continue to checkout <span>→</span>
            </Link>
            <p className="secure-note">
              <ShieldCheck size={14} /> Secure checkout · No hidden fees
            </p>
            <p className="payment-note">
              Taxes included. Delivery calculated at checkout.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
