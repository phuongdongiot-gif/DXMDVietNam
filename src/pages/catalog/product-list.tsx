import HorizontalDivider from "@/components/horizontal-divider";
import ProductGrid from "@/components/product-grid";
import { useAtomValue } from "jotai";
import { productsState } from "@/state";
import { useParams } from "react-router-dom";
import React, { useState } from "react";

export default function ProductListPage() {
  const { id } = useParams();
  const allProducts = useAtomValue(productsState);
  
  const products = id 
    ? allProducts.filter(p => String(p.category?.id) === id) 
    : allProducts;

  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // Display 8 items initially

  const displayedProducts = products.slice(0, page * itemsPerPage);
  const hasMore = displayedProducts.length < products.length;

  return (
    <div className="bg-background min-h-screen pb-8">
      <HorizontalDivider />
      <ProductGrid products={displayedProducts} className="pt-4 pb-2" />
      
      {hasMore && (
        <div className="flex justify-center pt-4 pb-8">
          <button 
            onClick={() => setPage(p => p + 1)}
            className="bg-white border border-gray-200 text-gray-600 text-sm font-medium px-6 py-2.5 rounded-full shadow-sm active:scale-95 transition-transform"
          >
            Xem thêm dự án
          </button>
        </div>
      )}
    </div>
  );
}
