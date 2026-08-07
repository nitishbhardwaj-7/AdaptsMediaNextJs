"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BlogContentAnimator() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  // ── Pre-hide below-fold elements before browser paint ────────────────────
  // The featured image and hero elements are pre-hidden by server-rendered
  // inline styles in the JSX. This useLayoutEffect handles below-fold elements
  // that can't have SSR inline styles (dangerouslySetInnerHTML content, etc.)
  useLayoutEffect(() => {
    // All body content elements — hidden before GSAP batch runs
    const bodyEls = document.querySelectorAll(
      ".blog-body p, .blog-body h2, .blog-body h3, .blog-body ul, .blog-body ol, .blog-body blockquote, .blog-body table, .blog-body img"
    );
    gsap.set(bodyEls, { autoAlpha: 0, y: 28 });

    // Author section
    const authorSection = document.querySelector(".blog-author-section") as HTMLElement | null;
    if (authorSection) gsap.set(authorSection, { autoAlpha: 0, y: 50 });

    // Related posts heading
    const relatedHeading = document.querySelector(".blog-related-heading") as HTMLElement | null;
    if (relatedHeading) gsap.set(relatedHeading, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" });

    // Related post cards
    const relatedCards = document.querySelectorAll(".blog-related-card");
    gsap.set(relatedCards, { autoAlpha: 0, y: 50, scale: 0.96 });
  }, []);


  // ── Reading Progress Bar ───────────────────────────────────────────────────
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;

    const article = document.querySelector("article");
    if (!article) return;

    const update = () => {
      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      const articleHeight = article.offsetHeight;
      const scrolled = window.scrollY - articleTop;
      const progress = Math.min(Math.max(scrolled / (articleHeight - window.innerHeight), 0), 1);
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // ── Scroll Animations — all gsap.to() since elements are pre-hidden ───────
  useGSAP(() => {
    // Featured image — reveal on scroll enter
    gsap.to(".blog-featured-image", {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".blog-featured-image",
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    // Body content: reveal in batches as each enters viewport
    ScrollTrigger.batch(
      ".blog-body p, .blog-body h2, .blog-body h3, .blog-body ul, .blog-body ol, .blog-body blockquote, .blog-body table, .blog-body img",
      {
        start: "top 92%",
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.04,
          });
        },
      }
    );

    // Author section
    gsap.to(".blog-author-section", {
      autoAlpha: 1,
      y: 0,
      duration: 1.0,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".blog-author-section",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Related posts heading — wipe reveal
    gsap.to(".blog-related-heading", {
      autoAlpha: 1,
      clipPath: "inset(0 0% 0 0)",
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".blog-related-heading",
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    // Related post cards — staggered entrance
    ScrollTrigger.batch(".blog-related-card", {
      start: "top 88%",
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.1,
        });
      },
    });
  });

  return (
    <>
      {/* Sticky Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none">
        <div className="absolute inset-0 bg-black/10" />
        <div
          ref={progressBarRef}
          className="absolute inset-0 bg-[#FAC02E] origin-left"
          style={{ transform: "scaleX(0)", willChange: "transform" }}
        />
      </div>
    </>
  );
}
