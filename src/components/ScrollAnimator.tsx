"use client";

import { useEffect } from "react";

/**
 * Attaches an IntersectionObserver to all `.animate-on-scroll` elements
 * and adds `.is-visible` when they enter the viewport.
 * Mounted once at the layout level so it covers every page.
 */
export default function ScrollAnimator() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".animate-on-scroll");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Once visible we don't need to observe it anymore
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Re-run observer whenever the route changes (Next.js App Router)
  useEffect(() => {
    const handleRouteChange = () => {
      // Small delay so the new page's DOM has rendered
      setTimeout(() => {
        const elements = document.querySelectorAll<HTMLElement>(
          ".animate-on-scroll:not(.is-visible)"
        );
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        elements.forEach((el) => observer.observe(el));
      }, 100);
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  return null;
}
