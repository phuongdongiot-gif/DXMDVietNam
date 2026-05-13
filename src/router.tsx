import Layout from "@/components/layout";
import ContactPage from "@/pages/contact";
import ProductListPage from "@/pages/catalog/product-list";
import CategoryListPage from "@/pages/catalog/category-list";
import ProductDetailPage from "@/pages/catalog/product-detail";
import HomePage from "@/pages/home";
import ProfilePage from "@/pages/profile";
import SearchPage from "@/pages/search";
import MapPage from "@/pages/map";
import NewsPage from "@/pages/news";
import NewsDetailPage from "@/pages/news/detail";
import GalleryListPage from "@/pages/gallery/index";
import GalleryDetailPage from "@/pages/gallery/detail";
import WebviewPage from "@/pages/webview/index";
import { createBrowserRouter } from "react-router-dom";
import { getBasePath } from "@/utils/zma";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          handle: {
            logo: true,
          },
        },
        {
          path: "/categories",
          element: <CategoryListPage />,
          handle: {
            title: "Dự án",
            back: false,
          },
        },
        {
          path: "/contact",
          element: <ContactPage />,
          handle: {
            title: "Liên hệ DXMD",
          },
        },
        {
          path: "/profile",
          element: <ProfilePage />,
          handle: {
            logo: true,
          },
        },
        {
          path: "/flash-sales",
          element: <ProductListPage />,
          handle: {
            title: "Dự án Nổi bật",
          },
        },
        {
          path: "/category/:id",
          element: <ProductListPage />,
          handle: {
            title: ({ categories, params }) =>
              categories.find((c) => c.id === Number(params.id))?.name,
          },
        },
        {
          path: "/product/:id",
          element: <ProductDetailPage />,
          handle: {
            scrollRestoration: 0, // when user selects another product in related products, scroll to the top of the page
          },
        },
        {
          path: "/search",
          element: <SearchPage />,
          handle: {
            title: "Tìm kiếm dự án",
          },
        },
        {
          path: "/map",
          element: <MapPage />,
          handle: {
            title: "Bản đồ",
          },
        },
        {
          path: "/news",
          element: <NewsPage />,
          handle: {
            title: "Tin tức",
          },
        },
        {
          path: "/news/:id",
          element: <NewsDetailPage />,
          handle: {
            title: "Chi tiết bài viết",
          },
        },
        {
          path: "/webview",
          element: <WebviewPage />,
          handle: {
            title: "Tuyển dụng DXMD",
          },
        },
        {
          path: "/gallery",
          element: <GalleryListPage />,
          handle: {
            title: "Tất cả thư viện",
          },
        },
        {
          path: "/gallery/:id",
          element: <GalleryDetailPage />,
          handle: {
            title: "Thư viện ảnh",
          },
        },
      ],
    },
  ],
  { basename: getBasePath() }
);

export default router;
