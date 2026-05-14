import { atom } from "jotai";
import { atomFamily, unwrap } from "jotai/utils";
import { Cart, Category, Color, Product } from "types";
import { requestWithFallback } from "@/utils/request";
import api from "zmp-sdk";
import { fetchBannersAPI, fetchRawProductsAPI, fetchGalleryAPI } from "@/services/wp";

export const userState = atom(() =>
  api.getUserInfo({
    avatarType: "normal",
  })
);

export const bannersState = atom(async () => {
  try {
    const banners = await fetchBannersAPI();
    if (banners) {
      return banners;
    }
  } catch (error) {
    console.error("Error fetching banners", error);
  }
  
  // Fallback
  return [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  ];
});

export const tabsState = atom(["Tất cả", "Nam", "Nữ", "Trẻ em"]);

export const selectedTabIndexState = atom(0);

// Fetch raw products from WP
export const rawProductsState = atom(async () => {
  try {
    // Filter by taxonomy tags 5 and 6
    return await fetchRawProductsAPI();
  } catch (error) {
    console.error("Error fetching projects from WP API", error);
    return [];
  }
});

// Categories are now strictly defined as tag 5 and 6
export const categoriesState = atom(async (get) => {
  const rawProducts = await get(rawProductsState);
  
  let canHoImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  let khuDoThiImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  
  // Try to find a real image from the fetched projects for each category
  if (Array.isArray(rawProducts)) {
    for (const p of rawProducts) {
      const classList = p.class_list || [];
      const hasTag5 = classList.includes('danh-muc-du-an-can-ho');
      const hasTag6 = classList.includes('danh-muc-du-an-khu-do-thi');
      
      const imageUrl = p._embedded && p._embedded['wp:featuredmedia'] 
        ? p._embedded['wp:featuredmedia'][0].source_url 
        : null;
      
      if (hasTag5 && imageUrl && canHoImage.includes('unsplash')) {
        canHoImage = imageUrl;
      }
      if (hasTag6 && imageUrl && khuDoThiImage.includes('unsplash')) {
        khuDoThiImage = imageUrl;
      }
    }
  }

  return [
    { id: "5", name: "Căn hộ", icon: "zi-box", image: canHoImage },
    { id: "6", name: "Khu đô thị", icon: "zi-box", image: khuDoThiImage }
  ] as unknown as Category[];
});

export const categoriesStateUpwrapped = unwrap(
  categoriesState,
  (prev) => prev ?? []
);

