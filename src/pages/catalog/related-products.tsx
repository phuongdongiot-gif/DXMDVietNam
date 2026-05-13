import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { productsState } from "@/state";
import Carousel from "@/components/carousel";
import ProductItem from "@/components/product-item";

export interface RelatedProductsProps {
  currentProductId: number;
}

export default function RelatedProducts(props: RelatedProductsProps) {
  const products = useAtomValue(productsState);
  const otherProducts = useMemo(
    () => products.filter((product) => product.id !== props.currentProductId),
    [products, props.currentProductId]
  );

  return (
    <Carousel 
      itemsPerView={2} 
      slides={otherProducts.map(product => (
        <ProductItem key={product.id} product={product} replace />
      ))}
    />
  );
}
