import type Lenis from "lenis";

// Shared reference to the app's single Lenis instance (created in
// SmoothScrolling). Lets non-adjacent components (e.g. BackToTop) drive the
// same smooth-scroll engine the rest of the site uses.
let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null): void {
  lenisInstance = instance;
}

/** Smoothly scroll to the top of the page, using Lenis when available. */
export function scrollToTop(): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(0);
  } else if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
