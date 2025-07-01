import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'small' | 'medium' | 'large'
}

export default function CategoryBadge({ category, size = 'medium' }: CategoryBadgeProps) {
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  }

  const color = category.metadata?.color || '#6B7280'

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: color }}
    >
      {category.title}
    </span>
  )
}