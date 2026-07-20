"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface StepBusinessDetailsProps {
  values: {
    name: string;
    company: string;
    email: string;
    website: string;
  };
  onChange: (field: string, value: string) => void;
  errors: Record<string, string | undefined>;
}

interface FloatingInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
  delay?: number;
}

function FloatingInput({ label, value, onChange, type = "text", required = true, error, delay = 0 }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="relative group">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={`
            w-full bg-white/[0.02] backdrop-blur-xl rounded-[1rem] px-5 pt-6 pb-2 text-white text-[15px]
            font-light tracking-[0.01em] outline-none transition-all duration-500
            font-sans border
            ${error
              ? "border-[#C52A27]/60"
              : isFocused
                ? "border-[#FAC02D]/50 bg-white/[0.05] shadow-[0_5px_20px_rgba(250,192,45,0.08)]"
                : "border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.15]"
            }
          `}
          style={{ position: "relative", zIndex: 10 }}
          placeholder=" "
          id={`field-${label.replace(/\s/g, "").toLowerCase()}`}
        />

        {/* Noise Texture behind input */}
        <div 
          className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none rounded-[1rem] overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            zIndex: 5
          }}
        />

        {/* Floating label */}
        <label
          htmlFor={`field-${label.replace(/\s/g, "").toLowerCase()}`}
          className={`
            absolute left-5 transition-all duration-300 pointer-events-none font-sans z-20
            ${isActive
              ? "top-2 text-[10px] tracking-[0.15em] uppercase text-[#FAC02D] font-semibold"
              : "top-1/2 -translate-y-1/2 text-[14px] text-white/40 font-light group-hover:text-white/60"
            }
          `}
        >
          {label}
          {!required && <span className="text-white/20 ml-1 normal-case tracking-normal text-[10px]">(optional)</span>}
        </label>
      </div>

      {error && (
        <motion.p
          className="text-[#C52A27] text-xs mt-2 ml-1 font-sans font-medium"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

export default function StepBusinessDetails({ values, onChange, errors }: StepBusinessDetailsProps) {
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
          Tell us about
          <br />
          <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FAC02D] to-[#C52A27]">
            your company
          </span>
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto">
        <FloatingInput
          label="Your Name"
          value={values.name}
          onChange={(val) => onChange("name", val)}
          error={errors.name}
          delay={0.15}
        />
        <FloatingInput
          label="Company Name"
          value={values.company}
          onChange={(val) => onChange("company", val)}
          error={errors.company}
          delay={0.2}
        />
        <FloatingInput
          label="Email Address"
          value={values.email}
          onChange={(val) => onChange("email", val)}
          type="email"
          error={errors.email}
          delay={0.25}
        />
        <FloatingInput
          label="Website"
          value={values.website}
          onChange={(val) => onChange("website", val)}
          type="url"
          required={false}
          error={errors.website}
          delay={0.3}
        />
      </div>
    </div>
  );
}
