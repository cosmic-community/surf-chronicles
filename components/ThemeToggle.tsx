'use client'

import { useThemeContext } from './ThemeProvider'
import { Theme } from '@/lib/theme'

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, mounted } = useThemeContext()

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
    )
  }

  const handleThemeChange = () => {
    const themes: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  const getIcon = () => {
    if (theme === 'system') {
      return '💻'
    }
    return resolvedTheme === 'dark' ? '🌙' : '☀️'
  }

  const getLabel = () => {
    if (theme === 'system') {
      return 'System theme'
    }
    return resolvedTheme === 'dark' ? 'Dark mode' : 'Light mode'
  }

  return (
    <button
      onClick={handleThemeChange}
      className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      title={getLabel()}
      aria-label={getLabel()}
    >
      <span className="text-lg">{getIcon()}</span>
    </button>
  )
}