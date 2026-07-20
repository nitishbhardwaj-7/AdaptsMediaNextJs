"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

type AwardCardProps = {
  awardName: string;
  imagePath: string;
};

export default function AwardCard({ awardName, imagePath }: AwardCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    const logo = logoRef.current;
    const text = textRef.current;
    const glow = glowRef.current;

    if (!container || !card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate relative coordinates from center (-1 to 1)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / centerY) * 4; // max 4 deg for subtle elegant tilt
      const rotateY = ((x - centerX) / centerX) * 4;

      // Dynamic tilt (weighted, premium lag)
      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        ease: "power3.out",
        duration: 1.2,
        overwrite: "auto"
      });

      // Holographic depth offsets (weighted, premium lag)
      if (logo) {
        gsap.to(logo, {
          x: ((x - centerX) / centerX) * 4,
          y: ((y - centerY) / centerY) * 4,
          ease: "power3.out",
          duration: 1.2,
          overwrite: "auto"
        });
      }

      if (text) {
        gsap.to(text, {
          x: ((x - centerX) / centerX) * 2,
          y: ((y - centerY) / centerY) * 2,
          ease: "power3.out",
          duration: 1.2,
          overwrite: "auto"
        });
      }

      // Spotlight Glow movement
      if (glow) {
        gsap.to(glow, {
          left: x - 100,
          top: y - 100,
          opacity: 0.15,
          ease: "power3.out",
          duration: 1.2,
          overwrite: "auto"
        });
      }
    };

    const handleMouseLeave = () => {
      // Smoothly reset card tilt
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "power3.out",
        duration: 1.4,
        overwrite: "auto"
      });

      // Reset depth offsets
      if (logo) {
        gsap.to(logo, { x: 0, y: 0, ease: "power3.out", duration: 1.4, overwrite: "auto" });
      }
      if (text) {
        gsap.to(text, { x: 0, y: 0, ease: "power3.out", duration: 1.4, overwrite: "auto" });
      }

      // Fade out glow spotlight
      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          ease: "power3.out",
          duration: 1.4,
          overwrite: "auto"
        });
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: containerRef });

  return (
    /* 1. Interactive Wrapper */
    <div ref={containerRef} className="h-[14rem] w-full max-w-[22rem] mx-auto cursor-pointer flex items-center justify-center">
      
      {/* 2. Main Card Body with 3D Styles */}
      <div 
        ref={cardRef} 
        className="relative h-full w-full flex flex-col items-center justify-center px-3 py-6 backdrop-blur-md bg-white/[0.02] border border-white/10 border-t-white/25 border-l-white/25 rounded-[2rem] rounded-tl-none text-white overflow-hidden transition-colors duration-300 hover:bg-white/[0.05] hover:border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Spotlight light-reflection gradient */}
        <div 
          ref={glowRef}
          className="absolute w-[200px] h-[200px] rounded-full pointer-events-none opacity-0 blur-2xl z-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
            transform: 'translate3d(0, 0, 0)'
          }}
        />

        {/* 5. Logo Image (Popped forward significantly) */}
        <div 
          ref={logoRef}
          className="w-28 h-28 mb-3 flex items-center justify-center relative z-20 shrink-0"
          style={{ transform: 'translateZ(40px)' }}
        >
          <Image 
            src={imagePath} 
            alt=''
            fill
            sizes="(max-width: 768px) 140px, 140px"
            className="object-contain drop-shadow-2xl" 
          />
        </div>

        <div 
          ref={textRef}
          className="text-center relative z-20"
          style={{ transform: 'translateZ(20px)' }}
        >
          <p 
            className="text-[14px] xl:text-[15px] font-heading font-light text-white/90 whitespace-nowrap"
            dangerouslySetInnerHTML={{ __html: awardName }}
          />
        </div>

        {/* 8. Border Glow Ring */}
        <div 
          className="absolute inset-0 rounded-[2rem] rounded-tl-none 
          shadow-[0_0_15px_rgba(255,255,255,0.15)] pointer-events-none z-30"
          style={{ transform: 'translateZ(10px)' }}
        />
        
      </div>
    </div>
  );
}