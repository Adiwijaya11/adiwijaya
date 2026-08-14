'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Project = {
  name: string
  type: 'Web' | 'App'
  description: string
  tech: string[]
  highlight?: string
}

const projects: Project[] = [
  {
    name: 'Resepan Dapur',
    type: 'Web',
    description:
      'Website kumpulan resep masakan tradisional dan mancanegara — jelajahi ribuan resep atau buat resepmu sendiri. Fitur utamanya ada di halaman Resep AI: tinggal masukkan bahan yang ada, AI yang menyusun resepnya.',
    tech: ['Laravel', 'TailwindCSS', 'JavaScript', 'HTML', 'AI'],
    highlight: 'Resep AI — buat resep dari bahan yang ada',
  },
  {
    name: 'Vizzio Stream',
    type: 'Web',
    description:
      'Website nonton anime dengan data dari API wajik45. Dibangun dengan Laravel dan TailwindCSS untuk pengalaman browsing yang cepat dan rapi.',
    tech: ['JavaScript', 'GSAP', 'Lenis', 'Laravel', 'TailwindCSS', 'REST API'],
    highlight: 'Streaming anime via API wajik45',
  },
  {
    name: 'PackNest',
    type: 'App',
    description:
      'Aplikasi Flutter rekomendasi pakaian dan peralatan yang wajib dibawa saat liburan — biar packing selalu pas, tidak kurang tidak berlebih, dengan bantuan rekomendasi AI.',
    tech: ['Flutter', 'Firebase', 'AI API'],
    highlight: 'Rekomendasi packing liburan berbasis AI',
  },
  {
    name: 'TitikUsaha',
    type: 'App',
    description:
      'Aplikasi Flutter yang merekomendasikan tempat usaha terbaik di sekitarmu — memanfaatkan API lokasi (maps & geolocation) untuk membaca posisi, lalu API AI untuk menganalisis area dan memberi rekomendasi yang tepat.',
    tech: ['Flutter', 'Firebase', 'Location API', 'AI API'],
    highlight: 'API lokasi + AI untuk analisis & rekomendasi',
  },
  {
    name: 'VizzioDocs',
    type: 'Web',
    description:
      'Website manipulasi dokumen dengan 28 tools — mulai dari kompres, crop, lock/unlock PDF, dan lainnya. Dibangun dengan Laravel + JavaScript + TailwindCSS, dengan Ghostscript sebagai mesin kompresi dokumen.',
    tech: ['Laravel', 'JavaScript', 'TailwindCSS', 'Ghostscript'],
    highlight: '28 tools manipulasi dokumen, kompresi via Ghostscript',
  },
]

// Each project page gets its own tinted background + glow accent,
// so every screen is clearly different from the rest.
const panelStyles = [
  { bg: '#0b0b0f', glow: '#7c5cff' }, // Intro — tema utama (ungu)
  { bg: '#1c1108', glow: '#f59e0b' }, // Resepan Dapur — hangat (amber)
  { bg: '#06141c', glow: '#00d4ff' }, // Vizzio Stream — cyan
  { bg: '#160f26', glow: '#a78bfa' }, // PackNest — violet
  { bg: '#071a12', glow: '#34d399' }, // TitikUsaha — hijau
  { bg: '#1c0f16', glow: '#f472b6' }, // VizzioDocs — pink
  { bg: '#0d0f1a', glow: '#7c5cff' }, // Lainnya — indigo (penutup)
]

const DEMO_IMAGES: Record<string, string[]> = {}

const PACKNEST_IMAGES = [
  '/images/packnest/halaman-login.png',
  '/images/packnest/halaman%20dashboard.png',
  '/images/packnest/halaman%20create.png',
  '/images/packnest/halaman%20profile.png',
]

const TITIKUSAHA_IMAGES = [
  '/images/TitikUsaha/halaman-login.png',
  '/images/TitikUsaha/halaman%20dashboard.png',
  '/images/TitikUsaha/halaman%20searching.png',
  '/images/TitikUsaha/halaman%20analisis.png',
  '/images/TitikUsaha/halaman%20simpan.png',
  '/images/TitikUsaha/halaman%20setting.png',
]

