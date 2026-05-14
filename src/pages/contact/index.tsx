import React, { useState, useEffect } from "react";
import { Button, Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import api from "zmp-sdk";
import { fetchOptionsAPI } from "@/services/wp";

const ContactPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>("Đang tải...");

  useEffect(() => {
    fetchOptionsAPI()
      .then(data => {
        if (data && data.acf && data.acf.f_address) {
          setAddress(data.acf.f_address);
        } else if (data && data.acf && data.acf.f_chi_nhanh && data.acf.f_chi_nhanh.length > 0) {
          setAddress(data.acf.f_chi_nhanh[0].address);
        } else {
          setAddress("Tòa nhà Đất Xanh Miền Đông, 114 Nguyễn Cửu Vân, Phường 17, Quận Bình Thạnh, TP.HCM");
        }
      })
      .catch(err => {
        console.error("Error fetching contact options", err);
        setAddress("Tòa nhà Đất Xanh Miền Đông, 114 Nguyễn Cửu Vân, Phường 17, Quận Bình Thạnh, TP.HCM");
      });
  }, []);

  const handleOpenWebview = (url: string) => {
    navigate(`/webview?url=${encodeURIComponent(url)}`);
  };

  const handleChatZalo = () => {
    try {
      api.openChat({
        type: "oa",
        id: "4318657068771012646",
        message: "Xin chào, tôi muốn nhận thông tin tư vấn các dự án bất động sản."
      });
    } catch (error) {
      console.error(error);
      window.location.href = "https://zalo.me/4318657068771012646";
    }
  };

  return (
    <div className="flex flex-col bg-section overflow-y-auto">
      {/* 1. Dynamic Contact Info from WordPress */}
      <div className="p-4 bg-background mb-2 min-h-[200px] relative">
        <h2 className="text-xl font-bold text-primary mb-4 text-center">
          Liên hệ DXMD Vietnam
        </h2>

        {/* Địa điểm */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-secondary/20 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full z-0"></div>
          <div className="flex items-start relative z-10">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex flex-shrink-0 items-center justify-center mr-3 mt-1">
              <Icon icon="zi-location" className="text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground mb-1">
                Trụ sở chính
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                {address}
              </div>
            </div>
          </div>
        </div>

        {/* Thời gian làm việc */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-secondary/20 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-secondary/5 rounded-tl-full z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-2">
                <Icon icon="zi-clock-1" className="text-secondary" size={16} />
              </div>
              <div className="text-lg font-bold text-primary">
                Thời gian làm việc
              </div>
            </div>

            <div className="pl-2 space-y-3">
              <div className="relative pl-4 border-l-2 border-primary/20">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary"></div>
                <div className="text-sm font-bold text-foreground mb-1">Thứ Hai - Thứ Sáu</div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span> Sáng: 08h00 - 12h00</div>
                  <div className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span> Chiều: 13h30 - 17h30</div>
                </div>
              </div>

              <div className="relative pl-4 border-l-2 border-primary/20">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-secondary"></div>
                <div className="text-sm font-bold text-foreground mb-1">Thứ Bảy</div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span> Sáng: 08h00 - 12h00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Zalo Chat CTA (Replaced the form) */}
      <div className="p-4 bg-background mb-2">
        <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm text-center">
          <h3 className="text-lg font-bold text-foreground mb-2">
            Nhận thông tin tư vấn
          </h3>
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">
            Kết nối ngay với chuyên viên tư vấn của Đất Xanh Miền Đông qua Zalo để nhận báo giá và chính sách nhanh nhất.
          </p>
          <Button fullWidth onClick={handleChatZalo} size="large" className="rounded-xl shadow-md shadow-primary/30">
            <span className="flex items-center justify-center">
              <Icon icon="zi-chat" className="mr-2" />
              <span>Chat ngay với Zalo OA</span>
            </span>
          </Button>
        </div>
      </div>

      {/* 3. Recruitment Section */}
      <div className="p-4 bg-background pb-8">
        <h3 className="text-lg font-bold text-foreground mb-2">
          Tuyển dụng
        </h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Gia nhập đội ngũ Đất Xanh Miền Đông để cùng xây dựng và phát triển các dự án bất động sản hàng đầu.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div
            className="p-4 rounded-xl border border-secondary/20 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform"
            onClick={() => handleOpenWebview(`${import.meta.env.VITE_BASE_URL}/tuyen-dung/#co-hoi`)}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Icon icon="zi-search" className="text-primary" size={20} />
            </div>
            <div className="text-sm font-bold text-foreground">Cơ hội nghề nghiệp</div>
          </div>

          <div
            className="p-4 rounded-xl border border-secondary/20 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform"
            onClick={() => handleOpenWebview(`${import.meta.env.VITE_BASE_URL}/tuyen-dung/#chinh-sach`)}
          >
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <Icon icon="zi-user-solid" className="text-secondary" size={20} />
            </div>
            <div className="text-sm font-bold text-foreground">Chính sách nhân sự</div>
          </div>
        </div>

        <Button
          fullWidth
          variant="secondary"
          className="mt-4 border-gray-200 text-gray-700 bg-white shadow-sm"
          onClick={() => handleOpenWebview(`${import.meta.env.VITE_BASE_URL}/tuyen-dung/`)}
        >
          Xem tất cả vị trí ứng tuyển
        </Button>
      </div>
    </div>
  );
};

export default ContactPage;
