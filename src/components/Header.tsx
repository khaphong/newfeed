import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const getCurrentDate = () => {
    const now = new Date();
    const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const day = days[now.getDay()];
    const date = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${day}, ${date}/${month}/${year}`;
  };

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="header-top">
        <div className="container flex flex-between flex-center">
          <div className="text-gray-600">
            {getCurrentDate()}
          </div>
          <div className="header-top-social">
            <a href="#" className="text-gray-600">Facebook</a>
            <a href="#" className="text-gray-600">Twitter</a>
            <a href="#" className="text-gray-600">Youtube</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container flex flex-between flex-center">
          {/* Logo */}
          <Link to="/" className="logo">
            WIND
          </Link>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="search-input"
              />
              <button className="search-btn">
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="header-actions">
            <button className="icon-btn">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="icon-btn">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        <div className="container">
          <div className="nav-container">
            <Link to="/" className="nav-link">TRANG CHỦ</Link>
            <Link to="/category/tech" className="nav-link">CÔNG NGHỆ</Link>
            <Link to="/category/mobile" className="nav-link">ĐIỆN THOẠI</Link>
            <Link to="/category/laptop" className="nav-link">LAPTOP</Link>
            <Link to="/category/gaming" className="nav-link">GAMING</Link>
            <Link to="/category/reviews" className="nav-link">ĐÁNH GIÁ</Link>
            <Link to="/category/news" className="nav-link">TIN TỨC</Link>
            <Link to="/category/deals" className="nav-link">DEALS</Link>
            <Link to="/category/videos" className="nav-link">VIDEO</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
