"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface SuccessScreenProps {
  onReset: () => void;
}

export default function SuccessScreen({ onReset }: SuccessScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface ConfettiParticle {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; rotation: number;
      rotationSpeed: number; opacity: number;
    }

    const particles: ConfettiParticle[] = [];
    // Brand colors
    const colors = ["#C52A27", "#FAC02D", "#f5a623", "#3b6ef5", "#FFFFFF", "#e21b22"];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15 - 5,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.008;
        if (p.opacity <= 0) return;
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      if (alive) animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(197,42,39,0.08), transparent 70%)", filter: "blur(80px)" }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Logo */}
      <motion.div
        className="relative w-40 h-10 mb-8 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Image src="/images/footerlogo.png" alt="Adapts Media" fill sizes="160px" className="object-contain" />
      </motion.div>

      {/* Rocket */}
      <motion.div
        className="text-6xl md:text-7xl mb-6 relative z-20"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
      >
        🚀
      </motion.div>



      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white tracking-[-0.03em] mb-4 relative z-20 leading-[1.05]"
        style={{ fontFamily: "var(--font-heading), sans-serif" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        Your vision is <br className="sm:hidden" />
        <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FAC02D] to-[#C52A27]">
          on its way
        </span>
      </motion.h2>

      <motion.p
        className="text-white/40 text-sm md:text-base font-light max-w-sm mx-auto mb-10 relative z-20 font-sans"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        We&apos;ll review your project and get back within 24 hours.
      </motion.p>

      <motion.div
        className="relative z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <button
          onClick={onReset}
          className="px-8 py-3.5 rounded-full text-sm md:text-base text-white/80 border border-white/10 bg-white/[0.03] backdrop-blur-md hover:bg-white/10 hover:text-white hover:border-[#FAC02D]/40 transition-all duration-300 font-sans font-medium shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(250,192,45,0.15)]"
        >
          Start Another Project
        </button>
      </motion.div>
    </div>
  );
}
