import { notFound } from 'next/navigation'
import { getAboutPage } from '@/lib/cosmic'
import { About } from '@/types'

// Markdown renderer component
function MarkdownContent({ content }: { content: string }) {
  // Simple markdown parsing for basic formatting
  const parseMarkdown = (text: string): string => {
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/^\- (.*$)/gim, '<li class="mb-2">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul class="list-disc pl-6 mb-4 space-y-2">$1</ul>')
      .replace(/\n\n/g, '</p><p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">')
      .replace(/^(?!<[h|l|u])(.+)$/gm, '<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">$1</p>')
  }

  return (
    <div 
      className="prose prose-lg max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  )
}

export default async function AboutPage() {
  const aboutData: About | null = await getAboutPage()

  if (!aboutData || !aboutData.metadata) {
    notFound()
  }

  const { metadata } = aboutData

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      {metadata.hero_image && (
        <div className="relative h-96 bg-gray-900 overflow-hidden">
          <img
            src={`${metadata.hero_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={metadata.page_title || 'About Surf Chronicles'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {metadata.page_title || aboutData.title}
              </h1>
              {metadata.introduction && (
                <p className="text-xl md:text-2xl max-w-3xl mx-auto px-4 leading-relaxed">
                  {metadata.introduction}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* If no hero image, show title here */}
        {!metadata.hero_image && (
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {metadata.page_title || aboutData.title}
            </h1>
            {metadata.introduction && (
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {metadata.introduction}
              </p>
            )}
          </div>
        )}

        {/* Main Content */}
        {metadata.main_content && (
          <div className="mb-12">
            <MarkdownContent content={metadata.main_content} />
          </div>
        )}

        {/* Mission & Values Section */}
        {(metadata.mission_statement || metadata.values) && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-12 transition-colors">
            <div className="grid md:grid-cols-2 gap-8">
              {metadata.mission_statement && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    🎯 Our Mission
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {metadata.mission_statement}
                  </p>
                </div>
              )}
              
              {metadata.values && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    💎 Our Values
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {metadata.values}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Section */}
        {metadata.contact_email && (
          <div className="text-center bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-8 transition-colors">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              📧 Get In Touch
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Have questions or want to collaborate? We'd love to hear from you!
            </p>
            <a
              href={`mailto:${metadata.contact_email}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata() {
  const aboutData: About | null = await getAboutPage()

  if (!aboutData || !aboutData.metadata) {
    return {
      title: 'About',
      description: 'Learn more about Surf Chronicles',
    }
  }

  return {
    title: aboutData.metadata.page_title || aboutData.title || 'About',
    description: aboutData.metadata.introduction || 'Learn more about Surf Chronicles and our mission to share the best of surf culture.',
  }
}