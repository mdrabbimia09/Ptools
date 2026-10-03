import React from 'react';
import { categories } from '../../data/categories';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const majorCategories = categories.slice(0, 8);

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm font-heading shadow-sm">
                P
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
                PTools
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Fast, simple, and useful browser-based online tools for calculators, converters, image manipulation, PDF tools, developer helpers, and SEO.
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Powered by <span className="text-slate-800 dark:text-slate-200 font-semibold">Pixelary Studio</span>
            </div>
          </div>

          {/* Tools Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Tools
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('/tools')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  All Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/popular')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  Popular Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/new')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  New Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/favorites')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  Saved Favorites
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools/google-drive-tools')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  Google Drive Tools
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {majorCategories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onNavigate(`/tools/${c.slug}`)}
                    className="hover:text-blue-600 dark:hover:text-blue-400 truncate text-left max-w-full"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => onNavigate('/categories')} className="text-blue-600 dark:text-blue-400 font-medium">
                  View all 28 categories →
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Legal & Info
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  About PTools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy-policy')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/cookie-policy')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/disclaimer')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/sitemap')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  XML Sitemap
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/robots')} className="hover:text-blue-600 dark:hover:text-blue-400">
                  robots.txt
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} PTools. Powered by Pixelary Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Client-Side Processing
            </span>
            <span>·</span>
            <span>No File Storage</span>
            <span>·</span>
            <span>Free For Everyone</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
