import React, { useState, useEffect } from "react";
import { Page, Box, Text } from "zmp-ui";
import { useParams, useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { galleryState } from "@/state";

export default function GalleryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const galleries = useAtomValue(galleryState);
  const gallery = galleries.find((g) => g.id === Number(id));

  // Lightbox state
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (gallery) {
      document.title = `${gallery.title} - Công ty Cổ phần DXMD Việt Nam`;
    }
  }, [gallery]);

  if (!gallery) {
    return (
      <Page className="bg-white flex flex-col items-center justify-center h-full">
        <Text>Không tìm thấy thư viện này.</Text>
      </Page>
    );
  }

  const images = gallery.images || [];

  return (
    <Page className="flex flex-col bg-background h-full relative overflow-y-auto">
      <Box className="bg-white px-4 pt-4 pb-2 border-b border-gray-100">
        <Text size="large" bold className="text-foreground leading-snug">
          {gallery.title}
        </Text>
        <Text size="small" className="text-subtitle mt-1">
          {images.length} hình ảnh
        </Text>
      </Box>

      <div className="p-4 flex-1">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {images.map((img: string, idx: number) => (
            <div 
              key={idx} 
              className="w-full aspect-square bg-skeleton rounded-lg overflow-hidden cursor-pointer active:scale-95 transition-transform"
              onClick={() => {
                setPhotoIndex(idx);
                setIsOpen(true);
              }}
            >
              <img 
                src={img} 
                alt={`${gallery.title} - ${idx + 1}`} 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Basic Lightbox Viewer */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center touch-none">
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
             <div className="text-white font-medium text-sm">
                {photoIndex + 1} / {images.length}
             </div>
             <button 
               className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:bg-white/30"
               onClick={() => setIsOpen(false)}
             >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
             </button>
          </div>
          
          <img 
            src={images[photoIndex]} 
            className="max-w-full max-h-full object-contain" 
            alt="Fullscreen view" 
          />

          <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center z-10">
            <button 
              className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white backdrop-blur-sm active:bg-white/30 ${photoIndex === 0 ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => setPhotoIndex((prev) => Math.max(0, prev - 1))}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button 
              className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white backdrop-blur-sm active:bg-white/30 ${photoIndex === images.length - 1 ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => setPhotoIndex((prev) => Math.min(images.length - 1, prev + 1))}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      )}
    </Page>
  );
}
