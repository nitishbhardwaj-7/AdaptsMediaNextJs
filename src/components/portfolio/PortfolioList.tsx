"use client";

import { useState, useRef } from "react";
import PortfolioShowcase from "../homepage/PortfolioShowcase";
import { Project, allCaseStudies } from "@/data/portfolioData";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const ArrowDown = ({ isOpen }: { isOpen?: boolean }) => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    className={`text-current shrink-0 ml-2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
  >
    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function PortfolioList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sharedGlowRef = useRef<HTMLDivElement>(null);

  const [selectedIndustry, setSelectedIndustry] = useState("All Case Studies");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedObjective, setSelectedObjective] = useState("All Objectives");

  const [activeIndustry, setActiveIndustry] = useState("All Case Studies");
  const [activeService, setActiveService] = useState("All Services");
  const [activeObjective, setActiveObjective] = useState("All Objectives");

  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isObjectiveOpen, setIsObjectiveOpen] = useState(false);

  // 1. Entrance Timeline, Scroll Parallax, and Hover Followers
  useGSAP(() => {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    const cleanups: (() => void)[] = [];

    const introEl = containerRef.current?.querySelector(".portfolio-intro-text") as HTMLElement;
    if (introEl) {
      // Split paragraph into words
      const splitIntro = new SplitText(introEl, {
        type: "words",
        wordsClass: "word",
      });

      // Set initial dimmed state
      gsap.set(splitIntro.words, {
        opacity: 0.25,
        color: "#9ca3af",
        scale: (i, target) => target.closest(".highlight") ? 0.96 : 1,
        transformOrigin: "center center"
      });

      // Precalculate final colors and custom staggered delays
      let currentDelay = 0;
      const delays = splitIntro.words.map((word, i) => {
        const htmlWord = word as HTMLElement;
        const isHighlight = htmlWord.closest(".highlight") !== null;
        const prevIsHighlight = i > 0 && (splitIntro.words[i - 1] as HTMLElement).closest(".highlight") !== null;

        if (isHighlight && !prevIsHighlight) {
          currentDelay += 0.07;
        } else {
          currentDelay += 0.03;
        }

        htmlWord.dataset.finalColor = isHighlight ? "#004dc3" : "#17313B";
        return currentDelay;
      });

      // Create the reveal animation scrubbed with scroll
      gsap.to(splitIntro.words, {
        opacity: 1,
        color: (i, target) => (target as HTMLElement).dataset.finalColor || "#17313B",
        scale: 1,
        stagger: (i) => delays[i],
        ease: "none",
        scrollTrigger: {
          trigger: introEl,
          start: "top 75%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      cleanups.push(() => {
        splitIntro.revert();
      });
    }

    // Split filter title "FILTER BY" into characters
    const titleSplit = SplitText.create(".filter-title", {
      type: "chars",
    });

    gsap.set(".filter-section-container", {
      opacity: 0,
      filter: "blur(6px)",
    });

    gsap.set(titleSplit.chars, {
      opacity: 0,
      filter: "blur(4px)",
    });

    gsap.set(".filter-item", {
      opacity: 0,
      scale: 0.98,
      filter: "blur(4px)",
    });

    gsap.set(".filter-btn-apply", {
      opacity: 0,
      scale: 0.98,
      filter: "blur(4px)",
    });

    gsap.set(".border-draw-path", {
      strokeDasharray: 800,
      strokeDashoffset: 800,
    });

    // Master Entrance sequence for the filter section (triggers when the filter section container arrives)
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".filter-section-container",
        start: "top 95%",
        toggleActions: "play none none none",
      },
    });

    // A. Blue filter panel fade in (no slide up)
    entranceTl.to(".filter-section-container", {
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out",
    });

    // B. Character reveal for FILTER BY (no slide up)
    entranceTl.to(titleSplit.chars, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.02,
    }, "-=0.5");

    // C. Dropdowns stagger reveal and border drawing (no slide up)
    const fields = gsap.utils.toArray<HTMLElement>(".filter-item");
    fields.forEach((field, idx) => {
      entranceTl.to(field, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power2.out",
      }, `-=${idx === 0 ? 0.45 : 0.35}`);

      const path = field.querySelector(".border-draw-path");
      if (path) {
        entranceTl.to(path, {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: "power2.inOut",
        }, "-=0.3");
      }
    });

    // D. Apply button reveal (no slide up)
    entranceTl.to(".filter-btn-apply", {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.35");

    // --- Background Radial Glow Breathing ---
    gsap.set(".filter-bg-light", { "--glow-x": "25%", "--glow-y": "40%" });
    gsap.to(".filter-bg-light", {
      "--glow-x": "75%",
      "--glow-y": "60%",
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });


    // --- Shared Glow Follower for Dropdowns ---
    if (!isMobile) {
      const dropButtons = containerRef.current?.querySelectorAll(".filter-item button");
      dropButtons?.forEach((btn) => {
        const handleMouseEnter = () => {
          const parent = containerRef.current?.querySelector(".filter-fields-row") as HTMLElement;
          if (sharedGlowRef.current && parent) {
            const rect = btn.getBoundingClientRect();
            const parentRect = parent.getBoundingClientRect();
            const left = rect.left - parentRect.left;
            const top = rect.top - parentRect.top;
            const width = rect.width;
            const height = rect.height;

            gsap.to(sharedGlowRef.current, {
              opacity: 1,
              x: left,
              y: top,
              width: width,
              height: height,
              duration: 0.35,
              ease: "power2.out",
            });
          }
        };

        btn.addEventListener("mouseenter", handleMouseEnter);
        cleanups.push(() => btn.removeEventListener("mouseenter", handleMouseEnter));
      });

      const fieldsRow = containerRef.current?.querySelector(".filter-fields-row") as HTMLElement;
      if (fieldsRow) {
        const handleMouseLeave = () => {
          if (sharedGlowRef.current) {
            gsap.to(sharedGlowRef.current, {
              opacity: 0,
              duration: 0.35,
              ease: "power2.out",
            });
          }
        };
        fieldsRow.addEventListener("mouseleave", handleMouseLeave);
        cleanups.push(() => fieldsRow.removeEventListener("mouseleave", handleMouseLeave));
      }
    }

    // --- Magnetic Apply Button ---
    const applyBtn = containerRef.current?.querySelector(".filter-btn-apply") as HTMLElement;
    if (applyBtn && !isMobile) {
      const onApplyMouseMove = (e: MouseEvent) => {
        const rect = applyBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(applyBtn, {
          x: x * 0.28,
          y: y * 0.28,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      };
      const onApplyMouseLeave = () => {
        gsap.to(applyBtn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      applyBtn.addEventListener("mousemove", onApplyMouseMove);
      applyBtn.addEventListener("mouseleave", onApplyMouseLeave);
      cleanups.push(() => {
        applyBtn.removeEventListener("mousemove", onApplyMouseMove);
        applyBtn.removeEventListener("mouseleave", onApplyMouseLeave);
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
      titleSplit.revert();
    };
  }, { scope: containerRef });

  // Cascading dropdown options animation
  useGSAP(() => {
    const activeOpen = isIndustryOpen || isServiceOpen || isObjectiveOpen;
    if (activeOpen) {
      gsap.fromTo(".dropdown-panel",
        { opacity: 0, y: -10, scaleY: 0.95, transformOrigin: "top center" },
        { opacity: 1, y: 0, scaleY: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(".dropdown-item",
        { opacity: 0, x: -6 },
        { opacity: 1, x: 0, stagger: 0.03, duration: 0.2, ease: "power2.out", delay: 0.05 }
      );
    }
  }, { scope: containerRef, dependencies: [isIndustryOpen, isServiceOpen, isObjectiveOpen] });

  const filterStudies = () => {
    setActiveIndustry(selectedIndustry);
    setActiveService(selectedService);
    setActiveObjective(selectedObjective);
  };

  const filteredStudies = allCaseStudies.filter((study) => {
    const matchIndustry = activeIndustry === "All Case Studies" || study.industry === activeIndustry;
    const matchService = activeService === "All Services" || study.service === activeService;
    const matchObjective = activeObjective === "All Objectives" || study.objective === activeObjective;
    return matchIndustry && matchService && matchObjective;
  });

  const uniqueIndustries = ["All Case Studies", "Automotive", "F&B", "Wellness", "Finance"];
  const uniqueServices = ["All Services", "Web Development", "Social Media", "UI/UX Design", "Branding"];
  const uniqueObjectives = ["All Objectives", "Performance", "Branding", "Marketing"];

  return (
    <div ref={containerRef} className="w-full bg-[#12161c] text-white font-heading">
      <style dangerouslySetInnerHTML={{
        __html: `
          .line-parent {
            overflow: hidden;
            display: block;
            padding-bottom: 4px;
            margin-bottom: -4px;
          }
          .line-child {
            display: inline-block;
            will-change: transform, filter, opacity;
          }
          .filter-bg-light {
            background: radial-gradient(circle 800px at var(--glow-x, 25%) var(--glow-y, 40%), rgba(255, 255, 255, 0.12) 0%, transparent 100%);
            pointer-events: none;
            will-change: background;
          }
        `
      }} />

      {/* ── INTRO SECTION ── */}
      <div className="w-full bg-white py-28 md:py-36 text-[#17313B]">
        <div className="max-w-[1350px] mx-auto px-8 md:px-16 lg:px-20">
          <p className="portfolio-intro-text text-[clamp(24px,4.0vw,54px)] font-heading font-semibold leading-[1.38] tracking-tight max-w-[1050px] text-[#17313B] mx-auto text-center">
            Every brand has different goals,<br className="hidden md:inline" />
            challenges, and audiences.<br className="hidden md:inline" /><br className="hidden md:inline" />
            Which is why we create tailored strategies<br className="hidden md:inline" />
            built around <span className="highlight text-[#004dc3] font-bold">performance</span>,<br className="hidden md:inline" />
            creativity, and real business impact.<br className="hidden md:inline" /><br className="hidden md:inline" />
            From branding and content<br className="hidden md:inline" />
            to <span className="highlight text-[#004dc3] font-bold">digital experiences</span><br className="hidden md:inline" />
            and marketing campaigns.<br className="hidden md:inline" /><br className="hidden md:inline" />
            We help brands stand out, connect, and <span className="highlight text-[#004dc3] font-bold">grow</span>.
          </p>
        </div>
      </div>

      {/* ── FILTER SECTION ── */}
      <div className="filter-section-container w-full bg-[#004dc3] py-10 relative overflow-hidden">
        {/* Breathing background light */}
        <div className="filter-bg-light absolute inset-0 opacity-100" />

        <div className="max-w-[1350px] mx-auto px-8 md:px-16 lg:px-20 relative z-10">
          <h2 className="filter-title text-xl font-heading font-medium tracking-wide mb-6 uppercase text-white font-sans">
            Filter by
          </h2>

          <div className="relative filter-fields-row flex flex-col lg:flex-row items-start lg:items-end gap-6 lg:gap-8 w-full z-30">
            {/* Shared Glow Follower */}
            <div
              ref={sharedGlowRef}
              className="absolute border border-white rounded-full pointer-events-none opacity-0 transition-all duration-300 ease-out"
              style={{
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                boxShadow: "0 0 12px rgba(255, 255, 255, 0.25)",
                borderColor: "rgba(255, 255, 255, 0.8)",
                willChange: "transform, width, height, opacity"
              }}
            />

            {/* Industry Filter */}
            <div className="filter-item relative w-full lg:w-72 flex flex-col gap-2">
              <span className="text-sm font-heading font-normal text-white/80">Industries:</span>
              <button
                onClick={() => {
                  setIsIndustryOpen(!isIndustryOpen);
                  setIsServiceOpen(false);
                  setIsObjectiveOpen(false);
                }}
                className="w-full flex items-center justify-between bg-transparent hover:bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white/50 font-medium cursor-pointer transition-all duration-300 relative group overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              >
                <span className="relative z-10">{selectedIndustry}</span>
                <ArrowDown isOpen={isIndustryOpen} />
                {/* SVG border drawing */}
                <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full" fill="none">
                    <rect
                      className="border-draw-path transition-all duration-300 group-hover:stroke-white group-hover:stroke-[1.5px]"
                      x="0.5"
                      y="0.5"
                      width="calc(100% - 1px)"
                      height="calc(100% - 1px)"
                      rx="24"
                      ry="24"
                      stroke="rgba(255, 255, 255, 0.25)"
                      strokeWidth="1.2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </button>
              {isIndustryOpen && (
                <div className="dropdown-panel absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
                  {uniqueIndustries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => {
                        setSelectedIndustry(ind);
                        setIsIndustryOpen(false);
                      }}
                      className="dropdown-item w-full px-5 py-3 text-left text-sm hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Service Filter */}
            <div className="filter-item relative w-full lg:w-72 flex flex-col gap-2">
              <span className="text-sm font-heading font-normal text-white/80">Services:</span>
              <button
                onClick={() => {
                  setIsServiceOpen(!isServiceOpen);
                  setIsIndustryOpen(false);
                  setIsObjectiveOpen(false);
                }}
                className="w-full flex items-center justify-between bg-transparent hover:bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white/50 font-medium cursor-pointer transition-all duration-300 relative group overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              >
                <span className="relative z-10">{selectedService}</span>
                <ArrowDown isOpen={isServiceOpen} />
                {/* SVG border drawing */}
                <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full" fill="none">
                    <rect
                      className="border-draw-path transition-all duration-300 group-hover:stroke-white group-hover:stroke-[1.5px]"
                      x="0.5"
                      y="0.5"
                      width="calc(100% - 1px)"
                      height="calc(100% - 1px)"
                      rx="24"
                      ry="24"
                      stroke="rgba(255, 255, 255, 0.25)"
                      strokeWidth="1.2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </button>
              {isServiceOpen && (
                <div className="dropdown-panel absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
                  {uniqueServices.map((ser) => (
                    <button
                      key={ser}
                      onClick={() => {
                        setSelectedService(ser);
                        setIsServiceOpen(false);
                      }}
                      className="dropdown-item w-full px-5 py-3 text-left text-sm hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      {ser}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Objective Filter */}
            <div className="filter-item relative w-full lg:w-72 flex flex-col gap-2">
              <span className="text-sm font-heading font-normal text-white/80">Objective:</span>
              <button
                onClick={() => {
                  setIsObjectiveOpen(!isObjectiveOpen);
                  setIsIndustryOpen(false);
                  setIsServiceOpen(false);
                }}
                className="w-full flex items-center justify-between bg-transparent hover:bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white/50 font-medium cursor-pointer transition-all duration-300 relative group overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              >
                <span className="relative z-10">{selectedObjective}</span>
                <ArrowDown isOpen={isObjectiveOpen} />
                {/* SVG border drawing */}
                <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full" fill="none">
                    <rect
                      className="border-draw-path transition-all duration-300 group-hover:stroke-white group-hover:stroke-[1.5px]"
                      x="0.5"
                      y="0.5"
                      width="calc(100% - 1px)"
                      height="calc(100% - 1px)"
                      rx="24"
                      ry="24"
                      stroke="rgba(255, 255, 255, 0.25)"
                      strokeWidth="1.2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </button>
              {isObjectiveOpen && (
                <div className="dropdown-panel absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
                  {uniqueObjectives.map((obj) => (
                    <button
                      key={obj}
                      onClick={() => {
                        setSelectedObjective(obj);
                        setIsObjectiveOpen(false);
                      }}
                      className="dropdown-item w-full px-5 py-3 text-left text-sm hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      {obj}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Apply Button */}
            <button
              onClick={filterStudies}
              className="filter-btn-apply w-full lg:w-auto bg-white text-[#004dc3] hover:bg-white/95 hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(255,255,255,0.15)] active:scale-[0.97] font-heading font-semibold px-16 py-3 rounded-full text-sm tracking-wide transition-all duration-300 cursor-pointer relative"
              style={{ willChange: "transform, box-shadow" }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* ── CASE STUDIES — Using the exact same PortfolioShowcase component ── */}
      {filteredStudies.length > 0 ? (
        <PortfolioShowcase projects={filteredStudies} variant="list" />
      ) : (
        <div className="text-center py-20 text-white/50 text-lg">
          No case studies match your active filters.
        </div>
      )}
    </div>
  );
}
