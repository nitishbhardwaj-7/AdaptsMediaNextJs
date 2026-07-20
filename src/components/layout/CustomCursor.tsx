"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Live mouse position
  const mouse = useRef({ x: -100, y: -100 });
  // Lagging ring position
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    // Lerp factor — lower = more lag
    const LERP = 0.1;

    const tick = () => {
      // Ring follows mouse with lag
      ring.current.x += (mouse.current.x - ring.current.x) * LERP;
      ring.current.y += (mouse.current.y - ring.current.y) * LERP;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // Grow ring on interactive elements
    const addHover = () => ringRef.current?.classList.add("cursor-hover");
    const removeHover = () => ringRef.current?.classList.remove("cursor-hover");

    // Shrink dot on click
    const onDown = () => dotRef.current?.classList.add("cursor-click");
    const onUp = () => dotRef.current?.classList.remove("cursor-click");

    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    // Delegate hover detection to interactive elements
    const interactables = "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]";
    const targets = document.querySelectorAll<HTMLElement>(interactables);
    targets.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    // Hide native cursor sitewide
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafRef.current);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      {/* Small precise dot — moves instantly with the pointer */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      {/* Larger ring — trails the dot with inertia */}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