export const productsState = atom(async (get) => {
  const rawProducts = await get(rawProductsState);
  const categories = await get(categoriesState);
  
  if (!Array.isArray(rawProducts)) return [];

  return rawProducts.map((p: any) => {
    const acf = p.acf || {};
    const details = [];
    
    if (acf.tq_content) {
      details.push({ title: "Tổng quan", content: acf.tq_content });
    }
    if (acf.vt_content) {
      details.push({ 
        title: "Vị trí", 
        content: (acf.vt_img ? `<img src="${acf.vt_img}" class="w-full rounded-lg mb-4 object-cover" />` : "") + acf.vt_content 
      });
    }
    if (acf.mb_content) {
      details.push({ 
        title: "Mặt bằng", 
        content: (acf.mb_img ? `<img src="${acf.mb_img}" class="w-full rounded-lg mb-4 object-cover" />` : "") + acf.mb_content 
      });
    }
    if (acf.ti_desc) {
      details.push({ title: "Tiện ích", content: acf.ti_desc });
    }
    if (acf.sp_desc) {
      details.push({ title: "Thiết kế", content: acf.sp_desc });
    }
    if (acf.link_page || acf.gt_web) {
      details.push({ title: "Website", content: acf.link_page || acf.gt_web });
    }

    let lat, lng;
    if (acf.vị_tri) {
      const coords = acf.vị_tri.split(',').map((c: string) => parseFloat(c.trim()));
      if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        lat = coords[0];
        lng = coords[1];
      }
    }

    // Default to 5 (Căn hộ)
    let categoryId = "5";
    const classList = p.class_list || [];
    if (classList.includes('danh-muc-du-an-khu-do-thi')) {
      categoryId = "6";
    } else if (classList.includes('danh-muc-du-an-can-ho')) {
      categoryId = "5";
    }
    
    const category = categories.find((c: any) => c.id === categoryId) || categories[0];

    const imageUrl = p._embedded && p._embedded['wp:featuredmedia'] ? p._embedded['wp:featuredmedia'][0].source_url : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

    let address = acf.dia_chi;
    let price = acf.gia_ban ? parseInt(acf.gia_ban) : 0;
    let developer = acf.chu_dau_tu;
    let scale = acf.quy_mo;
    const status = acf.tinh_trang || "Đang mở bán";

    // Try to extract from tq_content if fields are missing
    if (acf.tq_content) {
      const getTableValue = (label: string) => {
        const regex = new RegExp(`>\\s*${label}\\s*<\\/t[dh]>\\s*<t[dh][^>]*>(.*?)<\\/t[dh]>`, 'i');
        const match = acf.tq_content.match(regex);
        if (match) return match[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
        
        // Also try strong tag mapping like <strong>Vị trí:</strong> text
        const strongRegex = new RegExp(`>\\s*${label}\\s*:?\\s*<\\/strong>\\s*(?:<[^>]+>)*([^<]+)`, 'i');
        const matchStrong = acf.tq_content.match(strongRegex);
        return matchStrong ? matchStrong[1].replace(/&nbsp;/g, ' ').trim() : null;
      };

      if (!address || address === "Đang cập nhật") {
        address = getTableValue('Vị trí') || getTableValue('Vị trí dự án') || address;
      }
      if (!developer || developer === "Công ty Cổ phần DXMD Việt Nam") {
        developer = getTableValue('Chủ đầu tư') || getTableValue('Nhà phát triển') || developer;
      }
      if (!scale || scale === "Đang cập nhật") {
        scale = getTableValue('Quy mô') || getTableValue('Tổng diện tích') || scale;
      }

      // Fallback to plainText regex if still missing
      const plainText = acf.tq_content.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ');
      
      if (!address || address === "Đang cập nhật") {
        const m = plainText.match(/Vị trí\s*(?:dự án)?\s*[:\-]\s*([^<\n\r\.]+)/i);
        if (m) address = m[1].trim().split('Quy mô')[0].split('Chủ đầu tư')[0].split('Loại hình')[0].substring(0, 50) + (m[1].length > 50 ? '...' : '');
      }
      if (!developer || developer === "Công ty Cổ phần DXMD Việt Nam") {
        const m = plainText.match(/Chủ đầu tư\s*[:\-]\s*([^\n\r\.]+)/i);
        if (m) developer = m[1].trim().split('Quy mô')[0].split('Vị trí')[0].substring(0, 50) + (m[1].length > 50 ? '...' : '');
      }
      if (!scale || scale === "Đang cập nhật") {
        const m = plainText.match(/(?:Quy mô|Tổng diện tích)\s*[:\-]\s*([^\n\r\.]+)/i);
        if (m) scale = m[1].trim().split('Chủ đầu tư')[0].split('Vị trí')[0].substring(0, 50) + (m[1].length > 50 ? '...' : '');
      }
    }

    return {
      id: String(p.id),
      name: p.title.rendered.replace(/&#038;/g, '&'),
      slogan: acf.gt_slogan || "",
      price: price, 
      image: imageUrl,
      categoryId: [categoryId],
      category: category,
      details: details,
      lat,
      lng,
      developer: developer || "Công ty Cổ phần DXMD Việt Nam",
      address: address || "Đang cập nhật",
      status: status,
      scale: scale || "Đang cập nhật"
    };
  });
});

export const flashSaleProductsState = atom(async (get) => {
  const products = await get(productsState);
  return products.slice(0, 5); // Just a showcase
});

export const recommendedProductsState = atom(async (get) => {
  const products = await get(productsState);
  return products;
});

export const productState = atomFamily((id: string) =>
  atom(async (get) => {
    const products = await get(productsState);
    return products.find((p) => p.id === id);
  })
);



export const keywordState = atom("");

export const searchResultState = atom(async (get) => {
  const keyword = get(keywordState);
  const products = await get(productsState);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
});

export interface GalleryItem {
  id: number;
  title: string;
  images: string[];
  cover: string;
}

export const galleryState = atom(async () => {
  try {
    const data = await fetchGalleryAPI();
    
    return data.map((p: any) => {
      const acf = p.acf || {};
      const cover = p._embedded && p._embedded['wp:featuredmedia'] ? p._embedded['wp:featuredmedia'][0].source_url : (acf.list_img && acf.list_img.length > 0 ? acf.list_img[0] : '');
      return {
        id: p.id,
        title: p.title.rendered.replace(/&#038;/g, '&'),
        images: acf.list_img || [],
        cover: cover
      };
    });
  } catch (error) {
    console.error("Error fetching gallery from WP API", error);
    return [];
  }
});
