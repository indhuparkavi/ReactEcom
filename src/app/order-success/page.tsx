"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, PackageCheck } from "lucide-react";
import type { CheckoutReceipt } from "@/types";

const receiptKey = "marketlane-last-order-v1";
const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function OrderSuccessPage() {
  const [receipt, setReceipt] = useState<CheckoutReceipt | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const value = sessionStorage.getItem(receiptKey);
      if (value) setReceipt(JSON.parse(value) as CheckoutReceipt);
    } catch {
      sessionStorage.removeItem(receiptKey);
    }
    setReady(true);
  }, []);

  if (!ready)
    return (
      <div
        className="success-loading"
        aria-label="Loading order confirmation"
      />
    );
  if (!receipt)
    return (
      <div className="page-wrap order-missing">
        <h1>No order to show.</h1>
        <p>Once you place an order, its details will be waiting here.</p>
        <Link className="button-primary" href="/#catalog">
          Browse the edit
        </Link>
      </div>
    );

  return (
    <div className="page-wrap success-page">
      <div className="success-mark">
        <Check size={28} strokeWidth={2.4} />
      </div>
      <p className="eyebrow">PAYMENT CONFIRMED · {receipt.order.orderNo}</p>
      <h1>
        That’s a good
        <br />
        <em>choice.</em>
      </h1>
      <p className="success-copy">
        Thanks,{" "}
        {receipt.order.customer?.profile?.name?.split(" ")[0] ?? "friend"}.
        We’re getting your finds ready.
      </p>
      <div className="dispatch-card">
        <div className="dispatch-top">
          <PackageCheck size={21} />
          <div>
            <strong>Your order is with us.</strong>
            <span>
              We’ll send a dispatch update to{" "}
              {receipt.order.customer?.profile?.email}.
            </span>
          </div>
          <span className="order-status">{receipt.order.status}</span>
        </div>
        <div className="dispatch-meta">
          <div>
            <span>ORDER NUMBER</span>
            <strong>{receipt.order.orderNo}</strong>
          </div>
          <div>
            <span>ITEMS</span>
            <strong>{receipt.order.quantity} pieces</strong>
          </div>
          <div>
            <span>ORDER TOTAL</span>
            <strong>{money.format(receipt.order.price)}</strong>
          </div>
        </div>
        <div className="receipt-lines">
          {receipt.items.map((item) => (
            <div className="receipt-line" key={item.variantId}>
              <img src={item.image} alt="" />
              <span>
                {item.name}
                <small>Qty {item.quantity}</small>
              </span>
              <strong>{money.format(item.unitPrice * item.quantity)}</strong>
            </div>
          ))}
        </div>
        <div className="dispatch-address">
          <span>DELIVERING TO</span>
          <strong>
            {receipt.shippingAddress.street}, {receipt.shippingAddress.city},{" "}
            {receipt.shippingAddress.state} {receipt.shippingAddress.zip}
          </strong>
        </div>
      </div>
      <Link href="/" className="success-home">
        Back to Marketlane <ArrowRight size={16} />
      </Link>
    </div>
  );
}
