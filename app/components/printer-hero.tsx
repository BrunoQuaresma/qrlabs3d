"use client";

import { useEffect, useRef, useState } from "react";
import type { PrinterScene } from "./printer-scene";

export default function PrinterHero() {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<PrinterScene | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let cancelled = false;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => {
      const shouldPlay = !preference.matches;
      scene.current?.setPlaying(shouldPlay);
      if (!shouldPlay) scene.current?.showFinished();
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      scene.current?.dispose();
      scene.current = null;
      setReady(false);
    };
    // Load WebGL separately so the page copy and quote button render immediately.
    import("./printer-scene")
      .then(({ createPrinterScene }) => {
        if (cancelled) return;
        scene.current = createPrinterScene(container);
        container
          .querySelector("canvas")
          ?.addEventListener("webglcontextlost", onContextLost);
        onPreference();
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          scene.current?.dispose();
          scene.current = null;
          setReady(false);
        }
      });
    preference.addEventListener("change", onPreference);
    return () => {
      cancelled = true;
      preference.removeEventListener("change", onPreference);
      container
        .querySelector("canvas")
        ?.removeEventListener("webglcontextlost", onContextLost);
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  return (
    <figure className="printer-hero">
      <div
        className="printer-viewport"
        role={ready ? "img" : undefined}
        aria-label={
          ready
            ? "Animação 3D ilustrativa de uma Bambu Lab A1 com AMS Lite imprimindo, camada por camada, o cogumelo vermelho e branco da nossa galeria."
            : undefined
        }
      >
        <div
          className={`printer-canvas${ready ? " is-ready" : ""}`}
          ref={host}
          aria-hidden="true"
        />
      </div>
    </figure>
  );
}
