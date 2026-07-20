"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText, useGSAP);

const ServicesHero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];

    // 1. Split and animate the main "Services" heading
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });
    splits.push(titleSplit);

    gsap.from(titleSplit.chars, {
      opacity: 0,
      yPercent: 120,
      rotateX: -90,
      stagger: 0.05,
      duration: 1.2,
      ease: "expo.out",
      transformOrigin: "50% 100%",
    });

    // 2. Split and animate the right side heading with masked lines
    const subtitleSplit = SplitText.create(".hero-subtitle", {
      type: "lines",
      mask: "lines",
    });
    splits.push(subtitleSplit);

    gsap.from(subtitleSplit.lines, {
      opacity: 0,
      yPercent: 110,
      rotationX: -12,
      transformOrigin: "0% 50% -60px",
      stagger: 0.1,
      duration: 1.2,
      ease: "expo.out",
      delay: 0.2,
    });

    // 3. Fade up the description paragraph
    gsap.from(".hero-desc", {
      opacity: 0,
      y: 28,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });

    // 4. Subtle zoom and fade on background image
    gsap.from(".hero-bg", {
      scale: 1.1,
      opacity: 0,
      duration: 1.8,
      ease: "power2.out",
    });

    return () => {
      splits.forEach((split) => split.revert());
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-br from-[#4c3592] via-[#e21b22] to-[#4c3592] flex items-center justify-center py-12 text-white">
      <Image
        src="/images/services/HeroMaskGroup.png" 
        alt="Hero Background"
        fill
        priority={true}
        sizes="100vw"
        quality={85}
        className="hero-bg absolute z-10 pointer-events-none object-cover" 
      />
      {/* Hero Content */}
      <div className="grid grid-cols-1 gap-8 min-[1200px]:grid-cols-2 max-w-[1350px] w-full px-8 md:px-16">
        {/* Left Side */}
        <div className="flex items-center">
          <h1 className="hero-title text-5xl tracking-wide md:text-7xl">
            Services
          </h1>
        </div>

        {/* Right Side */}
        <div className="relative z-10 flex flex-col justify-center max-w-md">
          <h2 className="hero-subtitle mb-6 text-3xl leading-snug md:text-5xl">
            Services Built to <br /> Drive Real Growth.
          </h2>
          <p className="hero-desc text-2xl font-extralight leading-tight tracking-wide text-white">
            From strategy to execution, we create integrated solutions 
            that help brands connect, perform, and scale.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;