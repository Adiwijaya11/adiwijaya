'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroSection() {
  const scopeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scopeRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Floating geometric shapes: drift + rotate with randomized timing
      gsap.utils.toArray<HTMLElement>('[data-shape]').forEach((shape) => {
        gsap.to(shape, {
          y: `random(-40, 40)`,
          x: `random(-30, 30)`,
          rotate: `random(-180, 180)`,
          duration: 'random(8, 16)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 'random(0, 2)',
        })
      })

      // Heading masuk halus: fade + naik perlahan, berurutan per-baris
      gsap.fromTo(
        '[data-hero-line]',
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.15,
        }
      )
      // Supporting elements fade in softly
      gsap.fromTo(
        '[data-hero-fade]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.15,
          delay: 0.6,
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={scopeRef}
      className="relative flex h-[100svh] flex-col items-center justify-center overflow-hidden p-6 text-center md:p-10 lg:p-12 xl:p-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/30 via-secondary/10 to-background opacity-80" />

      {/* Floating geometric shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Ring besar */}
        <span
          data-shape
          className="absolute left-[6%] top-[18%] h-16 w-16 rounded-full border border-primary/30 sm:h-24 sm:w-24 lg:left-[10%] lg:h-32 lg:w-32"
        />
        {/* Dot kecil */}
        <span
          data-shape
          className="absolute right-[12%] top-[20%] h-2.5 w-2.5 rounded-full bg-secondary/60 sm:h-3.5 sm:w-3.5 lg:right-[16%]"
        />
        {/* Kotak gradient */}
        <span
          data-shape
          className="absolute right-[8%] top-[55%] h-12 w-12 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/20 sm:h-16 sm:w-16 lg:right-[12%] lg:h-20 lg:w-20"
        />
        {/* Ring kecil */}
        <span
          data-shape
          className="absolute left-[10%] top-[60%] h-8 w-8 rounded-full border border-secondary/25 sm:h-10 sm:w-10 lg:left-[15%] lg:h-14 lg:w-14"
        />
        {/* Dot ungu */}
        <span
          data-shape
          className="absolute bottom-[24%] right-[28%] h-2 w-2 rounded-full bg-primary/70 sm:h-3 sm:w-3 lg:bottom-[26%] lg:right-[30%]"
        />
        {/* Ring tengah */}
        <span
          data-shape
          className="absolute bottom-[15%] left-[28%] h-10 w-10 rounded-full border border-primary/20 sm:h-14 sm:w-14 lg:left-[32%] lg:h-16 lg:w-16"
        />
      </div>

      <div className="relative z-10">
        <p
          data-hero-fade
          className="font-mono text-xs uppercase tracking-[0.3em] text-secondary sm:text-sm md:text-base"
        >
          Creative Developer
        </p>

        <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:mt-5 md:text-6xl lg:text-5xl xl:text-7xl">
          <span className="block overflow-hidden">
            <span data-hero-line className="block">Hi, I&apos;m</span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-hero-line
              className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Adi Wijaya.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block">I craft digital</span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block">experiences that</span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block">feel alive.</span>
          </span>
        </h1>

        <p
          data-hero-fade
          className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base md:mt-6 md:max-w-2xl md:text-lg"
        >
          Mengubah ide menjadi pengalaman digital yang halus, cepat, dan
          berkesan — dibangun dengan ketelitian pada setiap detail interaksi.
        </p>

        <div
          data-hero-fade
          className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-8 md:gap-4"
        >
          <a
            href="#projects"
            className="w-full rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:bg-primary/90 sm:w-auto md:text-base"
          >
            View Projects
          </a>
          <a
            href="/cv/CV_I%20Made%20Adi%20Wijaya.pdf"
            download="CV_I Made Adi Wijaya.pdf"
            className="w-full rounded-full border border-text-secondary/40 px-8 py-3 text-sm font-semibold text-text-primary transition-all duration-300 hover:scale-105 hover:border-secondary hover:text-secondary sm:w-auto md:text-base"
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  )
}
