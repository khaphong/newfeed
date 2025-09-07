import axios from 'axios';
import type { WagtailResponse, ArticlePage, HomePage, CategoryPageData } from '../types';

// Configure base URL for Wagtail API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v2';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const wagtailApi = {
  // Get homepage data
  getHomePage: async (): Promise<HomePage> => {
    const response = await api.get('/pages/?type=home.HomePage&fields=title,hero_title,hero_subtitle,hero_image');
    return response.data.items[0];
  },

  // Get featured articles
  getFeaturedArticles: async (limit = 6): Promise<ArticlePage[]> => {
    const response = await api.get<WagtailResponse<ArticlePage>>(
      `/pages/?type=news.ArticlePage&fields=title,slug,intro,featured_image,publish_date,author,categories,tags,is_featured,meta&is_featured=true&limit=${limit}&order=-publish_date`
    );
    return response.data.items;
  },

  // Get recent articles
  getRecentArticles: async (limit = 12, offset = 0): Promise<WagtailResponse<ArticlePage>> => {
    const response = await api.get<WagtailResponse<ArticlePage>>(
      `/pages/?type=news.ArticlePage&fields=title,slug,intro,featured_image,publish_date,author,categories,tags,meta&limit=${limit}&offset=${offset}&order=-publish_date`
    );
    return response.data;
  },

  // Get article by slug
  getArticleBySlug: async (slug: string): Promise<ArticlePage> => {
    const response = await api.get<WagtailResponse<ArticlePage>>(
      `/pages/?type=news.ArticlePage&slug=${slug}&fields=title,slug,intro,body,featured_image,publish_date,author,categories,tags,reading_time,meta`
    );
    if (response.data.items.length === 0) {
      throw new Error('Article not found');
    }
    return response.data.items[0];
  },

  // Get articles by category
  getArticlesByCategory: async (categorySlug: string, limit = 12, offset = 0): Promise<WagtailResponse<ArticlePage>> => {
    const response = await api.get<WagtailResponse<ArticlePage>>(
      `/pages/?type=news.ArticlePage&fields=title,slug,intro,featured_image,publish_date,author,categories,tags,meta&categories__slug=${categorySlug}&limit=${limit}&offset=${offset}&order=-publish_date`
    );
    return response.data;
  },

  // Get articles by tag
  getArticlesByTag: async (tagSlug: string, limit = 12, offset = 0): Promise<WagtailResponse<ArticlePage>> => {
    const response = await api.get<WagtailResponse<ArticlePage>>(
      `/pages/?type=news.ArticlePage&fields=title,slug,intro,featured_image,publish_date,author,categories,tags,meta&tags__slug=${tagSlug}&limit=${limit}&offset=${offset}&order=-publish_date`
    );
    return response.data;
  },

  // Search articles
  searchArticles: async (query: string, limit = 12, offset = 0): Promise<WagtailResponse<ArticlePage>> => {
    const response = await api.get<WagtailResponse<ArticlePage>>(
      `/pages/search/?type=news.ArticlePage&fields=title,slug,intro,featured_image,publish_date,author,categories,tags,meta&search=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`
    );
    return response.data;
  },

  // Get category page data
  getCategoryPage: async (slug: string): Promise<CategoryPageData> => {
    const response = await api.get<WagtailResponse<CategoryPageData>>(
      `/pages/?type=news.CategoryPage&slug=${slug}&fields=title,category,description`
    );
    if (response.data.items.length === 0) {
      throw new Error('Category page not found');
    }
    return response.data.items[0];
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await api.get('/snippets/news.Category/');
      return response.data.items;
    } catch (error) {
      // Fallback: try to get categories from articles
      const articlesResponse = await api.get<WagtailResponse<ArticlePage>>(
        '/pages/?type=news.ArticlePage&fields=categories&limit=100'
      );
      const allCategories = articlesResponse.data.items
        .flatMap(article => article.categories || [])
        .filter((category, index, self) => 
          index === self.findIndex(c => c?.id === category?.id)
        );
      return allCategories;
    }
  },

  // Get all tags
  getTags: async () => {
    try {
      const response = await api.get('/snippets/taggit.Tag/');
      return response.data.items;
    } catch (error) {
      // Fallback: try to get tags from articles
      const articlesResponse = await api.get<WagtailResponse<ArticlePage>>(
        '/pages/?type=news.ArticlePage&fields=tags&limit=100'
      );
      const allTags = articlesResponse.data.items
        .flatMap(article => article.tags || [])
        .filter((tag, index, self) => 
          index === self.findIndex(t => t?.id === tag?.id)
        );
      return allTags;
    }
  }
};

export default wagtailApi;
