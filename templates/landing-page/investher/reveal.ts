"use client";

import { useEffect, useRef } from "react";

/**
 * Shared scroll-reveal hook (transitions.dev-inspired). Adds `.t-in` to every
 * `.t-reveal` inside the scope as it enters view, sets `.t-js` so the hidden
 * initial state only applies when JS runs (progressive enhancement), and has a
 * 3s safety net. Motion CSS + reduced-motion guard live in globals.css.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    document.documentElement.classList.add("t-js");
    const els = Array.from(root.querySelectorAll<HTMLElement>(".t-reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("t-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("t-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const fallback = window.setTimeout(() => els.forEach((el) => el.classList.add("t-in")), 3000);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
  return ref;
}
