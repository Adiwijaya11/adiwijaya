'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const education = [
  { period: '2011 – 2017', school: 'SD Negeri 1 Sebatu' },
  { period: '2017 – 2020', school: 'SMP Negeri 2 Tegallalang' },
  { period: '2020 – 2023', school: 'SMA Negeri 1 Tegallalang' },
  { period: '2024 – Sekarang', school: 'INSTIKI (Institut Bisnis dan Teknologi Indonesia)' },
]

const interests = [
  'Mempelajari teknologi baru',
  'Dunia teknologi & inovasi',
  'Kecerdasan Buatan (AI)',
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.line-reveal',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.about-left',
            start: 'top 75%',
          },
        }
      )
      gsap.fromTo(
        '.edu-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.edu-list',
            start: 'top 70%',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex h-[100svh] flex-col overflow-hidden">
      <div className="m-auto flex h-full max-h-full w-full max-w-7xl flex-col justify-center gap-y-10 overflow-hidden px-6 py-10 sm:gap-y-12 md:gap-y-20 md:px-14 lg:flex-row lg:items-center lg:gap-24 lg:px-24 2xl:max-w-[90rem] 2xl:gap-28 2xl:px-32">
        {/* Intro */}
        <div className="about-left lg:w-1/2">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 sm:text-sm">
            <span className="h-px w-8 bg-white/40" />
            About
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:mt-6 md:text-5xl lg:text-6xl 2xl:text-7xl">
            <span className="block overflow-hidden">
              <span className="line-reveal block">Kenalan dulu,</span>
            </span>
            <span className="block overflow-hidden">
              <span className="line-reveal block">saya Adi Wijaya.</span>
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-white/70 sm:text-sm md:mt-6 md:text-base lg:mt-8 lg:max-w-2xl lg:text-lg 2xl:text-xl">
            Saya mahasiswa di INSTIKI (Institut Bisnis dan Teknologi Indonesia).
            Saya suka mempelajari teknologi dan hal-hal baru di dunia teknologi —
            dan sekarang lagi tertarik banget sama Kecerdasan Buatan (AI).
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5 md:mt-6 md:gap-2">
            {interests.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/25 px-3 py-1 text-[11px] text-white/90 md:px-4 md:py-1.5 md:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Pendidikan */}
        <div className="edu-list lg:w-1/2">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 sm:text-sm 2xl:text-base">
            <span className="h-px w-8 bg-white/40" />
            Pendidikan
          </p>
          <div className="mt-3 space-y-1.5 border-l border-white/15 pl-5 md:mt-6 md:space-y-3 md:pl-7 2xl:mt-8 2xl:space-y-4">
            {education.map((item) => (
              <div key={item.period} className="edu-item group relative">
                <span className="absolute -left-[1.44rem] top-2 h-2 w-2 rounded-full border border-white bg-black transition-colors duration-300 group-hover:bg-white" />
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2 transition-colors duration-300 group-hover:border-white/30 md:p-3">
                  <p className="font-mono text-[10px] text-white/50 md:text-xs 2xl:text-sm">
                    {item.period}
                  </p>
                  <h3 className="mt-0.5 text-xs font-semibold text-white md:text-base lg:text-lg 2xl:text-xl">
                    {item.school}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
