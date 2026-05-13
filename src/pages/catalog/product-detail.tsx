import Button from "@/components/button";
import HorizontalDivider from "@/components/horizontal-divider";
import { useAtomValue } from "jotai";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { productState } from "@/state";
import ShareButton from "./share-buttont";
import RelatedProducts from "./related-products";
import api from "zmp-sdk";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useAtomValue(productState(Number(id)))!;
  
  const details = product.details || [];
  const tabs = details.map((d: any) => d.title);
  
  const [activeTab, setActiveTab] = useState(tabs[0] || "");

  useEffect(() => {
    if (tabs.length > 0 && !tabs.includes(activeTab)) {
      setActiveTab(tabs[0]);
    }
  }, [product.id, tabs, activeTab]);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} - DXMD Vietnam`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `Thông tin chi tiết dự án ${product.name} phân phối bởi DXMD Vietnam.`);
      }
    }
  }, [product]);

  const handleCall = () => {
    try {
      api.openPhone({ phoneNumber: "19001234" });
    } catch (error) {
      toast.success("Đang gọi Hotline: 19001234");
    }
  };

  const handleChat = () => {
    try {
      api.openChat({
        type: "oa",
        id: "123456789", // Replace with real OA ID
        message: `Tôi muốn tư vấn về dự án ${product.name}`,
      });
    } catch (error) {
      navigate("/contact");
    }
  };

  // Get active content
  const activeContent = details.find((d: any) => d.title === activeTab)?.content || "";

  return (
    <div className="w-full h-full flex flex-col bg-background">
      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          <img
            key={product.id}
            src={product.image}
            alt={product.name}
            className="w-full aspect-[4/3] object-cover animate-scale-in"
            style={{
              viewTransitionName: `product-image-${product.id}`,
            }}
          />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between mb-2">
               <div className="text-[10px] uppercase tracking-wider font-semibold text-white px-2 py-1 bg-accent rounded shadow-sm">
                  {product.category?.name || "Dự án"}
               </div>
            </div>
            <h1 className="text-2xl font-bold text-white leading-tight drop-shadow-md">
              {product.name}
            </h1>
          </div>
        </div>
        
        <div className="w-full px-4 pt-3 pb-2 flex items-center justify-between">
           <div className="text-sm font-medium text-primary flex items-center">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
               <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
             </svg>
             Vị trí đắc địa
           </div>
           <ShareButton product={product} />
        </div>
        
        <div className="bg-section h-2 w-full mt-2"></div>
        
        {/* Horizontal Scrollable Tabs */}
        {tabs.length > 0 && (
          <div className="sticky top-0 z-20 bg-background border-b border-black/10 overflow-x-auto hide-scrollbar">
            <div className="flex w-max px-2">
              {tabs.map((tab: string) => (
                <div 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors relative ${
                    activeTab === tab ? "text-primary" : "text-subtitle"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-sm" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="p-4 min-h-[200px] animate-fade-in">
          {activeTab.toLowerCase().includes("website") || activeTab.toLowerCase().includes("link") ? (
             <a href={activeContent} target="_blank" rel="noreferrer" className="text-primary break-all underline text-sm">
                {activeContent}
             </a>
          ) : (
             <div 
                className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: activeContent }}
             />
          )}
        </div>

        <div className="bg-section h-2 w-full mt-4"></div>
        <div className="font-bold py-4 px-4 text-lg text-foreground">
          Dự án tương tự
        </div>
        <RelatedProducts currentProductId={product.id} />
      </div>

      <div className="flex-none grid grid-cols-2 gap-3 py-3 px-4 glassmorphism sticky bottom-0 z-30 border-t border-secondary/20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button
          large
          primary
          onClick={handleCall}
        >
          Gọi Hotline
        </Button>
        <Button
          large
          className="bg-accent text-white"
          onClick={handleChat}
        >
          Nhận Tư Vấn
        </Button>
      </div>
    </div>
  );
}
