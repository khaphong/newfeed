import React from 'react';
import { Link } from 'react-router-dom';
import type { ArticlePage } from '../types';

interface HeroBannerProps {
  featuredArticle: ArticlePage;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ featuredArticle }) => {
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
    if (!image) return '/placeholder-hero.jpg';
    return image.original?.url || image.full_url || '/placeholder-hero.jpg';
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(featuredArticle.featured_image)}
          alt={featuredArticle.featured_image?.title || featuredArticle.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <div className="max-w-4xl">
            {/* Category Badge */}
            {featuredArticle.categories && featuredArticle.categories.length > 0 && (
              <div className="mb-4">
                <Link
                  to={`/category/${featuredArticle.categories[0].slug}`}
                  className="inline-flex items-center px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full hover:bg-red-600 transition-colors"
                >
                  {featuredArticle.categories[0].name}
                </Link>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <Link
                to={`/article/${featuredArticle.meta.slug}`}
                className="hover:text-gray-200 transition-colors"
              >
                {featuredArticle.title}
              </Link>
            </h1>

            {/* Excerpt */}
            {featuredArticle.intro && (
              <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed line-clamp-3">
                {featuredArticle.intro}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
              {/* Author */}
              {featuredArticle.author && (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{featuredArticle.author.name}</span>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(featuredArticle.meta.first_published_at)}</span>
              </div>

              {/* Read Time */}
              {featuredArticle.reading_time && (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{featuredArticle.reading_time} phút đọc</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {featuredArticle.tags && featuredArticle.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {featuredArticle.tags.slice(0, 4).map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/tag/${tag.slug}`}
                    className="px-2 py-1 bg-black/30 backdrop-blur-sm text-white text-sm rounded hover:bg-black/50 transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Read More Button */}
            <div className="mt-8">
              <Link
                to={`/article/${featuredArticle.meta.slug}`}
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors group"
              >
                Đọc tiếp
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button
          className="w-12 h-12 bg-black/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
          aria-label="Previous article"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button
          className="w-12 h-12 bg-black/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
          aria-label="Next article"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((dot) => (
            <button
              key={dot}
              className={`w-3 h-3 rounded-full transition-colors ${
                dot === 1 ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${dot}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
