"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function HyundaiProjectOverview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current?.querySelector(".reveal-text") as HTMLElement;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(el.querySelectorAll(".word"), {
          opacity: 1,
          color: (i, target) => {
            const isHighlight = target.closest(".highlight") !== null;
            return isHighlight ? "#d61e1b" : "#1a1a2e";
          },
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
        scale: (i, target) => (target.closest(".highlight") ? 0.96 : 1),
        transformOrigin: "center center",
      });

      let currentDelay = 0;
      const delays = split.words.map((word, i) => {
        const htmlWord = word as HTMLElement;
        const isHighlight = htmlWord.closest(".highlight") !== null;
        const prevIsHighlight =
          i > 0 &&
          (split.words[i - 1] as HTMLElement).closest(".highlight") !== null;

        if (isHighlight && !prevIsHighlight) {
          currentDelay += 0.07;
        } else {
          currentDelay += 0.03;
        }

        htmlWord.dataset.finalColor = isHighlight ? "#d61e1b" : "#1a1a2e";
        return currentDelay;
      });

      // Create the reveal animation matching branding-creative
      gsap.to(split.words, {
        opacity: 1,
        color: (i, target) =>
          (target as HTMLElement).dataset.finalColor || "#1a1a2e",
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

      return () => {
        split.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section className="w-full bg-white py-24 md:py-36 flex justify-center font-sans overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .reveal-text .word {
            display: inline-block;
            margin: 0 0.12em;
            will-change: transform, opacity, color;
          }
        `,
        }}
      />

      <div
        ref={containerRef}
        className="max-w-[1350px] w-full px-8 md:px-16 flex flex-col items-center"
      >
        {/* Label Tag */}
        <div className="mb-8 self-start md:self-center">
          <span className="inline-block text-base md:text-xl font-heading font-semibold text-[#d61e1b] tracking-wider uppercase bg-[#fdf2f2] border border-[#f8d7d7] px-6 py-2 rounded-full">
            Project Overview
          </span>
        </div>

        {/* Main Text Content */}
        <div className="w-full max-w-[1100px] mx-auto">
          <p className="intro-paragraph reveal-text text-[clamp(24px,3.8vw,52px)] font-semibold text-[#1a1a2e] leading-[1.38] tracking-tight font-heading text-left md:text-center">
            Hyundai Mobis is one of the world&apos;s leading automotive parts manufacturers, providing{" "}
            <span className="highlight text-[#d61e1b] font-bold">
              genuine components
            </span>{" "}
            designed to ensure vehicle safety, reliability, and performance.
            <br className="hidden md:inline" /><br className="hidden md:inline" />
            The challenge was to strengthen awareness of genuine Hyundai Mobis parts while educating customers about the risks of counterfeit alternatives. The brand needed a digital strategy that would{" "}
            <span className="highlight text-[#d61e1b] font-bold">
              build trust
            </span>{" "}
            among vehicle owners, service centers, and automotive enthusiasts.
          </p>
        </div>
      </div>
    </section>
  );
}
