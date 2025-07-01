import Link from 'next/link'
import { getAllCategories } from '@/lib/cosmic'
import ClientHeader from './ClientHeader'

interface Category {
  id: string
  title: string
  slug: string
}

export default async function Header() {
  let categories: Category[] = []
  
  try {
    categories = await getAllCategories()
  } catch (error) {
    console.error('Error fetching categories:', error)
    categories = []
  }

  return <ClientHeader categories={categories} />
}