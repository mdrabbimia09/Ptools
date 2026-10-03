import React, { useState, useEffect } from 'react';
import { tools } from './data/tools';
import { categories } from './data/categories';
import { Tool, Category } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './pages/HomePage';
import { AllToolsPage } from './pages/AllToolsPage';
import { CategoryPage } from './pages/CategoryPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CategoriesListingPage } from './pages/CategoriesListingPage';
import { LegalPages } from './pages/LegalPages';
import { SitemapRobotsPage } from './pages/SitemapRobotsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdDebugPanel } from './components/common/AdDebugPanel';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ptools_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Keep path in sync with browser navigation (Back / Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global Keyboard Shortcut: Cmd/Ctrl + K or "/" opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (
        e.key === '/' &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleFavorite = (toolId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId];
      localStorage.setItem('ptools_favorites', JSON.stringify(next));
      return next;
    });
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('ptools_favorites');
  };

  const handleSelectTool = (tool: Tool) => {
    navigate(`/tools/${tool.slug}`);
  };

  // Route Resolver
  const renderCurrentView = () => {
    const cleanPath = currentPath.split('?')[0].replace(/\/+$/, '') || '/';
    const searchParams = new URLSearchParams(window.location.search);
    const queryParam = searchParams.get('q') || '';

    // 1. Home
    if (cleanPath === '/') {
      return (
        <HomePage
          onNavigate={navigate}
          onSelectTool={handleSelectTool}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    // 2. All Tools
    if (cleanPath === '/tools') {
      return (
        <AllToolsPage
          onNavigate={navigate}
          onSelectTool={handleSelectTool}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          initialQuery={queryParam}
        />
      );
    }

    // 3. Popular Tools
    if (cleanPath === '/popular') {
      return (
        <AllToolsPage
          onNavigate={navigate}
          onSelectTool={handleSelectTool}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    // 4. New Tools
    if (cleanPath === '/new') {
      return (
        <AllToolsPage
          onNavigate={navigate}
          onSelectTool={handleSelectTool}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    // 5. Favorites
    if (cleanPath === '/favorites') {
      return (
        <FavoritesPage
          onNavigate={navigate}
          onSelectTool={handleSelectTool}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onClearFavorites={handleClearFavorites}
        />
      );
    }

    // 6. Categories List
    if (cleanPath === '/categories') {
      return (
        <CategoriesListingPage
          onNavigate={navigate}
          onSelectCategory={(c) => navigate(`/tools/${c.slug}`)}
        />
      );
    }

    // 7. Dynamic /tools/:slug routing
    if (cleanPath.startsWith('/tools/')) {
      const slug = cleanPath.replace('/tools/', '');

      // Check if it's a category
      const matchedCat = categories.find((c) => c.slug === slug || c.id === slug);
      if (matchedCat) {
        return (
          <CategoryPage
            category={matchedCat}
            onNavigate={navigate}
            onSelectTool={handleSelectTool}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      }

      // Check if it's a tool
      const matchedTool = tools.find((t) => t.slug === slug || t.id === slug);
      if (matchedTool) {
        return (
          <ToolDetailPage
            tool={matchedTool}
            onNavigate={navigate}
            onSelectTool={handleSelectTool}
            isFavorite={favorites.includes(matchedTool.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      }
    }

    // 8. Legal and info pages
    if (cleanPath === '/about') return <LegalPages onNavigate={navigate} pageType="about" />;
    if (cleanPath === '/contact') return <LegalPages onNavigate={navigate} pageType="contact" />;
    if (cleanPath === '/privacy-policy') return <LegalPages onNavigate={navigate} pageType="privacy" />;
    if (cleanPath === '/terms') return <LegalPages onNavigate={navigate} pageType="terms" />;
    if (cleanPath === '/cookie-policy') return <LegalPages onNavigate={navigate} pageType="cookies" />;
    if (cleanPath === '/disclaimer') return <LegalPages onNavigate={navigate} pageType="disclaimer" />;

    // 9. Sitemap & Robots
    if (cleanPath === '/sitemap' || cleanPath === '/sitemap.xml') {
      return <SitemapRobotsPage onNavigate={navigate} view="sitemap" />;
    }
    if (cleanPath === '/robots' || cleanPath === '/robots.txt') {
      return <SitemapRobotsPage onNavigate={navigate} view="robots" />;
    }

    // 10. Fallback 404
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] font-sans antialiased transition-colors selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* Main Viewport Content */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Global Instant Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectTool={handleSelectTool}
      />

      {/* Persistent Footer */}
      <Footer onNavigate={navigate} />

      {/* Development-only Adsterra Diagnostics */}
      <AdDebugPanel />
    </div>
  );
}
