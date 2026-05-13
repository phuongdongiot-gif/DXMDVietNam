import Section from "@/components/section";
import Carousel from "@/components/carousel";
import ProductItem from "@/components/product-item";
import { useAtomValue } from "jotai";
import { productsState } from "@/state";

export default function FeaturedProjects() {
  const products = useAtomValue(productsState);
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
