import React, { useState } from "react";
import { Page } from "zmp-ui";
import { useSearchParams } from "react-router-dom";

export default function WebviewPage() {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const [isLoading, setIsLoading] = useState(true);

  if (!url) {
    return (
      <Page className="flex flex-col items-center justify-center bg-white h-full">
        <div className="text-gray-500">Đường dẫn không hợp lệ.</div>
      </Page>
    );
  }

  return (
    <Page className="flex flex-col bg-white h-full relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="mt-4 text-sm text-gray-500">Đang tải trang...</div>
        </div>
      )}
      <iframe 
        src={url} 
        className="w-full h-full border-none flex-1"
        onLoad={() => setIsLoading(false)}
        allow="fullscreen"
      />
    </Page>
  );
}
