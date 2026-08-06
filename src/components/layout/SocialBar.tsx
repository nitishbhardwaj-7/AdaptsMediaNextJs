"use client";
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const socialLinks = [
  { id: 1, iconPath: "/images/SocialIcons/Fb.png", url: "#", alt: "Facebook" },
  { id: 2, iconPath: "/images/SocialIcons/X.png", url: "#", alt: "Twitter/X" },
  { id: 3, iconPath: "/images/SocialIcons/Insta.png", url: "#", alt: "Instagram" },
  { id: 4, iconPath: "/images/SocialIcons/LinkedIN.png", url: "#", alt: "LinkedIn" },
  { id: 5, iconPath: "/images/SocialIcons/YT.png", url: "#", alt: "YouTube" },
];

interface SocialBarProps {
  className?: string;
}

const SocialBar = ({ className = "bg-transparent" }: SocialBarProps) => {
  const barRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const heading = barRef.current?.querySelector(".social-heading");
    const icons = barRef.current?.querySelectorAll(".social-icon-btn");

    if (!heading || !icons?.length) return;

    gsap.set(heading, { opacity: 0, y: 30 });
    gsap.set(icons, { opacity: 0, scale: 0, y: 40, rotate: -30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: barRef.current,
        start: "top 85%",
        end: "bottom 20%",
        scrub: 1, // Scrubbed animation directly tied to scroll progress
      }
    });

    tl.to(heading, {
      opacity: 1,
      y: 0,
      ease: "power2.out"
    })
    .to(icons, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      stagger: 0.25, // Icons reveal one by one as user scrolls
      ease: "back.out(1.7)"
    });
  }, { scope: barRef });

  return (
    <section ref={barRef} className={`social-bar-container w-full py-12 flex items-center justify-center ${className}`}>
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-26">
        <h3 className="social-heading text-white text-3xl md:text-5xl font-heading font-thin tracking-wide">
          Follow us @
        </h3>
        <div className="flex items-center gap-4 md:gap-12">
          {socialLinks.map((social) => (
            <motion.a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="social-icon-btn w-12 h-12 md:w-20 md:h-20 flex items-center justify-center 
                         rounded-full border border-white text-white
                         transition-colors duration-300 hover:border-white will-change-[transform,opacity]"
            >
              <div className={`relative ${social.id === 1 ? 'w-[20px] h-[20px] md:w-[34px] md:h-[34px]' : 'w-5 h-5 md:w-8 md:h-8'}`}>
                <Image
                  src={social.iconPath}
                  alt={social.alt}
                  fill
                  sizes="(max-width: 768px) 20px, 32px"
                  className="object-contain brightness-0 invert"
                />
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialBar;