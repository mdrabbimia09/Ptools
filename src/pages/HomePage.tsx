import React, { useState, useEffect } from 'react';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { Tool, Category } from '../types';
import { ToolCard } from '../components/common/ToolCard';
import { CategoryCard } from '../components/common/CategoryCard';
import { AdsterraAd } from '../components/common/AdsterraAd';
import { Search, ArrowRight, ShieldCheck, Zap, Laptop, Lock, ChevronDown } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectTool: (tool: Tool) => void;
  favorites: string[];
  onToggleFavorite: (toolId: string, e: React.MouseEvent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectTool,
  favorites,
  onToggleFavorite,
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'PTools – Free Online Tools for Everyone';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Fast, simple, and useful browser-based online tools for calculators, converters, image processing, PDF manipulation, developer utilities, and SEO.'
      );
    }
  }, []);

  // Popular tools (12 high-utility tools)
  const popularTools = tools.filter((t) => t.popular).slice(0, 12);
  const featuredTools = tools.filter((t) => t.featured).slice(0, 8);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onNavigate(`/tools?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const faqs = [
    {
      q: 'Are all tools on PTools completely free to use?',
      a: 'Yes, 100% of our online utilities, calculators, formatters, and image tools are free to use without requiring any account registration or subscription.'
    },
    {
      q: 'Are uploaded files, documents, or images saved on your servers?',
      a: 'No. Browser-based tools like Image Compressor, PDF Merger, and code formatters process your files directly inside your browser using the HTML5 Canvas API and WebAssembly. Your files are never uploaded or stored on any server.'
    },
    {
      q: 'Can I use PTools on mobile devices and tablets?',
      a: 'Yes. PTools is designed mobile-first and works seamlessly on iPhones, Android phones, iPads, laptops, and desktop computers.'
    },
    {
      q: 'How does the Google Drive integration work?',
      a: 'For public sharing links, our tools extract public IDs client-side to generate direct download and embed links. For authenticated tools, standard Google OAuth 2.0 is used client-side; PTools never sees your Google password.'
    },
    {
      q: 'Do these tools work offline?',
      a: 'Core client-side calculators, text counters, JSON utilities, and hash generators run entirely within browser memory and continue functioning even if your internet connection is momentarily interrupted.'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Hero Section */}
      <section className="text-center pt-8 pb-4 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading leading-tight text-balance">
          Free Online Tools for Everyone
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed text-balance">
          Fast, simple and useful online tools for work, study, development and everyday tasks.
        </p>

        {/* Large Tool Search Box */}
        <form onSubmit={handleHeroSubmit} className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-sm rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
            <input
              type="text"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              placeholder="Search 50+ tools (e.g. compress image, merge pdf, word counter, base64)..."
              className="w-full py-4 pl-3 pr-4 text-sm sm:text-base text-slate-900 dark:text-white bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="mr-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0"
            >
              Search
            </button>
          </div>
        </form>

        {/* Value Prop Badges (clean unboxed text, anti-slop) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-blue-500" /> Instant Browser Execution
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Client-Side Privacy
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-purple-500" /> No Registration Needed
          </span>
        </div>
      </section>

      {/* Adsterra: Below Hero */}
      <AdsterraAd placement="home-top" />

      {/* 2. Popular Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Popular Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Hand-picked browser utilities used daily for work, school, and development.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/popular')}
            className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={favorites.includes(tool.id)}
              onToggleFavorite={onToggleFavorite}
              onClick={onSelectTool}
            />
          ))}
        </div>
      </section>

      {/* 3. Major Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Browse by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore 28 specialized toolkits designed for specific digital tasks.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/categories')}
            className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const count = tools.filter((t) => t.category === cat.id).length;
            return (
              <CategoryCard
                key={cat.id}
                category={cat}
                toolCount={count}
                onClick={(c) => onNavigate(`/tools/${c.slug}`)}
              />
            );
          })}
        </div>
      </section>

      {/* Adsterra: Between Content Sections */}
      <AdsterraAd placement="home-middle" />

      {/* 4. Featured Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Featured Utilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Client-side PDF manipulation, QR generators, and developer formatters.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/tools')}
            className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Browse 50+ Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={favorites.includes(tool.id)}
              onToggleFavorite={onToggleFavorite}
              onClick={onSelectTool}
            />
          ))}
        </div>
      </section>

      {/* Adsterra: Bottom Content Ad */}
      <AdsterraAd placement="home-bottom" />

      {/* 5. Authentic SEO Content (Section 34 of prompt) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
            About PTools
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            PTools is a comprehensive collection of free online tools designed to make everyday digital tasks faster, cleaner, and easier. From image compression and client-side PDF merging to mathematical calculators, code formatters, cryptographic hash generators, and Google Drive helpers, PTools provides simple browser-based tools without requiring software downloads or account setups.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every utility on PTools is engineered with privacy and speed as primary design principles. All file conversions and computations execute directly within your local browser runtime via modern HTML5 APIs, Canvas, and Web Crypto, ensuring your personal documents and images never touch external servers.
          </p>
        </div>
      </section>

      {/* 6. Genuine FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Common questions regarding privacy, functionality, and device compatibility.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
