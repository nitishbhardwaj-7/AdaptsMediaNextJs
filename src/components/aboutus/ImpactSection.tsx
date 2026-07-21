"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface StatItem {
  targetNumber: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
  type: string;
  positionClass: string;
}

const stats: StatItem[] = [
  {
    targetNumber: 100,
    suffix: "+",
    label: "Brands Scaled",
    icon: "/images/aboutus/Star.png",
    color: "text-[#0052FF]",
    type: "star",
    positionClass: "-top-10 -right-12 sm:-top-12 sm:-right-16 md:-top-16 md:-right-20 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32",
  },
  {
    targetNumber: 500,
    suffix: "+",
    label: "Campaigns Delivered",
    icon: "/images/aboutus/Speaker.png",
    color: "text-[#0052FF]",
    type: "speaker",
    positionClass: "-top-12 -right-14 sm:-top-16 sm:-right-20 md:-top-20 md:-right-24 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36",
  },
  {
    targetNumber: 10,
    suffix: "+",
    label: "Industries Served",
    icon: "/images/aboutus/Rocket.png",
    color: "text-[#0052FF]",
    type: "rocket",
    positionClass: "-top-6 -right-10 sm:-top-8 sm:-right-14 md:-top-12 md:-right-16 w-14 h-20 sm:w-20 sm:h-28 md:w-24 md:h-36",
  },
  {
    targetNumber: 20,
    suffix: "+",
    label: "Digital Plaforms Managed",
    icon: "/images/aboutus/Toy.png",
    color: "text-[#0052FF]",
    type: "toy",
    positionClass: "-top-8 -right-12 sm:-top-10 sm:-right-16 md:-top-14 md:-right-20 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36",
  },
];

