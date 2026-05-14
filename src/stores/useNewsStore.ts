import { create } from 'zustand';
import { fetchNewsAPI } from '@/services/wp';

export interface NewsPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  category: string;
}

interface NewsStore {
  posts: NewsPost[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  fetchPosts: async () => {
    if (get().posts.length > 0 || get().isLoading) return;
    set({ isLoading: true });
    try {
      const data = await fetchNewsAPI();
      const mappedPosts = data.map((p: any) => {
        let categoryName = "Tin tức";
        if (p._embedded && p._embedded['wp:term'] && p._embedded['wp:term'][0] && p._embedded['wp:term'][0][0]) {
           categoryName = p._embedded['wp:term'][0][0].name;
        }

        return {
          id: p.id,
          title: p.title.rendered.replace(/&#038;/g, '&'),
          excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, ''),
          content: p.content.rendered,
          imageUrl: p._embedded && p._embedded['wp:featuredmedia'] ? p._embedded['wp:featuredmedia'][0].source_url : 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          date: new Date(p.date).toLocaleDateString("vi-VN"),
          category: categoryName
        };
      });
      set({ posts: mappedPosts, isLoading: false });
    } catch (e) {
      set({ error: "Lỗi tải tin tức", isLoading: false });
    }
  }
}));
