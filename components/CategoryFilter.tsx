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
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Browse by Category
      </h3>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="block p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <CategoryBadge category={category} size="small" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 group-hover:text-primary-500 transition-colors">
                  {category.title}
                </h4>
                {category.metadata?.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
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