const VIZZIODOCS_IMAGES = [
  '/images/vizziodocs/halaman%20utama.png',
  '/images/vizziodocs/halaman%20fitur.png',
  '/images/vizziodocs/halaman%20alat.png',
]

const RESEPAN_IMAGES = [
  '/images/resepan%20dapur/halaman%20utama.png',
  '/images/resepan%20dapur/halaman%20resep.png',
  '/images/resepan%20dapur/halaman%20resep%20ai.png',
]

DEMO_IMAGES['Vizzio Stream'] = [
  '/images/vizzioStream/halaman1.png',
  '/images/vizzioStream/halaman2.png',
]
DEMO_IMAGES['VizzioDocs'] = VIZZIODOCS_IMAGES
DEMO_IMAGES['Resepan Dapur'] = RESEPAN_IMAGES

/** Result card with a swipeable screenshot gallery + demo link. */
function ShowcaseCard({
  name,
  demoUrl,
  accent = '#00d4ff',
}: {
  name: string
  demoUrl?: string
  accent?: string
}) {
  const slides = DEMO_IMAGES[name] ?? []
  const [index, setIndex] = useState(0)
  const dragRef = useRef<{ startX: number; offset: number; el: HTMLDivElement } | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const goTo = (next: number) =>
    setIndex((next + slides.length) % slides.length)

  const snapBack = () => {
    const el = trackRef.current
    if (!el) return
    el.style.transform = `translate3d(${-index * el.offsetWidth}px,0,0)`
  }

  if (slides.length === 0) return null

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-2xl shadow-black/50">
      {/* Browser chrome mockup */}
      <div
        className="flex items-center gap-3 border-b border-white/10 bg-white/[0.06] px-4 py-3"
        style={{ boxShadow: `inset 0 1px 0 ${accent}22` }}
      >
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-1 flex h-7 min-w-0 flex-1 items-center rounded-md bg-white/10 px-3">
          <span className="truncate text-xs text-white/70">
            {demoUrl ? demoUrl.replace('https://', '') : 'vizziodocs.local'}
          </span>
        </div>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-white/40">
          {index + 1}/{slides.length}
        </span>
      </div>

      {/* Screenshot stage — svh-capped on mobile so copy + card fit 100svh */}
      <div
        className="relative h-[clamp(150px,30svh,280px)] cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing sm:h-auto sm:aspect-[16/10]"
        onPointerDown={(e) => {
          const el = trackRef.current
          if (!el) return
          dragRef.current = { startX: e.clientX, offset: index * el.offsetWidth, el }
          el.style.transition = 'none' // drag follows finger 1:1
        }}
        onPointerMove={(e) => {
          const drag = dragRef.current
          if (!drag) return
          const { el, startX, offset } = drag
          el.style.transform = `translate3d(${offset + (e.clientX - startX)}px,0,0)`
        }}
        onPointerUp={(e) => {
          const drag = dragRef.current
          if (!drag) return
          drag.el.style.transition = '' // restore CSS transition for snap
          const dx = e.clientX - drag.startX
          if (dx < -60) goTo(index + 1)
          else if (dx > 60) goTo(index - 1)
          else snapBack()
          dragRef.current = null
        }}
        onPointerLeave={() => {
          if (!dragRef.current) return
          const { el } = dragRef.current
          el.style.transition = ''
          snapBack()
          dragRef.current = null
        }}
      >
        <div
          ref={trackRef}
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(${-index * 100}%,0,0)` }}
        >
          {slides.map((src) => (
            <Image
              key={src}
              src={src}
              alt={`${name} screenshot ${index + 1}`}
              className="h-full w-full flex-none object-cover object-top"
              draggable={false}
              unoptimized
              width={800}
              height={450}
            />
          ))}
        </div>

        {/* chevrons */}
        <button
          type="button"
          aria-label="Previous screenshot"
          onClick={() => goTo(index - 1)}
          className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:scale-105"
          style={{ boxShadow: `0 0 0 0 ${accent}33` }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 24px ${accent}66`)}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next screenshot"
          onClick={() => goTo(index + 1)}
          className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:scale-105"
          style={{ boxShadow: `0 0 0 0 ${accent}33` }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 24px ${accent}66`)}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
        >
          ›
        </button>

        {/* dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Lihat screenshot ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-1.5 rounded-full transition-all"
              style={
                i === index
                  ? { width: '1.5rem', background: accent, boxShadow: `0 0 10px ${accent}88` }
                  : { width: '0.375rem', background: 'rgba(255,255,255,0.4)' }
              }
            />
          ))}
        </div>
      </div>

      {/* Demo footer */}
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm text-white/90 transition hover:bg-white/5"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            Live demo
          </span>
          <span className="inline-flex items-center gap-2 font-medium">
            Buka website
            <span aria-hidden>↗</span>
          </span>
        </a>
      )}
    </div>
  )
}

/** Mobile app card — phone frame with button-driven screenshot gallery. */
function PhoneCard({
  name,
  images,
  accent = '#34d399',
}: {
  name: string
  images: string[]
  accent?: string
}) {
  const [index, setIndex] = useState(0)

  const goTo = (next: number) =>
    setIndex((next + images.length) % images.length)

  if (images.length === 0) return null

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {/* Ambient glow (plain gradient — cheap to paint while scrolling) */}
      <div
        aria-hidden
        className="absolute -inset-10"
        style={{ background: `radial-gradient(circle, ${accent}26 0%, transparent 60%)` }}
      />

      {/* Arrows + phone in one centered row */}
      <div className="relative flex items-center justify-center">
        {/* ‹ Prev */}
        <button
          type="button"
          aria-label="Layar sebelumnya"
          onClick={() => goTo(index - 1)}
          className="relative z-10 mr-2 grid h-10 w-10 flex-none place-items-center rounded-full border border-white/15 bg-white/10 text-xl text-white transition hover:scale-105 sm:mr-3 sm:h-11 sm:w-11"
          style={{ boxShadow: `0 0 0 0 ${accent}33` }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 22px ${accent}66`)}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
        >
          ‹
        </button>

        {/* Phone bezel — width-driven so it always scales on small screens */}
        <div
          className="relative flex-none rounded-[2.8rem] bg-neutral-900 p-1.5 shadow-2xl shadow-black/60 ring-1 ring-white/10 sm:rounded-[3.2rem] sm:p-2"
          style={{
            // Adjusted width for better mobile responsiveness
            width: 'clamp(120px, 80vw, 260px)',
            boxShadow: `0 0 0 1px rgba(0,0,0,.6), 0 24px 60px -12px rgba(0,0,0,.7), 0 0 60px ${accent}22`,
          }}
        >
          {/* side buttons */}
          <span aria-hidden className="absolute -left-[3px] top-16 h-8 w-[3px] rounded-full bg-neutral-700 sm:top-24 sm:h-10" />
          <span aria-hidden className="absolute -left-[3px] top-24 h-5 w-[3px] rounded-full bg-neutral-700 sm:top-36 sm:h-6" />
          <span aria-hidden className="absolute -right-[3px] top-20 h-9 w-[3px] rounded-full bg-neutral-700 sm:top-28 sm:h-12" />

          {/* Screen */}
          <div className="relative aspect-[498/942] w-full select-none overflow-hidden rounded-[2.2rem] bg-black sm:rounded-[2.5rem]">
            <div
              className="flex h-full w-full transition-transform duration-500 ease-out"
              style={{ transform: `translate3d(${-index * 100}%,0,0)` }}
            >
              {images.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${name} layar ${images.indexOf(src) + 1}`}
                  draggable={false}
                  unoptimized
                  width={498}
                  height={942}
                  className="h-full w-full flex-none object-cover object-top"
                />
              ))}
            </div>

            {/* counter pill (bottom, small, never covers the app UI) */}
            <span className="absolute inset-x-0 bottom-2.5 flex justify-center">
              <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-[0.65rem] tracking-widest text-white/85">
                {index + 1} / {images.length}
              </span>
            </span>
          </div>

          {/* camera dot on the bezel (above the screen) */}
          <span aria-hidden className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-neutral-600" />
        </div>

        {/* Next › */}
        <button
          type="button"
          aria-label="Layar berikutnya"
          onClick={() => goTo(index + 1)}
          className="relative z-10 ml-2 grid h-10 w-10 flex-none place-items-center rounded-full border border-white/15 bg-white/10 text-xl text-white transition hover:scale-105 sm:ml-3 sm:h-11 sm:w-11"
          style={{ boxShadow: `0 0 0 1px ${accent}33` }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 22px ${accent}66`)}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
        >
          ›
        </button>
      </div>

      {/* dots + hint — normal flow, always clear of the phone */}
      <div className="relative mt-4 flex flex-col items-center gap-1.5">
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Lihat layar ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-1.5 rounded-full transition-all"
              style={
                i === index
                  ? { width: '1.25rem', background: accent, boxShadow: `0 0 10px ${accent}88` }
                  : { width: '0.375rem', background: 'rgba(255,255,255,0.4)' }
              }
            />
          ))}
        </div>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/40">
          Pakai tombol kiri &amp; kanan
        </p>
      </div>
    </div>
  )
}

