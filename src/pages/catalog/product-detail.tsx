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
    <div className="w-full h-full flex flex-col bg-background relative">
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
          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          
          {/* Top Actions: Back, Share, Favorite */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <button 
              onClick={() => navigate(-1)} 
              className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md active:scale-95 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="bg-black/40 rounded-full backdrop-blur-md flex">
              <ShareButton product={product} />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-2 mb-2">
               <div className="text-[10px] uppercase tracking-wider font-semibold text-white px-2 py-1 bg-primary rounded shadow-sm">
                  {product.category?.name || "Dự án"}
               </div>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white leading-tight drop-shadow-md">
              {product.name}
            </h1>
          </div>
        </div>
        
        {/* Quick Stats Grid */}
        <div className="px-4 py-4 grid grid-cols-2 gap-3 bg-white border-b border-gray-100">
          <div className="flex flex-col bg-gray-50/80 p-3 rounded-xl border border-gray-100">
            <span className="text-[11px] text-gray-500 mb-1 flex items-center font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1 text-primary"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/></svg>
              Vị trí
            </span>
            <span className="text-sm font-semibold text-foreground line-clamp-1">{product.address || "Đang cập nhật"}</span>
          </div>
          <div className="flex flex-col bg-gray-50/80 p-3 rounded-xl border border-gray-100">
            <span className="text-[11px] text-gray-500 mb-1 flex items-center font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1 text-primary"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="currentColor"/></svg>
              Giá tham khảo
            </span>
            <span className="text-sm font-semibold text-red-500">{product.price ? `${product.price} Triệu/m²` : "Đang cập nhật"}</span>
          </div>
          <div className="flex flex-col bg-gray-50/80 p-3 rounded-xl border border-gray-100">
            <span className="text-[11px] text-gray-500 mb-1 flex items-center font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1 text-primary"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" fill="currentColor"/></svg>
              Chủ đầu tư
            </span>
            <span className="text-sm font-semibold text-foreground line-clamp-1">{product.developer || "DXMD Vietnam"}</span>
          </div>
          <div className="flex flex-col bg-gray-50/80 p-3 rounded-xl border border-gray-100">
            <span className="text-[11px] text-gray-500 mb-1 flex items-center font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1 text-primary"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v-2H4v6h16v-6h-2v2h-2v-5h-2v5z" fill="currentColor"/></svg>
              Quy mô
            </span>
            <span className="text-sm font-semibold text-foreground line-clamp-1">{product.scale || "Đang cập nhật"}</span>
          </div>
        </div>
        
        <div className="bg-section h-2 w-full"></div>
        
        {/* Horizontal Scrollable Tabs */}
        {tabs.length > 0 && (
          <div className="sticky top-0 z-20 bg-white border-b border-gray-100 overflow-x-auto hide-scrollbar shadow-sm">
            <div className="flex w-max px-2">
              {tabs.map((tab: string) => (
                <div 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3.5 text-[13px] font-bold whitespace-nowrap cursor-pointer transition-colors relative ${
                    activeTab === tab ? "text-primary" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-md" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="p-4 min-h-[300px] animate-fade-in bg-white">
          {activeTab.toLowerCase().includes("website") || activeTab.toLowerCase().includes("link") ? (
             <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-xl border border-gray-100">
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-primary/40 mb-4">
                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
               </svg>
               <h3 className="font-bold text-foreground mb-2">Truy cập Website dự án</h3>
               <a href={activeContent} target="_blank" rel="noreferrer" className="text-white bg-primary px-4 py-2 rounded-lg font-medium shadow-sm hover:opacity-90 active:scale-95 transition-all text-sm">
                  Nhấn vào đây để xem
               </a>
             </div>
          ) : (
             <div 
                className="prose prose-sm prose-img:rounded-xl prose-img:shadow-sm max-w-none text-foreground/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: activeContent }}
             />
          )}
          
          {/* Inline Lead Form Placeholder */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 p-5 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -mr-10 -mt-10"></div>
             <div className="relative z-10">
               <h3 className="text-primary font-bold text-lg mb-1">Bạn quan tâm dự án này?</h3>
               <p className="text-xs text-gray-600 mb-4 leading-relaxed">Đăng ký để nhận ngay bảng giá, chính sách ưu đãi mới nhất và hỗ trợ tham quan nhà mẫu miễn phí.</p>
               <Button variant="secondary" className="bg-white text-primary border border-primary w-full shadow-sm" onClick={handleChat}>
                 Đăng ký nhận báo giá
               </Button>
             </div>
          </div>
        </div>

        <div className="bg-section h-2 w-full"></div>
        <div className="bg-white pt-4 pb-6">
          <div className="font-bold px-4 mb-4 text-lg text-foreground flex items-center justify-between">
            <span>Dự án tương tự</span>
          </div>
          <RelatedProducts currentProductId={product.id} />
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="flex-none grid grid-cols-2 gap-3 p-3 glassmorphism sticky bottom-0 z-50 border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] pb-[max(12px,env(safe-area-inset-bottom))]">
        <Button
          large
          variant="secondary"
          className="border-primary/20 text-primary bg-primary/5 flex items-center justify-center space-x-2 font-bold shadow-none active:bg-primary/10"
          onClick={handleCall}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="currentColor"/></svg>
          <span>Gọi Ngay</span>
        </Button>
        <Button
          large
          className="bg-primary text-white flex items-center justify-center space-x-2 font-bold shadow-md shadow-primary/30"
          onClick={handleChat}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/></svg>
          <span>Zalo Chat</span>
        </Button>
      </div>
    </div>
  );
}
