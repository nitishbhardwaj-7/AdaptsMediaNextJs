"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Warm glow around mouse — using brand red/gold
      if (mouse.x > 0 && mouse.y > 0) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 250);
        g.addColorStop(0, "rgba(197, 42, 39, 0.04)");
        g.addColorStop(0.5, "rgba(250, 192, 45, 0.02)");
        g.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.015;
          p.vy += (dy / dist) * force * 0.015;
        }

        p.vx *= 0.995;
        p.vy *= 0.995;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Gold-tinted particles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 192, 45, ${p.opacity})`;
        ctx.fill();

        // Subtle connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(250, 192, 45, ${0.04 * (1 - dist2 / 100)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", () => { resize(); createParticles(); });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
