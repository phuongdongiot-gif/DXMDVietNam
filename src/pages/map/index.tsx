import React from "react";
import { Page } from "zmp-ui";

const MapPage: React.FunctionComponent = () => {
  return (
    <Page className="flex flex-col bg-background h-full">
      <div className="flex-1 overflow-hidden relative h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.424167419728!2d106.68739981533423!3d10.778789392319985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9d8d141b%3A0x86337ed5ec30e5f0!2sH%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1689139268305!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0, position: "absolute", top: 0, left: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        <div className="absolute bottom-6 left-4 right-4 bg-white/90 backdrop-blur-md shadow-lg z-10 rounded-xl p-4 border border-gray-100">
          <h2 className="text-lg font-bold text-primary mb-1">DXMD Viet Nam</h2>
          <p className="text-sm text-gray-600 mb-2">Công ty Cổ phần DXMD Việt Nam (Đất Xanh Miền Đông)</p>
          <div className="flex items-center text-xs text-gray-500">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Đang mở cửa
          </div>
        </div>
      </div>
    </Page>
  );
};

export default MapPage;
