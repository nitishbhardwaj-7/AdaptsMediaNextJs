"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface StepDescriptionProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PLACEHOLDERS = [
  "Tell us about your goals and vision...",
  "What features are most important to you?",
  "Any reference sites or brands you admire?",
  "Describe your target audience...",
];

export default function StepDescription({ value, onChange, error }: StepDescriptionProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [phIdx, setPhIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const ci = useRef(0);

  useEffect(() => {
    if (value.length > 0 || isFocused) return;
    const txt = PLACEHOLDERS[phIdx];
    if (typing) {
      if (ci.current < txt.length) {
        const t = setTimeout(() => { setDisplayed(txt.slice(0, ci.current + 1)); ci.current++; }, 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (ci.current > 0) {
        const t = setTimeout(() => { ci.current--; setDisplayed(txt.slice(0, ci.current)); }, 20);
        return () => clearTimeout(t);
      } else {
        setPhIdx((p) => (p + 1) % PLACEHOLDERS.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, phIdx, value, isFocused]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-0">
      <motion.div className="mb-6 md:mb-10 flex flex-col items-center text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>

        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white tracking-[-0.03em] leading-[1.05]" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
          Tell us about<br />
          <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FAC02D] to-[#C52A27]">your idea</span>
        </h2>
      </motion.div>

      <motion.div className="relative max-w-3xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
        <div className="relative group">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={5}
            className={`
              w-full bg-white/[0.02] backdrop-blur-xl rounded-[1rem] px-6 py-5 text-white text-[15px]
              font-light tracking-[0.01em] leading-relaxed outline-none resize-none
              transition-all duration-500 font-sans border relative z-10
              ${error
                ? "border-[#C52A27]/60"
                : isFocused
                  ? "border-[#FAC02D]/50 bg-white/[0.05] shadow-[0_5px_20px_rgba(250,192,45,0.08)]"
                  : "border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.15]"
              }
            `}
            placeholder=""
          />
          
          {/* Noise Texture behind textarea */}
          <div 
            className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none rounded-[1rem] overflow-hidden z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {value.length === 0 && !isFocused && (
            <div className="absolute top-5 left-6 pointer-events-none z-20">
              <span className="text-white/20 text-[15px] font-light font-sans">{displayed}</span>
              <span className="inline-block w-[2px] h-[16px] bg-[#FAC02D]/40 ml-0.5 align-middle animate-pulse" />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-3 px-1">
          {error ? (
            <motion.p className="text-[#C52A27] text-xs font-sans font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>
          ) : <span />}
          <span className={`text-xs font-sans font-light tabular-nums ${value.length > 0 ? "text-white/30" : "text-white/10"}`}>{value.length}</span>
        </div>
      </motion.div>
    </div>
  );
}
