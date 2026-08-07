"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const AboutHero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];

    // Title line mask reveal
    const leftTitleSplit = SplitText.create(".hero-left-title", {
      type: "lines",
      mask: "lines",
    });
    splits.push(leftTitleSplit);

    gsap.from(leftTitleSplit.lines, {
      yPercent: 110,
      opacity: 0,
      rotationX: -10,
      transformOrigin: "0% 50% -50px",
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
    });

    // Right subtitle line mask reveal
    const rightTitleSplit = SplitText.create(".hero-right-title", {
      type: "lines",
      mask: "lines",
    });
    splits.push(rightTitleSplit);

    gsap.from(rightTitleSplit.lines, {
      yPercent: 110,
      opacity: 0,
      rotationX: -10,
      transformOrigin: "0% 50% -50px",
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.08,
      delay: 0.2,
    });

    // Description paragraph fade up
    gsap.from(".hero-desc", {
      y: 30,
      opacity: 0,
      duration: 1.0,
      ease: "power3.out",
      delay: 0.5,
    });

    // Cursor-tracking radial gradient background animation
    const container = containerRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      gsap.to(container, {
        "--mouse-x": x,
        "--mouse-y": y,
        duration: 1.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      splits.forEach((s) => s.revert());
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center pt-28 pb-16 text-white"
      style={{
        "--mouse-x": 0,
        "--mouse-y": 0,
        background: "radial-gradient(circle at calc(var(--mouse-x, 0) * 1%) calc(var(--mouse-y, 0) * 1%), #03369c 0%, #012252 50%, #011330 100%)",
      } as React.CSSProperties}
    >
      {/* Globe Watermark in Right Bottom of Page */}
      <div className="absolute right-30 bottom-0 w-[280px] h-[280px] md:w-[420px] md:h-[420px] opacity-55 pointer-events-none z-0">
        <Image
          src="/images/Logo_01.png"
          alt="Adapts Globe Grid"
          fill
          sizes="(max-width: 768px) 420px, 620px"
          className="object-contain"
          priority
        />
      </div>

      {/* Hero Content */}
      <div className="grid grid-cols-1 z-10 gap-8 min-[1200px]:grid-cols-2 max-w-[1350px] 2xl:max-w-[1600px] w-full px-8 md:px-16">
        {/* Left Side */}
        <div className="flex items-center justify-center">
          <h1 className="hero-left-title text-5xl tracking-wide md:text-7xl font-opensans font-medium leading-[1.2] pb-4 text-left">
            About Us
          </h1>
        </div>

        {/* Right Side */}
        <div className="relative z-10 flex flex-col justify-center items-start text-left max-w-lg mx-auto w-full">
          <h2 className="hero-right-title mb-6 text-3xl leading-snug md:text-5xl font-opensans font-normal leading-[1.2] pb-2 text-left w-full">
            Built for Brands <br /> That Want to Grow, <br/> Not Just Exist.
          </h2>
          <p className="hero-desc text-2xl font-opensans font-extralight leading-tight tracking-wide text-white text-left w-full">
            We’re a new-age marketing agency combining strategy, creativity, and performance to help brands move faster, connect deeper, and scale smarter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;