'use client'

import { forwardRef } from 'react'

/**
 * Closing curtain: contact panel that slides in from the LEFT.
 * It is positioned & animated by TechnologyStack (pinned overlay).
 */
const Contact = forwardRef<HTMLDivElement>(function Contact(_props, ref) {
  return (
    <div
      ref={ref}
      id="contact"
      className="relative h-[100svh] w-full overflow-hidden bg-[#0a0a12]"
    >
      <div className="relative m-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-[clamp(0.6rem,2.4svh,1.75rem)] overflow-hidden px-6 py-5 text-center sm:px-10 md:px-14 2xl:max-w-[90rem]">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 sm:text-sm">
          <span className="h-px w-8 bg-white/40" />
          Contact
          <span className="h-px w-8 bg-white/40" />
        </p>
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl 2xl:text-6xl">
          Yuk, ngobrol &amp; kolaborasi!
        </h2>
        <p className="max-w-xl text-xs leading-relaxed text-white/60 sm:text-sm md:text-base 2xl:text-lg">
          Punya ide project, ingin bertanya, atau sekadar menyapa?
          Jangan ragu untuk menghubungi saya.
        </p>

        <div className="mt-1 flex w-full max-w-2xl flex-col justify-center gap-3 sm:flex-row md:gap-4">
          <a
            href="mailto:madeeadiwijaya@gmail.com"
            className="group flex flex-1 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-left transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.08] sm:p-4"
          >
            <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-white/10 text-lg sm:h-11 sm:w-11">
              ✉️
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                Email
              </span>
              <span className="mt-0.5 block truncate text-sm font-semibold text-white sm:text-base">
                madeeadiwijaya@gmail.com
              </span>
            </span>
          </a>
          <a
            href="https://wa.me/6283114592416"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-1 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-left transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.08] sm:p-4"
          >
            <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-white/10 text-xl sm:h-11 sm:w-11">
              💬
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                WhatsApp
              </span>
              <span className="mt-0.5 block truncate text-sm font-semibold text-white sm:text-base">
                +62 831-1459-2416
              </span>
            </span>
          </a>
        </div>

        <div className="mt-1 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {[
            ['GitHub', 'https://github.com/Adiwijaya11'],
            ['Instagram', 'https://www.instagram.com/imadeadiwijayaa_/'],
            ['LinkedIn', 'https://www.linkedin.com/in/i-made-adi-wijaya-890658405/'],
          ].map(([social, href]) => (
            <a
              key={social}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/80 transition hover:border-white/30 hover:text-white md:px-5 md:py-2 md:text-sm"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
})

export default Contact
