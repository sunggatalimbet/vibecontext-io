/**
 * @file: animated-bulb-logo.tsx
 * @description: Simple animated lightbulb logo component using CSS animations
 * @dependencies: lucide-react
 * @created: 2025-01-06
 */

'use client'

import { Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnimatedBulbLogoProps {
  size?: number | 'small' | 'medium' | 'large'
  className?: string
}

const AnimatedBulbLogo: React.FC<AnimatedBulbLogoProps> = ({
  size = 'medium',
  className,
}) => {
  // Convert size to pixel values
  const getPixelSize = () => {
    if (typeof size === 'number') return size
    switch (size) {
      case 'small':
        return 24
      case 'large':
        return 96
      default:
        return 48
    }
  }

  const pixelSize = getPixelSize()

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center',
        'animate-pulse hover:animate-bounce',
        'transition-all duration-300 ease-in-out',
        className
      )}
      style={{ width: pixelSize, height: pixelSize }}
    >
      <Lightbulb
        size={pixelSize}
        className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
        fill="currentColor"
      />
    </div>
  )
}

export default AnimatedBulbLogo
