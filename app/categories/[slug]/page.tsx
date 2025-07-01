// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  
  const description = category.metadata?.description || `Posts in the ${category.title} category`

  return {
    title: `${category.title} | Surf Chronicles`,
    description,
    openGraph: {
      title: `${category.title} | Surf Chronicles`,
      description,
      type: 'website',
      ...(category.metadata?.hero_image && {
        images: [{
          url: `${category.metadata.hero_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: category.title,
        }],
      }),
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {category.metadata?.hero_image && (
        <div className="relative h-96 lg:h-[500px] mb-12 overflow-hidden">
          <img
            src={`${category.metadata.hero_image.imgix_url}?w=1920&h=1000&fit=crop&auto=format,compress`}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
              <CategoryBadge category={category} size="large" />
              <h1 className="text-4xl lg:text-6xl font-bold text-white mt-4 mb-4">
                {category.title}
              </h1>
              {category.metadata?.description && (
                <p className="text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed">
                  {category.metadata.description}
                </p>
              )}
              <div className="mt-6 text-white/80">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header (when no hero image) */}
        {!category.metadata?.hero_image && (
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <CategoryBadge category={category} size="large" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {category.title}
            </h1>
            
            {category.metadata?.description && (
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                {category.metadata.description}
              </p>
            )}
            
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏄‍♂️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                This category doesn't have any posts yet. Check back soon for new content!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}