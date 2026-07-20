"use client";

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // 1. Synchronize Lenis with GSAP ScrollTrigger
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    // Update ScrollTrigger when Lenis scrolls to prevent layout lagging
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

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