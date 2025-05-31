'use client'

import React from 'react'
import AnimatedBulb from './animated-bulb'

interface AnimatedBulbLogoProps {
  size?: number | 'small' | 'medium' | 'large'
}

const AnimatedBulbLogo: React.FC<AnimatedBulbLogoProps> = ({
  size = 'medium',
}) => {
  // Convert numeric sizes to the appropriate size category
  const getSizeCategory = () => {
    if (typeof size === 'string') return size
    if (size <= 24) return 'small'
    if (size >= 600) return 'large'
    return 'medium'
  }

  return <AnimatedBulb size={getSizeCategory()} />
}

export default AnimatedBulbLogo
