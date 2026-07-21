"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaLinkedinIn,
  FaInstagram,
  FaBehance,
  FaDribbble,
  FaArrowUp,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";
import ArrowButton from "@/components/buttons/ArrowButton";
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
  const lenis = useLenis();
  const footerRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  const [isCopied, setIsCopied] = useState(false);

  // Helper to render split words cleanly without layout shifts or FOUC
  const renderSplitWords = (text: string, className: string) => {
    return text.split(" ").map((word, idx) => (
      <span
        key={idx}
        className="inline-block overflow-hidden py-[0.1em] mr-[0.25em] select-none"
      >
        <span
          className={`${className} inline-block origin-bottom-left will-change-[transform,filter,opacity]`}
        >
          {word}
        </span>
      </span>
    ));
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".footer-cta-word", { yPercent: 0, opacity: 1, filter: "none" });
        gsap.set([paragraphRef.current, buttonWrapperRef.current, gridSectionRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // Initial states matching BlueSection / ServicesSection
      const ctaWords = gsap.utils.toArray<HTMLElement>(".footer-cta-word");
      gsap.set(ctaWords, {
        yPercent: 105,
        filter: "blur(6px)",
        rotate: 1.5,
        opacity: 0,
      });

      gsap.set(paragraphRef.current, { opacity: 0, y: 24 });
      gsap.set(buttonWrapperRef.current, { opacity: 0, y: 30 });
      gsap.set(gridSectionRef.current, { opacity: 0, y: 40 });

      // 1. Entrance Timeline on Scroll into view
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      entranceTl
        .to(ctaWords, {
          yPercent: 0,
          filter: "blur(0px)",
          rotate: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.05,
        })
        .to(
          paragraphRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          buttonWrapperRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // 2. Smooth Scroll Pinning & Transition into Footer Grid
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      pinTl
        .to(
          ".footer-cta-heading",
          {
            y: -20,
            scale: 0.98,
            opacity: 0.9,
            ease: "none",
          },
          0
        )
        .to(
          paragraphRef.current,
          {
            y: -15,
            opacity: 0.8,
            ease: "none",
          },
          0
        )
        .to(
          gridSectionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "none",
          },
          0.4
        );
    },
    { scope: footerRef }
  );

  // Smooth Back to Top Scroll
  const handleBackToTop = () => {
    if (backToTopRef.current) {
      gsap.to(backToTopRef.current.querySelector(".top-arrow"), {
        rotate: -360,
        duration: 0.6,
        ease: "power3.out",
      });
    }

    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@adaptsmedia.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#064ED3] text-white font-sans overflow-hidden selection:bg-white selection:text-[#064ED3]"
    >
      {/* Background Texture System — Matches BlueSection & ServicesSection */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#064ED3] to-[#050b18]" />
        <Image
          src="/images/Services_Bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute pointer-events-none object-cover opacity-50 mix-blend-overlay"
        />
        {/* Soft Ambient Light Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0052FF]/25 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[400px] bg-sky-400/15 rounded-full blur-[140px]" />
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1 — FINAL CTA (100vh) */}
      {/* ========================================================================= */}
      <section
        ref={ctaSectionRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-8 md:px-16 py-20 z-20"
      >
        <div className="max-w-[1350px] w-full mx-auto text-center flex flex-col items-center justify-center">
          {/* Main Editorial Headline with Bolder OpenSans */}
          <h2 className="footer-cta-heading text-4xl sm:text-6xl md:text-7xl lg:text-[90px] font-heading font-normal tracking-tight leading-[1.1] text-white mb-8 max-w-5xl">
            {renderSplitWords(
              "Let's Build Something Extraordinary Together.",
              "footer-cta-word"
            )}
          </h2>

          {/* Subtitle Paragraph */}
          <p
            ref={paragraphRef}
            className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12 will-change-[transform,opacity]"
          >
            Whether you&apos;re launching a brand, scaling globally, or building the next
            digital experience, we&apos;re ready to create something unforgettable.
          </p>

          {/* Standard Adapts Media Arrow Button */}
          <div
            ref={buttonWrapperRef}
            className="will-change-[transform,opacity]"
          >
            <Link href="/contact" className="inline-block">
              <ArrowButton title="Start Your Project" width="lg" variant="light" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 & 3 — EDITORIAL FOOTER GRID LAYOUT */}
      {/* ========================================================================= */}
      <section
        ref={gridSectionRef}
        className="relative w-full pt-16 pb-12 px-6 sm:px-8 md:px-16 border-t border-white/10 bg-[#080d1a]/95 backdrop-blur-xl z-20 will-change-[transform,opacity]"
      >
        <div className="max-w-[1350px] mx-auto">
          {/* Main Grid Layout: 3 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
            {/* COLUMN 1: Brand Info & Availability (Span 5) */}
            <div className="lg:col-span-5 flex flex-col items-start space-y-6">
              {/* Logo */}
              <Link href="/" className="group inline-block relative">
                <div className="relative w-56 h-12 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/images/footerlogo.png"
                    alt="Adapts Media Logo"
                    fill
                    sizes="(max-width: 768px) 224px, 224px"
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              {/* Description */}
              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-sm font-light">
                We create digital experiences that move brands forward through design,
                technology and storytelling.
              </p>

              {/* Availability Indicator */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium backdrop-blur-md">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                  </span>
                  <span>Available for Projects</span>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Navigation Links (Span 4) */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-6">
                  Navigation
                </h3>
                <ul className="space-y-4">
                  {[
                    { name: "Work", href: "/portfolio" },
                    { name: "Services", href: "/services" },
                    { name: "About", href: "/about-us" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group relative inline-flex items-center text-white/80 text-sm md:text-base font-light transition-all duration-300 hover:text-white"
                      >
                        <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                          {link.name}
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-6 opacity-0 md:opacity-100">
                  Explore
                </h3>
                <ul className="space-y-4">
                  {[
                    { name: "Case Studies", href: "/portfolio" },
                    { name: "Insights", href: "/blogs" },
                    { name: "Contact", href: "/contact" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group relative inline-flex items-center text-white/80 text-sm md:text-base font-light transition-all duration-300 hover:text-white"
                      >
                        <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                          {link.name}
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COLUMN 3: Contact & Locations & Socials (Span 3) */}
            <div className="lg:col-span-3 flex flex-col space-y-8">
              {/* Contact Email */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-4">
                  Contact
                </h3>
                <button
                  onClick={handleCopyEmail}
                  className="group flex items-center gap-3 text-white/90 text-sm md:text-base font-light hover:text-white transition-colors duration-300 text-left cursor-pointer"
                >
                  <FaEnvelope className="text-white/60 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>hello@adaptsmedia.com</span>
                  {isCopied && (
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Copied!
                    </span>
                  )}
                </button>
              </div>

              {/* Global Hubs */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-3">
                  Locations
                </h3>
                <div className="flex items-center gap-3 text-xs md:text-sm text-white/80">
                  <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    <FaLocationDot className="text-white/60 w-3 h-3" /> Dubai
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    <FaLocationDot className="text-white/60 w-3 h-3" /> India
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-4">
                  Socials
                </h3>
                <div className="flex items-center gap-3">
                  {[
                    {
                      name: "LinkedIn",
                      icon: <FaLinkedinIn className="w-4 h-4" />,
                      href: "https://linkedin.com",
                    },
                    {
                      name: "Instagram",
                      icon: <FaInstagram className="w-4 h-4" />,
                      href: "https://instagram.com",
                    },
                    {
                      name: "Behance",
                      icon: <FaBehance className="w-4 h-4" />,
                      href: "https://behance.net",
                    },
                    {
                      name: "Dribbble",
                      icon: <FaDribbble className="w-4 h-4" />,
                      href: "https://dribbble.com",
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="group w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300"
                    >
                      <span className="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM COPYRIGHT BAR */}
          {/* ========================================================================= */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60 font-light">
            {/* Left */}
            <div>
              <p>© 2026 Adapts Media. All rights reserved.</p>
            </div>

            {/* Center */}
            <div className="text-center">
              <p>Designed &amp; Developed with precision.</p>
            </div>

            {/* Right: Back To Top Button */}
            <div>
              <button
                ref={backToTopRef}
                onClick={handleBackToTop}
                className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <span>Back to Top</span>
                <span className="top-arrow flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/15 group-hover:bg-white group-hover:text-[#064ED3] transition-all duration-300">
                  <FaArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}