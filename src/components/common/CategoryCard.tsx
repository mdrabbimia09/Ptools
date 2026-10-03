import React from 'react';
import { Category } from '../../types';
import { renderToolIcon } from './ToolCard';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  toolCount: number;
  onClick: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  toolCount,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(category)}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            {renderToolIcon(category.icon)}
          </div>
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
            {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
          {category.name}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-medium">
        <span>Explore Category</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
