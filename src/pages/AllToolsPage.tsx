import React, { useState, useMemo, useEffect } from 'react';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { Tool, ToolCategory } from '../types';
import { ToolCard } from '../components/common/ToolCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

interface AllToolsPageProps {
  onNavigate: (path: string) => void;
  onSelectTool: (tool: Tool) => void;
  favorites: string[];
  onToggleFavorite: (toolId: string, e: React.MouseEvent) => void;
  initialQuery?: string;
  initialCategory?: ToolCategory | 'all';
}

export const AllToolsPage: React.FC<AllToolsPageProps> = ({
  onNavigate,
  onSelectTool,
  favorites,
  onToggleFavorite,
  initialQuery = '',
  initialCategory = 'all',
}) => {
  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'popularity' | 'alpha' | 'new'>('popularity');

  useEffect(() => {
    document.title = 'All Online Tools – PTools';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore all free online tools, converters, calculators, PDF tools, image compressors, and developer utilities on PTools.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredTools = useMemo(() => {
    let list = [...tools];

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter((t) => t.category === selectedCategory);
    }

    // Filter by search term
    const cleanSearch = search.trim().toLowerCase();
    if (cleanSearch) {
      list = list.filter((t) => {
        return (
          t.name.toLowerCase().includes(cleanSearch) ||
          t.description.toLowerCase().includes(cleanSearch) ||
          t.category.toLowerCase().includes(cleanSearch) ||
          t.keywords.some((k) => k.toLowerCase().includes(cleanSearch))
        );
      });
    }

    // Sort
    if (sortBy === 'alpha') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popularity') {
      list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    } else if (sortBy === 'new') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return list;
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ label: 'All Tools', path: '/tools' }]}
        onNavigate={onNavigate}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          All Online Tools
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Browse our complete catalog of {tools.length} free browser utilities. Filter by category or search by task.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by tool name, format, or task..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            >
              <option value="all">All Categories ({tools.length})</option>
              {categories.map((c) => {
                const count = tools.filter((t) => t.category === c.id).length;
                return (
                  <option key={c.id} value={c.id}>
                    {c.name} {count > 0 ? `(${count})` : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            >
              <option value="popularity">Most Popular</option>
              <option value="alpha">Alphabetical (A-Z)</option>
              <option value="new">Newest First</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Active Filters, functional button elements per zero-pill guidelines) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {categories.slice(0, 10).map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === c.id
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center text-xs text-slate-500">
        <span>Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}</span>
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Tool Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
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
        <div className="py-16 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No tools matched your search criteria
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
