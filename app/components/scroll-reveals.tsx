"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function ScrollReveals({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = root.current;
    if (
      !container ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          for (const element of entry.target.querySelectorAll<HTMLElement>(
            '[data-reveal-state="pending"]',
          )) {
            element.dataset.revealState = "visible";
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0 },
    );

    // Include content already in view, but don't hide sections above a restored scroll position.
    const pending = elements.filter(
      (element) => element.getBoundingClientRect().bottom > 0,
    );
    const sections = new Set<HTMLElement>();
    for (const element of pending) {
      const section = element.closest("section");
      if (!section) continue;
      element.dataset.revealState = "pending";
      sections.add(section);
    }
    for (const section of sections) observer.observe(section);

    const revealFocused = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      for (const element of elements) {
        if (!element.contains(target) && !target.contains(element)) continue;
        element.dataset.revealState = "complete";
      }
    };
    container.addEventListener("focusin", revealFocused);

    return () => {
      observer.disconnect();
      container.removeEventListener("focusin", revealFocused);
      for (const element of elements) delete element.dataset.revealState;
    };
  }, []);

  return (
    <main id="conteudo" ref={root}>
      {children}
    </main>
  );
}
