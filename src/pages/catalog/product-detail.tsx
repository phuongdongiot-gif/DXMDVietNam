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
import { useState } from "react";

const PROJECT_TABS = ["Tổng quan", "Vị trí", "Tiện ích", "Mặt bằng", "Thư viện"];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useAtomValue(productState(Number(id)))!;
  const [activeTab, setActiveTab] = useState(PROJECT_TABS[0]);

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

  // Safe extract overview
  const overviewContent = product.details?.find((d: any) => d.title.toLowerCase().includes("tổng quan"))?.content || 
    "Sở hữu quỹ đất vàng hiếm hoi với không gian thông thoáng, thiết kế hiện đại và mức giá cực kỳ cạnh tranh. Không chỉ giải quyết bài toán an cư mà còn là bảo chứng cho tiềm năng tăng giá vượt trội nhờ sự bứt phá của hạ tầng giao thông khu vực và hệ sinh thái tiện ích nội khu trọn vẹn.";

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
        <div className="sticky top-0 z-20 bg-background border-b border-black/10 overflow-x-auto hide-scrollbar">
          <div className="flex w-max px-2">
            {PROJECT_TABS.map(tab => (
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

        {/* Tab Content */}
        <div className="p-4 min-h-[200px] animate-fade-in">
          {activeTab === "Tổng quan" && (
             <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
               {overviewContent}
             </div>
          )}
          
          {activeTab === "Vị trí" && (
             <div className="text-sm text-foreground/80">
                <h3 className="font-bold text-base mb-2 text-foreground">Kết nối giao thông huyết mạch</h3>
                <p className="mb-4">Tọa lạc tại vị trí giao thoa kinh tế trọng điểm, cư dân dễ dàng kết nối với các tuyến giao thông huyết mạch. Tận hưởng tiềm năng tăng giá từ quy hoạch hạ tầng khu vực.</p>
                <div className="aspect-[16/9] bg-skeleton rounded-xl overflow-hidden flex items-center justify-center border border-secondary/20 relative group">
                  <div className="absolute inset-0 flex items-center justify-center flex-col text-subtitle group-hover:text-primary transition-colors">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.88 14.12 16.19 12 18.88C9.92 16.21 7 11.85 7 9Z" fill="currentColor"/>
                      <path d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5ZM12 8.5C12.2761 8.5 12.5 8.72386 12.5 9C12.5 9.27614 12.2761 9.5 12 9.5C11.7239 9.5 11.5 9.27614 11.5 9C11.5 8.72386 11.7239 8.5 12 8.5Z" fill="currentColor"/>
                    </svg>
                    <span>Xem Bản đồ vị trí</span>
                  </div>
                </div>
             </div>
          )}
          
          {activeTab === "Tiện ích" && (
             <div className="text-sm text-foreground/80">
                <h3 className="font-bold text-base mb-3 text-foreground">Hệ sinh thái tiện ích "All-in-one"</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✔</span>
                    <span>Trung tâm thương mại, siêu thị tiện lợi sầm uất.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✔</span>
                    <span>Hồ bơi vô cực, khu công viên cảnh quan.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✔</span>
                    <span>Khu vực BBQ ngoài trời, nhà trẻ nội khu, Kidzone.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✔</span>
                    <span>Phòng Gym & Yoga trang bị hiện đại.</span>
                  </li>
                </ul>
             </div>
          )}
          
          {activeTab === "Mặt bằng" && (
             <div className="text-sm text-foreground/80 text-center py-4">
                <div className="aspect-[4/3] bg-skeleton rounded-xl overflow-hidden flex flex-col items-center justify-center border border-secondary/20 mb-3 text-subtitle">
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                     <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V5H19V19ZM17 17H7V15H17V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="currentColor"/>
                   </svg>
                   <span>Mặt bằng tổng thể</span>
                </div>
                <p>Mặt bằng đang được cập nhật chi tiết cho từng loại sản phẩm.</p>
             </div>
          )}
          
          {activeTab === "Thư viện" && (
             <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square bg-skeleton rounded-lg overflow-hidden border border-secondary/20 relative">
                    <img src={product.image} className="w-full h-full object-cover opacity-80" alt="Gallery" />
                  </div>
                ))}
             </div>
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
