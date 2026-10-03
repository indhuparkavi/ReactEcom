import { Suspense } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  PackageCheck,
  RefreshCw,
} from "lucide-react";
import { CatalogSection } from "@/components/CatalogSection";
import { SkeletonGrid } from "@/components/SkeletonGrid";

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const category = params.category ?? "";

  console.log(category, params);

  return (
    <>
      <section className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" /> THE EVERYDAY EDIT · VOL. 04
          </p>
          <h1>
            Make room
            <br />
            for <em>better.</em>
          </h1>
          <p className="hero-description">
            Useful things. Lovely details. A little upgrade for all the
            in-between moments.
          </p>
          <a className="hero-link" href="#catalog">
            Explore the edit <ArrowRight size={16} />
          </a>
          <div className="hero-index">
            <span>01</span>
            <span className="hero-index-rule" />
            <span>CURATED FOR THE EVERYDAY</span>
          </div>
        </div>
        <div
          className="hero-image"
          role="img"
          aria-label="A sunlit home with an inviting reading corner"
        >
          <div className="hero-image-wash" />
          <div className="hero-note">
            <span>
              THE GOOD
              <br />
              LIVING ISSUE
            </span>
            <span>
              Small things,
              <br />
              big difference.
            </span>
          </div>
          <div className="hero-image-credit">A slower kind of Sunday</div>
        </div>
        <div className="hero-aside">
          <span>01 / 04</span>
          <span className="aside-rule" />
          <span>HOME · TECH · OUTDOORS</span>
        </div>
      </section>
      <section className="trust-strip" aria-label="Shopping benefits">
        <div>
          <PackageCheck size={18} />
          <span>
            <strong>Careful, quick delivery</strong>
            <small>Free over ₹999</small>
          </span>
        </div>
        <div>
          <RefreshCw size={17} />
          <span>
            <strong>Easy, honest returns</strong>
            <small>Seven days to decide</small>
          </span>
        </div>
        <div>
          <BadgeCheck size={18} />
          <span>
            <strong>Brands with a point of view</strong>
            <small>Picked with intention</small>
          </span>
        </div>
        <a href="#catalog">
          See what’s good <ArrowDown size={14} />
        </a>
      </section>
      <Suspense
        fallback={
          <section className="catalog-section">
            <div className="catalog-heading">
              <div>
                <p className="eyebrow">THE MARKETLANE EDIT</p>
                <h2>Good things, well chosen.</h2>
              </div>
            </div>
            <SkeletonGrid />
          </section>
        }
      >
        <CatalogSection query={query} category={category} />
      </Suspense>
      <section className="closing-band">
        <span>THE LITTLE THINGS ADD UP</span>
        <p>
          Find your next <em>favourite thing.</em>
        </p>
        <a href="#catalog">
          Keep looking <ArrowRight size={15} />
        </a>
      </section>
    </>
  );
}
