import React from 'react';
import { tools } from '../data/tools';
import { Tool } from '../types';
import { ToolCard } from '../components/common/ToolCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Star, Trash2 } from 'lucide-react';

interface FavoritesPageProps {
  onNavigate: (path: string) => void;
  onSelectTool: (tool: Tool) => void;
  favorites: string[];
  onToggleFavorite: (toolId: string, e: React.MouseEvent) => void;
  onClearFavorites: () => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  onNavigate,
  onSelectTool,
  favorites,
  onToggleFavorite,
  onClearFavorites,
}) => {
  const favoriteTools = tools.filter((t) => favorites.includes(t.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ label: 'Saved Favorites', path: '/favorites' }]}
        onNavigate={onNavigate}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading flex items-center gap-2.5">
            <Star className="w-7 h-7 text-amber-500 fill-amber-500" />
            <span>Your Favorite Tools</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Fast access to your bookmarked tools saved locally in your browser.
          </p>
        </div>

        {favoriteTools.length > 0 && (
          <button
            onClick={onClearFavorites}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg hover:bg-rose-100 transition-colors self-start"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Favorites</span>
          </button>
        )}
      </div>

      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favoriteTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onClick={onSelectTool}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
          <Star className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            No favorites saved yet
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the star icon on any tool card or tool page to save it here for instant one-click access.
          </p>
          <button
            onClick={() => onNavigate('/tools')}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse All Tools
          </button>
        </div>
      )}
    </div>
  );
};
