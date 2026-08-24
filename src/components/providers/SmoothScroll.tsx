"use client";

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll to top on route change
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Detect touch/mobile devices — no smooth scroll on mobile
  const isMobile =
    typeof window !== "undefined" &&
    !window.matchMedia("(pointer: fine)").matches;

  useEffect(() => {
    // Skip Lenis setup on mobile devices
    if (isMobile) return;

    // 1. Disable GSAP lag smoothing to prevent smooth scroll freezing on frame drops
    gsap.ticker.lagSmoothing(0);

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    // Update ScrollTrigger when Lenis scrolls to prevent layout lagging
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    // 3. Monitor page body resizing to automatically recalculate scroll limits & triggers
    const resizeObserver = new ResizeObserver(() => {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.resize();
      }
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      gsap.ticker.remove(update);
      resizeObserver.disconnect();
    };
  }, [isMobile]);

  // On mobile, render children directly without Lenis wrapper
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        autoRaf: false,
        lerp: 0.1,         // Smoothness (0.1 is standard, lower is smoother)
        duration: 1.5,     // Scroll duration
        smoothWheel: true
      }}
    >
      {children}
    </ReactLenis>
  );
}