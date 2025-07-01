import Link from 'next/link'
import { getAllCategories } from '@/lib/cosmic'

export default async function Header() {
  const categories = await getAllCategories()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-bold text-primary-500 hover:text-primary-600 transition-colors"
            >
              🏄‍♂️ Surf Chronicles
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-gray-900 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="text-gray-600 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <Link
              href="/"
              className="text-gray-900 hover:text-primary-500 block px-3 py-2 text-base font-medium"
            >
              Home
            </Link>
            
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-gray-600 hover:text-primary-500 block px-3 py-2 text-base font-medium"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}