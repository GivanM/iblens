import { useEffect, type RefObject } from "react";

/** True when the visitor asked the system to keep motion down. */
function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Paper grain, generated once in canvas and handed to CSS as a repeating tile.
 * No raster asset ships with the page. Runs when the browser is idle, so it
 * never competes with first paint; until then the sheet is a flat cream, which
 * is a perfectly readable fallback.
 */
export function usePaperTexture(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;

    const build = () => {
      if (cancelled) return;
      try {
        const size = 180;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = ctx.createImageData(size, size);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const n = (Math.random() - 0.5) * 16;
          d[i] = 238 + n;
          d[i + 1] = 233 + n;
          d[i + 2] = 222 + n;
          d[i + 3] = 255;
        }
        ctx.putImageData(img, 0, 0);

        // Short light and dark strokes: the visible fibre of recycled stock.
        for (let f = 0; f < size / 3; f++) {
          const fx = Math.random() * size;
          const fy = Math.random() * size;
          const len = 2 + Math.random() * 9;
          const ang = Math.random() * Math.PI;
          const tone = Math.random() < 0.5 ? "255,255,255" : "90,80,66";
          ctx.strokeStyle = `rgba(${tone},${(0.03 + Math.random() * 0.07).toFixed(3)})`;
          ctx.lineWidth = 0.5 + Math.random();
          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.lineTo(fx + Math.cos(ang) * len, fy + Math.sin(ang) * len);
          ctx.stroke();
        }

        if (!cancelled) root.style.setProperty("--ms-paper-tex", `url(${canvas.toDataURL("image/png")})`);
      } catch {
        /* the sheet stays readable without grain */
      }
    };

    const idle = (window as any).requestIdleCallback as undefined | ((cb: () => void, o?: any) => number);
    const handle = idle ? idle(build, { timeout: 2000 }) : window.setTimeout(build, 400);

    return () => {
      cancelled = true;
      const cancelIdle = (window as any).cancelIdleCallback as undefined | ((h: number) => void);
      if (idle && cancelIdle) cancelIdle(handle as number);
      else window.clearTimeout(handle as number);
    };
  }, [rootRef]);
}

/**
 * Scroll-driven marking. Everything the red pen does is a function of where the
 * element sits in the window, so the page reads the same whether you scroll
 * fast, slow, or jump with the keyboard.
 *
 * One rAF per scroll burst: the listener only flags that a frame is wanted, and
 * every rect is read inside that single frame instead of on each scroll event.
 */
export function useMarkingInk(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = prefersReducedMotion();
    const inks = Array.from(root.querySelectorAll<HTMLElement>("[data-ink]"));
    const cover = root.querySelector<HTMLElement>("[data-cover]");
    const stamp = root.querySelector<HTMLElement>("[data-stamp]");
    const tabs = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-tab]"));
    const sheets = tabs.map((t) => root.querySelector<HTMLElement>(`#${CSS.escape(t.dataset.tab || "")}`));

    let frame = 0;

    /** 0 while the element is still low in the window, 1 once it reaches reading height. */
    const progressOf = (el: HTMLElement) => {
      const top = el.getBoundingClientRect().top;
      const start = window.innerHeight * 0.88;
      const end = window.innerHeight * 0.48;
      const p = (start - top) / (start - end);
      return p < 0 ? 0 : p > 1 ? 1 : p;
    };

    const paint = () => {
      frame = 0;

      for (const el of inks) {
        const p = reduce ? 1 : progressOf(el);
        el.style.setProperty("--ms-p", p.toFixed(3));
        const words = Number(el.dataset.words || 0);
        if (words) el.style.setProperty("--ms-n", String(Math.round(p * words)));
      }

      if (stamp && !stamp.classList.contains("ms-hit")) {
        if (reduce || stamp.getBoundingClientRect().top < window.innerHeight * 0.72) {
          stamp.classList.add("ms-hit");
        }
      }

      if (cover && !reduce) {
        const p = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
        cover.style.setProperty("--ms-lift", p.toFixed(3));
      }

      let active = 0;
      sheets.forEach((sheet, i) => {
        if (sheet && sheet.getBoundingClientRect().top <= window.innerHeight * 0.35) active = i;
      });
      tabs.forEach((t, i) => t.setAttribute("aria-current", i === active ? "true" : "false"));
    };

    const request = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [rootRef]);
}
