import Link from 'next/link'
import { Author, getAuthorDisplayName } from '@/types'

interface AuthorCardProps {
  author: Author
  showBio?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'light'
}

export default function AuthorCard({ 
  author, 
  showBio = true, 
  size = 'medium',
  variant = 'default'
}: AuthorCardProps) {
  const displayName = getAuthorDisplayName(author)
  
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12', 
    large: 'w-16 h-16'
  }

  const textClasses = {
    default: 'text-gray-900 dark:text-white',
    light: 'text-white'
  }

  const subTextClasses = {
    default: 'text-gray-600 dark:text-gray-300',
    light: 'text-gray-200'
  }

  return (
    <div className="flex items-start gap-3">
      {/* Author Photo */}
      {author.metadata?.profile_photo && (
        <Link href={`/authors/${author.slug}`}>
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
            alt={displayName}
            width={48}
            height={48}
            className={`${sizeClasses[size]} rounded-full object-cover hover:opacity-80 transition-opacity`}
          />
        </Link>
      )}
      
      {/* Author Info */}
      <div className="flex-1 min-w-0">
        <Link 
          href={`/authors/${author.slug}`}
          className={`font-medium ${textClasses[variant]} hover:text-primary-500 dark:hover:text-primary-400 transition-colors`}
        >
          {displayName}
        </Link>
        
        {showBio && author.metadata?.bio && (
          <p className={`text-sm ${subTextClasses[variant]} mt-1 line-clamp-2`}>
            {author.metadata.bio}
          </p>
        )}
        
        {!showBio && (
          <div className={`text-sm ${subTextClasses[variant]} space-y-1`}>
            {author.metadata?.home_break && (
              <div>📍 {author.metadata.home_break}</div>
            )}
            {author.metadata?.years_surfing && (
              <div>🏄‍♂️ {author.metadata.years_surfing} years surfing</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}