import React, { useRef, useEffect, useState } from 'react';
import { Page } from "zmp-ui";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAtomValue } from "jotai";
import { productsState } from "@/state";
import { useNavigate } from "react-router-dom";

const MapPage = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const products = useAtomValue(productsState) || [];
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCarousel, setShowCarousel] = useState(true);

  const validProjects = products.filter(p => p.lat && p.lng);

  useEffect(() => {
    // Prevent re-initialization if already mounted
    if (!mapContainerRef.current) return;
    
    // Initialize map only once
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false, // We'll add it manually to top-right
        attributionControl: false
      }).setView([10.870843, 106.699836], 10); // [lat, lng] Default to HCMC

      // Add CartoDB Voyager tile layer (Clean, mapbox-like aesthetic, no token needed)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(mapRef.current);

      // Add zoom control at top right
      L.control.zoom({ position: 'topright' }).addTo(mapRef.current);
    }

    // Add markers
    validProjects.forEach(project => {
      // Create custom HTML marker using Leaflet's divIcon
      const customIcon = L.divIcon({
        className: 'bg-transparent border-0',
        html: `
          <div class="cursor-pointer group flex flex-col items-center relative" style="margin-left: -16px; margin-top: -36px;">
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)] border-2 border-white transform transition-all duration-300 group-hover:scale-110 group-hover:bg-accent relative z-10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="white"/>
              </svg>
            </div>
            <div class="w-3 h-3 bg-primary rotate-45 transform -translate-y-2 border-r-2 border-b-2 border-white transition-colors duration-300 group-hover:bg-accent group-hover:-translate-y-3 relative z-0"></div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });

      const marker = L.marker([project.lat, project.lng], { icon: customIcon })
        .addTo(mapRef.current);
        
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        setSelectedProject(project);
        
        // Use a higher zoom level (16) and a slight vertical offset so it's not hidden by the Bottom Sheet
        // A rough offset of 0.002 degrees south pushes the center down, bringing the marker up on screen
        const latOffset = 0.002; 
        mapRef.current.flyTo([project.lat - latOffset, project.lng], 16, {
          animate: true,
          duration: 1
        });
      });
    });

    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [validProjects]);

  return (
    <Page className="flex flex-col bg-background h-full relative overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0 w-full h-full z-0" ref={mapContainerRef} />
      
      {/* Bottom Sheet Information */}
      {selectedProject && (
        <>
          <div
            className="fixed inset-0 bg-black/5 z-[9990] transition-opacity"
            onClick={() => setSelectedProject(null)}
          ></div>
          <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-t-[32px] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] animate-fade-in-up pb-[max(20px,env(safe-area-inset-bottom))]">
            {/* Drag Handle */}
            <div 
              className="w-full flex justify-center pt-3 pb-3 cursor-pointer"
              onClick={() => setSelectedProject(null)}
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>
            
            <div className="px-5 pb-2">
              <div className="flex space-x-4 mb-4">
                {/* Project Image */}
                <div className="w-[100px] h-[100px] flex-none rounded-2xl overflow-hidden shadow-sm relative bg-skeleton">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-0 left-0 bg-primary/90 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-br-lg">
                    {selectedProject.category?.name || "Dự án"}
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-foreground text-lg mb-1.5 leading-tight line-clamp-2">{selectedProject.name}</h3>
                  <div className="flex items-start text-gray-500 text-xs mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1 mt-0.5 shrink-0 text-primary"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" /></svg>
                    <span className="line-clamp-2 leading-snug">{selectedProject.address || "Đang cập nhật"}</span>
                  </div>
                  {selectedProject.price && (
                    <div className="text-red-500 font-bold text-sm">
                      {selectedProject.price} Triệu/m²
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Button */}
              <button
                className="bg-primary text-white font-bold text-base px-4 py-3.5 rounded-2xl w-full active:scale-95 transition-transform shadow-lg shadow-primary/25 flex items-center justify-center space-x-2"
                onClick={() => navigate(`/product/${selectedProject.id}`)}
              >
                <span>Xem chi tiết dự án</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Show List Button (Visible when carousel is hidden) */}
      {!showCarousel && (
        <button
          className="absolute top-[20px] left-1/2 transform -translate-x-1/2 bg-white text-primary font-bold px-5 py-2.5 rounded-full shadow-lg border border-gray-100 z-[80] flex items-center space-x-2"
          onClick={() => setShowCarousel(true)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm">Xem danh sách</span>
        </button>
      )}

      {/* Top Carousel Panel */}
      <div
        className={`absolute left-0 right-0 z-[85] transition-transform duration-300 ease-in-out ${showCarousel ? 'translate-y-0' : '-translate-y-full'
          } top-0`}
      >
        <div className="bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-b-3xl pt-4 pb-2">

          <div className="px-5 mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Dự án trên bản đồ</h2>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">{validProjects.length} dự án</span>
          </div>

          <div className="flex overflow-x-auto hide-scrollbar px-5 space-x-4 pb-2">
            {validProjects.map((project) => (
              <div
                key={project.id}
                className="flex-none w-[200px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-transform"
                onClick={() => {
                  setSelectedProject(project);
                  if (mapRef.current) {
                    const latOffset = 0.002;
                    mapRef.current.flyTo([project.lat - latOffset, project.lng], 16, {
                      animate: true,
                      duration: 1
                    });
                  }
                }}
              >
                <div className="w-full h-[110px] bg-skeleton relative">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    {project.category?.name || "Dự án"}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-[13px] font-bold text-gray-900 line-clamp-1">{project.name}</div>
                  <div className="text-[11px] text-gray-500 mt-1 flex items-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="mr-1 shrink-0"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" /></svg>
                    <span className="line-clamp-1">{project.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Close Handle at the bottom of the panel */}
          <div
            className="w-full flex justify-center pt-2 pb-1 cursor-pointer"
            onClick={() => setShowCarousel(false)}
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>

        </div>
      </div>
    </Page>
  );
};

export default MapPage;
