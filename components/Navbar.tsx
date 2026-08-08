'use client'

import { useEffect, useState } from 'react'

const links = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Technology', id: 'technology' },
  { label: 'Contact', id: 'contact' },
]

// Jump to a published portfolio stage (AboutSection / PortfolioFlow / Contact).
// Fallback: native anchor scroll if lenis or the offsets aren't ready yet.
function goTo(id: string) {
  const lenis = window.__lenis
  const offsets = window.__portfolioScroll
  if (id === 'top') {
    if (lenis) {
      lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return
  }
  if (lenis && offsets?.[id] != null) {
    lenis.scrollTo(offsets[id])
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scrolling while the mobile menu is open. Lenis must be stopped too —
  // body overflow alone doesn't stop its raf loop. Restarting happens in
  // navigate() SYNCHRONOUSLY (before goTo), because this effect only runs
  // AFTER the click handler — scrolling while locked would do nothing.
  useEffect(() => {
    if (open) {
      window.__lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      window.__lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      window.__lenis?.start()
      document.body.style.overflow = ''
    }
  }, [open])

  // Close the menu, re-enable Lenis/scroll in the SAME tick, then jump.
  // This is what makes nav links work from any section on mobile.
  const navigate = (id: string) => {
    setOpen(false)
    window.__lenis?.start()
    document.body.style.overflow = ''
    goTo(id)
  }

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            navigate('top')
          }}
          className="group flex items-center gap-3"
          aria-label="Back to top"
        >
          <span className="relative flex h-10 w-10 items-center justify-center border border-white/25 text-sm font-bold tracking-tight text-white transition-colors duration-300 group-hover:border-white">
            AW
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-text-primary sm:block">
            Adi&nbsp;Wijaya
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  goTo(link.id)
                }}
                className="group relative text-sm font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                goTo('contact')
              }}
              className="rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/40"
            >
              Let&apos;s Talk
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-5 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 rounded bg-text-primary transition-all duration-300 ${
                open ? 'top-1/2 -translate-y-1/2 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded bg-text-primary transition-all duration-300 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-6 rounded bg-text-primary transition-all duration-300 ${
                open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {links.map((link, i) => (
          <a
            key={link.label}
            href={`#${link.id}`}
            onClick={(e) => {
              e.preventDefault()
              navigate(link.id)
            }}
            style={{ transitionDelay: open ? `${i * 70}ms` : '0ms' }}
            className={`text-3xl font-semibold text-text-primary transition-all duration-500 hover:text-secondary ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            navigate('contact')
          }}
          style={{ transitionDelay: open ? `${links.length * 70}ms` : '0ms' }}
          className={`mt-4 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg shadow-primary/40 transition-all duration-500 ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          Let&apos;s Talk
        </a>
      </div>
    </nav>
  )
}
