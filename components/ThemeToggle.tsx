'use client'

import { useThemeContext } from './ThemeProvider'
import { Theme } from '@/lib/theme'
import { useState, useRef, useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, mounted } = useThemeContext()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
    )
  }

  const themes: { value: Theme; label: string; icon: string }[] = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' }
  ]

  const currentTheme = theme || 'system'
  const currentThemeData = themes.find(t => t.value === currentTheme) || themes[2]

  const handleThemeSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme)
    setIsOpen(false)
  }

  const getCurrentIcon = () => {
    if (theme === 'system') {
      return '💻'
    }
    return resolvedTheme === 'dark' ? '🌙' : '☀️'
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        title={`Current theme: ${currentThemeData.label}`}
        aria-label={`Theme selector. Current theme: ${currentThemeData.label}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">{getCurrentIcon()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-1" role="listbox">
            {themes.map((themeOption) => (
              <button
                key={themeOption.value}
                onClick={() => handleThemeSelect(themeOption.value)}
                className={`w-full flex items-center px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  currentTheme === themeOption.value 
                    ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                role="option"
                aria-selected={currentTheme === themeOption.value}
              >
                <span className="mr-2">{themeOption.icon}</span>
                <span>{themeOption.label}</span>
                {currentTheme === themeOption.value && (
                  <span className="ml-auto text-blue-600 dark:text-blue-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}