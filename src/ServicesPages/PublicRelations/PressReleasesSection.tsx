"use client";

import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "../../hooks/useServiceDetailAnimation";

const PressReleasesSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const deliverables = [
    "Press Release Copywriting",
    "Global Media Distribution",
    "Journalist & Media Outreach",
    "Coverage Tracking & Reporting",
    "SEO-Optimized Press Kits",
  ];

  useServiceDetailAnimation(containerRef);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden bg-[#fdf2f5] text-[#510a32]">
      {/* Background Image */}
      <Image
        src="/images/BrandingCreative/WhiteBg.png"
        alt="Press Releases Background"
        fill
        priority={true}
        quality={90}
        className="absolute inset-0 z-0 pointer-events-none object-cover opacity-80"
      />

      <div className="max-w-[1350px] w-full px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 service-content-wrapper flex flex-col items-start">
            <span className="service-category text-[#801336] text-lg tracking-wider mb-3">
              Press
            </span>
            <h2 className="press-title service-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl text-[#510a32] font-heading">
              Newsworthy Broadcasts That Earn Coverage
            </h2>

            <div className="press-desc service-desc space-y-6 max-w-xl text-[17px] md:text-[19px] font-light leading-relaxed text-[#7c3d5f]">
              <p>
                A great story is nothing without reach. We draft impactful, journalist-ready press releases and manage their distribution across key global media outlets.
              </p>
              <p>
                By targeting the right publishers and wire networks, we maximize the likelihood of editorial pickups and build search engine authority.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="press-img-container service-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Background Grid */}
                <img 
                  src="/images/BrandingCreative/WhiteLogoBg.png" 
                  className="press-img-bg service-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-80 pointer-events-none" 
                  alt="Logo Background Grid" 
                />
              
                {/* Main Illustration */}
                <img 
                  src="/images/services/i5.png" 
                  className="press-img-main service-img-main relative z-10 w-full h-full object-contain scale-[0.75]" 
                  alt="Press Releases Illustration" 
                />
              </div>
            </div>

            {/* Button Centered Under Image */}
            <div className="mt-8">
              <a
                href="#"
                className="service-cta inline-flex items-center justify-center px-10 py-3.5 rounded-full border border-[#801336]/60 bg-transparent text-[#801336] font-semibold text-[15px] md:text-base tracking-wide transition-all duration-300 hover:bg-[#801336] hover:text-white hover:border-[#801336] shadow-md cursor-pointer"
              >
                View Work <span className="arrow ml-2">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Content Row: What We Deliver */}
        <div className="w-full mt-8">
          <h3 className="press-deliverables-header service-deliverables-header text-xl md:text-2xl mb-6 text-[#510a32]">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="press-deliverable-item service-deliverable-item flex items-start gap-2.5">
                <div className="service-deliverable-icon mt-1 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-[#801336]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
                  </svg>
                </div>
                <span className="service-deliverable-text text-sm md:text-[15px] text-[#7c3d5f] leading-snug">
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

export default PressReleasesSection;
