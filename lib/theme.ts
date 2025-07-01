'use client'

export type Theme = 'light' | 'dark' | 'system'

export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system'
  return (localStorage.getItem('theme') as Theme) || 'system'
}

export const setTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('theme', theme)
}

export const applyTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return
  
  const root = document.documentElement
  
  if (theme === 'system') {
    const systemTheme = getSystemTheme()
    root.classList.toggle('dark', systemTheme === 'dark')
  } else {
    root.classList.toggle('dark', theme === 'dark')
  }
}