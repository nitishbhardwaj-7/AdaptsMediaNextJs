"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import SocialBar from "@/components/layout/SocialBar";
import ArrowButton from "@/components/buttons/ArrowButton";
import { motion } from "framer-motion";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
      <main className="flex-grow flex flex-col items-center justify-center relative overflow-hidden px-6 py-24 md:py-32">
        {/* Decorative elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c42a27] blur-[120px] rounded-full pointer-events-none" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[#3b6ef5] blur-[100px] rounded-full pointer-events-none" 
        />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[120px] md:text-[200px] font-bold leading-none tracking-tighter bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent mb-4"
          >
            404
          </motion.h1>
          
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-['Cormorant_Garamond'] italic mb-6"
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/60 font-thin mb-12 max-w-md mx-auto leading-relaxed"
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved to another universe.
          </motion.p>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/">
              <ArrowButton title="Back to Home" width="md" />
            </Link>
          </motion.div>
        </div>

        {/* Floating particles - only render on client to avoid hydration mismatch */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  opacity: 0 
                }}
                animate={{ 
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute bg-white/20 rounded-full w-1 h-1 md:w-2 md:h-2"
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


