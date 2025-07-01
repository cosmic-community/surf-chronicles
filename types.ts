// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug?: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
  bucket?: string;
  created_by?: string;
  modified_by?: string;
  thumbnail?: string;
}

// Author object type
export interface Author extends CosmicObject {
  type?: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    instagram_handle?: string;
    years_surfing?: number;
    home_break?: string;
  };
}

// Category object type
export interface Category extends CosmicObject {
  type?: 'categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
  };
}

// Wave condition and season types
export type WaveCondition = {
  key: 'small' | 'medium' | 'large' | 'xlarge';
  value: 'Small (1-3ft)' | 'Medium (3-6ft)' | 'Large (6-10ft)' | 'Extra Large (10ft+)';
};

export type BestSeason = {
  key: 'spring' | 'summer' | 'fall' | 'winter' | 'year_round';
  value: 'Spring' | 'Summer' | 'Fall' | 'Winter' | 'Year Round';
};

// Post object type
export interface Post extends CosmicObject {
  type?: 'posts';
  metadata: {
    title?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    surf_location?: string;
    wave_conditions?: WaveCondition;
    best_season?: BestSeason;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type_slug === 'posts' || obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type_slug === 'authors' || obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type_slug === 'categories' || obj.type === 'categories';
}

// Utility function for safe property access
export function getPostSummary(post: Post, maxLength: number = 150): string {
  const content = post.metadata?.content || '';
  const stripped = content.replace(/[#*\-]/g, '').trim();
  return stripped.length > maxLength 
    ? stripped.substring(0, maxLength) + '...'
    : stripped;
}

export function getAuthorDisplayName(author: Author): string {
  return author.metadata?.name || author.title || 'Unknown Author';
}

export function getCategoryDisplayName(category: Category): string {
  return category.metadata?.name || category.title || 'Uncategorized';
}