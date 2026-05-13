import { create } from 'zustand';

export interface NewsPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
}

interface NewsStore {
  posts: NewsPost[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set) => ({
  posts: [],
  isLoading: false,
  error: null,
  fetchPosts: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('https://dxmdvietnam.vn/wp-json/wp/v2/posts?_embed&per_page=10');
      const data = await res.json();
      const mappedPosts = data.map((p: any) => ({
        id: p.id,
        title: p.title.rendered.replace(/&#038;/g, '&'),
        excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, ''),
        content: p.content.rendered,
        imageUrl: p._embedded && p._embedded['wp:featuredmedia'] ? p._embedded['wp:featuredmedia'][0].source_url : '',
        date: p.date
      }));
      set({ posts: mappedPosts, isLoading: false });
    } catch (e) {
      set({ error: "Lỗi tải tin tức", isLoading: false });
    }
  }
}));
