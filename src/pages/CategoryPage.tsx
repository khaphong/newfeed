import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import type { ArticlePage } from '../types';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [articles, setArticles] = useState<ArticlePage[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [recentArticles, setRecentArticles] = useState<ArticlePage[]>([]);
  const [popularArticles, setPopularArticles] = useState<ArticlePage[]>([]);
  const [categories, setCategories] = useState<Array<{ id: number; name: string; slug: string; count?: number }>>([]);
  const [tags, setTags] = useState<Array<{ id: number; name: string; slug: string; count?: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const articlesPerPage = 12;

  useEffect(() => {
    if (!slug) return;

    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch category articles and sidebar data in parallel
        const [
          categoryResponse,
          recentResponse,
          categoriesResponse,
          tagsResponse
        ] = await Promise.all([
          api.getArticlesByCategory(slug, articlesPerPage, (currentPage - 1) * articlesPerPage),
          api.getRecentArticles(5),
          api.getCategories(),
          api.getTags()
        ]);

        setArticles(categoryResponse.items);
        setTotalPages(Math.ceil(categoryResponse.meta.total_count / articlesPerPage));

        // Set category name from first article or use slug
        if (categoryResponse.items.length > 0 && categoryResponse.items[0].categories && categoryResponse.items[0].categories.length > 0) {
          const category = categoryResponse.items[0].categories!.find(cat => cat.slug === slug);
          setCategoryName(category?.name || slug.replace('-', ' ').toUpperCase());
        } else {
          setCategoryName(slug.replace('-', ' ').toUpperCase());
        }

        setRecentArticles(recentResponse.items);
        setPopularArticles(recentResponse.items.slice(0, 5)); // Use recent as popular
        setCategories(categoriesResponse || []);
        setTags(tagsResponse || []);

      } catch (err) {
        console.error('Error fetching category data:', err);
        setError('Không thể tải dữ liệu chuyên mục. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-gray-300 h-12 w-64 mb-8 rounded"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Articles Skeleton */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md">
                      <div className="bg-gray-300 h-48 rounded-t-lg"></div>
                      <div className="p-6">
                        <div className="bg-gray-300 h-6 mb-3 rounded"></div>
                        <div className="bg-gray-300 h-4 mb-2 rounded"></div>
                        <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Skeleton */}
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="bg-gray-300 h-6 mb-4 rounded"></div>
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-gray-300 h-4 rounded"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{categoryName}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles Section */}
          <div className="lg:col-span-2">
            {/* Category Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Chuyên mục: {categoryName}
              </h1>
              <p className="text-gray-600">
                Tìm thấy {articles.length} bài viết trong chuyên mục này
              </p>
            </div>

            {/* Articles Grid */}
            {articles.length > 0 ? (
              <div className="space-y-8">
                {/* First article - Large */}
                {articles.length > 0 && (
                  <div className="mb-8">
                    <ArticleCard article={articles[0]} variant="default" />
                  </div>
                )}

                {/* Remaining articles - Grid */}
                {articles.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.slice(1).map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        variant="default"
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-12">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === 1
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Trước
                    </button>

                    {/* Page Numbers */}
                    {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                      const page = index + 1;
                      const isActive = page === currentPage;
                      
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg border ${
                            isActive
                              ? 'border-blue-500 bg-blue-500 text-white'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === totalPages
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Sau
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Chưa có bài viết nào
                </h3>
                <p className="text-gray-600 mb-6">
                  Chuyên mục này hiện chưa có bài viết nào. Hãy quay lại sau nhé!
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Về trang chủ
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              recentArticles={recentArticles}
              popularArticles={popularArticles}
              categories={categories}
              tags={tags}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
