import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import type { ArticlePage as ArticlePageType } from '../types';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticlePageType | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticlePageType[]>([]);
  const [recentArticles, setRecentArticles] = useState<ArticlePageType[]>([]);
  const [popularArticles, setPopularArticles] = useState<ArticlePageType[]>([]);
  const [categories, setCategories] = useState<Array<{ id: number; name: string; slug: string; count?: number }>>([]);
  const [tags, setTags] = useState<Array<{ id: number; name: string; slug: string; count?: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticleData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch article and sidebar data in parallel
        const [
          articleData,
          recentResponse,
          categoriesResponse,
          tagsResponse
        ] = await Promise.all([
          api.getArticleBySlug(slug),
          api.getRecentArticles(5),
          api.getCategories(),
          api.getTags()
        ]);

        setArticle(articleData);

        // Fetch related articles if article has categories
        if (articleData.categories && articleData.categories.length > 0) {
          try {
            const relatedResponse = await api.getArticlesByCategory(
              articleData.categories[0].slug, 
              4
            );
            // Filter out current article from related articles
            const filteredRelated = relatedResponse.items.filter(
              (relatedArticle: ArticlePageType) => relatedArticle.id !== articleData.id
            );
            setRelatedArticles(filteredRelated.slice(0, 3));
          } catch (err) {
            console.warn('Could not fetch related articles:', err);
          }
        }

        setRecentArticles(recentResponse.items);
        setPopularArticles(recentResponse.items.slice(0, 5));
        setCategories(categoriesResponse || []);
        setTags(tagsResponse || []);

      } catch (err) {
        console.error('Error fetching article data:', err);
        setError('Không thể tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getImageUrl = (image: any) => {
    if (!image) return '/placeholder-article.jpg';
    return image.original?.url || image.full_url || '/placeholder-article.jpg';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 h-8 w-2/3 mb-4 rounded"></div>
            <div className="bg-gray-300 h-64 mb-8 rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {[...Array(10)].map((_, index) => (
                    <div key={index} className="bg-gray-300 h-4 rounded"></div>
                  ))}
                </div>
              </div>
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

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">📰</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'Không tìm thấy bài viết'}
          </h2>
          <p className="text-gray-600 mb-4">
            Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Về trang chủ
          </Link>
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
            {article.categories && article.categories.length > 0 && (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <Link 
                  to={`/category/${article.categories[0].slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {article.categories[0].name}
                </Link>
              </>
            )}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium line-clamp-1">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-2">
            {/* Article Header */}
            <header className="mb-8">
              {/* Category */}
              {article.categories && article.categories.length > 0 && (
                <div className="mb-4">
                  <Link
                    to={`/category/${article.categories[0].slug}`}
                    className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors"
                  >
                    {article.categories[0].name}
                  </Link>
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Intro */}
              {article.intro && (
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {article.intro}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6 pb-6 border-b border-gray-200">
                {/* Author */}
                {article.author && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-gray-900">{article.author.name}</span>
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(article.meta.first_published_at)}</span>
                </div>

                {/* Reading Time */}
                {article.reading_time && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{article.reading_time} phút đọc</span>
                  </div>
                )}

                {/* Share Button */}
                <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Chia sẻ</span>
                </button>
              </div>
            </header>

            {/* Featured Image */}
            {article.featured_image && (
              <div className="mb-8">
                <img
                  src={getImageUrl(article.featured_image)}
                  alt={article.featured_image.title || article.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                {article.featured_image.title && (
                  <p className="text-sm text-gray-500 mt-2 italic text-center">
                    {article.featured_image.title}
                  </p>
                )}
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {article.body ? (
                <div dangerouslySetInnerHTML={{ __html: article.body }} />
              ) : (
                <div className="text-gray-600">
                  <p>Nội dung bài viết đang được cập nhật...</p>
                </div>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thẻ:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      to={`/tag/${tag.slug}`}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <ArticleCard
                      key={relatedArticle.id}
                      article={relatedArticle}
                      variant="small"
                    />
                  ))}
                </div>
              </div>
            )}
          </article>

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

export default ArticlePage;
