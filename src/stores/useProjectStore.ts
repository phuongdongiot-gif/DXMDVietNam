import { create } from 'zustand';
import { requestWithFallback } from "@/utils/request";
import { Category, Product, Detail } from "types";
import { fetchRawProductsAPI } from "@/services/wp";

export interface Project extends Product {
  lat?: number;
  lng?: number;
}

interface ProjectStore {
  projects: Project[];
  categories: Category[];
  banners: string[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  getProjectById: (id: number) => Project | undefined;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  categories: [],
  banners: [],
  isLoading: false,
  error: null,
  fetchData: async () => {
    if (get().projects.length > 0 || get().isLoading) return;
    set({ isLoading: true });
    try {
      // Fetch categories and banners from mock for now, as they might not be fully dynamic yet
      const [categories, banners] = await Promise.all([
        requestWithFallback<Category[]>("/categories", []),
        requestWithFallback<string[]>("/banners", [])
      ]);
      
      // Fetch projects from WP API
      const data = await fetchRawProductsAPI();
      
      const mappedProjects: Project[] = data.map((p: any) => {
        const acf = p.acf || {};
        
        const details: Detail[] = [];
        
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

        // Parse category from WP terms if available
        let categoryName = "Căn hộ Cao cấp";
        if (p._embedded && p._embedded['wp:term']) {
           const terms = p._embedded['wp:term'].flat();
           if (terms.length > 0) {
             categoryName = terms[0].name;
           }
        }
        
        const category = categories.find(c => c.name === categoryName) || categories[0] || { id: 1, name: categoryName, image: '' };

        let address = acf.dia_chi;
        let price = acf.gia_ban ? parseInt(acf.gia_ban) : 0;
        let developer = acf.chu_dau_tu;
        let scale = acf.quy_mo;
        const status = acf.tinh_trang || "Đang mở bán";

        if (acf.tq_content) {
          const getTableValue = (label: string) => {
            const regex = new RegExp(`>\\s*${label}\\s*<\\/t[dh]>\\s*<t[dh][^>]*>(.*?)<\\/t[dh]>`, 'i');
            const match = acf.tq_content.match(regex);
            if (match) return match[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
            
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
          id: p.id,
          name: p.title.rendered.replace(/&#038;/g, '&'),
          price: price, 
          image: p._embedded && p._embedded['wp:featuredmedia'] ? p._embedded['wp:featuredmedia'][0].source_url : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      
      set({ projects: mappedProjects, categories, banners, isLoading: false });
    } catch (error) {
      set({ error: "Lỗi tải dữ liệu", isLoading: false });
    }
  },
  getProjectById: (id) => get().projects.find(p => p.id === id)
}));
