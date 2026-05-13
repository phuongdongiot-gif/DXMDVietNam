export interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  categoryId?: string[];
  details?: Detail[];
  sizes?: Size[];
  colors?: Color[];
  lat?: number;
  lng?: number;
  developer?: string;
  address?: string;
  status?: string;
  scale?: string;
}

export interface Category {
  id: string | number;
  name: string;
  icon?: string;
  image?: string;
}

export interface Detail {
  title: string;
  content: string;
}
export type Size = string;

export interface Color {
  name: string;
  hex: string;
}

export type SelectedOptions = {
  size?: Size;
  color?: Color["name"];
};

export interface CartItem {
  id: number;
  product: Product;
  options: SelectedOptions;
  quantity: number;
}

export type Cart = CartItem[];
