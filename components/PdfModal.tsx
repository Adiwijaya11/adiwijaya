'use client'

import { useEffect, useRef } from 'react'

interface PdfModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  url: string
  issuer?: string
  accent?: string
}

export default function PdfModal({
  isOpen,
  onClose,
  title,
  url,
  issuer,
  accent = '#7c5cff',
}: PdfModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Lock body scroll and pause Lenis while modal is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.__lenis?.start()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Pratinjau Sertifikat ${title}`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      {/* Dark blur backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        className="relative z-10 flex h-[92svh] sm:h-[88svh] w-full max-w-5xl flex-col rounded-2xl border border-white/20 bg-[#0d0d14] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden transition-all transform animate-scaleUp"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-3 sm:px-6 sm:py-4 bg-[#12121c]/90 backdrop-blur shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 pr-2">
            {/* Window control dots (decorative desktop) */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: accent }}
                />
                <h3 className="truncate text-xs font-semibold text-white sm:text-base">
                  {title}
                </h3>
              </div>
              {issuer && (
                <p className="truncate text-[10px] text-white/50 sm:text-xs">
                  Diterbitkan oleh <span className="text-white/80 font-medium">{issuer}</span>
                </p>
              )}
            </div>
          </div>

          {/* Action buttons in header */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-2 text-[11px] font-medium text-white transition hover:bg-white/20 hover:border-white/30 active:scale-95 sm:px-3 sm:text-xs min-h-[38px]"
              title="Buka dokumen PDF di tab baru"
            >
              <span>Buka Tab Baru</span>
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/20 hover:text-white active:scale-95"
              aria-label="Tutup pratinjau sertifikat"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile notice bar */}
        <div className="flex sm:hidden items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/5 text-[11px] text-white/70 shrink-0">
          <span>Pratinjau PDF interaktif:</span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline font-medium"
          >
            Unduh / Fullscreen ↗
          </a>
        </div>

        {/* PDF iframe / embed container */}
        <div className="relative flex-1 bg-[#1a1a24] overflow-hidden">
          <iframe
            src={`${url}#toolbar=1&navpanes=0`}
            className="h-full w-full border-none"
            title={`Dokumen PDF ${title}`}
          />
        </div>
      </div>
    </div>
  )
}
