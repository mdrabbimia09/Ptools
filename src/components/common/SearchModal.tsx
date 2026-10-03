import React, { useState, useEffect, useRef } from 'react';
import { tools } from '../../data/tools';
import { Tool } from '../../types';
import { renderToolIcon } from './ToolCard';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: Tool) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTool,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const cleanQ = query.trim().toLowerCase();
  const results = cleanQ
    ? tools.filter((t) => {
        return (
          t.name.toLowerCase().includes(cleanQ) ||
          t.description.toLowerCase().includes(cleanQ) ||
          t.category.toLowerCase().includes(cleanQ) ||
          t.keywords.some((k) => k.toLowerCase().includes(cleanQ))
        );
      })
    : tools.slice(0, 8); // show popular 8 by default

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      onSelectTool(results[selectedIndex]);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search 50+ online tools (e.g. compress, pdf, base64, bmi)..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded hover:bg-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {results.length > 0 ? (
            results.map((t, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    onSelectTool(t);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                      {renderToolIcon(t.icon, 'w-4 h-4')}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-sm font-semibold truncate">{t.name}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 truncate">
                        {t.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[11px] text-slate-400 capitalize hidden sm:inline">
                      {t.category.replace(/-/g, ' ')}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              No tools matching "{query}". Try searching for calculators, PDF, images, or converters.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="font-mono bg-white dark:bg-slate-800 px-1 border border-slate-200 dark:border-slate-700 rounded">↑</kbd> <kbd className="font-mono bg-white dark:bg-slate-800 px-1 border border-slate-200 dark:border-slate-700 rounded">↓</kbd> to navigate</span>
            <span><kbd className="font-mono bg-white dark:bg-slate-800 px-1 border border-slate-200 dark:border-slate-700 rounded">↵</kbd> to open</span>
          </div>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
};
