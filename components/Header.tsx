'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getAllCategories } from '@/lib/cosmic'
import ThemeToggle from './ThemeToggle'

interface Category {
  id: string
  title: string
  slug: string
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setCategories([])
      }
    }
    
    fetchCategories()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-bold text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              onClick={closeMenu}
            >
              🏄‍♂️ Surf Chronicles
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {category.title}
                </Link>
              ))}

              <Link
                href="/about"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </Link>
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="bg-white dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Home
            </Link>
            
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                onClick={closeMenu}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                {category.title}
              </Link>
            ))}

            <Link
              href="/about"
              onClick={closeMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}