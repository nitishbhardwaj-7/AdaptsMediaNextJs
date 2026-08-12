"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;      // ms elapsed
  lifespan: number;  // ms total
}

const MAX_PARTICLES = 220;
const FRICTION = 0.94;

export default function FluidParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const safari = ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium") && !ua.includes("android");
    requestAnimationFrame(() => {
      setIsSafari(safari);
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const hero = canvas.parentElement;
    if (!hero) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── DPR-aware sizing ───────────────────────────────────────────────────
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const w = hero.offsetWidth;
      const h = hero.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(hero);
    window.addEventListener("resize", resize);

    // ── Particle pool ──────────────────────────────────────────────────────
    const particles: Particle[] = [];

    // ── Mouse tracking ─────────────────────────────────────────────────────
    let lastX = -1;
    let lastY = -1;
    let isInside = false;

    const spawnBurst = (x: number, y: number, dx: number, dy: number) => {
      const speed = Math.sqrt(dx * dx + dy * dy);
      const count = Math.min(8, Math.max(1, Math.round(speed * 0.28)));

      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) {
          // drop oldest
          particles.shift();
        }

        const spread = 1.8;
        const baseSpeed = speed * 0.18 + 0.6;
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * Math.PI * spread;
        const mag = baseSpeed * (0.5 + Math.random() * 0.8);

        particles.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * mag,
          vy: Math.sin(angle) * mag,
          radius: 26 + Math.random() * 38,          // 26–64 px
          life: 0,
          lifespan: 600 + Math.random() * 200,       // 600–800 ms
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isInside && lastX >= 0) {
        const dx = x - lastX;
        const dy = y - lastY;
        spawnBurst(x, y, dx, dy);
      }

      lastX = x;
      lastY = y;
      isInside = true;
    };

    const onMouseLeave = () => {
      // Stop spawning; existing particles fade out naturally
      lastX = -1;
      lastY = -1;
      isInside = false;
    };

    const onMouseEnter = () => {
      isInside = true;
    };

    hero.addEventListener("mousemove", onMouseMove);
    hero.addEventListener("mouseleave", onMouseLeave);
    hero.addEventListener("mouseenter", onMouseEnter);

    // ── rAF loop ───────────────────────────────────────────────────────────
    let lastTime = 0;
    let rafId = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 50); // cap delta to 50ms
      lastTime = now;

      const W = canvas.width / dpr;
      const H = canvas.height / dpr;

      ctx.clearRect(0, 0, W, H);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;

        if (p.life >= p.lifespan) {
          particles.splice(i, 1);
          continue;
        }

        // Physics
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        // Progress 0→1 over lifespan
        const progress = p.life / p.lifespan;

        // Radius shrinks slightly over lifetime (to 60% of original)
        const r = p.radius * (1 - progress * 0.4);

        // Alpha: quick fade-in over first 15%, then fade-out over last 50%
        let alpha = 1;
        if (progress < 0.15) {
          alpha = progress / 0.15;
        } else if (progress > 0.5) {
          alpha = 1 - (progress - 0.5) / 0.5;
        }

        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, r), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener("mousemove", onMouseMove);
      hero.removeEventListener("mouseleave", onMouseLeave);
      hero.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 40,
          mixBlendMode: "difference",
          filter: isSafari ? "blur(18px) contrast(30)" : "url(#fluid-displaced-goo)",
        }}
      />
      {!isSafari && (
        <svg
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <defs>
            <filter id="fluid-displaced-goo" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
                result="goo"
              />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.018"
                numOctaves="3"
                seed="42"
                result="noise"
              />
              <feDisplacementMap
                in="goo"
                in2="noise"
                scale="45"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
    </>
  );
}
