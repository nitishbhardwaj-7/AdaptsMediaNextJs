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

    // Background Image parallax zoom/scrub
    gsap.fromTo(".hero-bg-img", 
      { scale: 1.02, yPercent: 0 },
      {
        scale: 1.15,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    return () => {
      splits.forEach((s) => s.revert());
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[80vh] w-full overflow-hidden flex items-center justify-center py-12 text-white bg-[#032d57]">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/aboutus/HeroMask.png" 
          alt="Hero Background"
          fill
          priority={true}
          sizes="100vw"
          quality={85}
          className="hero-bg-img object-cover scale-[1.01]" 
        />
      </div>
      {/* Hero Content */}
      <div className="grid grid-cols-1 z-10 gap-8 min-[1200px]:grid-cols-2 max-w-[1350px] w-full px-8 md:px-16">
        {/* Left Side */}
        <div className="flex items-center">
          <h1 className="hero-left-title text-5xl tracking-wide md:text-7xl font-opensans leading-[1.2] pb-4">
            About Us
          </h1>
        </div>

        {/* Right Side */}
        <div className="relative z-10 flex flex-col justify-center max-w-lg">
          <h2 className="hero-right-title mb-6 text-3xl leading-snug md:text-5xl font-opensans leading-[1.2] pb-2">
            Built for Brands <br /> That Want to Grow, <br/> Not Just Exist.
          </h2>
          <p className="hero-desc text-2xl  font-opensans font-extralight leading-tight tracking-wide text-white">
            We’re a new-age marketing agency combining strategy, creativity, and performance to help brands move faster, connect deeper, and scale smarter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;