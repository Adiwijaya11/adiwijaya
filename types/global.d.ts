export {}

declare global {
  interface Window {
    /** Lenis instance shared across components (created in LenisProvider). */
    __lenis?: import('lenis').default
    /** Published per-section document y-offsets for navbar navigation. */
    __portfolioScroll?: Record<string, number>
  }
}
