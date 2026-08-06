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
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaArrowUp,
  FaEnvelope,
  FaGlobe,
  FaPhone,
  FaPaperPlane,
} from "react-icons/fa6";
import ArrowButton from "@/components/buttons/ArrowButton";
import SocialBar from "@/components/layout/SocialBar";
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
  const lenis = useLenis();
  const footerRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const socialBarRef = useRef<HTMLDivElement>(null);
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
        gsap.set([paragraphRef.current, buttonWrapperRef.current, socialBarRef.current, gridSectionRef.current], {
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
      gsap.set(socialBarRef.current, { opacity: 0, y: 36 });
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
        )
        .to(
          socialBarRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
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
          buttonWrapperRef.current,
          {
            y: -15,
            opacity: 0.8,
            ease: "none",
          },
          0
        )
        .to(
          socialBarRef.current,
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
    navigator.clipboard.writeText("info@adaptsmedia.com");
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
        className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 z-20"
      >
        <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full mx-auto px-8 md:px-16 text-center flex flex-col items-center justify-center">
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
            className="will-change-[transform,opacity] mb-10 md:mb-12"
          >
            <Link href="/contact" className="inline-block">
              <ArrowButton title="Start Your Project" width="lg" variant="light" />
            </Link>
          </div>

          {/* Integrated Social Bar with GSAP scroll entrance animation */}
          <div
            ref={socialBarRef}
            className="w-full will-change-[transform,opacity]"
          >
            <SocialBar />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 & 3 — FOOTER GRID LAYOUT WITH AWARDS */}
      {/* ========================================================================= */}
      <section
        ref={gridSectionRef}
        className="relative w-full pt-12 pb-10 bg-[#16171b] border-t border-white/10 text-white z-20 will-change-[transform,opacity]"
      >
        <div className="max-w-[1350px] 2xl:max-w-[1600px] w-full px-8 md:px-16 mx-auto">
          {/* Top Row: Logo & Social Icons */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 mb-10 border-b border-white/10">
            {/* Logo */}
            <Link href="/" className="group inline-block">
              <div className="relative w-52 h-10 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/footerlogo.png"
                  alt="Adapts Media Logo"
                  fill
                  sizes="(max-width: 768px) 208px, 208px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Top Right Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { name: "Facebook", icon: <FaFacebookF className="w-3.5 h-3.5" />, href: "https://facebook.com" },
                { name: "Twitter / X", icon: <FaXTwitter className="w-3.5 h-3.5" />, href: "https://x.com" },
                { name: "Instagram", icon: <FaInstagram className="w-3.5 h-3.5" />, href: "https://instagram.com" },
                { name: "LinkedIn", icon: <FaLinkedinIn className="w-3.5 h-3.5" />, href: "https://linkedin.com" },
                { name: "YouTube", icon: <FaYoutube className="w-3.5 h-3.5" />, href: "https://youtube.com" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Main Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-start mb-12">
            
            {/* COLUMN 1: About Us & Services (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col space-y-6">
              <Link href="/about-us" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors">
                About Us
              </Link>

              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Services</h4>
                <ul className="space-y-2 text-xs text-white/70 font-light">
                  <li><Link href="/services" className="hover:text-white transition-colors">SEM Agency</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Best Data Analytics Services</Link></li>
                  <li><Link href="/branding-creative" className="hover:text-white transition-colors">Creative Designing</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">SEO Services</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">SMS Campaign</Link></li>
                  <li><Link href="/social-content" className="hover:text-white transition-colors">Social Media Marketing</Link></li>
                  <li><Link href="/web-digital-experience" className="hover:text-white transition-colors">Web Development</Link></li>
                  <li><Link href="/performance-marketing" className="hover:text-white transition-colors">Display Campaign Management</Link></li>
                  <li><Link href="/performance-marketing" className="hover:text-white transition-colors">Programmatic Advertising</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Ad Operations for Advertising Agencies</Link></li>
                </ul>
              </div>
            </div>

            {/* COLUMN 2: Clients & Our Work & Head Office (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col space-y-6">
              <Link href="/portfolio" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors">
                Clients &amp; Our Work
              </Link>

              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Head Office - Dubai</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light mb-4">
                  702, Warsan Tower, Near Media Rotana,<br />
                  Tecom, Barsha Heights, Dubai,<br />
                  United Arab Emirates
                </p>
                <div className="text-xs text-white/70 leading-relaxed font-light space-y-1">
                  <p>Contact Number: +971 58 560 1701</p>
                  <p>Landline: +971 043257279</p>
                  <p>
                    Email:{" "}
                    <button onClick={handleCopyEmail} className="hover:text-white transition-colors inline-flex items-center gap-1.5 text-left cursor-pointer">
                      <span>Info@adaptsmedia.com</span>
                      {isCopied && <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Copied!</span>}
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Meet The Team, Blog, Other Location (lg:col-span-2) */}
            <div className="lg:col-span-2 flex flex-col space-y-6">
              <Link href="/about-us" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors">
                Meet The Team
              </Link>

              <div>
                <Link href="/blogs" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors block mb-3">
                  Blog
                </Link>
                <h4 className="text-sm font-semibold text-white mb-3">Other Location</h4>
                <ul className="space-y-1.5 text-xs text-white/70 font-light">
                  <li>India</li>
                  <li>Philippines</li>
                  <li>London</li>
                  <li>United States</li>
                </ul>
              </div>
            </div>

            {/* COLUMN 4: Contact Us & Locations (lg:col-span-1) */}
            <div className="lg:col-span-1 flex flex-col space-y-6">
              <Link href="/contact" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors">
                Contact Us
              </Link>

              <Link href="/services" className="text-sm font-semibold text-white hover:text-sky-400 transition-colors">
                Locations
              </Link>
            </div>

            {/* COLUMN 5: Awards Section (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col items-start space-y-4">
              <h4 className="text-sm font-semibold text-white">Awards</h4>

              {/* Awards Box */}
              <div className="w-full bg-white/[0.03] border border-white/15 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-2 shadow-lg backdrop-blur-md">
                {[
                  { name: "TechBehemoths 2025 Winner", src: "/images/techbehemoths.png" },
                  { name: "Clutch Top Digital Marketing", src: "/images/digitalmarketing.png" },
                  { name: "Clutch Top Web Developers", src: "/images/webdevelopment.png" },
                  { name: "Clutch Top Technical SEO", src: "/images/technicalseo.png" },
                ].map((award, i) => (
                  <div key={i} className="relative w-14 h-16 sm:w-16 sm:h-20 shrink-0 hover:scale-105 transition-transform duration-300">
                    <Image
                      src={award.src}
                      alt={award.name}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Icon Buttons under Awards Box */}
              <div className="w-full flex items-center justify-end gap-3 pt-2">
                {[
                  { icon: <FaGlobe className="w-3.5 h-3.5" />, href: "#" },
                  { icon: <FaPhone className="w-3.5 h-3.5" />, href: "tel:+971585601701" },
                  { icon: <FaEnvelope className="w-3.5 h-3.5" />, href: "mailto:info@adaptsmedia.com" },
                  { icon: <FaPaperPlane className="w-3.5 h-3.5" />, href: "/contact" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white transition-all duration-300"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
            {/* Left */}
            <div>
              <p>© 2026 Adapts Media® | All Rights Reserved.</p>
            </div>

            {/* Right: Privacy Policy & Terms */}
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms And Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}