'use client'

import { useEffect, useRef } from 'react'

export default function GoldenMouseLight() {
  const spotlightRef = useRef(null)

  useEffect(() => {
    const spotlight = spotlightRef.current
    if (!spotlight) return

    const moveSpotlight = (e) => {
      spotlight.style.left = `${e.clientX}px`
      spotlight.style.top = `${e.clientY}px`
    }

    window.addEventListener('mousemove', moveSpotlight)
    return () => window.removeEventListener('mousemove', moveSpotlight)
  }, [])

  return (
    <div
      ref={spotlightRef}
      className="hidden md:block pointer-events-none fixed z-[9999] h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-transform duration-100 ease-out"
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(0,0,0,0) 60%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}
