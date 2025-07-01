import Link from 'next/link'
import { Category } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (categories.length === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Browse by Category
      </h3>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="block p-4 rounded-lg border border-gray-100 dark:border-gray-600 hover:border-gray-200 dark:hover:border-gray-500 hover:shadow-sm transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <CategoryBadge category={category} size="small" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                  {category.title}
                </h4>
                {category.metadata?.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {category.metadata.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}