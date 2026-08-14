'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Award = {
  id: string
  title: string
  issuer: string
  category: string
  description: string
  pdfUrl: string
  accent: string
  svgIcon: React.ReactNode
}

const awards: Award[] = [
  {
    id: 'codepolitan',
    title: 'CodePolitan Certification',
    issuer: 'CodePolitan',
    category: 'Web & Programming',
    description:
      'Sertifikat kelulusan dan pemahaman fondasi pemrograman web modern serta pengembangan software dari CodePolitan.',
    pdfUrl: '/sertif/codepoliton.pdf',
    accent: '#7c5cff', // Indigo / Violet
    svgIcon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: 'dibimbing',
    title: 'Dibimbing.id Certification',
    issuer: 'Dibimbing.id',
    category: 'Digital Skill & Tech',
    description:
      'Sertifikat pelatihan intensif pengembangan keahlian digital, praktik industri, dan teknologi software dari Dibimbing.id.',
    pdfUrl: '/sertif/dibimbing.pdf',
    accent: '#00d4ff', // Cyan
    svgIcon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"
        />
      </svg>
    ),
  },
  {
    id: 'hacktiv',
    title: 'Hacktiv8 Certification',
    issuer: 'Hacktiv8',
    category: 'Coding Bootcamp',
    description:
      'Sertifikat kompetensi & pelatihan intensif software engineering dan pemrograman dari Hacktiv8 Coding Bootcamp.',
    pdfUrl: '/sertif/hacktiv.pdf',
    accent: '#f59e0b', // Amber
    svgIcon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
]

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.awards-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )

      gsap.fromTo(
        '.award-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.awards-grid',
            start: 'top 80%',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full bg-[#08080c] px-4 py-16 text-white sm:px-6 md:px-12 lg:px-20 lg:py-24"
    >
      {/* Ambient Radial Gradient Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #7c5cff 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative m-auto max-w-7xl 2xl:max-w-[90rem]">
        {/* Section Header */}
        <header className="awards-header text-center">
          <p className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/60 sm:text-sm">
            <span className="h-px w-6 sm:w-10 bg-white/40" />
            Penghargaan &amp; Sertifikasi
            <span className="h-px w-6 sm:w-10 bg-white/40" />
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-white sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
            Sertifikat &amp; Pencapaian.
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-center text-xs leading-relaxed text-white/70 sm:mt-4 sm:text-base md:text-lg">
            Bukti komitmen saya dalam terus belajar, mengasah keahlian, dan menguasai teknologi industri terbaru.
          </p>
        </header>

        {/* Awards Cards Grid */}
        <div className="awards-grid mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {awards.map((award) => (
            <div
              key={award.id}
              className="award-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 sm:rounded-3xl sm:p-7"
              style={{
                boxShadow: '0 12px 35px -15px rgba(0,0,0,0.6)',
              }}
            >
              {/* Radial glow on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${award.accent}25 0%, transparent 65%)`,
                }}
              />

              <div>
                {/* Top bar: Custom SVG icon container + Category badge */}
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 sm:h-12 sm:w-12 sm:rounded-2xl"
                    style={{
                      borderColor: `${award.accent}40`,
                      backgroundColor: `${award.accent}15`,
                      color: award.accent,
                    }}
                  >
                    {award.svgIcon}
                  </div>

                  <span
                    className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80 sm:text-[11px]"
                    style={{
                      borderColor: `${award.accent}35`,
                      backgroundColor: `${award.accent}10`,
                    }}
                  >
                    {award.category}
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 className="mt-5 text-lg font-bold text-white transition-colors duration-300 sm:text-xl md:text-2xl">
                  {award.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-white/50 sm:text-xs">
                  Diterbitkan oleh <span className="font-semibold text-white/85">{award.issuer}</span>
                </p>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-white/70 sm:mt-4 sm:text-sm">
                  {award.description}
                </p>
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-6 flex items-center gap-2.5 pt-4 border-t border-white/10 sm:mt-8 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setActivePdf({ url: award.pdfUrl, title: award.title })}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-white/15 hover:border-white/40 active:scale-95 sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Pratinjau PDF</span>
                </button>

                <a
                  href={award.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2.5 text-white/80 transition-all duration-300 hover:bg-white/15 hover:text-white active:scale-95"
                  title="Buka PDF di tab baru"
                  aria-label="Buka PDF di tab baru"
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Modal Viewer */}
      {activePdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md">
          <div className="relative flex h-[88vh] w-full max-w-5xl flex-col rounded-2xl border border-white/15 bg-[#0d0d12] shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="hidden sm:flex gap-1.5" aria-hidden>
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <h4 className="truncate text-xs font-semibold text-white sm:text-base">
                  {activePdf.title}
                </h4>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <a
                  href={activePdf.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white transition hover:bg-white/20 sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  Buka Tab Baru ↗
                </a>
                <button
                  type="button"
                  onClick={() => setActivePdf(null)}
                  className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg border border-white/15 bg-white/5 text-white/70 transition hover:bg-white/20 hover:text-white"
                  aria-label="Tutup PDF"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body / PDF iframe */}
            <div className="flex-1 bg-neutral-900">
              <iframe
                src={activePdf.url}
                className="h-full w-full border-none"
                title={activePdf.title}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
