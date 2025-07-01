// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { getAuthorDisplayName } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }
  
  const displayName = getAuthorDisplayName(author)
  const bio = author.metadata?.bio || `Posts by ${displayName}`

  return {
    title: `${displayName} | Surf Chronicles`,
    description: bio,
    openGraph: {
      title: `${displayName} | Surf Chronicles`,
      description: bio,
      type: 'profile',
      images: author.metadata?.profile_photo ? [
        {
          url: `${author.metadata.profile_photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`,
          width: 400,
          height: 400,
          alt: displayName,
        }
      ] : [],
    },
  }
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  
  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const displayName = getAuthorDisplayName(author)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Author Header */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Author Photo */}
          {author.metadata?.profile_photo && (
            <div className="flex-shrink-0">
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={displayName}
                width={150}
                height={150}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
              />
            </div>
          )}
          
          {/* Author Info */}
          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {displayName}
            </h1>
            
            {author.metadata?.bio && (
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {author.metadata.bio}
              </p>
            )}
            
            {/* Author Stats */}
            <div className="flex flex-wrap gap-6 text-sm">
              {author.metadata?.years_surfing && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏄‍♂️</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {author.metadata.years_surfing} years surfing
                  </span>
                </div>
              )}
              
              {author.metadata?.home_break && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {author.metadata.home_break}
                  </span>
                </div>
              )}
              
              {author.metadata?.instagram_handle && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📸</span>
                  <a 
                    href={`https://instagram.com/${author.metadata.instagram_handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                  >
                    {author.metadata.instagram_handle}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Posts by {displayName}
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
            ({posts.length})
          </span>
        </h2>
        
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} showAuthor={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {displayName} hasn't published any posts yet. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}