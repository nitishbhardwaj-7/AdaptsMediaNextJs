"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { TIMELINE_OPTIONS } from "./types";

interface StepTimelineProps {
  value: string;
  onChange: (value: string) => void;
}

function TimelineCard({
  option,
  isSelected,
  onClick,
  index,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: any;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  
  // Spotlight effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(250, 192, 45, 0.12), transparent 80%)`;

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
        group relative flex items-center gap-4 text-left p-4 md:p-5 rounded-[1rem] border transition-all duration-700 backdrop-blur-xl outline-none
        ${isSelected
          ? "bg-white/[0.08] border-[#FAC02D]/40 shadow-[0_10px_40px_rgba(250,192,45,0.15)]"
          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.15]"
        }
      `}
      whileHover={{ x: 4, transition: { duration: 0.3 } }}
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
            background: "linear-gradient(135deg, rgba(197,42,39,0.12) 0%, rgba(250,192,45,0.06) 100%)",
          }}
          layoutId="selectedGlowTimeline"
          transition={{ duration: 0.6, ease: "circOut" }}
        />
      )}

      {/* Animated gradient border on selected */}
      {isSelected && (
        <div className="absolute inset-0 rounded-[1rem] p-[1px] pointer-events-none overflow-hidden" style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#C52A27] via-transparent to-[#FAC02D] opacity-70" />
        </div>
      )}

      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className={`
            w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl md:text-2xl flex-shrink-0
            transition-all duration-700 shadow-inner relative overflow-hidden
            ${isSelected
              ? "bg-gradient-to-br from-[#C52A27]/20 to-[#FAC02D]/20 text-[#FAC02D] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_20px_rgba(197,42,39,0.2)] border border-white/10"
              : "bg-white/[0.03] text-white/70 group-hover:bg-white/[0.08] group-hover:text-white border border-white/5"
            }
          `}>
            {isSelected && (
              <div className="absolute inset-0 bg-[#FAC02D]/20 blur-xl rounded-full" />
            )}
            <div className="relative z-10 flex items-center justify-center">
              {option.id === "asap" && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              )}
              {option.id === "1-3months" && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              )}
              {option.id === "3-6months" && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              )}
              {option.id === "flexible" && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h3l3 -9 6 18 3 -9h5"></path></svg>
              )}
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className={`font-semibold text-base md:text-lg tracking-[-0.01em] font-sans transition-colors duration-500 ${isSelected ? "text-white" : "text-white/90"}`}>
              {option.label}
            </h3>
            <p className={`text-[11px] md:text-xs font-light mt-0.5 font-sans transition-colors duration-500 ${isSelected ? "text-white/70" : "text-white/40 group-hover:text-white/60"}`}>
              {option.sublabel}
            </p>
          </div>
        </div>

        {/* Custom Checkmark */}
        <motion.div
          initial={false}
          animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0.2 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className={`
            w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-300
            ${isSelected 
              ? "bg-gradient-to-tr from-[#C52A27] to-[#FAC02D] shadow-[0_0_15px_rgba(250,192,45,0.4)] border border-[#FAC02D]/30" 
              : "border border-white/20"
            }
          `}
        >
          {isSelected && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </motion.div>
      </div>
    </motion.button>
  );
}

export default function StepTimeline({ value, onChange }: StepTimelineProps) {
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
          When would you
          <br />
          <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FAC02D] to-[#C52A27]">
            like to launch?
          </span>
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto" style={{ perspective: 1500 }}>
        {TIMELINE_OPTIONS.map((option, i) => (
          <TimelineCard
            key={option.id}
            option={option}
            index={i}
            isSelected={value === option.id}
            onClick={() => onChange(option.id)}
          />
        ))}
      </div>
    </div>
  );
}