const ImpactSection = () => {
  const outerWrapperRef = useRef<HTMLDivElement>(null);
  const pinnedSectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      // 1. Idle Floating Animation for 3D Icon Wrappers
      const wrappers = gsap.utils.toArray<HTMLElement>(".impact-stat-icon-wrapper");
      wrappers.forEach((wrapper, i) => {
        gsap.to(wrapper, {
          y: i % 2 === 0 ? -10 : -6,
          rotation: i % 2 === 0 ? 4 : -4,
          duration: 3.8 + (i % 3) * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.easeInOut",
          delay: i * 0.3,
        });
      });

      if (isReducedMotion) return;

      const headingSplit = SplitText.create(".impact-heading", {
        type: "words, chars",
      });

      // -------------------------------------------------------------
      // 2. LEFT SIDE ENTRANCE ANIMATION (Triggers BEFORE pinning at top 75%)
      // -------------------------------------------------------------
      const leftTl = gsap.timeline({
        scrollTrigger: {
          trigger: outerWrapperRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      leftTl
        .from(
          headingSplit.chars,
          {
            y: 40,
            opacity: 0,
            filter: "blur(8px)",
            rotationX: -30,
            stagger: 0.025,
            duration: 1.0,
            ease: "power4.out",
          }
        )
        .from(
          ".impact-paragraph",
          {
            y: 25,
            opacity: 0,
            filter: "blur(4px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".impact-bold-statement",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // -------------------------------------------------------------
      // 4. DESKTOP: PINNED SCROLL SEQUENTIAL REVEAL FOR RIGHT SIDE STATS
      // (Pins when section hits top top)
      // -------------------------------------------------------------
      if (isDesktop && outerWrapperRef.current && pinnedSectionRef.current) {
        const pinTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: outerWrapperRef.current,
            start: "top top",
            end: "+=180%",
            pin: pinnedSectionRef.current,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Right Side Stats Scrubbed Emergence (1 by 1 as user scrolls)
        const statCards = gsap.utils.toArray<HTMLElement>(".impact-stat-card");
        const numberEls = gsap.utils.toArray<HTMLElement>(".impact-stat-num");

        statCards.forEach((card, index) => {
          const numEl = numberEls[index];
          const targetVal = parseFloat(numEl.getAttribute("data-target") || "0");
          const suf = numEl.getAttribute("data-suffix") || "";
          const countObj = { val: 0 };
          const iconInner = card.querySelector(".impact-stat-icon-inner");

          pinTimeline
            .fromTo(
              card,
              { y: 100, opacity: 0, scale: 0.88, filter: "blur(8px)" },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power3.out",
              },
              `+=0.2`
            )
            .to(
              countObj,
              {
                val: targetVal,
                duration: 1.4,
                ease: "power2.out",
                snap: { val: 1 },
                onUpdate: () => {
                  numEl.innerText = `${Math.floor(countObj.val)}${suf}`;
                },
              },
              "<"
            );

          if (iconInner) {
            pinTimeline.fromTo(
              iconInner,
              { scale: 0, rotation: -30, opacity: 0 },
              {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.9,
                ease: "back.out(1.8)",
              },
              "<+=0.2"
            );
          }
        });

        // Settling Buffer before unpinning
        pinTimeline.to({}, { duration: 0.4 });

        return () => {
          headingSplit.revert();
        };
      }

      // -------------------------------------------------------------
      // MOBILE & TABLET FALLBACK FOR RIGHT SIDE STATS
      // -------------------------------------------------------------
      if (!isDesktop && outerWrapperRef.current) {
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: outerWrapperRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });

        mobileTl.from(
          ".impact-stat-card",
          {
            y: 40,
            opacity: 0,
            scale: 0.94,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
          }
        );

        const numberEls = gsap.utils.toArray<HTMLElement>(".impact-stat-num");
        numberEls.forEach((el) => {
          const targetVal = parseFloat(el.getAttribute("data-target") || "0");
          const suffix = el.getAttribute("data-suffix") || "";
          const countObj = { val: 0 };

          mobileTl.to(
            countObj,
            {
              val: targetVal,
              duration: 1.8,
              ease: "power2.out",
              snap: { val: 1 },
              onUpdate: () => {
                el.innerText = `${Math.floor(countObj.val)}${suffix}`;
              },
            },
            "-=0.6"
          );
        });

        return () => {
          headingSplit.revert();
        };
      }
    },
    { scope: outerWrapperRef }
  );

  // Desktop Inertial Mouse Motion
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!outerWrapperRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = outerWrapperRef.current.getBoundingClientRect();
    const xPos = (clientX - left) / width - 0.5;
    const yPos = (clientY - top) / height - 0.5;

    gsap.to(".impact-stat-icon-wrapper", {
      x: xPos * 14,
      y: yPos * 14,
      duration: 1.2,
      ease: "power2.out",
    });
  };

  return (
    <div ref={outerWrapperRef} className="relative w-full bg-[#F8F9FA] font-opensans">
      {/* Pinned Viewport Container */}
      <section
        ref={pinnedSectionRef}
        onMouseMove={handleMouseMove}
        className="w-full min-h-screen flex items-center py-16 px-8 md:px-16 overflow-hidden relative"
      >
        <div className="max-w-[1350px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full relative z-10">
          {/* LEFT COLUMN (Fixed / Stationary on pin) */}
          <div className="impact-left-content lg:col-span-5 will-change-transform">
            <h2 className="impact-heading text-5xl md:text-7xl font-normal font-opensans text-[#002B7F] mb-10 leading-tight">
              Driven by Results.
            </h2>

            <div className="space-y-8 max-w-2xl">
              <p className="impact-paragraph text-lg md:text-[30px] font-opensans text-gray-600 leading-tight">
                We measure success by the impact we create. Every campaign, every strategy,
                every piece of content is built to deliver tangible outcomes,
                from increased visibility to stronger engagement and higher conversions.
              </p>

              <div className="impact-bold-statement space-y-2 relative">
                <p className="text-2xl md:text-3xl font-medium text-[#002B7F]">
                  We don’t believe in vanity metrics.
                </p>
                <p className="text-2xl md:text-3xl font-medium text-[#002B7F]">
                  We focus on what actually grows your business.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Scrubbed / Pin-sequenced stats grid) */}
          <div className="impact-right-grid lg:col-span-7 relative grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 lg:pl-12 will-change-transform">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`impact-stat-card group flex flex-col items-start transition-transform duration-300 ease-out hover:scale-[1.04] cursor-pointer ${
                  index % 2 !== 0 ? "sm:mt-28" : ""
                }`}
              >
                <div className="relative">
                  {/* Stat Number */}
                  <span
                    data-target={stat.targetNumber}
                    data-suffix={stat.suffix}
                    className={`impact-stat-num text-6xl md:text-8xl font-light ${stat.color} tracking-wide transition-all duration-300 group-hover:drop-shadow-md`}
                  >
                    0{stat.suffix}
                  </span>

                  {/* Floating 3D Icon Container */}
                  <div className={`impact-stat-icon-wrapper absolute pointer-events-none ${stat.positionClass}`}>
                    <div className="impact-stat-icon-inner relative w-full h-full transition-transform duration-300 ease-out group-hover:rotate-6 group-hover:scale-105">
                      <Image
                        src={stat.icon}
                        alt={stat.label}
                        fill
                        sizes="(max-width: 768px) 80px, 220px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-2xl md:text-3xl font-light text-[#002B7F] leading-tight transition-colors duration-300 pt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImpactSection;