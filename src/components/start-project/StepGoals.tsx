"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { PROJECT_GOALS } from "./types";

interface StepGoalsProps {
  value: string[];
  onChange: (value: string[]) => void;
}

function GoalCard({
  goal,
  isSelected,
  onClick,
  index,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  goal: any;
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
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
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
          layoutId={`selectedGlowGoal-${goal.id}`}
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
          <span className="text-2xl flex-shrink-0 flex items-center justify-center">
            {goal.id === "sales" && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            )}
            {goal.id === "brand" && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            )}
            {goal.id === "leads" && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            )}
            {goal.id === "launch" && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
            )}
            {goal.id === "ux" && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            )}
            {goal.id === "custom" && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path><path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path></svg>
            )}
          </span>
          <span className={`font-semibold text-base md:text-lg tracking-[-0.01em] font-sans transition-colors duration-500 ${isSelected ? "text-white" : "text-white/80 group-hover:text-white"}`}>
            {goal.label}
          </span>
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

export default function StepGoals({ value, onChange }: StepGoalsProps) {
  const toggleGoal = (goalId: string) => {
    if (value.includes(goalId)) {
      onChange(value.filter((g) => g !== goalId));
    } else {
      onChange([...value, goalId]);
    }
  };

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
          What are you trying
          <br />
          <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FAC02D] to-[#C52A27]">
            to achieve?
          </span>
        </motion.h2>
        <motion.p 
          className="text-xs md:text-sm text-white/40 mt-4 font-sans font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Select all that apply
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto" style={{ perspective: 1500 }}>
        {PROJECT_GOALS.map((goal, i) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            index={i}
            isSelected={value.includes(goal.id)}
            onClick={() => toggleGoal(goal.id)}
          />
        ))}
      </div>
    </div>
  );
}
