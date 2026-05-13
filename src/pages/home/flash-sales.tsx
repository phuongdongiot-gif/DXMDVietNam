import ProductGrid from "@/components/product-grid";
import Section from "@/components/section";
import { useProjectStore } from "@/stores/useProjectStore";

export default function FlashSales() {
  const products = useProjectStore(s => s.projects);

  return (
    <Section title="Dự án Nổi bật" viewMoreTo="/flash-sales">
      <ProductGrid products={products} />
    </Section>
  );
}
