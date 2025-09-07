
# 📰 NewsHub - React News Website

A modern, responsive news website built with React, TypeScript, and TailwindCSS. Designed to integrate with Wagtail CMS backend with a clean, professional design inspired by Vietnamese news portals like genk.vn.

## ✨ Features

- 🚀 **Modern Tech Stack**: React 19, TypeScript, Vite, TailwindCSS
- 📱 **Responsive Design**: Mobile-first approach with tablet and desktop optimizations
- 🎨 **Clean UI**: Professional news layout with component-based architecture
- 🔗 **Router Integration**: React Router v6 for smooth navigation
- 🏗️ **Component Library**: Reusable components for articles, headers, sidebars
- ⚡ **Fast Performance**: Optimized build with lazy loading and code splitting
- 🌐 **SEO Ready**: Meta tags, semantic HTML, and structured data
- 🐳 **Docker Support**: Containerized deployment with Nginx

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 10+
- Wagtail CMS backend (optional)

### 1. Clone Repository
```bash
git clone https://github.com/your-username/newshub-react.git
cd newshub-react
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v2
VITE_APP_NAME=NewsHub
VITE_APP_DESCRIPTION=Leading Vietnamese News Portal
```

### 4. Development Server
```bash
npm run dev
```

Visit http://localhost:5173

### 5. Production Build
```bash
npm run build
npm run preview
```

## 🐳 Docker Deployment

### Development with Docker
```bash
docker-compose up --build
```

### Production Deployment
```bash
# Build image
docker build -t newshub-frontend .

# Run container
docker run -p 3000:80 newshub-frontend
```

## 📦 Component Library

### Header Component
- Responsive navigation with mobile menu
- Search functionality
- Category dropdown
- Social media links
- Breaking news ticker

```tsx
import Header from './components/Header';

<Header />
```

### ArticleCard Component
```tsx
import ArticleCard from './components/ArticleCard';

<ArticleCard 
  article={articleData} 
  variant="default" // "default" | "horizontal" | "small"
/>
```

### FeaturedArticle Component
```tsx
import FeaturedArticle from './components/FeaturedArticle';

<FeaturedArticle 
  title="Article Title"
  excerpt="Article excerpt..."
  imageUrl="image-url"
  category="Technology"
  slug="article-slug"
/>
```

### Sidebar Component
```tsx
import Sidebar from './components/Sidebar';

<Sidebar 
  recentArticles={recent}
  popularArticles={popular}
  categories={categories}
  tags={tags}
/>
```

## 🔌 API Integration

### Wagtail CMS Integration

The website is designed to integrate seamlessly with Wagtail CMS. Expected API structure:

#### Article Page Model
```python
class ArticlePage(Page):
    intro = RichTextField(blank=True)
    body = RichTextField(blank=True)
    featured_image = models.ForeignKey('wagtailimages.Image')
    author = models.ForeignKey('Author')
    categories = models.ManyToManyField('Category')
    tags = TaggableManager()
    reading_time = models.IntegerField(default=5)
    publish_date = models.DateTimeField(default=timezone.now)
```

#### API Endpoints
- `GET /api/v2/pages/?type=news.ArticlePage` - Article listings
- `GET /api/v2/pages/?slug=article-slug` - Article details
- `GET /api/v2/snippets/news.Category/` - Categories
- `GET /api/v2/snippets/taggit.Tag/` - Tags

### Mock Data
If you don't have a Wagtail backend yet, you can use mock data in `services/api.ts`.

## 🎨 Customization

### Color Scheme
Edit `basic.css` variables:
```css
:root {
  --genk-red: #dc2626;
  --genk-blue: #2563eb;
  --custom-color: #your-color;
}
```

### Adding New Components
1. Create file in `src/components/`
2. Export component with TypeScript interfaces
3. Import and use in pages

### Custom Styling
Add styles to `src/basic.css` or create component-specific CSS files.

## 📊 SEO Optimization

Built-in SEO features:
- Semantic HTML structure
- Dynamic meta tags
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Fast loading times
- Mobile-friendly design

To add React Helmet for advanced SEO:
```bash
npm install react-helmet-async
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Testing (if you add tests)
npm run test         # Run unit tests
npm run test:e2e     # End-to-end tests
```

## 📈 Performance Optimization

### 1. Image Optimization
- Use WebP format when possible
- Implement lazy loading with Intersection Observer
- Responsive images with srcset

### 2. Code Splitting
```tsx
import { lazy, Suspense } from 'react';

const ArticlePage = lazy(() => import('./pages/ArticlePage'));

<Suspense fallback={<div>Loading...</div>}>
  <ArticlePage />
</Suspense>
```

### 3. Caching Strategies
- Service Worker for offline support
- API response caching
- Static asset caching with proper headers

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install

# For legacy peer dependencies
npm install --legacy-peer-deps
```

### TypeScript Errors
- Check `tsconfig.json` configuration
- Update `@types/*` packages
- Restart TypeScript server in VS Code

### API Connection Issues
- Verify CORS settings on backend
- Check API endpoint URLs
- Validate environment variables

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Create Pull Request

### Development Guidelines
- Use TypeScript for all components
- Follow ESLint rules and formatting
- Write tests for new features
- Document API changes
- Ensure responsive design for all components
- Follow component naming conventions

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Developer** - React.js, TypeScript, TailwindCSS
- **Backend Developer** - Wagtail CMS, Django, PostgreSQL  
- **DevOps Engineer** - Docker, CI/CD, Deployment

## 🆘 Support

If you encounter issues:
1. Check existing [Issues](https://github.com/your-username/newshub-react/issues)
2. Create new issue with proper template
3. Contact support team: support@newshub.com

## 🔮 Roadmap

### v1.1 (Coming Soon)
- [ ] User authentication system
- [ ] Comment and rating system
- [ ] Social media sharing
- [ ] Newsletter subscription
- [ ] Advanced search with filters

### v1.2 (Future)
- [ ] Multi-language support (i18n)
- [ ] Progressive Web App (PWA) features
- [ ] Push notifications
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] Real-time updates

### v2.0 (Long-term)
- [ ] AI-powered content recommendations
- [ ] Voice search capability
- [ ] Dark mode theme
- [ ] Advanced personalization
- [ ] Mobile app (React Native)

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page-level components
├── services/           # API integration
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── assets/             # Static assets
└── styles/             # Global styles
```

### Technology Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: CSS3, CSS Grid, Flexbox
- **Routing**: React Router v6
- **Build Tool**: Vite with TypeScript
- **Deployment**: Docker + Nginx
- **Backend**: Wagtail CMS (Django)

---

**Built with ❤️ for the Vietnamese News Community**

*This project demonstrates modern web development practices with a focus on performance, accessibility, and user experience.*
