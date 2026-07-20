"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const BrandingIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const pills = [
    "Identity",
    "Campaigns",
    "Design Systems",
    "Content Strategy",
    "Leverage Influencers",
  ];

  useGSAP(() => {
    const el = containerRef.current?.querySelector(".reveal-text") as HTMLElement;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Just render the paragraph at full opacity/color with no animation
      gsap.set(el.querySelectorAll(".word"), { 
        opacity: 1, 
        color: (i, target) => {
          const isHighlight = target.closest(".highlight") !== null;
          return isHighlight ? "#2563eb" : "#1a1a2e";
        }
      });
      return;
    }

    // Split paragraph into words
    const split = new SplitText(el, {
      type: "words",
      wordsClass: "word",
    });

    // Set initial dimmed state
    gsap.set(split.words, {
      opacity: 0.25,
      color: "#9ca3af",
      scale: (i, target) => target.closest(".highlight") ? 0.96 : 1,
      transformOrigin: "center center"
    });

    // Precalculate final colors and custom staggered delays
    let currentDelay = 0;
    const delays = split.words.map((word, i) => {
      const htmlWord = word as HTMLElement;
      const isHighlight = htmlWord.closest(".highlight") !== null;
      const prevIsHighlight = i > 0 && (split.words[i - 1] as HTMLElement).closest(".highlight") !== null;

      // Highlighted words get a slightly larger delay/gap before their reveal starts
      if (isHighlight && !prevIsHighlight) {
        currentDelay += 0.07; 
      } else {
        currentDelay += 0.03; 
      }

      htmlWord.dataset.finalColor = isHighlight ? "#2563eb" : "#1a1a2e";
      return currentDelay;
    });

    // Create the reveal animation
    gsap.to(split.words, {
      opacity: 1,
      color: (i, target) => (target as HTMLElement).dataset.finalColor || "#1a1a2e",
      scale: 1,
      stagger: (i) => delays[i],
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1,
      },
    });

    // Pills staggered fade-up
    gsap.from(".intro-pill", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".intro-pill-container",
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });

    return () => {
      split.revert();
    };
  }, { scope: containerRef });

  return (
    <section className="w-full bg-white py-28 md:py-36 flex justify-center font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          .reveal-text .word {
            display: inline-block;
            margin: 0 0.12em;
            will-change: transform, opacity, color;
          }
        `
      }} />

      <div
        ref={containerRef}
        className="max-w-[1350px] w-full px-8 md:px-16 flex flex-col items-center"
      >
        {/* Paragraph Description */}
        <div className="w-full max-w-[1050px] mx-auto">
          <p className="intro-paragraph reveal-text text-[clamp(24px,4.0vw,54px)] font-semibold text-[#1a1a2e] leading-[1.38] tracking-tight font-heading mx-auto text-center">
            We combine strategic thinking<br className="hidden md:inline" />
            with creative execution to build brands<br className="hidden md:inline" />
            that are <span className="highlight text-[#2563eb] font-bold">visually distinctive</span>,<br className="hidden md:inline" />
            <span className="highlight text-[#2563eb] font-bold">emotionally engaging</span>,<br className="hidden md:inline" />
            and positioned for long-term growth.<br className="hidden md:inline" /><br className="hidden md:inline" />
            From identity creation to campaign storytelling,<br className="hidden md:inline" />
            every element is designed to create<br className="hidden md:inline" />
            consistency, relevance,<br className="hidden md:inline" />
            and <span className="highlight text-[#2563eb] font-bold">impact</span> across every touchpoint.
          </p>
        </div>

        {/* Pills / Tags Section */}
        <div 
          className="intro-pill-container mt-16 flex flex-wrap gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5 w-full justify-center"
        >
          {pills.map((pill, idx) => (
            <div
              key={idx}
              className="intro-pill inline-flex items-center justify-center rounded-full border border-[#fce4bd] bg-[#fdf2df] px-8 py-3 text-center text-sm md:text-[17px] font-semibold text-[#064ed3] shadow-xs transition-all duration-300 cursor-pointer hover:scale-[1.04] hover:bg-[#faeacb] hover:border-[#f9d79c] active:scale-[0.98]"
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandingIntro;

