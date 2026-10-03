import React, { useEffect } from 'react';
import { Tool } from '../types';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { ToolRunner } from '../components/tools/ToolRunner';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ToolCard } from '../components/common/ToolCard';
import { AdsterraAd } from '../components/common/AdsterraAd';
import { Star, CheckCircle, HelpCircle, BookOpen, Share2, Sparkles } from 'lucide-react';

interface ToolDetailPageProps {
  tool: Tool;
  onNavigate: (path: string) => void;
  onSelectTool: (tool: Tool) => void;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string, e: React.MouseEvent) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({
  tool,
  onNavigate,
  onSelectTool,
  isFavorite,
  onToggleFavorite,
}) => {
  const categoryObj = categories.find((c) => c.id === tool.category);

  // Dynamic SEO meta tags and Title injection
  useEffect(() => {
    document.title = `${tool.seoTitle}`;
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', tool.seoDescription);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tool]);

  // Related tools
  const related = tools.filter((t) => tool.relatedTools.includes(t.slug) && t.id !== tool.id).slice(0, 4);

  // Fallback if none matched
  const displayRelated = related.length > 0 
    ? related 
    : tools.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 4);

  // Schema.org SoftwareApplication structured data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    operatingSystem: 'All modern web browsers',
    applicationCategory: 'UtilitiesApplication',
    description: tool.seoDescription,
    url: `https://ais-dev-ej5eiewf52m4bhpbpki2rj-128826696387.asia-east1.run.app/tools/${tool.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PTools by Pixelary Studio',
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool.name,
          text: tool.description,
          url: window.location.href,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tool link copied to clipboard!');
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'All Tools', path: '/tools' },
            { label: categoryObj?.name || 'Category', path: `/tools/${categoryObj?.slug || tool.category}` },
            { label: tool.name, path: `/tools/${tool.slug}` },
          ]}
          onNavigate={onNavigate}
        />

        {/* 1. Header & Title Block */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight leading-tight">
              {tool.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {tool.description}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start shrink-0">
            <button
              onClick={(e) => onToggleFavorite(tool.id, e)}
              className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                isFavorite ? 'text-amber-500 fill-amber-500' : 'text-slate-400'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label="Toggle favorite"
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Share this tool"
              aria-label="Share tool"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Adsterra: Above Tool */}
        <AdsterraAd placement="tool-top" />

        {/* 2. Tool Interactive Interface Canvas */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-8 shadow-sm">
          <ToolRunner tool={tool} />
        </section>

        {/* Adsterra: Below Tool */}
        <AdsterraAd placement="tool-middle" />

        {/* 3. How to Use Section */}
        {tool.howToUse && tool.howToUse.length > 0 && (
          <section className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>How to Use {tool.name}</span>
            </h2>
            <ol className="space-y-3">
              {tool.howToUse.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* 4. Features Section */}
        {tool.features && tool.features.length > 0 && (
          <section className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Key Features</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Authentic FAQs */}
        {tool.faqs && tool.faqs.length > 0 && (
          <section className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-3">
              {tool.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl space-y-1">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{faq.question}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Related Tools Section */}
        {displayRelated.length > 0 && (
          <section className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                Related Tools
              </h2>
              {categoryObj && (
                <button
                  onClick={() => onNavigate(`/tools/${categoryObj.slug}`)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  More in {categoryObj.name} →
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayRelated.map((relTool) => (
                <ToolCard
                  key={relTool.id}
                  tool={relTool}
                  isFavorite={false}
                  onToggleFavorite={onToggleFavorite}
                  onClick={onSelectTool}
                />
              ))}
            </div>
          </section>
        )}

        {/* Adsterra: Bottom of Tool Page */}
        <AdsterraAd placement="tool-bottom" />
      </div>
    </>
  );
};
