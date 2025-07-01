'use client'

import { useState, useEffect } from 'react'
import { Theme, getTheme, setTheme, applyTheme, getSystemTheme } from '@/lib/theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = getTheme()
    setThemeState(savedTheme)
    applyTheme(savedTheme)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, mounted])

  const updateTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

  return {
    theme,
    resolvedTheme,
    setTheme: updateTheme,
    mounted
  }
}