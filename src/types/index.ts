// Types for Wagtail API responses
export interface WagtailImage {
  id: number;
  title: string;
  width: number;
  height: number;
  download_url: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  color?: string;
}

export interface Author {
  id: number;
  name: string;
  avatar?: WagtailImage;
  bio?: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface ArticlePage {
  id: number;
  title: string;
  slug: string;
  meta: {
    type: string;
    detail_url: string;
    html_url: string;
    slug: string;
    search_description: string;
    seo_title: string;
    first_published_at: string;
    last_published_at: string;
  };
  intro?: string;
  body?: any[]; // StreamField content
  featured_image?: WagtailImage;
  publish_date: string;
  author?: Author;
  categories?: Category[];
  tags?: Tag[];
  is_featured?: boolean;
  reading_time?: number;
}

export interface WagtailResponse<T> {
  meta: {
    total_count: number;
  };
  items: T[];
}

export interface HomePage {
  id: number;
  title: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: WagtailImage;
}

export interface CategoryPageData {
  id: number;
  title: string;
  category: Category;
  description?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
