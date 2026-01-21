'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    // Store globally so we can control it from other components
    if (typeof window !== 'undefined') {
      (window as any).__lenis = lenis
    }

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      if (typeof window !== 'undefined') {
        (window as any).__lenis = null
      }
    }
  }, [])

  return <>{children}</>
}
