import React, { useEffect } from 'react';
import { Category, Tool } from '../types';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { ToolCard } from '../components/common/ToolCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdsterraAd } from '../components/common/AdsterraAd';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface CategoryPageProps {
  category: Category;
  onNavigate: (path: string) => void;
  onSelectTool: (tool: Tool) => void;
  favorites: string[];
  onToggleFavorite: (toolId: string, e: React.MouseEvent) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  onNavigate,
  onSelectTool,
  favorites,
  onToggleFavorite,
}) => {
  useEffect(() => {
    document.title = category.seoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', category.seoDescription);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category]);

  const categoryTools = tools.filter((t) => t.category === category.id);
  const otherCategories = categories.filter((c) => c.id !== category.id).slice(0, 6);

  const categoryFaqs = [
    {
      q: `Are ${category.name} free to use on PTools?`,
      a: `Yes, all ${category.name} utilities run directly in your web browser for free with zero required downloads or memberships.`
    },
    {
      q: `Do ${category.name} send my files or inputs to a backend server?`,
      a: `No. Browser-first tools execute locally via JavaScript and HTML5 APIs. Data remains private on your machine.`
    },
    {
      q: `Can I bookmark or share these ${category.name}?`,
      a: `Each tool in the ${category.name} section has a permanent, SEO-friendly clean URL that can be directly bookmarked and shared.`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'All Categories', path: '/categories' },
          { label: category.name, path: `/tools/${category.slug}` },
        ]}
        onNavigate={onNavigate}
      />

      {/* Category Header */}
      <div className="max-w-3xl space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
          {category.seoTitle.replace(' | PTools', '')}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {category.seoDescription}
        </p>
      </div>

      {/* Adsterra: Header Bottom */}
      <AdsterraAd placement="category-top" />

      {/* Tools in Category */}
      <section className="space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>{categoryTools.length} {categoryTools.length === 1 ? 'tool available' : 'tools available'} in {category.name}</span>
        </div>

        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categoryTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={onToggleFavorite}
                onClick={onSelectTool}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              New {category.name} in active development
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Check out our other toolkits below.
            </p>
          </div>
        )}
      </section>

      {/* Adsterra: Tools Bottom */}
      <AdsterraAd placement="category-bottom" />

      {/* Category FAQs */}
      <section className="max-w-3xl pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span>{category.name} FAQ</span>
        </h2>
        <div className="space-y-3">
          {categoryFaqs.map((faq, i) => (
            <div key={i} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{faq.q}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Categories */}
      <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
          Explore Related Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {otherCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => onNavigate(`/tools/${c.slug}`)}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-xl text-left transition-colors group"
            >
              <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 truncate">
                {c.name}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                <span>View tools</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
