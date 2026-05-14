import React from "react";
import api from "zmp-sdk";

const CTA: React.FC = () => {
  return (
    <div className="mx-4 mt-6 mb-2 bg-gradient-to-r from-primary to-secondary rounded-xl p-5 text-white shadow-md relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-8 -mb-8 pointer-events-none"></div>

      <h3 className="font-bold text-lg mb-2 relative z-10 drop-shadow-sm">Đừng bỏ lỡ cơ hội đầu tư</h3>
      <p className="text-xs text-white/95 mb-4 relative z-10">
        Đăng ký để nhận thông tin mới nhất về các dự án và bảng giá từ Công ty Cổ phần DXMD Việt Nam.
      </p>

      <button 
        className="w-full flex items-center justify-center space-x-2 bg-accent p-3 rounded-lg relative z-10 shadow-sm hover:bg-accent/90 transition-colors cursor-pointer active:scale-95"
        onClick={() => {
          try {
            api.openChat({
              type: "oa",
              id: "656653957756576520",
              message: "Tôi muốn nhận thông tin về các dự án và bảng giá mới nhất từ DXMD Vietnam",
            });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"></path>
        </svg>
        <span className="text-white font-bold text-sm">Nhắn tin nhận thông tin</span>
      </button>
    </div>
  );
};

export default CTA;
