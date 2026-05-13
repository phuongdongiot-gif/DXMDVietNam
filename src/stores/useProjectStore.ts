import { create } from 'zustand';
import { requestWithFallback } from "@/utils/request";
import { Category, Product } from "types";

interface ProjectStore {
  projects: Product[];
  categories: Category[];
  banners: string[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  getProjectById: (id: number) => Product | undefined;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  categories: [],
  banners: [],
  isLoading: false,
  error: null,
  fetchData: async () => {
    set({ isLoading: true });
    try {
      const [categories, products, banners] = await Promise.all([
        requestWithFallback<Category[]>("/categories", []),
        requestWithFallback<(Product & { categoryId: number })[]>("/products", []),
        requestWithFallback<string[]>("/banners", [])
      ]);
      
      const mappedProjects = products.map(product => ({
        ...product,
        category: product.category || categories.find(c => c.id === product.categoryId)!
      }));
      
      set({ projects: mappedProjects, categories, banners, isLoading: false });
    } catch (error) {
      set({ error: "Lỗi tải dữ liệu", isLoading: false });
    }
  },
  getProjectById: (id) => get().projects.find(p => p.id === id)
}));
