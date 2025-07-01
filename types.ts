// types.ts

// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type?: string; // Added type property
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
    hero_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// About page object type
export interface About extends CosmicObject {
  type?: 'about';
  metadata: {
    page_title?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    introduction?: string;
    main_content?: string;
    mission_statement?: string;
    values?: string;
    contact_email?: string;
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
  return obj.type === 'posts' || obj.type_slug === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors' || obj.type_slug === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories' || obj.type_slug === 'categories';
}

export function isAbout(obj: CosmicObject): obj is About {
  return obj.type === 'about' || obj.type_slug === 'about';
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