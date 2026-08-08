'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Technology = {
  name: string
  icon?: string // Optional icon for the technology
}

const technologies: Technology[] = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'TailwindCSS' },
  { name: 'JavaScript' },
  { name: 'React' },
  { name: 'Next.js' },
  { name: 'PHP' },
  { name: 'Laravel' },
  { name: 'Flutter' },
  { name: 'Dart' },
  { name: 'Java' },
  { name: 'Kotlin' },
  { name: 'Bootstrap' },
  { name: 'MySQL' },
  { name: 'Firebase' },
]

/**
 * Technology stays pinned on screen, then the Contact overlay
 * slides in from the LEFT and covers it — same pinned-curtain
 * pattern as the portfolio flow.
 */
export default function TechnologyStack({ overlay }: { overlay?: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const ctx = gsap.context(() => {
      // Tech chips entrance animation (on first scroll into view)
      gsap.fromTo(
        '.tech-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrap,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Contact curtain starts off-screen LEFT, slides over the pinned tech.
      // Its own LONG pin (end = 600% => ~6 viewports of scroll) makes the
      // technology -> contact transition take roughly three times the scroll of
      // the project stage, without changing the travel speed of the curtain.
      const curtainSt = ScrollTrigger.create({
        trigger: wrap,
        start: 'top top',
        end: '+=600%',
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onRefresh: (self: ScrollTrigger) => publishContact(self),
      })

      gsap.fromTo(
        '.contact-curtain',
        { xPercent: -100 },
        {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: '+=600%',
            scrub: true,
            // no pin here — the dedicated trigger above owns the pin
          },
        }
      )

      // Focus: as the curtain covers the tech, fade the ENTIRE tech section to
      // near-invisible. That way no leftover chips/layout can ever show on the
      // left once the contact panel is fully open — the contact is the focus.
      gsap.fromTo(
        '#technology',
        { autoAlpha: 1, scale: 1 },
        {
          autoAlpha: 0,
          scale: 0.985,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: '+=600%',
            scrub: true,
          },
        }
      )

      function publishContact(st: ScrollTrigger) {
        ;(window as any).__portfolioScroll = {
          ...((window as any).__portfolioScroll || {}),
          contact: st.end,
        }
      }
      publishContact(curtainSt)
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    /* Full-viewport pinned unit: the tech section AND the sliding curtain live
       inside one overflow-hidden box, so nothing can leak out the sides. */
    <div ref={wrapRef} className="relative h-[100svh] w-full overflow-hidden">
      <section
        id="technology"
        className="absolute inset-0 flex items-center justify-center bg-[#0d0d0d] px-4 py-16 text-white md:px-12 lg:px-20"
      >
        <div className="tech-content z-10 max-w-4xl text-center">
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Teknologi yang saya gunakan.
          </h2>
          <p className="mt-4 text-lg text-white/70 md:text-xl">
            Membangun solusi inovatif dengan beragam teknologi modern.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="tech-item rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover:border-primary hover:text-primary"
              >
                {tech.icon && (
                  <span className="mr-2" role="img" aria-label={tech.name}>
                    {tech.icon}
                  </span>
                )}
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact curtain — pinned over Technology, slides in from the left */}
      {overlay && (
        <div className="contact-curtain absolute left-0 top-0 z-30 h-full w-full overflow-hidden">
          {overlay}
        </div>
      )}
    </div>
  )
}
