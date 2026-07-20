"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
}

export default function MagneticButton({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  variant = "primary",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    buttonRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = "translate(0px, 0px)";
  }, []);

  const baseClasses = `
    relative overflow-hidden rounded-full font-sans tracking-wide
    transition-all duration-500 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
    transform-gpu backface-hidden will-change-transform [clip-path:inset(0_round_9999px)]
  `;

  const variantClasses = {
    primary: `
      px-8 py-3.5 md:px-10 md:py-4 text-sm md:text-[15px] text-white font-medium tracking-wide
      bg-gradient-to-r from-[#C52A27] to-[#FAC02D]
      hover:from-[#d6302e] hover:to-[#ffc633]
      shadow-[0_8px_25px_rgba(250,192,45,0.2)] hover:shadow-[0_8px_30px_rgba(197,42,39,0.35)]
      focus-visible:ring-[#FAC02D]/50
    `,
    secondary: `
      px-8 py-4 text-sm md:text-base text-white/90 font-medium
      bg-white/[0.06] border border-white/[0.15]
      hover:bg-white/[0.12] hover:border-[#FAC02D]/40
      hover:shadow-[0_0_25px_rgba(250,192,45,0.1)]
      backdrop-blur-sm focus-visible:ring-[#FAC02D]/40
    `,
    ghost: `
      px-6 py-3 text-sm text-white/50 font-medium
      hover:text-white/80
      focus-visible:ring-white/20
    `,
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {variant === "primary" && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(250,192,45,0.15) 48%, rgba(250,192,45,0.25) 50%, rgba(250,192,45,0.15) 52%, transparent 60%)",
              animation: "shine 3s infinite",
            }}
          />
        </div>
      )}
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.button>
  );
}
