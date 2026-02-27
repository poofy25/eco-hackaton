"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const targets = stagger ? el.children : [el];

    gsap.set(targets, { opacity: 0, y: 20 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (stagger) {
              gsap.to(el.children, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                delay,
                ease: "power2.out",
              });
            } else {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay,
                ease: "power2.out",
              });
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
