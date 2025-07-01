import Link from 'next/link'
import { Post, getPostSummary } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorCard from '@/components/AuthorCard'

interface PostCardProps {
  post: Post
  showAuthor?: boolean
}

export default function PostCard({ post, showAuthor = true }: PostCardProps) {
  const summary = getPostSummary(post, 120)

  return (
    <article className="card group hover:shadow-lg transition-all duration-300">
      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <Link href={`/posts/${post.slug}`} className="block">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={267}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Category Overlay */}
            {post.metadata?.category && (
              <div className="absolute top-4 left-4">
                <CategoryBadge category={post.metadata.category} size="small" />
              </div>
            )}
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category (if no image) */}
        {!post.metadata?.featured_image && post.metadata?.category && (
          <div className="mb-4">
            <CategoryBadge category={post.metadata.category} />
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors">
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Summary */}
        {summary && (
          <p className="text-gray-600 mb-4 leading-relaxed">
            {summary}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            {post.metadata?.surf_location && (
              <span className="flex items-center gap-1">
                📍 {post.metadata.surf_location}
              </span>
            )}
            
            {post.metadata?.wave_conditions && (
              <span className="flex items-center gap-1">
                🌊 {post.metadata.wave_conditions.value}
              </span>
            )}
          </div>
        </div>

        {/* Author */}
        {showAuthor && post.metadata?.author && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <AuthorCard 
              author={post.metadata.author} 
              showBio={false}
              size="small"
            />
          </div>
        )}
      </div>
    </article>
  )
}