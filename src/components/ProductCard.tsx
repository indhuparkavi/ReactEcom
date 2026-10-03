"use client";

import { useState } from "react";
import { Check, Heart, Plus, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { CatalogProduct } from "@/types";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function ProductCard({ item }: { item: CatalogProduct }) {
  const { product, variant, presentation } = item;
  const { entries, addItem } = useCart();
  const [saved, setSaved] = useState(false);
  const quantity =
    entries.find((entry) => entry.variantId === variant.id)?.quantity ?? 0;
  const discount = Math.max(
    0,
    Math.round((1 - variant.price / presentation.compareAtPrice) * 100),
  );
  const stock = variant.stock.quantityAvailable;

  return (
    <article className="product-card">
      <div className="product-visual">
        <img src={variant.image} alt={product.name} loading="lazy" />
        {discount > 0 && <span className="discount-tag">-{discount}%</span>}
        {presentation.badge && (
          <span className="product-badge">{presentation.badge}</span>
        )}
        <button
          className={`save-button${saved ? " is-saved" : ""}`}
          onClick={() => setSaved(!saved)}
          type="button"
          aria-label={saved ? "Remove from saved" : "Save for later"}
          aria-pressed={saved}
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
        <button
          className={`add-button${quantity ? " added" : ""}`}
          onClick={() => addItem(variant.id ?? "")}
          type="button"
          disabled={stock < 1}
        >
          {quantity ? (
            <>
              <Check size={16} /> Added · {quantity}
            </>
          ) : (
            <>
              <ShoppingBag size={16} /> Add to bag
            </>
          )}
        </button>
      </div>
      <div className="product-information">
        <div className="product-meta">
          <span>{presentation.brand}</span>
          <span className="rating">
            <Star size={12} fill="currentColor" />{" "}
            {presentation.rating.toFixed(1)}
          </span>
        </div>
        <h3>{product.name}</h3>
        <p className="product-subtitle">
          {product.subCategory.name} <span>·</span>{" "}
          {variant.type ?? variant.color?.name ?? "Everyday essential"}
        </p>
        <div className="price-line">
          <strong>{money.format(variant.price)}</strong>
          <del>{money.format(presentation.compareAtPrice)}</del>
          <span className="saving">Save {discount}%</span>
        </div>
        <div className="product-bottom">
          <span>
            {presentation.ratingCount.toLocaleString("en-IN")} reviews
          </span>
          <span className={stock < 10 ? "stock-alert" : "stock-ok"}>
            {stock < 10 ? `Only ${stock} left` : "In stock"}
          </span>
        </div>
        <div className="delivery-copy">
          <span className="delivery-dot" /> Free delivery by{" "}
          {presentation.deliveryLabel}
        </div>
      </div>
    </article>
  );
}
