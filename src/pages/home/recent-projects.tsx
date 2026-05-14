import Section from "@/components/section";
import ProductGrid from "@/components/product-grid";
import { useAtomValue } from "jotai";
import { productsState } from "@/state";

export default function RecentProjects() {
  const products = useAtomValue(productsState);
  const recent = products.slice(0, 4); // The 4 newest projects

  // If there are no recent projects, gracefully fall back
  const displayProducts = recent.length > 0 ? recent : products.slice(0, 4);

  return (
    <Section title="Dự án mới">
      <ProductGrid products={displayProducts} />
    </Section>
  );
}
