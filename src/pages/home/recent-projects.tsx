import Section from "@/components/section";
import ProductGrid from "@/components/product-grid";
import { useProjectStore } from "@/stores/useProjectStore";

export default function RecentProjects() {
  const products = useProjectStore((s) => s.projects);
  const recent = products.slice(4, 8); // The next 4 projects

  // If there are no recent projects, gracefully fall back to first 4 so the UI is visible
  const displayProducts = recent.length > 0 ? recent : products.slice(0, 4);

  return (
    <Section title="Dự án mới">
      <ProductGrid products={displayProducts} />
    </Section>
  );
}
