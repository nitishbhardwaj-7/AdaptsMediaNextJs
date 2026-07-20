"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const splits: any[] = [];

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

    gsap.from(".hero-desc", {
      y: 30,
      opacity: 0,
      duration: 1.0,
      ease: "power3.out",
      delay: 0.5,
    });

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
    <section ref={containerRef} className="relative min-h-[80vh] w-full overflow-hidden flex items-center justify-center py-12 text-white bg-transparent">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/BrandingCreative/HeroImage.png" 
          alt="Hero Background"
          fill
          priority={true}
          sizes="100vw"
          quality={85}
          className="hero-bg-img object-cover scale-[1.01]" 
        />
      </div>
      <div className="grid grid-cols-1 z-10 gap-8 min-[1200px]:grid-cols-2 max-w-[1350px] w-full px-8 md:px-16">
        <div className="flex items-center">
          <h1 className="hero-left-title text-5xl tracking-wide md:text-7xl font-heading leading-[1.2] pb-4">
            Social & Content
          </h1>
        </div>

        <div className="relative z-10 flex flex-col justify-center max-w-xl">
          <h2 className="hero-right-title mb-6 text-3xl leading-snug md:text-5xl font-heading leading-[1.2] pb-2">
            Stories That Spark <br/> Deep Connection
          </h2>
          <p className="hero-desc text-2xl font-extralight leading-tight tracking-wide text-white">
            Engage your audience, craft narratives that inspire, and leverage content to keep your brand at the center of the conversation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
