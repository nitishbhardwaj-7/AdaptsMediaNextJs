"use client";

import { motion } from "framer-motion";
import { TOTAL_STEPS } from "./types";

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const progress = currentStep === 0 ? 0 : (currentStep / (TOTAL_STEPS - 1)) * 100;

  if (currentStep === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-[2px] bg-white/5 w-full">
        <motion.div
          className="h-full relative"
          style={{
            background: "linear-gradient(90deg, #C52A27 0%, #FAC02D 100%)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-4 rounded-full"
            style={{
              background: "radial-gradient(ellipse at right, rgba(250,192,45,0.5), transparent)",
              filter: "blur(3px)",
            }}
          />
        </motion.div>
      </div>


    </div>
  );
}
