"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import ServiceList from "../layout/ServicesList";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const services = [
  {
    number: "01",
    title: "Performance Marketing",
    items: ["Affiliate Channels", "Cost Per Action", "ROI Model"],
  },
  {
    number: "02",
    title: "Social & Content",
    items: ["Content Strategy", "Leverage Influencers", "Paid Social"],
  },
];

const PerformanceMarketing = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];

    // 1. Connected Thinking Title
    const topTitleSplit = SplitText.create(".connected-title", {
      type: "lines",
      mask: "lines",
    });
    splits.push(topTitleSplit);
    
    gsap.from(topTitleSplit.lines, {
      yPercent: 120,
      opacity: 0,
      rotationX: -15,
      transformOrigin: "0% 50% -60px",
      duration: 1.2,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".connected-title",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Subtitle fade up
    gsap.from(".connected-desc", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".connected-desc",
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });

    // 2. Performance Marketing Title
    const bottomTitleSplit = SplitText.create(".perf-title", {
      type: "lines",
      mask: "lines",
    });
    splits.push(bottomTitleSplit);

    gsap.from(bottomTitleSplit.lines, {
      yPercent: 120,
      opacity: 0,
      rotationX: -15,
      transformOrigin: "0% 50% -60px",
      duration: 1.2,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".perf-title",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    gsap.from(".perf-desc", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".perf-desc",
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });

    // Service Lists stagger
    gsap.from(".perf-list", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".perf-list",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Image Parallax Effect (smooth scroll scrubbing for premium feel)
    gsap.fromTo(".img-bg", 
      { y: 30 },
      { 
        y: -30, 
        ease: "none",
        scrollTrigger: {
          trigger: ".img-container",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        }
      }
    );

    gsap.fromTo(".img-main", 
      { y: 60 },
      { 
        y: -100, 
        ease: "none",
        scrollTrigger: {
          trigger: ".img-container",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.5
        }
      }
    );

    return () => {
      splits.forEach((s) => s.revert());
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-transparent relative text-white py-20 font-sans overflow-hidden">
      <div className="relative z-50 max-w-[1350px] w-full px-8 md:px-16 mx-auto">
        
        {/* 1. TOP SECTION: Connected Thinking */}
        <div className="mb-32">

          <h2 className="connected-title text-4xl md:text-7xl mb-8 leading-tight max-w-4xl">
            Connected Thinking.<br/>Measureable Results.
          </h2>
          <p className="connected-desc text-lg md:text-3xl opacity-90 max-w-3xl font-light">
            End-to-end solutions built to help brands grow...
          </p>
        </div>

        {/* 2. BOTTOM SECTION: Flex Wrapper */}
        <div className="flex flex-col min-[1200px]:flex-row gap-12 md:gap-36 items-start">
          
          {/* Content Column */}
          <div className="flex-grow w-full">
            <h2 className="perf-title text-2xl md:text-6xl font-light mb-8 leading-tight">
              Performance <br/> Marketing
            </h2>
            <p className="perf-desc text-lg md:text-3xl opacity-90 mb-20 font-light">
              End-to-end solutions built to help brands grow...
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 w-full">
              {services && services.map((service, index) => (
                <div key={index} className="perf-list w-full">
                  <ServiceList items={service.items} />
                </div>
              ))}
            </div>
          </div>

          {/* --- IMAGE COLUMN WITH STABLE ANIMATION --- */}
          <div className="img-container flex-shrink-0 md:sticky md:top-20">
            <div className="h-40 w-40 md:h-72 md:w-72 relative">
              <div className="w-full h-full relative">
                {/* 1. THE BACKGROUND IMAGE (Small Jump) */}
                <img 
                  loading="lazy"
                  src="/images/services/commonbg.png" 
                  className="img-bg absolute inset-0 w-full h-full object-contain scale-150 z-0 opacity-50 pointer-events-none" 
                  style={{ filter: 'brightness(0)' }}
                  alt="Background" 
                />

                {/* 2. THE MAIN IMAGE (Large Jump) */}
                <img 
                  loading="lazy"
                  src="/images/services/i1.png" 
                  className="img-main relative z-10 w-full h-full object-contain" 
                  alt="Rocket" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceMarketing;