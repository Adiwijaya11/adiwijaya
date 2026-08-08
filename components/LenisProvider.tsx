'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({
  children,
}: {
  children: ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Expose for cross-component navigation (Navbar scrollTo sections)
    window.__lenis = lenis

    return () => {
      if (window.__lenis === lenis) delete window.__lenis
      lenis.destroy()
      gsap.ticker.lagSmoothing(0) // reset to default
    }
  }, [])

  return <>{children}</>
}
