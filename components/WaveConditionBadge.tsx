import { WaveCondition } from '@/types'

interface WaveConditionBadgeProps {
  condition: WaveCondition
}

export default function WaveConditionBadge({ condition }: WaveConditionBadgeProps) {
  const getConditionColor = (key: string) => {
    switch (key) {
      case 'small':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-blue-100 text-blue-800'
      case 'large':
        return 'bg-orange-100 text-orange-800'
      case 'xlarge':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConditionColor(condition.key)}`}>
      🌊 {condition.value}
    </span>
  )
}