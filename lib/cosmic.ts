import { createBucketClient } from '@cosmicjs/sdk'
import { Post, Author, Category, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all posts with depth for related objects
export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching posts:', error)
    throw new Error('Failed to fetch posts')
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'posts', 
        slug 
      })
      .depth(1)
    
    const post = response.object as Post
    
    if (!post || !post.metadata) {
      return null
    }
    
    return post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching post:', error)
    throw new Error('Failed to fetch post')
  }
}

// Fetch posts by category
export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.category': categoryId 
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching posts by category:', error)
    throw new Error('Failed to fetch posts by category')
  }
}

// Fetch all authors
export async function getAllAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Author[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching authors:', error)
    throw new Error('Failed to fetch authors')
  }
}

// Fetch single author by slug
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'authors', 
        slug 
      })
      .depth(1)
    
    const author = response.object as Author
    
    if (!author || !author.metadata) {
      return null
    }
    
    return author
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching author:', error)
    throw new Error('Failed to fetch author')
  }
}

// Fetch posts by author
export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.author': authorId 
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching posts by author:', error)
    throw new Error('Failed to fetch posts by author')
  }
}

// Fetch all categories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }
}

// Fetch single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'categories', 
        slug 
      })
      .depth(1)
    
    const category = response.object as Category
    
    if (!category || !category.metadata) {
      return null
    }
    
    return category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching category:', error)
    throw new Error('Failed to fetch category')
  }
}