import React from 'react';
import { categories } from '../data/categories';
import { tools } from '../data/tools';
import { Category } from '../types';
import { CategoryCard } from '../components/common/CategoryCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface CategoriesListingPageProps {
  onNavigate: (path: string) => void;
  onSelectCategory: (category: Category) => void;
}

export const CategoriesListingPage: React.FC<CategoriesListingPageProps> = ({
  onNavigate,
  onSelectCategory,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ label: 'Categories', path: '/categories' }]}
        onNavigate={onNavigate}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          All Tool Categories
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Discover all 28 utility categories available across PTools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const count = tools.filter((t) => t.category === cat.id).length;
          return (
            <CategoryCard
              key={cat.id}
              category={cat}
              toolCount={count}
              onClick={() => onSelectCategory(cat)}
            />
          );
        })}
      </div>
    </div>
  );
};
