'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

/**
 * Cinematic counter preloader.
 * 0 → 100 with a big counts-up percentage, progress bar + wordmark,
 * then the screen lifts away to reveal the content. Mounted once in layout.
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    // Lock scroll while loading
    document.body.style.overflow = 'hidden'

    const counter = root.querySelector<HTMLElement>('[data-counter]')
    const bar = root.querySelector<HTMLElement>('[data-bar]')
    const wordmark = root.querySelector<HTMLElement>('[data-wordmark]')
    const sub = root.querySelector<HTMLElement>('[data-sub]')
    if (!counter || !bar) return

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        setDone(true)
      },
    })

    const ctx = gsap.context(() => {
      // Wordmark + sub slide in
      tl.fromTo(
        [wordmark, sub],
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.12 }
      )
      // Progress bar grows as counter counts
      tl.to(bar, { width: '100%', duration: 1.8, ease: 'power2.inOut' }, '<')
      tl.to(counter, { textContent: 100, duration: 1.8, ease: 'power2.inOut', snap: { textContent: 1 } }, '<')

      // Short breathing pause
      tl.to({}, { duration: 0.35 })

      // The counter blinks out, then the whole screen lifts up smoothly
      tl.to('.pre-float', { yPercent: -8, opacity: 0, duration: 0.5, ease: 'power2.in' })
      tl.to(root, {
        yPercent: -100,
        duration: 1.0,
        ease: 'power4.inOut',
        delay: 0.1,
      })
    }, root)

    return () => {
      ctx.revert()
      document.body.style.overflow = ''
    }
  }, [])

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black will-change-transform"
      aria-hidden
    >
      <div className="pre-float flex flex-col items-center pb-4">
        {/* Wordmark */}
        <div className="overflow-hidden">
          <p
            data-wordmark
            className="font-mono text-xs uppercase tracking-[0.5em] text-white/50"
          >
            Adi Wijaya
          </p>
        </div>

        {/* Big counter */}
        <div className="overflow-hidden">
          <h1
            data-counter
            className="bg-gradient-to-b from-white to-white/20 bg-clip-text text-8xl font-bold leading-none tracking-tighter text-transparent md:text-[10rem]"
          >
            0
          </h1>
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-px w-56 overflow-hidden bg-white/15 md:w-72">
          <div data-bar className="h-full w-0 bg-white" />
        </div>

        {/* Sub */}
        <div className="mt-4 overflow-hidden">
          <p data-sub className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/40">
            Crafting experience
          </p>
        </div>
      </div>
    </div>
  )
}
