import React, { Suspense } from "react";
import Section from "@/components/section";
import { useAtomValue } from "jotai";
import { galleryState, GalleryItem } from "@/state";
import { useNavigate } from "react-router-dom";

function GalleryContent() {
  const galleries = useAtomValue(galleryState) || [];
  const navigate = useNavigate();

  if (galleries.length === 0) return null;

  return (
    <div className="pt-3 pb-5 overflow-x-auto px-4 hide-scrollbar">
      <div className="flex w-max space-x-4">
        {galleries.map((item: GalleryItem) => (
          <div
            key={item.id}
            className="w-[200px] flex flex-col cursor-pointer group active:scale-95 transition-transform duration-200"
            onClick={() => navigate(`/gallery/${item.id}`)}
          >
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-secondary/20 bg-skeleton relative">
              <img
                src={item.cover}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full flex items-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mr-1"><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" fill="currentColor"/></svg>
                {item.images.length} ảnh
              </div>
            </div>
            <div className="mt-2 text-sm font-semibold w-full line-clamp-2 text-foreground leading-snug">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GallerySection() {
  return (
    <Section title="Thư viện hình ảnh" viewMoreTo="/gallery">
      <Suspense fallback={<div className="h-[150px] flex items-center justify-center">Đang tải thư viện...</div>}>
        <GalleryContent />
      </Suspense>
    </Section>
  );
}
