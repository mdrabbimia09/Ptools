import React, { useState } from 'react';
import { CopyButton } from './CalculatorTools';
import { Download, Search, Globe, Check } from 'lucide-react';

// 48. UTM Builder
export const UtmBuilder: React.FC = () => {
  const [url, setUrl] = useState('https://ptools.com');
  const [source, setSource] = useState('newsletter');
  const [medium, setMedium] = useState('email');
  const [campaign, setCampaign] = useState('spring_launch');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('header_cta');

  const buildUrl = () => {
    try {
      const base = url.trim() || 'https://ptools.com';
      const u = new URL(base.startsWith('http') ? base : `https://${base}`);
      if (source) u.searchParams.set('utm_source', source.trim());
      if (medium) u.searchParams.set('utm_medium', medium.trim());
      if (campaign) u.searchParams.set('utm_campaign', campaign.trim());
      if (term) u.searchParams.set('utm_term', term.trim());
      if (content) u.searchParams.set('utm_content', content.trim());
      return u.toString();
    } catch {
      return 'Please enter a valid website URL';
    }
  };

  const finalUrl = buildUrl();

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Website Destination URL *
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/pricing"
          className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Campaign Source (utm_source) *
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="google, newsletter, twitter"
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Campaign Medium (utm_medium) *
          </label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="cpc, banner, email, social"
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Campaign Name (utm_campaign)
          </label>
          <input
            type="text"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            placeholder="spring_sale, product_launch"
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Campaign Content (utm_content)
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="logolink, textlink, banner1"
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
          />
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Generated Campaign URL</div>
        <div className="text-xs font-mono text-blue-600 dark:text-blue-400 break-all select-all">
          {finalUrl}
        </div>
        <div className="flex justify-end pt-1">
          <CopyButton text={finalUrl} label="Copy Campaign URL" />
        </div>
      </div>
    </div>
  );
};

// 49. Meta Tag Generator
export const MetaTagGenerator: React.FC = () => {
  const [title, setTitle] = useState('PTools – Free Online Tools for Everyone');
  const [description, setDescription] = useState('Fast, simple, and useful browser-based online tools for calculators, converters, image compression, PDF tools, and developer utilities.');
  const [siteUrl, setSiteUrl] = useState('https://ptools.com');
  const [ogImage, setOgImage] = useState('https://ptools.com/og-image.png');
  const [author, setAuthor] = useState('Pixelary Studio');

  const metaSnippet = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="author" content="${author}">
<link rel="canonical" href="${siteUrl}">

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website">
<meta property="og:url" content="${siteUrl}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${ogImage}">

<!-- Twitter / X -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${siteUrl}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${ogImage}">`;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Page Title (Recommended: 50–60 characters)</span>
            <span className={`font-mono ${title.length > 60 ? 'text-amber-500' : 'text-slate-400'}`}>
              {title.length} chars
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Meta Description (Recommended: 120–160 characters)</span>
            <span className={`font-mono ${description.length > 160 ? 'text-amber-500' : 'text-slate-400'}`}>
              {description.length} chars
            </span>
          </div>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Canonical Webpage URL</label>
            <input
              type="text"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Social Preview Image URL</label>
            <input
              type="text"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Generated HTML Meta Snippet
        </div>
        <textarea
          readOnly
          rows={10}
          value={metaSnippet}
          className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="flex justify-end gap-2">
        <CopyButton text={metaSnippet} label="Copy HTML Meta Tags" />
      </div>
    </div>
  );
};

// 50. Robots.txt Generator
export const RobotsTxtGenerator: React.FC = () => {
  const [defaultRule, setDefaultRule] = useState<'allow' | 'disallow'>('allow');
  const [disallowedDirs, setDisallowedDirs] = useState('/admin/\n/api/\n/private/');
  const [sitemapUrl, setSitemapUrl] = useState('https://ptools.com/sitemap.xml');
  const [crawlDelay, setCrawlDelay] = useState('');

  const buildRobots = () => {
    let lines = ['User-agent: *'];
    if (defaultRule === 'disallow') {
      lines.push('Disallow: /');
    } else {
      lines.push('Allow: /');
      const dirs = disallowedDirs.split('\n').filter(Boolean);
      dirs.forEach((d) => {
        lines.push(`Disallow: ${d.trim()}`);
      });
    }

    if (crawlDelay) {
      lines.push(`Crawl-delay: ${crawlDelay}`);
    }

    if (sitemapUrl) {
      lines.push('');
      lines.push(`Sitemap: ${sitemapUrl.trim()}`);
    }

    return lines.join('\n');
  };

  const output = buildRobots();

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Default Crawler Access
          </label>
          <select
            value={defaultRule}
            onChange={(e) => setDefaultRule(e.target.value as any)}
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
          >
            <option value="allow">Allow All Crawlers</option>
            <option value="disallow">Disallow All Crawlers</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Optional Crawl-delay (seconds)
          </label>
          <input
            type="number"
            value={crawlDelay}
            onChange={(e) => setCrawlDelay(e.target.value)}
            placeholder="e.g. 5"
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
      </div>

      {defaultRule === 'allow' && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Directories to Disallow (One per line)
          </label>
          <textarea
            rows={4}
            value={disallowedDirs}
            onChange={(e) => setDisallowedDirs(e.target.value)}
            className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          XML Sitemap URL
        </label>
        <input
          type="text"
          value={sitemapUrl}
          onChange={(e) => setSitemapUrl(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Generated robots.txt File</label>
        <textarea
          readOnly
          rows={7}
          value={output}
          className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-400">Place this file in your website's root directory</span>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download robots.txt</span>
          </button>
          <CopyButton text={output} label="Copy Content" />
        </div>
      </div>
    </div>
  );
};
