"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatsCard from "../cards/StatCard";
import ArrowButton from "../buttons/ArrowButton";
import YellowButton from "../buttons/YellowButton";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger, useGSAP);

const OrangeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgOrbRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  // Pre-split content to ensure SSR safety and eliminate layout shifts (FOUC-free)
  const headlineLines = [
    "A New-Age Agency",
    "Built for Today's Brands"
  ];

  const introWords = [
    "We", "combine", "strategy,", "creativity,", "and", "technology", 
    "to", "deliver", "marketing", "that", "performs", "not", "just", "looks", "good."
  ];

  const bodyParagraph1 = [
    "In today's fast-moving digital landscape, visibility alone isn't enough.",
    "Brands need clarity, consistency, and performance at every touchpoint."
  ];

  const bodyParagraph2 = [
    "We are a new-generation agency built to bridge that gap — bringing together",
    "strategic thinking, creative excellence, and data-driven execution under one",
    "roof. Every solution we design is rooted in understanding your business, your",
    "audience, and your growth ambitions."
  ];

  useGSAP(() => {
    const cleanups: (() => void)[] = [];
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;

    // --- 1. Background Orb Ambient Float Animation ---
    if (bgOrbRef.current) {
      gsap.to(bgOrbRef.current, {
        scale: 1.15,
        x: "+=25",
        y: "-=35",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Floating blobs ambient float
    const blobs = gsap.utils.toArray<HTMLElement>(".floating-blob");
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        x: () => gsap.utils.random(-30, 30),
        y: () => gsap.utils.random(-30, 30),
        scale: () => gsap.utils.random(0.9, 1.1),
        duration: () => gsap.utils.random(5, 8),
        delay: i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // --- 2. Interactive Cursor Glow / Orb Influence ---
    if (sectionRef.current && bgOrbRef.current) {
      const orbXTo = gsap.quickTo(bgOrbRef.current, "x", { duration: 1.2, ease: "power2.out" });
      const orbYTo = gsap.quickTo(bgOrbRef.current, "y", { duration: 1.2, ease: "power2.out" });

      const onMouseMove = (e: MouseEvent) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        // Calculate offset from center to influence orb position
        const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
        
        orbXTo(x);
        orbYTo(y);
      };

      sectionRef.current.addEventListener("mousemove", onMouseMove);
      cleanups.push(() => {
        sectionRef.current?.removeEventListener("mousemove", onMouseMove);
      });
    }

    // --- 3. Magnetic CTA Buttons Hover Effect ---
    if (sectionRef.current) {
      const magButtons = sectionRef.current.querySelectorAll<HTMLElement>(".magnetic-button");
      magButtons.forEach((btn: HTMLElement) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.6, ease: "power2.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.6, ease: "power2.out" });

        const onMouseMoveBtn = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.45;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.45;
          xTo(x);
          yTo(y);
        };

        const onMouseLeaveBtn = () => {
          xTo(0);
          yTo(0);
        };

        btn.addEventListener("mousemove", onMouseMoveBtn);
        btn.addEventListener("mouseleave", onMouseLeaveBtn);
        cleanups.push(() => {
          btn.removeEventListener("mousemove", onMouseMoveBtn);
          btn.removeEventListener("mouseleave", onMouseLeaveBtn);
        });
      });
    }

    // --- 4. Master ScrollTrigger Timeline ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: isMobile ? "+=100%" : "+=150%", // Pinned shorter on mobile to improve UX
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
      }
    });

    // Selectors
    const headlineLinesElements = gsap.utils.toArray<HTMLElement>(".headline-line");
    const introWordsElements = gsap.utils.toArray<HTMLElement>(".intro-word");
    const importantWordsElements = gsap.utils.toArray<HTMLElement>(".important-word");
    const bodyLines = gsap.utils.toArray<HTMLElement>(".body-line");
    const cards = gsap.utils.toArray<HTMLElement>(".stats-card-3d");
    const statNumbers = gsap.utils.toArray<HTMLElement>(".stat-number");

    // Initialize state
    gsap.set(headlineLinesElements, {
      y: 20,
      opacity: 0,
      filter: "blur(4px)"
    });

    gsap.set(introWordsElements, {
      y: 10,
      opacity: 0,
      filter: "blur(3px)"
    });

    gsap.set(bodyLines, {
      y: 15,
      opacity: 0
    });

    gsap.set(cards, {
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
      x: (i) => [ -50, 55, -60, 60 ][i] || 0,
      y: (i) => [ 60, -70, -50, 60 ][i] || 0,
      rotate: (i) => [ -6, 6, -5, 5 ][i] || 0
    });

    // --- Scroll Choreography Sequence ---

    // A. Parallax Layers removed to stop movement while pinned


    // B. Zoom-in around 80% scroll
    tl.to(containerRef.current, {
      scale: 1.03,
      duration: 0.7,
      ease: "power2.inOut"
    }, 2.5);

    // --- Independent Text Reveal (Happens BEFORE pinning) ---
    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%", // Trigger when section is partially in view, before pinning at top
        toggleActions: "play none none none"
      }
    });

    // C. Headline Line-by-Line Reveal
    introTl.to(headlineLinesElements, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.0,
      ease: "power2.out",
      stagger: 0.2
    }, 0);

    // E. Intro Paragraph Word-by-Word Reveal
    introTl.to(introWordsElements, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: 0.04,
      ease: "power2.out"
    }, 0.5);

    // F. Important Words Brightness Pulse
    importantWordsElements.forEach((el) => {
      const idx = introWordsElements.indexOf(el);
      const revealTime = 0.5 + (idx * 0.04);
      introTl.to(el, {
        filter: "brightness(1.5)",
        textShadow: "0 0 12px rgba(255, 255, 255, 0.45)",
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      }, revealTime);
    });

    // G. Body Copy Line-by-Line Reveal
    bodyLines.forEach((line, i) => {
      const time = 1.0 + (i * 0.15);
      introTl.to(line, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power2.out"
      }, time);
    });

    // H. Closing Statement (climax scale, letter-space tighten, blur fade)
    tl.fromTo(closingRef.current,
      {
        opacity: 0,
        scale: 0.96,
        letterSpacing: "0.04em",
        filter: "blur(8px) brightness(0.9)"
      },
      {
        opacity: 1,
        scale: 1,
        letterSpacing: "-0.01em",
        filter: "blur(0px) brightness(1.15)",
        duration: 1.4,
        ease: "power4.out"
      },
      2.6
    );

    // Pause/Hold climax
    tl.to({}, { duration: 0.5 });

    // I. CTA Buttons Slide up & scale
    tl.fromTo(".magnetic-button",
      {
        y: 35,
        rotate: 2,
        scale: 0.9,
        opacity: 0
      },
      {
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
      },
      3.1
    );

    // J. Right Stats Cards Composition (overshoot inertia)
    tl.to(cards, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      rotate: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: "back.out(1.1)" // Slight overshoot inertia landing
    }, 0.6);

    // K. Stat Numbers Count-Up
    const countTargets = [
      { val: 100, suffix: "+" },
      { val: 500, suffix: "+" },
      { val: 3, suffix: "X" },
      { val: 5, suffix: "+" }
    ];

    statNumbers.forEach((el, index) => {
      const target = countTargets[index];
      if (!target) return;
      const countObj = { val: 0 };
      
      tl.to(countObj, {
        val: target.val,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          el.innerText = Math.floor(countObj.val) + target.suffix;
        },
        onComplete: () => {
          gsap.fromTo(el,
            { scale: 1.18, color: "#FFFFFF" },
            { scale: 1, color: "#FAC02E", duration: 0.45, ease: "power2.out" }
          );
        }
      }, 0.8 + index * 0.15);
    });

    // L. Cards Ambient floating loops (Trigger after entry composition finishes)
    tl.add(() => {
      cards.forEach((card, i) => {
        gsap.to(card, {
          x: "random(-6, 6)",
          y: "random(-10, 10)",
          rotate: "random(-1, 1)",
          duration: gsap.utils.random(4, 7),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.25
        });
      });
    }, 2.0);

    // Cleanup
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#C52A27] text-white py-24 z-20"
    >
      {/* Background System */}
      <div ref={bgRef} className="absolute -inset-y-12 inset-x-0 z-0 select-none pointer-events-none bg-[#C52A27]">
        {/* Background Image Layer (Original) */}
        <Image
          src="/images/About_Us_Bg.png"
          alt="Background"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Large Orb Behind Cards (Soft yellow glow, doesn't darken) */}
        <div
          ref={bgOrbRef}
          className="absolute w-[380px] h-[380px] md:w-[550px] md:h-[550px] rounded-full bg-[#FAC02E]/20 filter blur-[110px] top-[15%] right-[-12%] z-10 will-change-transform pointer-events-none"
        />

        {/* Background Video Layer (Original) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-10 top-1/2 -translate-y-1/2 right-0 w-[50%] h-[70%] object-cover opacity-30 mix-blend-multiply pointer-events-none"
          style={{
            maskImage: "radial-gradient(circle, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 80%)",
          }}
        >
          <source src="/assets/video_bg2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Structural Container */}
      <div
        ref={containerRef}
        className="relative z-30 max-w-[1350px] w-full px-6 sm:px-8 md:px-16 will-change-transform"
      >
        <div className="flex flex-col min-[1200px]:flex-row justify-between gap-12 md:gap-16 items-center">
          
          {/* LEFT COLUMN */}
          <div ref={leftColRef} className="flex flex-col w-full min-[1200px]:w-[55%] will-change-[transform,opacity]">
            <div className="w-full">
              
              {/* Animated Line-split Headline */}
              <h1 className="text-[clamp(1.8rem,3.4vw,4.2rem)] font-normal tracking-tight leading-tight text-white mb-6 md:mb-8">
                {headlineLines.map((line, idx) => (
                  <span key={idx} className="block overflow-hidden py-[0.25em] -my-[0.25em]">
                    <span className="headline-line inline-block origin-bottom-left will-change-[transform,opacity,filter]">
                      {line}
                    </span>
                  </span>
                ))}
              </h1>

              {/* Word-by-word Intro Paragraph */}
              <h2 className="text-[clamp(1.05rem,1.5vw,1.6rem)] mb-6 text-gray-200 font-thin font-sans leading-relaxed">
                {introWords.map((word, idx) => {
                  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
                  const important = ["strategy", "creativity", "technology", "marketing", "performs"].includes(cleanWord);
                  return (
                    <span
                      key={idx}
                      className={`intro-word inline-block mr-[0.22em] will-change-[transform,opacity,filter] ${
                        important ? "font-normal text-white important-word" : "opacity-80"
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </h2>

              {/* Line-masked supporting body copy */}
              <div className="mb-4">
                {bodyParagraph1.map((line, idx) => (
                  <span key={idx} className="block overflow-hidden py-[0.2em] -my-[0.2em]">
                    <span className="body-line inline-block text-[clamp(0.85rem,1.05vw,1.02rem)] text-white/90 font-thin leading-relaxed will-change-[transform,opacity]">
                      {line}
                    </span>
                  </span>
                ))}
              </div>

              <div className="mb-8">
                {bodyParagraph2.map((line, idx) => (
                  <span key={idx} className="block overflow-hidden py-[0.2em] -my-[0.2em]">
                    <span className="body-line inline-block text-[clamp(0.85rem,1.05vw,1.02rem)] text-white/90 font-thin leading-relaxed will-change-[transform,opacity]">
                      {line}
                    </span>
                  </span>
                ))}
              </div>

              {/* Emotional climax closing statement */}
              <div ref={closingRef} className="mb-8 opacity-0 will-change-[transform,opacity,filter] py-2">
                <h2 className="text-[clamp(1.1rem,1.8vw,1.65rem)] bg-gradient-to-r from-white to-[#FAC02E] bg-clip-text text-transparent font-heading font-medium leading-tight">
                  We don&apos;t just deliver campaigns. <br /> We build momentum.
                </h2>
              </div>

              {/* Interactive CTA Buttons */}
              <div ref={buttonsContainerRef} className="orange-cta flex flex-wrap justify-start gap-4 sm:gap-6 items-center">
                <div className="magnetic-button p-4 -m-4">
                  <ArrowButton title="Read More" width="md" />
                </div>
                <div className="magnetic-button p-4 -m-4">
                  <YellowButton title="Start a Project" variant="red" width="md" href="/start-project" />
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN (Stats Cards) */}
          <div
            ref={rightColRef}
            className="flex gap-4 md:gap-6 mt-8 w-auto lg:w-auto lg:flex-shrink lg:justify-start min-[1200px]:-translate-x-4 min-[1400px]:-translate-x-8 will-change-[transform]"
            style={{ perspective: "1000px" }}
          >
            <div className="flex flex-col gap-3 sm:gap-4 lg:flex-none">
              <StatsCard className="stats-card-3d" value="100+" title={`Brands Scaled\n Across Industries`} useGsapCount={true} />
              <StatsCard className="stats-card-3d" value="500+" title={`Successfully Executed Campaigns`} useGsapCount={true} />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 mt-6 md:mt-8 flex-1 lg:flex-none">
              <StatsCard className="stats-card-3d" value="3X" title={`Average Campaign Performance Uplift`} useGsapCount={true} />
              <StatsCard className="stats-card-3d" value="5+" title={`Key Market Presence`} useGsapCount={true} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OrangeSection;