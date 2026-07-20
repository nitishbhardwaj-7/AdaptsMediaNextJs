"use client";

import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";

const IndustryAnalysisSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const deliverables = [
    "Competitor Performance Auditing",
    "Market Disruption Profiling",
    "Demographic Research & Surveying",
    "Industry Trend Identification",
    "S.W.O.T. Strategic Matrixing",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden bg-[#1b262c] text-white">
      {/* Background Image */}
      <Image
        src="/images/BrandingCreative/DarkBlueBg.png"
        alt="Industry & Competitor Analysis Background"
        fill
        priority={true}
        quality={90}
        className="absolute inset-0 z-0 pointer-events-none object-cover opacity-50 mix-blend-color-burn"
      />

      <div className="max-w-[1350px] w-full px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-2 lg:order-1">
            {/* Illustration Container */}
            <div className="analysis-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Grid */}
                <img 
                  src="/images/BrandingCreative/LogoBgBlue.png" 
                  className="analysis-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-40 pointer-events-none" 
                  style={{ filter: "hue-rotate(200deg)" }}
                  alt="Logo Background Grid" 
                />
              
                {/* Main Illustration */}
                <img 
                  src="/images/services/i6.png" 
                  className="analysis-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.75]" 
                  alt="Competitor Analysis Illustration" 
                />
              </div>
            </div>

            {/* Button Centered Under Image */}
            <div className="mt-8">
              <a
                href="#"
                className="service-cta inline-flex items-center justify-center px-10 py-3.5 rounded-full border border-white/60 bg-transparent text-white font-semibold text-[15px] md:text-base tracking-wide transition-all duration-300 hover:bg-white hover:text-[#1b262c] hover:border-white shadow-md cursor-pointer"
              >
                View Work <span className="arrow ml-2">↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start order-1 lg:order-2">
            <span className="service-category text-[#FAC02E] text-lg tracking-wider mb-3">
              Analysis
            </span>
            <h2 className="analysis-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl font-heading">
              Foresight Built on Market Realities
            </h2>

            <div className="analysis-desc service-desc space-y-6 max-w-xl text-[17px] md:text-[19px] font-light leading-relaxed text-slate-300">
              <p>
                Don't fly blind. We map competitive positioning and identify disruption vectors to highlight untapped areas of opportunity for your enterprise.
              </p>
              <p>
                By profiling audience demography and competitor marketing loops, we validate your path to sustainable industry leadership.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Content Row: What We Deliver */}
        <div className="w-full mt-8">
          <h3 className="analysis-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="analysis-deliverable-item service-deliverable-item flex items-start gap-2.5">
                <div className="service-deliverable-icon mt-1 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-[#FAC02E]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
                  </svg>
                </div>
                <span className="service-deliverable-text text-sm md:text-[15px] text-white/90 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryAnalysisSection;
