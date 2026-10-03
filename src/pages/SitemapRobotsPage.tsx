import React, { useState } from 'react';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CopyButton } from '../components/tools/CalculatorTools';
import { Download, FileCode, ExternalLink } from 'lucide-react';

interface SitemapRobotsPageProps {
  onNavigate: (path: string) => void;
  view: 'sitemap' | 'robots';
}

export const SitemapRobotsPage: React.FC<SitemapRobotsPageProps> = ({ onNavigate, view }) => {
  const baseUrl = 'https://ais-dev-ej5eiewf52m4bhpbpki2rj-128826696387.asia-east1.run.app';
  const currentDate = new Date().toISOString().split('T')[0];

  // Dynamic XML Sitemap Generator
  const generateSitemapXml = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/tools</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/categories</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/popular</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy-policy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>

  <!-- Category Pages -->
${categories
  .map(
    (c) => `  <url>
    <loc>${baseUrl}/tools/${c.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}

  <!-- Individual Tool Pages -->
${tools
  .map(
    (t) => `  <url>
    <loc>${baseUrl}/tools/${t.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
    return xml;
  };

  const robotsContent = `User-agent: *
Allow: /
Allow: /tools/
Allow: /categories
Allow: /about
Allow: /contact
Allow: /privacy-policy
Allow: /terms
Allow: /cookie-policy
Allow: /disclaimer

# Disallow private paths and search duplicates
Disallow: /api/
Disallow: /admin/
Disallow: /*?*q=

Sitemap: ${baseUrl}/sitemap.xml`;

  const sitemapXml = generateSitemapXml();

  const handleDownload = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ label: view === 'sitemap' ? 'XML Sitemap' : 'robots.txt', path: `/${view}` }]}
        onNavigate={onNavigate}
      />

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
              {view === 'sitemap' ? 'Dynamic XML Sitemap' : 'Production robots.txt'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {view === 'sitemap'
                ? `Standard sitemap.xml indexing ${tools.length + categories.length + 7} total URLs for Google Search Console.`
                : 'Robots crawler policy directing search engine spiders.'}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                handleDownload(
                  view === 'sitemap' ? 'sitemap.xml' : 'robots.txt',
                  view === 'sitemap' ? sitemapXml : robotsContent,
                  view === 'sitemap' ? 'application/xml' : 'text/plain'
                )
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {view === 'sitemap' ? 'sitemap.xml' : 'robots.txt'}</span>
            </button>
            <CopyButton
              text={view === 'sitemap' ? sitemapXml : robotsContent}
              label="Copy"
            />
          </div>
        </div>

        <textarea
          readOnly
          rows={16}
          value={view === 'sitemap' ? sitemapXml : robotsContent}
          className="w-full p-4 text-xs font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200"
        />
      </div>
    </div>
  );
};
