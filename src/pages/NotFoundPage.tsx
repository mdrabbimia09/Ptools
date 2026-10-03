import React, { useState } from 'react';
import { Search, Home, Grid } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onNavigate(`/tools?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-2xl font-mono mx-auto">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          Tool or Page Not Found
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Sorry, we couldn't find the tool or address you're looking for. It may have moved or been renamed.
        </p>
      </div>

      <form onSubmit={handleSearch} className="max-w-md mx-auto">
        <div className="relative flex items-center border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="w-4 h-4 text-slate-400 ml-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 50+ available tools..."
            className="w-full py-2.5 pl-2 pr-3 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none"
          />
          <button
            type="submit"
            className="mr-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Go Home</span>
        </button>
        <button
          onClick={() => onNavigate('/tools')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Browse All Tools</span>
        </button>
      </div>
    </div>
  );
};
