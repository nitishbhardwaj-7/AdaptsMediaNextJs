"use client";

import Image from "next/image";
import { useRef } from "react";
import { useServiceDetailAnimation } from "@/hooks/useServiceDetailAnimation";

export default function HyundaiApproachSection() {
  const containerRef = useRef<HTMLElement>(null);

  useServiceDetailAnimation(containerRef);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden py-24 md:py-32 text-white bg-[#1e1e1e]">
      {/* Background Image */}
      <Image
        src="/images/BrandingCreative/CampaignsBg.png"
        alt="Campaigns Background Pattern"
        fill
        quality={90}
        className="absolute inset-0 z-0 pointer-events-none object-cover"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1350px] w-full mx-auto px-8 md:px-16 lg:px-16 grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left Column: Phones Illustration with Branding Creative GSAP Animations */}
        <div className="lg:col-span-7 flex items-center justify-center relative w-full h-[500px] md:h-[650px] order-2 lg:order-1">
          <div className="service-img-container relative w-full max-w-[480px] h-full flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* 1a. UPPER-LEFT BACKGROUND GRID */}
              <img
                src="/images/BrandingCreative/DigitalMarketingLogoBg.png"
                className="service-img-bg absolute -left-[5%] -top-[2%] w-[300px] h-[300px] z-0 opacity-80 pointer-events-none object-contain"
                alt="Background Grid Top Left"
              />

              {/* 2. LEFT PHONE */}
              <div className="absolute left-[2%] md:left-[5%] top-[15%] w-[180px] md:w-[230px] h-[360px] md:h-[460px] z-10">
                <Image
                  src="/images/portfolio/Hyundai/Mask group (2).png"
                  alt="Hyundai Mobis Cricket Campaign"
                  fill
                  sizes="(max-width: 768px) 180px, 230px"
                  className="object-contain drop-shadow-lg"
                />
              </div>

              {/* 3. RIGHT PHONE */}
              <div className="absolute right-[2%] md:right-[5%] top-[15%] w-[180px] md:w-[230px] h-[360px] md:h-[460px] z-10">
                <Image
                  src="/images/portfolio/Hyundai/Mask group (1).png"
                  alt="Hyundai Mobis Door Visors Campaign"
                  fill
                  sizes="(max-width: 768px) 180px, 230px"
                  className="object-contain drop-shadow-lg"
                />
              </div>

              {/* 4. MIDDLE PHONE (Main floating element) */}
              <div className="service-img-main absolute left-1/2 -translate-x-1/2 top-[5%] w-[200px] md:w-[250px] h-[400px] md:h-[500px] z-20">
                <Image
                  src="/images/portfolio/Hyundai/Mask group.png"
                  alt="Hyundai Mobis Red Ignite Campaign"
                  fill
                  sizes="(max-width: 768px) 200px, 250px"
                  className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Text Info with Branding Creative GSAP Animations */}
        <div className="lg:col-span-5 service-content-wrapper flex flex-col justify-center text-left order-1 lg:order-2">
          <span className="service-category text-[#FAC02E] text-lg font-heading tracking-wider mb-3">
            Strategy
          </span>
          <h2 className="service-title text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-white mb-10">
            Our Approach
          </h2>

          <div className="service-desc text-[clamp(16px,2vw,22px)] font-heading font-light leading-relaxed text-white/80 max-w-2xl mb-10">
            <p>
              Rather than focusing solely on product promotion, we developed
              a content ecosystem designed to educate, engage, and reinforce
              trust.
            </p>
          </div>

          <h3 className="service-deliverables-header text-base md:text-lg font-heading font-semibold text-white mb-8 tracking-wide">
            Our strategy centered around three key pillars:
          </h3>

          {/* Vertically Stacked Pillars */}
          <div className="flex flex-col gap-8 max-w-2xl">
            {[
              {
                title: "Education",
                desc: "Creating informative content that highlighted the benefits, performance, and safety standards of genuine Hyundai Mobis parts."
              },
              {
                title: "Trust",
                desc: "Showcasing product quality, manufacturing excellence, and the long-term value of using original components."
              },
              {
                title: "Engagement",
                desc: "Developing visually engaging content formats that encouraged interaction while making technical information easy to understand."
              }
            ].map((pillar, idx) => (
              <div key={idx} className="service-deliverable-item flex items-start gap-4">
                <span className="service-deliverable-icon text-[#d61e1b] text-base mt-1.5 shrink-0">✦</span>
                <div className="service-deliverable-text flex flex-col gap-1">
                  <h4 className="text-lg md:text-xl font-heading font-semibold text-white">
                    {pillar.title}
                  </h4>
                  <p className="text-sm md:text-base font-heading font-light text-white/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
