// components/SeasonBadge.tsx
import { BestSeason } from '@/types'

interface SeasonBadgeProps {
  season: BestSeason
}

export default function SeasonBadge({ season }: SeasonBadgeProps) {
  const getSeasonColor = (seasonKey: string) => {
    switch (seasonKey) {
      case 'spring':
        return 'bg-green-100 text-green-800'
      case 'summer':
        return 'bg-yellow-100 text-yellow-800'
      case 'fall':
        return 'bg-orange-100 text-orange-800'
      case 'winter':
        return 'bg-blue-100 text-blue-800'
      case 'year_round':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeasonIcon = (seasonKey: string) => {
    switch (seasonKey) {
      case 'spring':
        return '🌱'
      case 'summer':
        return '☀️'
      case 'fall':
        return '🍂'
      case 'winter':
        return '❄️'
      case 'year_round':
        return '🌍'
      default:
        return '📅'
    }
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${getSeasonColor(season.key)}`}>
      <span>{getSeasonIcon(season.key)}</span>
      {season.value}
    </span>
  )
}