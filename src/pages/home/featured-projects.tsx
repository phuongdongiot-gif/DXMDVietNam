import Section from "@/components/section";
import Carousel from "@/components/carousel";
import ProductItem from "@/components/product-item";
import { useProjectStore } from "@/stores/useProjectStore";

export default function FeaturedProjects() {
  const products = useProjectStore((s) => s.projects);
  const featured = products.slice(0, 4);

  const slides = featured.map((product) => (
    <ProductItem product={product} />
  ));

  return (
    <Section title="Dự án Nổi bật" viewMoreTo="/flash-sales">
       <Carousel slides={slides} />
    </Section>
  );
}
