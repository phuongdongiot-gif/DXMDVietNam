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

  const isVideo = (url: string) => {
    if (!url || typeof url !== 'string') return false;
    return url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('youtube.com') || url.toLowerCase().includes('youtu.be');
  };

  const renderMedia = (url: string, className: string, isGrid = false) => {
    if (!url || typeof url !== 'string') return null;
    if (isVideo(url)) {
      if (url.includes('youtube') || url.includes('youtu.be')) {
        let videoId = "";
        if (url.includes('v=')) {
          videoId = url.split('v=')[1]?.split('&')[0];
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1]?.split('?')[0];
        }
        return (
          <div className="relative w-full h-full">
            <iframe 
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${isGrid ? 0 : 1}&mute=${isGrid ? 1 : 0}`} 
              className={className} 
              allowFullScreen 
              frameBorder="0"
              style={{ pointerEvents: isGrid ? 'none' : 'auto' }}
            />
            {isGrid && <div className="absolute inset-0 z-10"></div>}
          </div>
        );
      }
      return (
        <div className="relative w-full h-full bg-black">
          <video 
            src={url} 
            className={className} 
            controls={!isGrid} 
            autoPlay={!isGrid} 
            muted={isGrid}
            playsInline
            style={{ pointerEvents: isGrid ? 'none' : 'auto' }}
          />
          {isGrid && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20">
              <div className="bg-black/60 rounded-full p-2.5 backdrop-blur-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5V19L19 12L8 5Z"/></svg>
              </div>
            </div>
          )}
        </div>
      );
    }
    return <img src={url} className={className} alt="Gallery item" />;
  };

  return (
    <Page className="flex flex-col bg-background h-full relative overflow-y-auto">
      <Box className="bg-white px-4 pt-4 pb-2 border-b border-gray-100">
        <Text size="large" bold className="text-foreground leading-snug">
          {gallery.title}
        </Text>
        <Text size="small" className="text-subtitle mt-1">
          {images.length} hình ảnh / video
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
              {renderMedia(img, "w-full h-full object-cover", true)}
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
          
          <div className="w-full h-full flex items-center justify-center pt-16 pb-20">
            {renderMedia(images[photoIndex], "max-w-full max-h-full object-contain", false)}
          </div>

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
