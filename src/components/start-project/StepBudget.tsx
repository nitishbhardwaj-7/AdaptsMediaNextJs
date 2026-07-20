"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { BUDGET_RANGES } from "./types";

interface StepBudgetProps {
  value: string;
  onChange: (value: string) => void;
}

function BudgetCard({
  budget,
  isSelected,
  onClick,
  index,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  budget: any;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  
  // Spotlight effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(250, 192, 45, 0.12), transparent 80%)`;

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`
        group relative flex flex-col items-center justify-center text-center p-5 md:p-6 h-full rounded-[1rem] border transition-all duration-700 backdrop-blur-xl outline-none
        ${isSelected
          ? "bg-white/[0.08] border-[#FAC02D]/40 shadow-[0_10px_40px_rgba(250,192,45,0.15)]"
          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.15]"
        }
      `}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none rounded-[1rem] overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Hover Spotlight */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1rem] overflow-hidden"
        style={{ background: spotlightBackground }}
      />

      {isSelected && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[1rem] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(250,192,45,0.1) 0%, rgba(197,42,39,0.05) 100%)",
          }}
          layoutId="selectedGlowBudget"
          transition={{ duration: 0.6, ease: "circOut" }}
        />
      )}

      {/* Animated gradient border on selected */}
      {isSelected && (
        <div className="absolute inset-0 rounded-[1rem] p-[1px] pointer-events-none overflow-hidden" style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#C52A27] via-transparent to-[#FAC02D] opacity-70" />
        </div>
      )}

      <div className="relative z-10 w-full flex flex-col items-center">
        <p className={`text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-4 transition-colors duration-500 font-sans font-semibold ${
          isSelected ? "text-[#FAC02D]" : "text-white/40 group-hover:text-white/60"
        }`}>
          {budget.sublabel}
        </p>
        
        <p className={`text-xl md:text-2xl font-extralight tracking-[-0.01em] transition-colors duration-500 ${
          isSelected ? "text-white" : "text-white/70 group-hover:text-white"
        }`}>
          {budget.label}
        </p>

        <div className="h-6 mt-4 flex items-center justify-center">
          {/* Custom Checkmark */}
          <motion.div
            initial={false}
            animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#C52A27] to-[#FAC02D] flex items-center justify-center shadow-[0_0_15px_rgba(250,192,45,0.4)] border border-[#FAC02D]/30"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
}

export default function StepBudget({ value, onChange }: StepBudgetProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-0">
      <motion.div
        className="mb-6 md:mb-10 flex flex-col items-center text-center"
      >


        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          What&apos;s your
          <br />
          <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FAC02D] to-[#C52A27]">
            investment range?
          </span>
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
        {BUDGET_RANGES.map((budget, i) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            index={i}
            isSelected={value === budget.id}
            onClick={() => onChange(budget.id)}
          />
        ))}
      </div>

      <motion.p
        className="text-center text-[11px] md:text-xs text-white/30 mt-6 md:mt-8 font-sans font-light tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        This helps us recommend the right solution for your needs.
      </motion.p>
    </div>
  );
}
