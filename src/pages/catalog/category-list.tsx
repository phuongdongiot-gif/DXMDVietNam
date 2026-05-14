import React, { useState, useEffect } from "react";
import { Page, Box, Text } from "zmp-ui";
import SearchBar from "@/components/search-bar";
import TransitionLink from "@/components/transition-link";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import { categoriesState, productsState } from "@/state";

export default function CategoryListPage() {
  const navigate = useNavigate();
  const categories = useAtomValue(categoriesState);
  const products = useAtomValue(productsState);
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | number | 'all'>('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategoryId]);

  // Filter projects based on selected category
  const filteredProducts = selectedCategoryId === 'all' 
    ? products 
    : products.filter(p => p.category?.id === selectedCategoryId);

  const displayedProducts = filteredProducts.slice(0, page * itemsPerPage);
  const hasMore = displayedProducts.length < filteredProducts.length;

  return (
    <Page className="flex flex-col bg-background h-full overflow-hidden">
      <div className="bg-white pt-2 pb-2 shadow-sm z-10 relative">
        <SearchBar onClick={() => navigate("/search")} />
        
        {/* Dynamic Category Tabs */}
        <div className="overflow-x-auto hide-scrollbar mt-3 border-b border-gray-100">
          <div className="flex w-max px-4 space-x-6">
            <div 
              onClick={() => setSelectedCategoryId('all')}
              className={`pb-3 text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors relative ${
                selectedCategoryId === 'all' ? "text-primary" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Tất cả
              {selectedCategoryId === 'all' && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-md" />
              )}
            </div>
            
            {categories.map((category) => (
              <div 
                key={category.id}
                onClick={() => setSelectedCategoryId(category.id)}
                className={`pb-3 text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors relative ${
                  selectedCategoryId === category.id ? "text-primary" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {category.name}
                {selectedCategoryId === category.id && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-md" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mb-2 opacity-30">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
            </svg>
            <p>Không tìm thấy dự án nào</p>
          </div>
        ) : (
          <>
            {displayedProducts.map((product) => (
              <TransitionLink
                key={product.id}
                className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform duration-200"
                to={`/product/${product.id}`}
              >
                <div className="relative aspect-[16/9] w-full bg-skeleton">
                  <img
                    src={product.image}
                    className="w-full h-full object-cover"
                    alt={product.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <div className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
                      {product.category?.name || "Dự án"}
                    </div>
                  </div>
                  
                  {/* Overlay Text */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-md mb-1">
                      {product.name}
                    </h3>
                    {product.slogan && (
                      <div className="text-white/90 text-sm font-medium italic mb-1 line-clamp-1">{product.slogan}</div>
                    )}
                    <div className="flex items-center text-white/90 text-xs">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mr-1 shrink-0"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/></svg>
                      <span className="line-clamp-1">{product.address || "Đang cập nhật"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 flex justify-between items-center bg-white">
                  <div>
                    <div className="text-[10px] text-gray-500 mb-0.5">Giá tham khảo</div>
                    <div className="text-red-500 font-bold text-sm">
                      {product.price ? `${product.price} Triệu/m²` : "Liên hệ"}
                    </div>
                  </div>
                  <button className="bg-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-lg">
                    Xem chi tiết
                  </button>
                </div>
              </TransitionLink>
            ))}
            
            {hasMore && (
              <div className="flex justify-center pt-2 pb-6">
                <button 
                  onClick={() => setPage(p => p + 1)}
                  className="bg-white border border-gray-200 text-gray-600 text-sm font-medium px-6 py-2.5 rounded-full shadow-sm active:scale-95 transition-transform"
                >
                  Xem thêm dự án
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Page>
  );
}
