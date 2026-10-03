"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownWideNarrow, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import type { CatalogProduct, Category } from "@/types";

type SortMode = "featured" | "price-asc" | "price-desc" | "rating";

export function Storefront({
  items,
  categories,
  initialQuery = "",
  initialCategory = "",
}: {
  items: CatalogProduct[];
  categories: Category[];
  initialQuery?: string;
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortMode>("featured");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => setCategory(initialCategory), [initialCategory]);
  const visibleItems = useMemo(() => {
    const filtered = items.filter(({ product, variant, presentation }) => {
      const matchesCategory =
        !category || product.subCategory.categoryId === category;
      const searchText =
        `${product.name} ${product.description} ${product.subCategory.name} ${presentation.brand}`.toLowerCase();
      return (
        matchesCategory &&
        variant.price <= maxPrice &&
        searchText.includes(initialQuery.toLowerCase())
      );
    });
    if (sort === "price-asc")
      filtered.sort((a, b) => a.variant.price - b.variant.price);
    if (sort === "price-desc")
      filtered.sort((a, b) => b.variant.price - a.variant.price);
    if (sort === "rating")
      filtered.sort((a, b) => b.presentation.rating - a.presentation.rating);
    return filtered;
  }, [category, initialQuery, items, maxPrice, sort]);
  console.log(visibleItems, "visibleItems");
  return (
    <section className="catalog-section" id="catalog">
      <div className="catalog-heading">
        <div>
          <p className="eyebrow">THE MARKETLANE EDIT</p>
          <h2>
            {initialQuery
              ? `Results for “${initialQuery}”`
              : "Good things, well chosen."}
          </h2>
          <p className="section-caption">
            Everyday favourites from brands worth knowing.
          </p>
        </div>
        <div className="catalog-count">
          {visibleItems.length} considered finds
        </div>
      </div>
      <div className="catalog-controls">
        <div
          className="filter-tabs"
          role="group"
          aria-label="Filter by department"
        >
          <button
            className={!category ? "active" : ""}
            onClick={() => setCategory("")}
            type="button"
          >
            All finds
          </button>
          {categories.map((item) => (
            <button
              className={category === item.id ? "active" : ""}
              onClick={() => setCategory(category === item.id ? "" : item.id)}
              key={item.id}
              type="button"
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="catalog-tools">
          <button
            type="button"
            className="filter-toggle"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
          <label className="sort-select">
            <ArrowDownWideNarrow size={15} />
            <span>Sort</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>
      </div>
      {filtersOpen && (
        <div className="filter-panel">
          <label htmlFor="price-filter">
            Maximum price <strong>₹{maxPrice.toLocaleString("en-IN")}</strong>
          </label>
          <input
            id="price-filter"
            type="range"
            min="2000"
            max="50000"
            step="1000"
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
          />
        </div>
      )}
      {visibleItems.length ? (
        <div className="product-grid">
          {visibleItems.map((item) => (
            <ProductCard key={item.variant.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <span>No finds in this aisle just yet.</span>
          <button
            onClick={() => {
              setCategory("");
              setMaxPrice(50000);
            }}
            type="button"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
