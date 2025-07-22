'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface DealerLogoProps {
  width?: number
  height?: number
  className?: string
}

export function DealerLogo({ width = 200, height = 60, className = '' }: DealerLogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height }}
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Image
      src="/Logo-Dealerspace.svg"
      alt="DealerSpace"
      width={width}
      height={height}
      className={`${className} ${isDark ? 'filter invert brightness-0 contrast-100' : ''}`}
      priority
    />
  )
}