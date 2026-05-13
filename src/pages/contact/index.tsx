import React, { useState, useEffect } from "react";
import { Page, Box, Button, Text, Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import api from "zmp-sdk";

const ContactPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [pageHtml, setPageHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://dxmdvietnam.vn/wp-json/wp/v2/pages?slug=lien-he")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setPageHtml(data[0].content.rendered);
        }
      })
      .catch(err => console.error("Error fetching contact page:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleOpenWebview = (url: string) => {
    navigate(`/webview?url=${encodeURIComponent(url)}`);
  };

  const handleChatZalo = () => {
    try {
      api.openChat({
        type: "oa",
        id: import.meta.env.VITE_ZALO_OA_ID || "0", // Fallback to 0 or replace with real OA ID
        message: "Xin chào, tôi muốn nhận thông tin tư vấn các dự án bất động sản."
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page className="flex flex-col bg-section overflow-y-auto">
      {/* 1. Dynamic Contact Info from WordPress */}
      <Box p={4} className="bg-background mb-2 min-h-[200px] relative">
        <Text size="xLarge" bold className="text-primary mb-1">
          Liên hệ DXMD Việt Nam
        </Text>
        
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div 
            className="mt-4 text-gray-800 text-[14px] leading-relaxed
              [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-primary [&_h3]:mb-2
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1
              [&_li]:mb-1
              [&_p]:mb-3
              [&_a]:text-blue-600 [&_a]:underline
              [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-md
            "
            dangerouslySetInnerHTML={{ __html: pageHtml || "<p>Đang cập nhật thông tin...</p>" }}
          />
        )}
      </Box>

      {/* 2. Zalo Chat CTA (Replaced the form) */}
      <Box p={4} className="bg-background mb-2">
        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-blue-100 bg-blue-50/50 shadow-sm text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-3 shadow-md rotate-3">
            <Icon icon="zi-chat" size={32} />
          </div>
          <Text size="large" bold className="text-foreground mb-2">
            Nhận thông tin tư vấn
          </Text>
          <Text size="small" className="text-gray-600 mb-5 px-4 leading-relaxed">
            Kết nối ngay với chuyên viên tư vấn của Đất Xanh Miền Đông qua Zalo để nhận báo giá và chính sách nhanh nhất.
          </Text>
          <Button fullWidth onClick={handleChatZalo} size="large" className="rounded-xl shadow-md shadow-blue-500/30">
            Chat ngay với Zalo OA
          </Button>
        </div>
      </Box>

      {/* 3. Recruitment Section */}
      <Box p={4} className="bg-background pb-8">
        <Text size="large" bold className="text-foreground mb-2">
          Tuyển dụng
        </Text>
        <Text size="small" className="text-gray-600 mb-4 leading-relaxed">
          Gia nhập đội ngũ Đất Xanh Miền Đông để cùng xây dựng và phát triển các dự án bất động sản hàng đầu.
        </Text>
        
        <div className="grid grid-cols-2 gap-3">
          <div 
             className="p-4 rounded-xl border border-secondary/20 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform"
             onClick={() => handleOpenWebview('https://dxmdvietnam.vn/tuyen-dung/#co-hoi')}
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
              <Icon icon="zi-search" className="text-blue-500" size={20} />
            </div>
            <Text size="small" bold className="text-foreground">Cơ hội nghề nghiệp</Text>
          </div>
          
          <div 
             className="p-4 rounded-xl border border-secondary/20 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform"
             onClick={() => handleOpenWebview('https://dxmdvietnam.vn/tuyen-dung/#chinh-sach')}
          >
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
              <Icon icon="zi-user-solid" className="text-green-500" size={20} />
            </div>
            <Text size="small" bold className="text-foreground">Chính sách nhân sự</Text>
          </div>
        </div>
        
        <Button 
           fullWidth 
           variant="secondary" 
           className="mt-4 border-gray-200 text-gray-700 bg-white shadow-sm" 
           onClick={() => handleOpenWebview('https://dxmdvietnam.vn/tuyen-dung/')}
        >
          Xem tất cả vị trí ứng tuyển
        </Button>
      </Box>
    </Page>
  );
};

export default ContactPage;
