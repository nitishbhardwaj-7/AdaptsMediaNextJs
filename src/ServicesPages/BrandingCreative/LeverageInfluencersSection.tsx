"use client";

import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";

const LeverageInfluencersSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const deliverables = [
    "Influencer Identification and Outreach",
    "Campaign Collaboration Strategy",
    "Content Partnership Management",
    "Audience and Engagement Alignment",
    "Performance Tracking and Reporting",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden bg-[#f4f7fa] text-slate-900">
      {/* Background Image */}
      <Image
        src="/images/BrandingCreative/WhiteBg.png"
        alt="Leverage Influencers Background"
        fill
        priority={true}
        quality={90}
        className="absolute inset-0 z-0 pointer-events-none object-cover"
      />

      <div className="max-w-[1350px] w-full px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start">
            <span className="service-category text-[#064ed3] text-lg tracking-wider mb-3">
              Leverage Influencers
            </span>
            <h2 className="leverage-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl text-slate-900 font-heading">
              Connecting Brands with the Right Voices
            </h2>

            <div className="leverage-desc service-desc space-y-6 max-w-xl text-[17px] md:text-[19px] font-light leading-relaxed text-slate-600">
              <p>
                Influence today is built on authenticity and trust. We help
                brands collaborate with creators and influencers who align with
                their audience, values, and objectives.
              </p>
              <p>
                From campaign planning to partnership execution, we create
                influencer strategies designed to increase visibility,
                credibility, and engagement.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="leverage-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* 1. THE BACKGROUND IMAGE (Small Scrub / Dot Grid) */}
                <img 
                  src="/images/BrandingCreative/WhiteLogoBg.png" 
                  className="leverage-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-80 pointer-events-none" 
                  alt="Logo Background Grid" 
                />
              
                {/* 2. THE MAIN IMAGE (Large Scrub / Illustration) */}
                <img 
                  src="/images/BrandingCreative/WhiteLogo.png" 
                  className="leverage-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.75]" 
                  alt="Leverage Influencers Logo" 
                />
              </div>
            </div>

            {/* Button Centered Under Image */}
            <div className="mt-8">
              <a
                href="#"
                className="service-cta inline-flex items-center justify-center px-10 py-3.5 rounded-full border border-[#064ed3]/60 bg-transparent text-[#064ed3] font-semibold text-[15px] md:text-base tracking-wide transition-all duration-300 hover:bg-[#064ed3] hover:text-white hover:border-[#064ed3] shadow-md cursor-pointer"
              >
                View Work <span className="arrow ml-2">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Content Row: What We Deliver */}
        <div className="w-full mt-8">
          <h3 className="leverage-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6 text-slate-900">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="leverage-deliverable-item service-deliverable-item flex items-start gap-2.5">
                <div className="service-deliverable-icon mt-1 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-[#064ed3]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
                  </svg>
                </div>
                <span className="service-deliverable-text text-sm md:text-[15px] text-slate-700 leading-snug">
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

export default LeverageInfluencersSection;