/**
 * ONE pinned unit that chains everything with a single About:
 *  1) About covers the Hero (sticky cover).
 *  2) The Projects track covers the SAME About (sticky cover).
 *  3) The track scrolls horizontally — one screen per project.
 * Single pin, single About rendered once -> no duplicate pages.
 */
export default function PortfolioFlow({
  hero,
  about,
}: {
  hero: React.ReactNode
  about: React.ReactNode
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const about = aboutRef.current
    const track = trackRef.current
    if (!wrap || !about || !track) return

    const panels = gsap.utils.toArray<HTMLElement>('.project-panel')
    if (panels.length <= 1) return

    const ctx = gsap.context(() => {
      // Tailwind v4 translate-* uses the CSS `translate` property, which GSAP
      // cannot animate (it animates `transform`). Set the initial offsets in
      // GSAP instead so the fromTo tweens actually take effect.
      gsap.set(about, { yPercent: 100 })
      gsap.set(track, { yPercent: 100 })

      // Real width the panels are laid out at (track is inset-0 = content box, so
      // window.innerWidth overstates it whenever a scrollbar exists ~15px sneak).
      const panelW = () => panels[0].getBoundingClientRect().width
      const coverH = () => wrap.clientHeight

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          // Ratio keeps the scrub mapping pixel-perfect — no "kurang/kelebihan".
          end: () => '+=' + (2 * coverH() + (panels.length - 1) * panelW()),
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => publishStages(),
          // Lock each stage flush to the viewport.
          // Points: 0 = Hero, about = About penuh, hStart = Projects#1, dst.
          snap: {
            snapTo: (progress: number) => {
              const total = 2 * coverH() + (panels.length - 1) * panelW()
              const about = coverH() / total // About selesai nutup Hero
              const hStart = (2 * coverH()) / total // Projects#1 full
              const step = panelW() / total
              const points = [0, about, hStart]
              for (let i = 1; i <= panels.length - 1; i++) points.push(hStart + i * step)
              return gsap.utils.snap(points, progress)
            },
            duration: { min: 0.2, max: 0.6 },
            ease: 'power1.inOut',
          },
        },
      })

      // 1) About covers Hero (shut the curtain).
      tl.fromTo(
        about,
        { yPercent: 100 },
        { yPercent: 0, ease: 'none', duration: coverH() }
      )

      // 2) Projects covers About.
      tl.fromTo(
        track,
        { yPercent: 100 },
        { yPercent: 0, ease: 'none', duration: coverH() }
      )

      // 3) Horizontal scroll: one screen per project.
      tl.fromTo(
        track,
        { x: 0 },
        {
          x: () => -(panels.length - 1) * panelW(),
          ease: 'none',
          duration: () =>
            (panels.length - 1) * panelW(),
        }
      )


      // Publish each section's document y-offset so the Navbar can jump to it.
      // Called on refresh too, because the values depend on viewport size.
      // Technology lives outside the pin; its offset is read straight from the
      // live DOM (getBoundingClientRect) on every refresh.
      function publishStages() {
        const st = tl.scrollTrigger
        if (!st || typeof window === 'undefined') return
        const doc = (id: string) => {
          const el = document.getElementById(id)
          return el ? el.getBoundingClientRect().top + window.scrollY : st.end
        }
        window.__portfolioScroll = {
          about: st.start + coverH(), // About selesai nutup Hero
          projects: st.start + 2 * coverH(), // Projects#1 full
          awards: doc('awards'),
          technology: doc('technology'),
          contact: doc('contact'),
        }
      }
      publishStages()

      // Intro line reveal.
      gsap.fromTo(
        '.project-line',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.project-panel:first-child .projects-header',
            start: 'top 60%',
          },
        }
      )
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} id="projects" className="relative h-[100svh] overflow-hidden">
      {/* Pinned backdrop: Hero stays, uncovered while About slides over */}
      <div className="absolute inset-0">{hero}</div>

      {/* Single About overlay — covers hero, then gets covered by projects */}
      <div
        ref={aboutRef}
        id="about"
        className="absolute inset-0 z-10 bg-[#050505]"
      >
        {about}
      </div>

      {/* Projects track — covers About, then scrolls horizontally */}
      <div
        ref={trackRef}
        className="absolute inset-0 z-20 flex"
      >
        {/* Intro panel — floating header of the whole gallery */}
        <section
          className="project-panel relative flex h-full w-full flex-none items-center justify-center overflow-hidden"
          style={{ backgroundColor: panelStyles[0].bg }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 70% 20%, ${panelStyles[0].glow}26 0%, transparent 55%)`,
            }}
          />
          <div className="relative m-auto flex h-full w-full max-w-7xl items-center justify-center px-4 py-4 sm:px-6 sm:py-6 md:px-12 md:py-10 lg:px-16 2xl:max-w-[90rem] 2xl:px-24">
            <header className="projects-header flex h-full w-full flex-col items-center justify-center text-center">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/60 sm:text-sm">
                <span className="h-px w-8 bg-white/40" />
                Projects
                <span className="h-px w-8 bg-white/40" />
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">
                <span className="block overflow-hidden">
                  <span className="project-line block">
                    Karya yang pernah
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="project-line block">
                    saya bangun.
                  </span>
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-center text-sm leading-relaxed text-white/70 sm:mt-6 sm:text-base md:text-lg 2xl:text-xl">
                Geser untuk menjelajah — setiap layar adalah satu proyek, dari website hingga aplikasi mobile.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/60 backdrop-blur">
                <span>Geser ke kanan</span>
                <span className="animate-pulse text-sm">→</span>
              </div>
            </header>
          </div>
        </section>

        {projects.map((project, i) => {
          const panelIndex = i + 1
          return (
            <section
              key={project.name}
              className="project-panel relative flex h-full w-full flex-none flex-col lg:flex-row overflow-hidden"
              style={{ backgroundColor: panelStyles[panelIndex % 6].bg }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 70% 20%, ${panelStyles[panelIndex % 6].glow}26 0%, transparent 55%)`,
                }}
              />
              <span className="pointer-events-none absolute right-4 top-6 select-none font-mono text-[9rem] font-bold leading-none text-white/[0.06] md:text-[16rem]">
                {String(panelIndex).padStart(2, '0')}
              </span>
              <div className="relative m-auto flex h-full w-full max-w-7xl overflow-hidden px-4 py-4 sm:px-6 sm:py-6 md:px-12 md:py-10 lg:px-16 2xl:max-w-[90rem] 2xl:px-24">
                <header className="projects-header flex h-full w-full flex-col justify-center">
                  <div className="flex h-full max-h-full flex-col justify-center gap-4 overflow-hidden lg:flex-row lg:items-center lg:gap-10 lg:overflow-visible">
                    <div className={['Resepan Dapur', 'Vizzio Stream', 'VizzioDocs'].includes(project.name) ? 'shrink-0 py-2 lg:w-[37%]' : project.name === 'PackNest' ? 'shrink-0 py-2 w-full lg:w-[63%]' : project.name === 'TitikUsaha' ? 'shrink-0 py-2 w-full lg:w-[55%]' : 'mx-auto max-w-2xl py-2 text-center lg:py-0'}>
                      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/60 md:text-sm 2xl:text-base">
                        <span className="h-px w-8 bg-white/40" />
                        {String(panelIndex).padStart(2, '0')} — {project.type}
                      </p>
                      <h2 className="mt-2.5 text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:mt-5 md:text-5xl 2xl:text-6xl">
                        {project.name}
                      </h2>
                      <p className="mt-2 max-w-2xl text-[13px] leading-snug text-white/70 md:mt-5 md:text-lg 2xl:text-xl">
                        {project.description}
                      </p>
                      {project.highlight && (
                        <p className="mt-2.5 inline-block rounded-lg border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white/90 md:mt-5 md:px-4 md:py-2 md:text-base 2xl:px-5 2xl:py-2.5 2xl:text-lg">
                          ✦ {project.highlight}
                        </p>
                      )}
                      <div className="mt-2.5 flex flex-wrap gap-1.5 md:mt-6 md:gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-white/80 md:px-4 md:py-1.5 md:text-sm 2xl:px-5 2xl:text-base"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    {['Resepan Dapur', 'Vizzio Stream', 'VizzioDocs'].includes(project.name) && (
                      <div className="w-full min-w-0 lg:w-[63%]">
                        <ShowcaseCard
                          name={project.name}
                          demoUrl={
                            project.name === 'Vizzio Stream'
                              ? 'https://vizzio-stream.vercel.app/'
                              : undefined
                          }
                          accent={
                            project.name === 'Resepan Dapur'
                              ? '#f59e0b'
                              : project.name === 'VizzioDocs'
                                ? '#f472b6'
                                : '#00d4ff'
                          }
                        />
                      </div>
                    )}
                    {['PackNest', 'TitikUsaha'].includes(project.name) && (
                      <div className="w-full min-w-0 lg:w-[37%]">
                        <PhoneCard
                          name={project.name}
                          images={
                            project.name === 'PackNest'
                              ? PACKNEST_IMAGES
                              : TITIKUSAHA_IMAGES
                          }
                          accent={project.name === 'PackNest' ? '#a78bfa' : '#34d399'}
                        />
                      </div>
                    )}
                  </div>
                </header>
              </div>
            </section>
          )
        })}

        {/* Lainnya — penutup: card GitHub */}
        <section
          className="project-panel relative flex h-full w-full flex-none items-center justify-center overflow-hidden"
          style={{ backgroundColor: panelStyles[6].bg }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 20%, ${panelStyles[6].glow}2b 0%, transparent 55%)`,
            }}
          />
          <div className="relative m-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-4 py-4 sm:px-6 md:px-12 2xl:max-w-[90rem]">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/60 md:text-sm">
              <span className="h-px w-8 bg-white/40" />
              Lainnya
              <span className="h-px w-8 bg-white/40" />
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl 2xl:text-6xl">
              Masih penasaran?
            </h2>

            <a
              href="https://github.com/Adiwijaya11"
              target="_blank"
              rel="noreferrer"
              className="group relative mt-8 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-white/25 md:p-8"
              style={{ boxShadow: '0 0 0 1px rgba(124,92,255,0.12), 0 24px 60px -20px rgba(0,0,0,0.7)' }}
            >
              {/* hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.15) 0%, transparent 60%)' }}
              />

              <div className="relative flex items-center gap-4">
                {/* GitHub mark */}
                <div className="grid h-14 w-14 flex-none place-items-center rounded-2xl bg-white/10 text-3xl">
                  <svg viewBox="0 0 16 16" className="h-7 w-7 fill-white" aria-hidden>
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                    GitHub
                  </p>
                  <p className="mt-1 truncate text-lg font-semibold text-white md:text-xl">
                    @Adiwijaya11
                  </p>
                </div>
                <span className="ml-auto grid h-10 w-10 flex-none place-items-center rounded-full border border-white/15 bg-white/5 text-white transition group-hover:scale-110 group-hover:border-white/30" aria-hidden>
                  ↗
                </span>
              </div>

              <p className="relative mt-4 text-sm leading-relaxed text-white/60">
                Jelajahi repository, eksperimen, dan project open-source lainnya
                yang sedang saya kembangkan.
              </p>
            </a>
          </div>
        </section>
      </div>

    </div>
  )
}
