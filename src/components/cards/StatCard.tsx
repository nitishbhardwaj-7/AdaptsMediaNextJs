"use client";
import { useEffect, useRef } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";

type StatsCardProps = {
  value: string;
  title: string;
  description?: string;
  direction?: "left" | "right";
  className?: string;
  useGsapCount?: boolean;
};


function Digit({ digit }: { digit: string }) {
  const isNumber = !isNaN(parseInt(digit));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 30, damping: 15, mass: 1 });

  useEffect(() => {
    if (isInView && isNumber) spring.set(parseInt(digit));
  }, [isInView, isNumber, digit, spring]);

  const y = useTransform(spring, (latest) => `${latest * -1}em`);
  if (!isNumber) return <span className="inline-block">{digit}</span>;

  return (
    <span ref={ref} className="relative inline-block h-[1em] overflow-hidden leading-none">
      <motion.span style={{ y }} className="flex flex-col">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[1em] flex items-center justify-center">{n}</span>
        ))}
      </motion.span>
    </span>
  );
}

export default function StatsCard({
  value,
  title,
  className = "",
  useGsapCount = false
}: StatsCardProps) {
  const characters = value.split("");

  return (
    <div
      className={`relative w-full sm:w-[15rem] h-[8.5rem] ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 1. THE CARD */}
      <div
        className="relative z-30 h-full w-full px-4 py-4 sm:px-6 sm:py-6 flex flex-col justify-center backdrop-blur-sm bg-transparent border border-white/10 border-t-white/30 border-l-white/30 rounded-[1.5rem] rounded-tl-none text-white transition-colors duration-500 ease-out hover:bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
        style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center text-4xl sm:text-[2.75rem] font-heading font-bold text-[#F5A623] drop-shadow-md">
          {useGsapCount ? (
            <span className="stat-number">{value}</span>
          ) : (
            characters.map((char, index) => (
              <Digit key={index} digit={char} />
            ))
          )}
        </div>
        <p className="text-xs sm:text-[0.95rem] font-heading font-normal max-w-full leading-snug opacity-100 whitespace-pre-line">
          {title}
        </p>
      </div>
    </div>
  );
}