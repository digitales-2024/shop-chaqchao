export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string }[];
  isActive: boolean;
  isAvailable: boolean;
  isRestricted: boolean;
  maxStock: number;
  category: Category;
}
