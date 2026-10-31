"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function ScrollReveals({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = root.current;
    if (!container || !("IntersectionObserver" in window)) return;

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.5) continue;
          const element = entry.target as HTMLElement;
          element.dataset.revealState = "visible";
          observer.unobserve(element);
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -64px 0px" },
    );

    // Include content already in view, but don't hide sections above a restored scroll position.
    const pending = elements.filter(
      (element) => element.dataset.reveal !== "intro" &&
        element.getBoundingClientRect().bottom > 0,
    );
    for (const element of pending) {
      element.dataset.revealState = "pending";
      observer.observe(element);
    }

    const revealFocused = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      for (const element of elements) {
        if (!element.contains(target) && !target.contains(element)) continue;
        element.dataset.revealState = "complete";
        observer.unobserve(element);
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
