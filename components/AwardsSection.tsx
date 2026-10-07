'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { awardsData } from '@/data/awards'
import AwardIcon from '@/components/AwardIcon'
import PdfModal from '@/components/PdfModal'

gsap.registerPlugin(ScrollTrigger)

type FilterKey = 'all' | 'ai' | 'engineering' | 'bootcamp'

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<FilterKey>('all')
  const [activePdf, setActivePdf] = useState<{ url: string; title: string; issuer?: string; accent?: string } | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleFilterChange = (key: FilterKey) => {
    setFilter(key)
    setCurrentIndex(0)
  }

  const filteredAwards = awardsData.filter((item) => {
    if (filter === 'all') return true
    if (filter === 'ai') return item.category === 'ai'
    if (filter === 'engineering') return item.category === 'engineering'
    if (filter === 'bootcamp') return item.category === 'bootcamp'
    return true
  })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.awards-header',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )

      gsap.fromTo(
        '.awards-cards-container',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredAwards.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredAwards.length) % filteredAwards.length)
  }

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full bg-[#08080c] px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-14 xl:px-20 text-white flex flex-col justify-between overflow-hidden"
    >
      {/* Ambient background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/4 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #7c5cff 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] rounded-full opacity-15 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl flex flex-col flex-1 justify-between my-auto">
        {/* Top Header & Controls */}
        <div className="awards-header shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/60">
                <span className="h-px w-6 sm:w-8 bg-primary" />
                Penghargaan &amp; Sertifikasi
              </p>
              <h2 className="mt-1.5 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Sertifikat &amp; Kredensial Resmi.
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-white/65 max-w-2xl leading-relaxed">
                6 kredensial terverifikasi dari IBM SkillsBuild, Hacktiv8, CodePolitan, dan Dibimbing.
              </p>
            </div>

            {/* Link to Dedicated Page */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/awards"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/15 hover:border-white/35 active:scale-95"
              >
                <span>Halaman Penuh</span>
                <span className="text-primary transition-transform duration-300 group-hover:translate-x-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
            {(
              [
                { key: 'all', label: 'Semua (6)' },
                { key: 'ai', label: 'AI & LLM (3)' },
                { key: 'engineering', label: 'Web Dev (1)' },
                { key: 'bootcamp', label: 'Bootcamp & Tech (2)' },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => handleFilterChange(item.key)}
                className={`rounded-full px-3 py-1 text-[11px] sm:text-xs font-medium transition-all ${
                  filter === item.key
                    ? 'bg-white text-black font-semibold shadow-md shadow-white/10'
                    : 'border border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop View: Grid (Fits within 100svh with compact cards) */}
        <div className="awards-cards-container my-3 sm:my-4 flex-1 flex flex-col justify-center">
          {/* Large screens grid: 3 columns x 2 rows (or filtered items) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-4">
            {filteredAwards.map((award) => (
              <div
                key={award.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 xl:p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-lg"
              >
                {/* Glow accent */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${award.accent}25 0%, transparent 65%)`,
                  }}
                />

                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="flex h-9 w-9 xl:h-10 xl:w-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105"
                      style={{
                        borderColor: `${award.accent}40`,
                        backgroundColor: `${award.accent}15`,
                        color: award.accent,
                      }}
                    >
                      <AwardIcon type={award.iconType} className="h-4 w-4 xl:h-5 xl:w-5" />
                    </div>

                    <span
                      className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/80"
                      style={{
                        borderColor: `${award.accent}35`,
                        backgroundColor: `${award.accent}10`,
                      }}
                    >
                      {award.categoryLabel}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="mt-3 text-sm xl:text-base font-bold text-white leading-snug line-clamp-1">
                    {award.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-white/50">
                    Diterbitkan oleh <span className="font-semibold text-white/80">{award.issuer}</span>
                  </p>

                  {/* Description */}
                  <p className="mt-2 text-[11px] xl:text-xs leading-relaxed text-white/65 line-clamp-2">
                    {award.description}
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="mt-3.5 flex items-center gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() =>
                      setActivePdf({
                        url: award.pdfUrl,
                        title: award.title,
                        issuer: award.issuer,
                        accent: award.accent,
                      })
                    }
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 py-1.5 px-3 text-xs font-semibold text-white transition hover:bg-white/15 hover:border-white/40 active:scale-95"
                  >
                    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Pratinjau PDF</span>
                  </button>

                  <a
                    href={award.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-1.5 text-white/70 transition hover:bg-white/15 hover:text-white"
                    title="Buka PDF di tab baru"
                    aria-label="Buka PDF di tab baru"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile & Small Screens: Interactive Card Carousel (Fits strictly in 100svh) */}
          <div className="md:hidden flex flex-col justify-center">
            {filteredAwards.length > 0 && (
              <div className="relative rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-xl">
                {/* Glow accent */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 opacity-40"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${filteredAwards[currentIndex].accent}35 0%, transparent 65%)`,
                  }}
                />

                <div className="relative">
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: `${filteredAwards[currentIndex].accent}40`,
                        backgroundColor: `${filteredAwards[currentIndex].accent}15`,
                        color: filteredAwards[currentIndex].accent,
                      }}
                    >
                      <AwardIcon type={filteredAwards[currentIndex].iconType} className="h-5 w-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-white/45">
                        {currentIndex + 1} / {filteredAwards.length}
                      </span>
                      <span
                        className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/80"
                        style={{
                          borderColor: `${filteredAwards[currentIndex].accent}35`,
                          backgroundColor: `${filteredAwards[currentIndex].accent}10`,
                        }}
                      >
                        {filteredAwards[currentIndex].categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="mt-3 text-base font-bold text-white leading-snug">
                    {filteredAwards[currentIndex].title}
                  </h3>
                  <p className="mt-0.5 text-xs text-white/50">
                    Diterbitkan oleh{' '}
                    <span className="font-semibold text-white/85">
                      {filteredAwards[currentIndex].issuer}
                    </span>
                  </p>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-white/70 line-clamp-3">
                    {filteredAwards[currentIndex].description}
                  </p>

                  {/* Skills tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {filteredAwards[currentIndex].skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-white/[0.06] border border-white/10 px-2 py-0.5 text-[10px] text-white/75"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="mt-4 flex items-center gap-2 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() =>
                        setActivePdf({
                          url: filteredAwards[currentIndex].pdfUrl,
                          title: filteredAwards[currentIndex].title,
                          issuer: filteredAwards[currentIndex].issuer,
                          accent: filteredAwards[currentIndex].accent,
                        })
                      }
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/25 bg-white/10 py-2 px-3 text-xs font-semibold text-white transition active:scale-95"
                    >
                      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Lihat PDF</span>
                    </button>

                    <a
                      href={filteredAwards[currentIndex].pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 p-2 text-white/80 transition active:scale-95"
                      aria-label="Buka dokumen PDF di tab baru"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Carousel navigation controls on mobile */}
            <div className="mt-3 flex items-center justify-between px-1">
              <button
                type="button"
                onClick={prevSlide}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 active:scale-90"
                aria-label="Sertifikat sebelumnya"
              >
                ←
              </button>

              <div className="flex items-center gap-1.5">
                {filteredAwards.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentIndex === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/30'
                    }`}
                    aria-label={`Pindah ke slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 active:scale-90"
                aria-label="Sertifikat selanjutnya"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quick link & stats */}
        <div className="shrink-0 pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/60">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Semua sertifikat memiliki nomor &amp; verifikasi dokumen resmi.</span>
          </div>
          <Link
            href="/awards"
            className="text-white hover:text-primary transition font-medium flex items-center gap-1"
          >
            Buka Galeri Penuh Sertifikat ↗
          </Link>
        </div>
      </div>

      {/* PDF Modal Viewer (Responsive) */}
      <PdfModal
        isOpen={Boolean(activePdf)}
        onClose={() => setActivePdf(null)}
        title={activePdf?.title || ''}
        url={activePdf?.url || ''}
        issuer={activePdf?.issuer}
        accent={activePdf?.accent}
      />
    </section>
  )
}
