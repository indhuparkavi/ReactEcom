# Marketlane storefront

Marketlane is a Next.js App Router storefront built with TypeScript, Tailwind CSS, and React Context. The marketplace catalog is server-rendered and streamed with a loading skeleton; interactive search, filters, session state, cart updates, and payment simulation live in client boundaries.

Requires Node.js 20.9 or newer.

## Run locally

```sh
npm install
npm run dev
```

## API mapping

The fixtures in `src/data/catalog.ts` mirror the supplied model fields:

- `Product`: `id`, `name`, `description`, `subCategory`, `type`, `createdAt`, `updatedAt`
- `Category`: `id`, `name`, `createdAt`, `updatedAt`
- `SubCategory`: `id`, `name`, `categoryId`
- `Variant`: `id`, `price`, `color`, `size`, `productId`, `type`, `image`, `stock`, timestamps
- `Stock`: `id`, `quantityTotal`, `quantityAvailable`, `quantityReserved`, `quantityOrdered`, `productId`, `locationId`, `status`, timestamps

Products and variants are separate fixture collections, joined by `Variant.productId`. Department filters follow `Product.subCategory.categoryId` to `Category.id`. Replace these collections in `src/services/api.ts` with API responses while retaining those joins.

The current backend models do not define brand, rating, rating count, compare-at price, or delivery promise fields. Demo values for those elements live separately in `presentationByProductId`; they are not added to the API-shaped records. Move that enrichment to the API response or a real catalog presentation service when those fields become available.

Cart and mock session state use browser storage for this demo. The checkout service emits backend-shaped `Order`, `Invoice`, and `Payment` records; replace `submitCheckout` in `src/services/api.ts` with the production API call when the backend is ready. The payment flow is a simulation and does not process real payment details.
