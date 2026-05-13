import { atom } from "jotai";
import { atomFamily, unwrap } from "jotai/utils";
import { Cart, Category, Color, Product } from "types";
import { requestWithFallback } from "@/utils/request";
import api from "zmp-sdk";

export const userState = atom(() =>
  api.getUserInfo({
    avatarType: "normal",
  })
);

export const bannersState = atom(() =>
  requestWithFallback<string[]>("/banners", [])
);

export const tabsState = atom(["Tất cả", "Nam", "Nữ", "Trẻ em"]);

export const selectedTabIndexState = atom(0);

// Fetch raw products from WP
export const rawProductsState = atom(async () => {
  try {
    // Filter by taxonomy tags 5 and 6
    const res = await fetch('https://dxmdvietnam.vn/wp-json/wp/v2/du-an?danh-muc-du-an=5,6&_embed&per_page=100');
    return await res.json();
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
      if (p._embedded && p._embedded['wp:term']) {
        const terms = p._embedded['wp:term'].flat();
        const hasTag5 = terms.some((t: any) => t.id === 5);
        const hasTag6 = terms.some((t: any) => t.id === 6);
        
        const imageUrl = p._embedded['wp:featuredmedia'] ? p._embedded['wp:featuredmedia'][0].source_url : null;
        
        if (hasTag5 && imageUrl && canHoImage.includes('unsplash')) {
          canHoImage = imageUrl;
        }
        if (hasTag6 && imageUrl && khuDoThiImage.includes('unsplash')) {
          khuDoThiImage = imageUrl;
        }
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
    if (p._embedded && p._embedded['wp:term']) {
       const terms = p._embedded['wp:term'].flat();
       // Look for the specific term IDs requested by user
       const catTerm = terms.find((t: any) => t.id === 5 || t.id === 6);
       if (catTerm) {
         categoryId = String(catTerm.id);
       }
    }
    
    const category = categories.find((c: any) => c.id === categoryId) || categories[0];

    const imageUrl = p._embedded && p._embedded['wp:featuredmedia'] ? p._embedded['wp:featuredmedia'][0].source_url : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

    return {
      id: String(p.id),
      name: p.title.rendered.replace(/&#038;/g, '&'),
      price: acf.gia_ban ? parseInt(acf.gia_ban) : 0, 
      image: imageUrl,
      categoryId: [categoryId],
      category: category,
      details: details,
      lat,
      lng,
      developer: acf.chu_dau_tu || "DXMD Vietnam",
      address: acf.dia_chi || "Đang cập nhật",
      status: acf.tinh_trang || "Đang mở bán",
      scale: acf.quy_mo || "Đang cập nhật"
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
    const res = await fetch('https://dxmdvietnam.vn/wp-json/wp/v2/thu-vien?_embed&per_page=10');
    const data = await res.json();
    
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
