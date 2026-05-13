import React, { useState } from "react";
import { Page } from "zmp-ui";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAtomValue } from "jotai";
import { productsState } from "@/state";
import { useNavigate } from "react-router-dom";

const MapPage: React.FunctionComponent = () => {
  const products = useAtomValue(productsState) || [];
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Find center of all valid projects or default to HCMC
  const mapCenter = { latitude: 10.870843, longitude: 106.699836, zoom: 10 };

  const validProjects = products.filter(p => p.lat && p.lng);

  return (
    <Page className="flex flex-col bg-background h-full relative">
      <div className="flex-1 w-full h-full relative z-0">
        <Map
          initialViewState={mapCenter}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        >
          <NavigationControl position="top-right" />
          
          {validProjects.map(project => (
            <Marker
              key={project.id}
              longitude={project.lng!}
              latitude={project.lat!}
              anchor="bottom"
              onClick={e => {
                e.originalEvent.stopPropagation();
                setSelectedProject(project);
              }}
            >
              <div className="cursor-pointer group flex flex-col items-center relative">
                <div className="bg-primary text-white text-[10px] px-2 py-0.5 rounded shadow-sm mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap absolute -top-6">
                  {project.name}
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md border-2 border-white transform transition-transform group-hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="white"/>
                  </svg>
                </div>
              </div>
            </Marker>
          ))}

          {selectedProject && (
            <Popup
              longitude={selectedProject.lng!}
              latitude={selectedProject.lat!}
              anchor="top"
              onClose={() => setSelectedProject(null)}
              closeOnClick={false}
              className="z-[100]"
              maxWidth="250px"
              closeButton={false}
              offset={10}
            >
              <div className="w-[200px] p-0 flex flex-col relative rounded-md overflow-hidden shadow-lg border border-gray-100 bg-white">
                <button 
                   onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                   className="absolute top-1.5 right-1.5 z-10 bg-black/40 text-white rounded-full p-1 hover:bg-black/60 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="w-full h-[120px] bg-skeleton relative">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.name} 
                    className="w-full h-full object-cover absolute top-0 left-0" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-primary text-sm mb-1 leading-tight line-clamp-1">{selectedProject.name}</h3>
                  <div className="text-[11px] text-subtitle mb-2 line-clamp-1">
                    {selectedProject.category?.name || "Dự án"}
                  </div>
                  <button 
                    className="bg-primary text-white font-medium text-xs px-3 py-2 rounded-md w-full active:scale-95 transition-transform"
                    onClick={() => navigate(`/product/${selectedProject.id}`)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>
      
      <div className="absolute bottom-6 left-4 right-4 bg-white/90 backdrop-blur-md shadow-lg z-[1000] rounded-xl p-4 border border-gray-100 pointer-events-none">
        <h2 className="text-lg font-bold text-primary mb-1">Bản đồ Dự án</h2>
        <p className="text-sm text-gray-600 mb-2">Khám phá các dự án bất động sản của DXMD Vietnam</p>
        <div className="flex items-center text-xs text-gray-500 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          Đang hiển thị {validProjects.length} dự án
        </div>
      </div>
    </Page>
  );
};

export default MapPage;
