import Link from 'next/link'
import { Post, getPostSummary } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorCard from '@/components/AuthorCard'

interface HeroProps {
  post: Post
}

export default function Hero({ post }: HeroProps) {
  const summary = getPostSummary(post, 200)

  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Background Image */}
      {post.metadata?.featured_image && (
        <div className="absolute inset-0">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1920&h=800&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1920}
            height={800}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-5xl">
          {/* Category */}
          {post.metadata?.category && (
            <div className="mb-6">
              <CategoryBadge category={post.metadata.category} />
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
            {post.title}
          </h1>

          {/* Summary */}
          {summary && (
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              {summary}
            </p>
          )}

          {/* Author & CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {post.metadata?.author && (
              <AuthorCard 
                author={post.metadata.author} 
                showBio={false}
                variant="light"
              />
            )}
            
            <Link
              href={`/posts/${post.slug}`}
              className="btn-primary inline-flex items-center gap-2 px-6 py-3"
            >
              Read Article
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}