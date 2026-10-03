"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Search,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const router = useRouter();
  const { user } = useAuth();
  const { itemCount } = useCart();
  const [query, setQuery] = useState("");

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(
      trimmed ? `/?q=${encodeURIComponent(trimmed)}#catalog` : "/#catalog",
    );
  }

  return (
    <header className="site-header">
      <div className="utility-bar">
        <span>Thoughtful finds, fair prices.</span>
        <span className="utility-links">
          <span>Free delivery over ₹999</span>
          <span>Easy 7-day returns</span>
        </span>
      </div>
      <div className="header-main">
        <Link href="/" className="wordmark" aria-label="Marketlane home">
          <span className="wordmark-mark">m.</span>
          <span>marketlane</span>
        </Link>
        <button
          className="delivery-location"
          type="button"
          aria-label="Delivery location: Mumbai"
        >
          <MapPin size={17} />
          <span>
            <small>Delivering to</small>
            <strong>Mumbai 400050</strong>
          </span>
          <ChevronDown size={13} />
        </button>
        <form className="search-box" onSubmit={search} role="search">
          <Search size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, brands and more"
            aria-label="Search products"
          />
          {query && (
            <button
              className="search-submit"
              type="submit"
              aria-label="Submit search"
            >
              <ArrowRight size={17} />
            </button>
          )}
        </form>
        <nav className="header-actions" aria-label="Account and cart">
          <Link href="/login" className="header-action">
            <UserRound size={19} />
            <span>
              <small>
                {user?.profile?.name
                  ? `Hello, ${user.profile.name.split(" ")[0]}`
                  : "Welcome"}
              </small>
              <strong>{user ? "Your account" : "Sign in"}</strong>
            </span>
          </Link>
          <Link href="/cart" className="header-action cart-action">
            <span className="cart-icon-wrap">
              <ShoppingBag size={21} />
              <span className="cart-count" aria-live="polite">
                {itemCount}
              </span>
            </span>
            <span>
              <small>Your</small>
              <strong>Bag</strong>
            </span>
          </Link>
        </nav>
      </div>
      <div className="category-strip">
        <div className="category-strip-inner">
          <Link href="/#catalog">Shop all</Link>
          <Link href="/?category=cat-electronics#catalog">Electronics</Link>
          <Link href="/?category=cat-fashion#catalog">Fashion</Link>
          <Link href="/?category=cat-home#catalog">Home & living</Link>
          <Link href="/?category=cat-outdoor#catalog">Outdoors</Link>
          <span className="category-promise">
            Small upgrades. Better everyday.
          </span>
        </div>
      </div>
    </header>
  );
}
