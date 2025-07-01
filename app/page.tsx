import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories()
  ])

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredPost && <Hero post={featuredPost} />}
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Posts */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
            </div>
            
            {recentPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {recentPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No posts available yet.</p>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-80">
            <CategoryFilter categories={categories} />
          </div>
        </div>
      </div>
    </div>
  )
}