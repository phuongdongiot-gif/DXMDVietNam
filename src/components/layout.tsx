import { Outlet, useLocation, useMatches } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import React, { Suspense, useEffect } from "react";
import { PageSkeleton } from "./skeleton";
import { Toaster } from "react-hot-toast";
import { ScrollRestoration } from "./scroll-restoration";
import SplashScreen from "./splash-screen";

export default function Layout() {
  const location = useLocation();
  const matches = useMatches();

  useEffect(() => {
    // 1. Global SEO Manager: Automatically update Document Title based on router handle
    const match = matches[matches.length - 1];
    let pageTitle = "Công ty Cổ phần DXMD Việt Nam";
    
    // Ignore updates if user is on product-detail or news-detail (handled in page)
    if (!location.pathname.includes('/product/') && !location.pathname.includes('/news/')) {
      if (match?.handle?.title) {
        const handleTitle = match.handle.title;
        if (typeof handleTitle === "string") {
          pageTitle = `${handleTitle} - Công ty Cổ phần DXMD Việt Nam`;
        }
      }
      document.title = pageTitle;
      
      // Update meta description safely
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `Cổng thông tin dự án bất động sản cao cấp từ ${pageTitle}. Hotline: 0965.355.355`);
      }
    }
  }, [location, matches]);

  return (
    <div className="w-screen h-screen flex flex-col bg-background text-foreground relative">
      <SplashScreen />
      <Header />
      <div className="flex-1 overflow-y-auto">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
      <Toaster
        containerClassName="toast-container"
        containerStyle={{
          top: "calc(50% - 24px)",
        }}
      />
      <ScrollRestoration />
    </div>
  );
}
