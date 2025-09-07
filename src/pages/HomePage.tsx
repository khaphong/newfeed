import React from 'react';
import { Link } from 'react-router-dom';
import BreakingNews from '../components/BreakingNews';
import FeaturedArticle from '../components/FeaturedArticle';
import SectionHeader from '../components/SectionHeader';
import NewsItem from '../components/NewsItem';
import PopularArticles from '../components/PopularArticles';

const HomePage: React.FC = () => {
  // Mock data
  const breakingNews = [
    'iPhone 15 Pro Max ra mắt với chip A17 Pro',
    'MacBook Air M3 giảm giá tại VN',
    'Tesla Model Y 2024 có gì mới?',
    'Samsung S24 Ultra leak thông số',
    'Apple Vision Pro sắp về VN'
  ];

  const featuredArticle = {
    title: 'iPhone 15 Pro Max ra mắt với chip A17 Pro mạnh mẽ',
    excerpt: 'Apple công bố iPhone 15 Pro Max với nhiều tính năng đột phá',
    imageUrl: 'https://via.placeholder.com/600x400?text=iPhone+15+Pro+Max',
    category: 'ĐỒ CHƠI SỐ'
  };

  const sideArticles = Array.from({length: 3}, (_, i) => ({
    id: i + 1,
    title: `Tin công nghệ số ${i + 1}: Đánh giá sản phẩm mới`,
    excerpt: `Mô tả ngắn về tin tức số ${i + 1}...`,
    imageUrl: `https://via.placeholder.com/120x80?text=News+${i + 1}`,
    date: new Date().toLocaleDateString('vi-VN')
  }));

  const mainArticles = Array.from({length: 8}, (_, i) => ({
    id: i + 1,
    title: `Bài viết số ${i + 1}: Tin tức công nghệ mới`,
    excerpt: `Mô tả ngắn về nội dung bài viết số ${i + 1}...`,
    imageUrl: `https://via.placeholder.com/300x200?text=Article+${i + 1}`,
    date: new Date().toLocaleDateString('vi-VN')
  }));

  const latestNews = Array.from({length: 4}, (_, i) => ({
    id: i + 9,
    title: `Tin mới nhất số ${i + 9}: Cập nhật công nghệ`,
    excerpt: `Nội dung chi tiết về tin tức số ${i + 9}...`,
    imageUrl: `https://via.placeholder.com/150x100?text=News+${i + 9}`,
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '5 phút đọc'
  }));

  return (
    <div className="page-container">
      <BreakingNews news={breakingNews} />

      {/* Featured Article Section */}
      <section className="featured-section">
        <div className="container featured-section-content">
          <div className="featured-grid">
            <FeaturedArticle {...featuredArticle} />
            
            {/* Side articles */}
            <div className="side-articles">
              {sideArticles.map((article) => (
                <NewsItem
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  imageUrl={article.imageUrl}
                  date={article.date}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container main-content">
        <div className="main-layout">
          {/* Left Column - Articles */}
          <main>
            {/* ĐÁNG CHÚ Ý Section */}
            <section className="main-section">
              <SectionHeader title="ĐÁNG CHÚ Ý" />
              
              <div className="responsive-grid">
                {mainArticles.map((article) => (
                  <Link 
                    key={article.id} 
                    to="/article/xu-huong-cong-nghe-2024-ai-machine-learning" 
                    className="article-card"
                  >
                    <img 
                      src={article.imageUrl}
                      alt={article.title}
                      className="article-image"
                    />
                    <div className="article-content">
                      <h3 className="article-title">
                        {article.title}
                      </h3>
                      <p className="article-excerpt">
                        {article.excerpt}
                      </p>
                      <div className="article-meta">
                        {article.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Latest News Section */}
            <section>
              <SectionHeader title="TIN MỚI NHẤT" />
              
              <div className="latest-news-list">
                {latestNews.map((news) => (
                  <NewsItem
                    key={news.id}
                    title={news.title}
                    excerpt={news.excerpt}
                    imageUrl={news.imageUrl}
                    date={news.date}
                    readTime={news.readTime}
                  />
                ))}
              </div>
            </section>
          </main>

          {/* Right Column - Sidebar */}
          <aside className="sidebar">
            <PopularArticles />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
