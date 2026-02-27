"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsap<T extends HTMLElement = HTMLDivElement>(
  animationFn: (ctx: gsap.Context, el: T) => void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      animationFn(ctx as unknown as gsap.Context, el);
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

export function useCountUp(
  target: number,
  duration: number = 2,
  startOnView: boolean = true
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString();
      return;
    }

    const animate = () => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.round(obj.value).toLocaleString();
        },
      });
    };

    if (startOnView) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      animate();
    }
  }, [target, duration, startOnView]);

  return ref;
}
