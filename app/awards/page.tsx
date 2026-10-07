'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Award, awardsData } from '@/data/awards'
import AwardIcon from '@/components/AwardIcon'
import PdfModal from '@/components/PdfModal'

type CategoryFilter = 'all' | 'ai' | 'engineering' | 'bootcamp'

export default function AwardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activePdf, setActivePdf] = useState<Award | null>(null)

  const filteredAwards = awardsData.filter((award) => {
    const matchesCategory =
      selectedCategory === 'all' || award.category === selectedCategory
    const matchesSearch =
      award.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      award.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      award.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <main className="relative min-h-[100svh] w-full bg-[#08080f] text-white flex flex-col justify-between overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Ambient background glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full opacity-20 blur-[140px]"
          style={{ background: 'radial-gradient(circle, #7c5cff 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 right-1/4 h-[500px] w-[500px] rounded-full opacity-15 blur-[140px]"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-10 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)' }}
        />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 border-b border-white/10 bg-[#08080f]/80 backdrop-blur-xl px-4 py-3.5 sm:px-8 sm:py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/#awards"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/15 hover:border-white/30 active:scale-95"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
              <span>Kembali ke Beranda</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/50">
              <span>/</span>
              <span className="text-white/80">Koleksi Kredensial &amp; Sertifikat</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>6 Dokumen Asli</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-8 sm:py-8 flex-1 flex flex-col justify-between">
        {/* Hero Banner inside Page */}
        <div className="shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary mb-3">
                <span>VERIFIED CREDENTIALS</span>
                <span>•</span>
                <span>ADI WIJAYA</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Sertifikasi &amp; Pencapaian Resmi.
              </h1>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-white/70 max-w-3xl leading-relaxed">
                Dokumentasi resmi kompetensi software engineering, artificial intelligence, dan machine learning dari IBM SkillsBuild, Hacktiv8, CodePolitan, dan Dibimbing.
              </p>
            </div>

            {/* Quick Stats Pill Strip */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 shrink-0">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 backdrop-blur">
                <span className="block font-mono text-xs text-white/50">Total Dokumen</span>
                <span className="text-base font-bold text-white">6 Sertifikat</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 backdrop-blur">
                <span className="block font-mono text-xs text-white/50">Lembaga Mitra</span>
                <span className="text-base font-bold text-white">4 Institusi</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 backdrop-blur">
                <span className="block font-mono text-xs text-white/50">Format Berkas</span>
                <span className="text-base font-bold text-white">PDF Digital</span>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-y border-white/10 py-3.5">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {(
                [
                  { key: 'all', label: 'Semua Kategori (6)' },
                  { key: 'ai', label: 'Artificial Intelligence (3)' },
                  { key: 'engineering', label: 'Web Development (1)' },
                  { key: 'bootcamp', label: 'Bootcamp & Tech (2)' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedCategory === tab.key
                      ? 'bg-white text-black font-semibold shadow-lg shadow-white/10'
                      : 'border border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Cari sertifikat atau skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 pl-8 text-xs text-white placeholder-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition"
              />
              <svg
                className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="my-6">
          {filteredAwards.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] py-16 text-center">
              <p className="text-sm text-white/60">Tidak ada sertifikat yang cocok dengan pencarian.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className="mt-3 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10 transition"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredAwards.map((award) => (
                <div
                  key={award.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl"
                  style={{
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Glowing hover backdrop */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${award.accent}20 0%, transparent 70%)`,
                    }}
                  />

                  <div>
                    {/* Header: Icon, Issuer & Category */}
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105"
                        style={{
                          borderColor: `${award.accent}40`,
                          backgroundColor: `${award.accent}15`,
                          color: award.accent,
                        }}
                      >
                        <AwardIcon type={award.iconType} className="h-5 w-5" />
                      </div>

                      <div className="flex items-center gap-1.5">
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
                    </div>

                    {/* Title & Issuer */}
                    <h2 className="mt-4 text-base sm:text-lg font-bold text-white leading-snug group-hover:text-white transition">
                      {award.title}
                    </h2>
                    <p className="mt-1 text-xs text-white/50">
                      Penerbit: <span className="font-semibold text-white/85">{award.issuer}</span>
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-xs leading-relaxed text-white/70 line-clamp-3">
                      {award.description}
                    </p>

                    {/* Skills pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {award.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-white/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-5 flex items-center gap-2.5 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setActivePdf(award)}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/15 hover:border-white/40 active:scale-95"
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
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2 text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
                      title="Buka dokumen PDF di tab baru"
                      aria-label="Buka dokumen PDF di tab baru"
                    >
                      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Footer info */}
        <footer className="shrink-0 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Kredensial diverifikasi langsung oleh penyelenggara kursus &amp; bootcamp.</span>
          </div>
          <div>
            <span>Portfolio &copy; {new Date().getFullYear()} Adi Wijaya.</span>
          </div>
        </footer>
      </div>

      {/* PDF Modal Viewer */}
      <PdfModal
        isOpen={Boolean(activePdf)}
        onClose={() => setActivePdf(null)}
        title={activePdf?.title || ''}
        url={activePdf?.pdfUrl || ''}
        issuer={activePdf?.issuer}
        accent={activePdf?.accent}
      />
    </main>
  )
}
