"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

interface StepWelcomeProps {
  onNext: () => void;
}

export default function StepWelcome({ onNext }: StepWelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center pb-10">
      {/* Warm gradient blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(197,42,39,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(250,192,45,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.15, 1], x: [0, -25, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo */}
      <motion.div
        className="mb-8 relative w-40 h-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image src="/images/footerlogo.png" alt="Adapts Media" fill sizes="160px" className="object-contain" />
      </motion.div>



      {/* Title */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[-0.03em] text-white mb-6 leading-[1.05]"
        style={{ fontFamily: "var(--font-heading), sans-serif" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        Let&apos;s Build
        <br />
        <span
          className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FAC02D] to-[#C52A27]"
        >
          Something Exceptional
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-sm sm:text-base md:text-lg text-white/50 font-light max-w-lg mx-auto mb-12 leading-relaxed font-sans"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        Tell us about your vision. We&apos;ll help transform it
        <br className="hidden sm:block" />
        into a digital experience that moves people.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#C52A27] to-[#FAC02D] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
        <MagneticButton onClick={onNext} variant="primary">
          Start Your Project
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </MagneticButton>
      </motion.div>


    </div>
  );
}
