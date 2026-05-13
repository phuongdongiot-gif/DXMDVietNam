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

export const categoriesState = atom(() =>
  requestWithFallback<Category[]>("/categories", [])
);

export const categoriesStateUpwrapped = unwrap(
  categoriesState,
  (prev) => prev ?? []
);

export const productsState = atom(async (get) => {
  const categories = await get(categoriesState);
  
  try {
    const res = await fetch('https://dxmdvietnam.vn/wp-json/wp/v2/du-an?_embed&per_page=100');
    const data = await res.json();
    
    return data.map((p: any) => {
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

      let categoryName = "Căn hộ Cao cấp";
      if (p._embedded && p._embedded['wp:term']) {
         const terms = p._embedded['wp:term'].flat();
         if (terms.length > 0) {
           categoryName = terms[0].name;
         }
      }
      
      const category = categories.find(c => c.name === categoryName) || categories[0] || { id: 1, name: categoryName, image: '' };

      const imageUrl = p._embedded && p._embedded['wp:featuredmedia'] ? p._embedded['wp:featuredmedia'][0].source_url : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

      return {
        id: p.id,
        name: p.title.rendered.replace(/&#038;/g, '&'),
        price: acf.gia_ban ? parseInt(acf.gia_ban) : 0, 
        image: imageUrl,
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
  } catch (error) {
    console.error("Error fetching projects from WP API", error);
    return [];
  }
});

export const flashSaleProductsState = atom((get) => get(productsState));

export const recommendedProductsState = atom((get) => get(productsState));

export const sizesState = atom(["S", "M", "L", "XL"]);

export const selectedSizeState = atom<string | undefined>(undefined);

export const colorsState = atom<Color[]>([
  {
    name: "Đỏ",
    hex: "#FFC7C7",
  },
  {
    name: "Xanh dương",
    hex: "#DBEBFF",
  },
  {
    name: "Xanh lá",
    hex: "#D1F0DB",
  },
  {
    name: "Xám",
    hex: "#D9E2ED",
  },
]);

export const selectedColorState = atom<Color | undefined>(undefined);

export const productState = atomFamily((id: number) =>
  atom(async (get) => {
    const products = await get(productsState);
    return products.find((product) => product.id === id);
  })
);

export const cartState = atom<Cart>([]);

export const selectedCartItemIdsState = atom<number[]>([]);

export const checkoutItemsState = atom((get) => {
  const ids = get(selectedCartItemIdsState);
  const cart = get(cartState);
  return cart.filter((item) => ids.includes(item.id));
});

export const cartTotalState = atom((get) => {
  const items = get(checkoutItemsState);
  return {
    totalItems: items.length,
    totalAmount: items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ),
  };
});

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
