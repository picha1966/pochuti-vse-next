export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  price: string;
  categorySlug: string;
  categoryName: string;
  isAccessory: boolean;
  image: string;
}

export interface Category {
  slug: string;
  name: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
}
