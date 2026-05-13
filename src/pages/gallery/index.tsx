import React from "react";
import { Page, Box, Text } from "zmp-ui";
import { useAtomValue } from "jotai";
import { galleryState, GalleryItem } from "@/state";
import { useNavigate } from "react-router-dom";

export default function GalleryListPage() {
  const galleries = useAtomValue(galleryState) || [];
  const navigate = useNavigate();

  return (
    <Page className="flex flex-col bg-background h-full overflow-y-auto">
      <Box className="bg-white px-4 pt-4 pb-2 border-b border-gray-100 shadow-sm">
        <Text size="large" bold className="text-foreground leading-snug">
          Thư viện Hình ảnh
        </Text>
        <Text size="small" className="text-subtitle mt-1">
          Tổng hợp tất cả album ảnh sự kiện và dự án
        </Text>
      </Box>

      <div className="p-4 flex-1">
        {galleries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            Đang tải dữ liệu...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galleries.map((item: GalleryItem) => (
              <div
                key={item.id}
                className="w-full flex flex-col cursor-pointer group active:scale-95 transition-transform duration-200"
                onClick={() => navigate(`/gallery/${item.id}`)}
              >
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-secondary/20 bg-skeleton relative">
                  <img
                    src={item.cover}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                  
                  {/* Photo Count Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-md flex items-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mr-1"><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" fill="currentColor"/></svg>
                    {item.images.length} ảnh
                  </div>
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                     <h3 className="text-base font-bold drop-shadow-md line-clamp-2">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}
