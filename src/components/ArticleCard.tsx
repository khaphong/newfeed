import React from 'react';
import { Link } from 'react-router-dom';
import type { ArticlePage } from '../types';

interface ArticleCardProps {
  article: ArticlePage;
  variant?: 'default' | 'horizontal' | 'small';
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  variant = 'default',
  className = '' 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getImageUrl = (image: any) => {
    if (!image) return '/placeholder-article.jpg';
    return image.original?.url || image.full_url || '/placeholder-article.jpg';
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  if (variant === 'horizontal') {
    return (
      <article className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
        <div className="flex">
          {/* Image */}
          <div className="w-1/3 relative">
            <Link to={`/article/${article.meta.slug}`}>
              <img
                src={getImageUrl(article.featured_image)}
                alt={article.featured_image?.title || article.title}
                className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </Link>
            {/* Category Badge */}
            {article.categories && article.categories.length > 0 && (
              <Link
                to={`/category/${article.categories[0].slug}`}
                className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition-colors"
              >
                {article.categories[0].name}
              </Link>
            )}
          </div>

          {/* Content */}
          <div className="w-2/3 p-4">
            {/* Title */}
            <h3 className="font-bold text-gray-900 mb-2 leading-tight hover:text-blue-600 transition-colors">
              <Link to={`/article/${article.meta.slug}`} className="line-clamp-2">
                {article.title}
              </Link>
            </h3>

            {/* Intro */}
            {article.intro && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {truncateText(article.intro, 100)}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                {article.author && (
                  <span className="font-medium">{article.author.name}</span>
                )}
                <span>{formatDate(article.meta.first_published_at)}</span>
              </div>
              {article.reading_time && (
                <span>{article.reading_time} phút</span>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'small') {
    return (
      <article className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
        {/* Image */}
        <div className="relative">
          <Link to={`/article/${article.meta.slug}`}>
            <img
              src={getImageUrl(article.featured_image)}
              alt={article.featured_image?.title || article.title}
              className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>
          {/* Category Badge */}
          {article.categories && article.categories.length > 0 && (
            <Link
              to={`/category/${article.categories[0].slug}`}
              className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition-colors"
            >
              {article.categories[0].name}
            </Link>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-gray-900 mb-2 leading-tight hover:text-blue-600 transition-colors">
            <Link to={`/article/${article.meta.slug}`} className="line-clamp-2">
              {article.title}
            </Link>
          </h3>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{formatDate(article.meta.first_published_at)}</span>
            {article.reading_time && (
              <span>{article.reading_time} phút</span>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
      {/* Image */}
      <div className="relative">
        <Link to={`/article/${article.meta.slug}`}>
          <img
            src={getImageUrl(article.featured_image)}
            alt={article.featured_image?.title || article.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
        {/* Category Badge */}
        {article.categories && article.categories.length > 0 && (
          <Link
            to={`/category/${article.categories[0].slug}`}
            className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors"
          >
            {article.categories[0].name}
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors">
          <Link to={`/article/${article.meta.slug}`} className="line-clamp-2">
            {article.title}
          </Link>
        </h3>

        {/* Intro */}
        {article.intro && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {truncateText(article.intro, 150)}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            {/* Author */}
            {article.author && (
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{article.author.name}</span>
              </div>
            )}

            {/* Date */}
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(article.meta.first_published_at)}</span>
            </div>
          </div>

          {/* Reading Time */}
          {article.reading_time && (
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{article.reading_time} phút đọc</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.id}
                to={`/tag/${tag.slug}`}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Read More Link */}
        <Link
          to={`/article/${article.meta.slug}`}
          className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium transition-colors group"
        >
          Đọc tiếp
          <svg 
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
