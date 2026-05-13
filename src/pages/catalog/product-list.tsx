import HorizontalDivider from "@/components/horizontal-divider";
import ProductGrid from "@/components/product-grid";
import { useAtomValue } from "jotai";
import { productsState } from "@/state";
import { useParams } from "react-router-dom";

export default function ProductListPage() {
  const { id } = useParams();
  const allProducts = useAtomValue(productsState);
  
  const products = id 
    ? allProducts.filter(p => String(p.category?.id) === id) 
    : allProducts;

  return (
    <>
      <HorizontalDivider />
      <ProductGrid products={products} className="pt-4 pb-[13px]" />
    </>
  );
}
