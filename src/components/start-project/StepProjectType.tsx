"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { PROJECT_TYPES } from "./types";

interface StepProjectTypeProps {
  value: string;
  onChange: (value: string) => void;
}

function ProjectCard({
  type,
  isSelected,
  onClick,
  index,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  
  // Tilt effect values (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Spotlight effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(250, 192, 45, 0.15), transparent 80%)`;

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Spotlight
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    
    // Tilt
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`
        group relative text-left p-4 md:p-5 rounded-[1rem] border transition-all duration-700 backdrop-blur-xl outline-none
        ${isSelected
          ? "bg-white/[0.08] border-[#FAC02D]/40 shadow-[0_10px_50px_rgba(250,192,45,0.15)]"
          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.15]"
        }
      `}
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
          layoutId="selectedGlowCard"
          transition={{ duration: 0.6, ease: "circOut" }}
        />
      )}

      {/* Animated gradient border on selected */}
      {isSelected && (
        <div className="absolute inset-0 rounded-[1rem] p-[1px] pointer-events-none overflow-hidden" style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#C52A27] via-transparent to-[#FAC02D] opacity-70" />
        </div>
      )}

      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <motion.div
            className={`
              w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl
              transition-all duration-700 shadow-inner relative overflow-hidden
              ${isSelected
                ? "bg-gradient-to-br from-[#C52A27]/20 to-[#FAC02D]/20 text-[#FAC02D] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_25px_rgba(197,42,39,0.3)] border border-white/10"
                : "bg-white/[0.03] text-white/60 group-hover:bg-white/[0.08] group-hover:text-white group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5 group-hover:border-white/10"
              }
            `}
            animate={isSelected ? { y: [0, -6, 0] } : {}}
            transition={isSelected ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
          >
            {/* Soft inner glow behind icon */}
            {isSelected && (
              <div className="absolute inset-0 bg-[#FAC02D]/25 blur-xl rounded-full" />
            )}
            <div className="relative z-10 flex items-center justify-center">
              {type.id === "website" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              )}
              {type.id === "branding" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              )}
              {type.id === "mobile" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
              )}
              {type.id === "3d" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <line x1="12" x2="12" y1="22" y2="12" />
                </svg>
              )}
              {type.id === "marketing" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              )}
              {type.id === "transformation" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              )}
            </div>
          </motion.div>

          {/* Custom Checkmark */}
          <motion.div
            initial={false}
            animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-tr from-[#C52A27] to-[#FAC02D] flex items-center justify-center shadow-[0_0_20px_rgba(250,192,45,0.4)] border border-[#FAC02D]/30"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
        </div>

        <h3 className={`font-semibold text-base md:text-lg mb-1.5 tracking-[-0.02em] font-sans transition-colors duration-500 ${isSelected ? "text-white" : "text-white/90"}`}>
          {type.label}
        </h3>
        <p className={`text-[11px] md:text-xs font-light leading-relaxed font-sans transition-colors duration-500 ${isSelected ? "text-white/70" : "text-white/40 group-hover:text-white/60"}`}>
          {type.description}
        </p>
      </div>
    </motion.button>
  );
}

export default function StepProjectType({ value, onChange }: StepProjectTypeProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-0">
      <motion.div
        className="mb-6 md:mb-8 flex flex-col items-center text-center"
      >

        
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          What are we creating
          <br />
          <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FAC02D] to-[#C52A27]">
            together?
          </span>
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto" style={{ perspective: 1500 }}>
        {PROJECT_TYPES.map((type, i) => (
          <ProjectCard
            key={type.id}
            type={type}
            index={i}
            isSelected={value === type.id}
            onClick={() => onChange(type.id)}
          />
        ))}
      </div>
    </div>
  );
}
