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
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  imageAlt?: string;
  author?: string;
  category?: string;
  publishedAt?: string | null;
  mainImage?: {
    asset?: {
      url?: string;
    };
  };
}
