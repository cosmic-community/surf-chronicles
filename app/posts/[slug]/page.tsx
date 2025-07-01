// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { getPostSummary } from '@/types'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'
import WaveConditionBadge from '@/components/WaveConditionBadge'
import SeasonBadge from '@/components/SeasonBadge'
import RelatedPosts from '@/components/RelatedPosts'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  const summary = getPostSummary(post, 160)
  const featuredImage = post.metadata?.featured_image?.imgix_url

  return {
    title: post.title,
    description: summary,
    openGraph: {
      title: post.title,
      description: summary,
      type: 'article',
      images: featuredImage ? [
        {
          url: `${featuredImage}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: summary,
      images: featuredImage ? [`${featuredImage}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const allPosts = await getAllPosts()
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.metadata?.category?.id === post.metadata?.category?.id)
    .slice(0, 3)

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          {post.metadata?.category && (
            <CategoryBadge category={post.metadata.category} />
          )}
          
          {post.metadata?.wave_conditions && (
            <WaveConditionBadge condition={post.metadata.wave_conditions} />
          )}
          
          {post.metadata?.best_season && (
            <SeasonBadge season={post.metadata.best_season} />
          )}
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
          {post.title}
        </h1>
        
        {post.metadata?.surf_location && (
          <p className="text-lg text-gray-600 mb-6">
            📍 {post.metadata.surf_location}
          </p>
        )}
        
        {post.metadata?.author && (
          <AuthorCard author={post.metadata.author} showBio={false} />
        )}
      </header>

      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <div className="mb-8">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      {post.metadata?.content && (
        <div 
          className="prose-surf"
          dangerouslySetInnerHTML={{
            __html: post.metadata.content
              .replace(/^# /gm, '## ')
              .replace(/\n/g, '<br />')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/### (.*?)(<br \/>|$)/g, '<h3>$1</h3>')
              .replace(/## (.*?)(<br \/>|$)/g, '<h2>$1</h2>')
              .replace(/- (.*?)(<br \/>|$)/g, '<li>$1</li>')
              .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
              .replace(/<br \/><br \/>/g, '</p><p>')
              .replace(/^(?!<[h|u|l])/gm, '<p>')
              .replace(/(<br \/>)$/gm, '</p>')
              .replace(/<p><\/p>/g, '')
          }}
        />
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-200">
          <RelatedPosts posts={relatedPosts} />
        </div>
      )}
    </article>
  )
}