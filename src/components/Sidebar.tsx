import React from 'react';
import { Link } from 'react-router-dom';
import type { ArticlePage } from '../types';

interface SidebarProps {
  recentArticles: ArticlePage[];
  popularArticles: ArticlePage[];
  categories: Array<{ id: number; name: string; slug: string; count?: number }>;
  tags: Array<{ id: number; name: string; slug: string; count?: number }>;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  recentArticles, 
  popularArticles, 
  categories, 
  tags 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getImageUrl = (image: any) => {
    if (!image) return '/placeholder-sidebar.jpg';
    return image.original?.url || image.full_url || '/placeholder-sidebar.jpg';
  };

  return (
    <aside className="space-y-8">
      {/* Recent Articles */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          Tin mới nhất
        </h3>
        <div className="space-y-4">
          {recentArticles.slice(0, 5).map((article) => (
            <article key={article.id} className="flex space-x-3 group">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <Link to={`/article/${article.meta.slug}`}>
                  <img
                    src={getImageUrl(article.featured_image)}
                    alt={article.featured_image?.title || article.title}
                    className="w-16 h-16 object-cover rounded group-hover:opacity-80 transition-opacity"
                    loading="lazy"
                  />
                </Link>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                  <Link to={`/article/${article.meta.slug}`} className="line-clamp-2">
                    {article.title}
                  </Link>
                </h4>
                <div className="flex items-center text-xs text-gray-500 space-x-2">
                  <span>{formatDate(article.meta.first_published_at)}</span>
                  {article.reading_time && (
                    <>
                      <span>•</span>
                      <span>{article.reading_time} phút</span>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Popular Articles */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          Tin phổ biến
        </h3>
        <div className="space-y-4">
          {popularArticles.slice(0, 5).map((article, index) => (
            <article key={article.id} className="flex space-x-3 group">
              {/* Number Badge */}
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  index === 0 ? 'bg-red-500' : 
                  index === 1 ? 'bg-orange-500' : 
                  index === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                }`}>
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                  <Link to={`/article/${article.meta.slug}`} className="line-clamp-2">
                    {article.title}
                  </Link>
                </h4>
                <div className="flex items-center text-xs text-gray-500 space-x-2">
                  <span>{formatDate(article.meta.first_published_at)}</span>
                  {article.reading_time && (
                    <>
                      <span>•</span>
                      <span>{article.reading_time} phút</span>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          Chuyên mục
        </h3>
        <div className="space-y-2">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="flex items-center justify-between py-2 px-3 rounded hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {category.name}
              </span>
              {category.count && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          Thẻ phổ biến
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 20).map((tag) => (
            <Link
              key={tag.id}
              to={`/tag/${tag.slug}`}
              className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-4">
          Đăng ký nhận tin
        </h3>
        <p className="text-blue-100 mb-4 text-sm">
          Nhận những tin tức mới nhất và thú vị nhất qua email của bạn.
        </p>
        <form className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="Địa chỉ email của bạn"
              className="w-full px-4 py-2 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-100 transition-colors"
          >
            Đăng ký
          </button>
        </form>
        <p className="text-xs text-blue-100 mt-3">
          Chúng tôi tôn trọng quyền riêng tư của bạn. Hủy đăng ký bất cứ lúc nào.
        </p>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          Kết nối với chúng tôi
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="#"
            className="flex items-center justify-center py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </a>
          <a
            href="#"
            className="flex items-center justify-center py-3 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            Twitter
          </a>
          <a
            href="#"
            className="flex items-center justify-center py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
          <a
            href="#"
            className="flex items-center justify-center py-3 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* Advertisement Placeholder */}
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-gray-500 text-sm mb-2">Quảng cáo</p>
        <div className="bg-gray-200 h-32 rounded flex items-center justify-center">
          <span className="text-gray-400">Không gian quảng cáo</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
