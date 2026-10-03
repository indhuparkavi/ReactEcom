import { Storefront } from "@/components/Storefront";
import { getCatalog, getCategories } from "@/services/api";

export async function CatalogSection({
  query,
  category,
}: {
  query: string;
  category: string;
}) {
  const [items, categories] = await Promise.all([
    getCatalog(),
    getCategories(),
  ]);
  return (
    <Storefront
      items={items}
      categories={categories}
      initialQuery={query}
      initialCategory={category}
    />
  );
}
