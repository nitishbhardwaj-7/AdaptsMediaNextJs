"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import SocialBar from "@/components/layout/SocialBar";
import Footer from "@/components/layout/Footer";

const BookmarkIcon = () => (
  <svg className="w-3.5 h-3.5 text-white/50" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

export default function HyundaiMobisCaseStudy() {
  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-28 lg:pt-20 text-white bg-[#5a6d88]">
        {/* Exploded Parts Background Image */}
        <Image
          src="/images/portfolio/Hyundai/gBg6l9R6F_4XlnSb9zosTP1vjW3PERUjqgtrxngEo9MfManDgqbSyUDdUpidHt0H1ON2HmmSeqiq4ga0ys-U-X9SMNqno2pnNEPQXag32Js 1.png"
          alt="Hyundai Mobis Exploded Parts Background"
          fill
          quality={95}
          className="absolute inset-0 z-0 object-cover object-right pointer-events-none"
        />

        {/* Elegant dark overlay gradient on the left half to enhance text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/65 via-black/25 to-transparent pointer-events-none" />

        {/* Content wrapper */}
        <div className="relative z-10 max-w-[1350px] w-full mx-auto px-8 md:px-16 lg:px-20 py-12 flex flex-col justify-center text-left min-h-[calc(100vh-160px)]">
          <div className="max-w-[700px]">


            {/* Logo */}
            <div className="relative w-48 h-14 mb-8">
              <Image
                src="/images/portfolio/Hyundai/Group.png"
                alt="Hyundai Mobis Logo"
                fill
                sizes="192px"
                priority
                className="object-contain object-left"
              />
            </div>

            {/* Title */}
            <h1 className="text-[clamp(34px,4.5vw,42px)] font-heading font-medium tracking-tight leading-snug text-white mb-6">
              Driving Trust Through <br />
              Genuine Parts
            </h1>

            {/* Description */}
            <p className="text-[clamp(15px,1.5vw,18px)] font-heading font-normal leading-relaxed text-white/90 mb-10 max-w-md">
              Building awareness, credibility, and engagement through a social-first content strategy focused on Hyundai Mobis Genuine Parts.
            </p>

            {/* Divider line before tags */}
            <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-transparent to-transparent mb-8" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2.5">
              <span className="flex items-center gap-1.5 border border-white/20 text-white/80 rounded-full px-4 py-1.5 text-xs md:text-sm bg-white/5 font-heading font-light">
                <BookmarkIcon /> Branding
              </span>
              <span className="flex items-center gap-1.5 border border-white/20 text-white/80 rounded-full px-4 py-1.5 text-xs md:text-sm bg-white/5 font-heading font-light">
                <BookmarkIcon /> AI Generation
              </span>
              <span className="flex items-center gap-1.5 border border-white/20 text-white/80 rounded-full px-4 py-1.5 text-xs md:text-sm bg-white/5 font-heading font-light">
                <BookmarkIcon /> Marketing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT OVERVIEW SECTION ── */}
      <section className="w-full bg-white py-20 md:py-28 text-[#17313B]">
        <div className="max-w-[1350px] mx-auto px-8 md:px-16 lg:px-20">
          <div className="max-w-full flex flex-col gap-6">
            <div>
              <span className="text-lg md:text-2xl font-heading font-semibold text-[#d61e1b] tracking-wide">
                Project Overview
              </span>
            </div>

            <p className="text-[clamp(18px,2.6vw,36px)] font-heading font-semibold text-[#17313B] leading-[1.35] tracking-tight">
              Hyundai Mobis is one of the world&apos;s leading automotive parts
              manufacturers, providing genuine components designed to ensure
              vehicle safety, reliability, and performance.
            </p>

            <p className="text-[clamp(18px,2.6vw,36px)] font-heading font-semibold text-[#17313B] leading-[1.35] tracking-tight">
              The challenge was to strengthen awareness of genuine Hyundai
              Mobis parts while educating customers about the risks of
              counterfeit alternatives. The brand needed a digital strategy that
              would not only inform but also build trust among vehicle owners,
              service centers, and automotive enthusiasts.
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden py-24 md:py-32 text-white bg-[#064ed3]">
        {/* Background Image */}
        <Image
          src="/images/BrandingCreative/IdentityBg.png"
          alt="Identity Background Pattern"
          fill
          quality={90}
          className="absolute inset-0 z-0 pointer-events-none object-cover"
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-[1350px] w-full mx-auto px-8 md:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Challenge Info */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-white mb-8">
              The Challenge
            </h2>

            <p className="text-[clamp(16px,2vw,22px)] font-heading font-light leading-relaxed text-white/80 max-w-2xl mb-12">
              In a highly competitive automotive aftermarket, consumers are
              often presented with lower-cost alternatives that can
              compromise quality and safety.
            </p>

            <h3 className="text-base md:text-lg font-heading font-semibold text-white mb-6 tracking-wide">
              Hyundai Mobis needed to:
            </h3>

            {/* Grid of Objectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-3xl">
              <div className="flex items-start gap-3">
                <span className="text-[#FAC02E] text-base mt-0.5 shrink-0">✦</span>
                <span className="text-sm md:text-base font-heading font-light text-white/90">
                  Increase awareness of genuine parts
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FAC02E] text-base mt-0.5 shrink-0">✦</span>
                <span className="text-sm md:text-base font-heading font-light text-white/90">
                  Educate audiences on the value of authenticity
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FAC02E] text-base mt-0.5 shrink-0">✦</span>
                <span className="text-sm md:text-base font-heading font-light text-white/90">
                  Improve engagement across social channels
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FAC02E] text-base mt-0.5 shrink-0">✦</span>
                <span className="text-sm md:text-base font-heading font-light text-white/90">
                  Strengthen brand trust and credibility
                </span>
              </div>
              <div className="flex items-start gap-3 md:col-span-2">
                <span className="text-[#FAC02E] text-base mt-0.5 shrink-0">✦</span>
                <span className="text-sm md:text-base font-heading font-light text-white/90">
                  Create a consistent and recognizable <br /> digital presence
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Chess King Image with Parallax Framer Motion Effect */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full h-[350px] md:h-[450px]">
            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
              {/* THE SENSOR */}
              <motion.div
                initial="down"
                whileInView="up"
                viewport={{ once: false, amount: 0.6, margin: "-15% 0px -20% 0px" }}
                className="w-full h-full relative"
              >
                {/* 1. THE BACKGROUND IMAGE (LogoBgBlue.png) */}
                <motion.img
                  src="/images/BrandingCreative/LogoBgBlue.png"
                  variants={{
                    down: { y: 0 },
                    up: { y: -30 }
                  }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-40 pointer-events-none"
                  style={{ filter: 'brightness(0)' }}
                  alt="Logo Background Grid"
                />

                {/* 2. THE CHESS KING (Large Jump) */}
                <motion.img
                  src="/images/portfolio/Hyundai/White King Chess.G03.2k 1.png"
                  variants={{
                    down: { y: 0 },
                    up: { y: -65 }
                  }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full h-full object-contain scale-[1.05]"
                  alt="White King Chess Piece representing strategy and authenticity"
                />
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* ── OUR APPROACH SECTION ── */}
      <section className="relative w-full overflow-hidden py-24 md:py-32 text-white bg-[#1e1e1e]">
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

          {/* Left Column: Phones Illustration with Parallax Effect */}
          <div className="lg:col-span-7 flex items-center justify-center relative w-full h-[500px] md:h-[650px] order-2 lg:order-1">
            <div className="relative w-full max-w-[480px] h-full flex items-center justify-center">
              {/* THE SENSOR */}
              <motion.div
                initial="down"
                whileInView="up"
                viewport={{ once: false, amount: 0.6, margin: "-15% 0px -20% 0px" }}
                className="w-full h-full relative"
              >
                {/* 1a. UPPER-LEFT BACKGROUND GRID (DigitalMarketingLogoBg.png) */}
                <motion.img
                  src="/images/BrandingCreative/DigitalMarketingLogoBg.png"
                  variants={{
                    down: { y: 0, x: 0 },
                    up: { y: -25, x: -10 }
                  }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -left-[5%] -top-[2%] w-[300px] h-[300px] z-0 opacity-80 pointer-events-none object-contain"
                  alt="Background Grid Top Left"
                />

                {/* 1b. BOTTOM-RIGHT BACKGROUND GRID (DigitalMarketingLogoBg.png) */}
                <motion.img
                  src="/images/BrandingCreative/DigitalMarketingLogoBg.png"
                  variants={{
                    down: { y: 0, x: 0 },
                    up: { y: -25, x: 10 }
                  }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -right-[5%] -bottom-[2%] w-[300px] h-[300px] z-0 opacity-80 pointer-events-none object-contain"
                  alt="Background Grid Bottom Right"
                />

                {/* 2. LEFT PHONE (Mask group (2).png) */}
                <motion.div
                  variants={{
                    down: { y: 20, x: 20, rotate: -2 },
                    up: { y: -40, x: -75, rotate: -5 }
                  }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[2%] md:left-[5%] top-[15%] w-[180px] md:w-[230px] h-[360px] md:h-[460px] z-10"
                >
                  <Image
                    src="/images/portfolio/Hyundai/Mask group (2).png"
                    alt="Hyundai Mobis Cricket Campaign"
                    fill
                    sizes="(max-width: 768px) 180px, 230px"
                    className="object-contain drop-shadow-lg"
                  />
                </motion.div>

                {/* 3. RIGHT PHONE (Mask group (1).png) */}
                <motion.div
                  variants={{
                    down: { y: 20, x: -20, rotate: 2 },
                    up: { y: -40, x: 75, rotate: 5 }
                  }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-[2%] md:right-[5%] top-[15%] w-[180px] md:w-[230px] h-[360px] md:h-[460px] z-10"
                >
                  <Image
                    src="/images/portfolio/Hyundai/Mask group (1).png"
                    alt="Hyundai Mobis Door Visors Campaign"
                    fill
                    sizes="(max-width: 768px) 180px, 230px"
                    className="object-contain drop-shadow-lg"
                  />
                </motion.div>

                {/* 4. MIDDLE PHONE (Mask group.png) */}
                <motion.div
                  variants={{
                    down: { y: 40 },
                    up: { y: -70 }
                  }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-[5%] w-[200px] md:w-[250px] h-[400px] md:h-[500px] z-20"
                >
                  <Image
                    src="/images/portfolio/Hyundai/Mask group.png"
                    alt="Hyundai Mobis Red Ignite Campaign"
                    fill
                    sizes="(max-width: 768px) 200px, 250px"
                    className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Text Info */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-white mb-16">
              Our Approach
            </h2>

            <p className="text-[clamp(16px,2vw,22px)] font-heading font-light leading-relaxed text-white/80 max-w-2xl mb-10">
              Rather than focusing solely on product promotion, we developed
              a content ecosystem designed to educate, engage, and reinforce
              trust.
            </p>

            <h3 className="text-base md:text-lg font-heading font-semibold text-white mb-8 tracking-wide">
              Our strategy centered around three key pillars:
            </h3>

            {/* Vertically Stacked Pillars */}
            <div className="flex flex-col gap-8 max-w-2xl">
              {/* Pillar 1: Education */}
              <div className="flex items-start gap-4">
                <span className="text-[#d61e1b] text-base mt-1.5 shrink-0">✦</span>
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg md:text-xl font-heading font-semibold text-white">
                    Education
                  </h4>
                  <p className="text-sm md:text-base font-heading font-light text-white/70 leading-relaxed">
                    Creating informative content that highlighted the benefits, performance, and safety standards of genuine Hyundai Mobis parts.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Trust */}
              <div className="flex items-start gap-4">
                <span className="text-[#d61e1b] text-base mt-1.5 shrink-0">✦</span>
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg md:text-xl font-heading font-semibold text-white">
                    Trust
                  </h4>
                  <p className="text-sm md:text-base font-heading font-light text-white/70 leading-relaxed">
                    Showcasing product quality, manufacturing excellence, and the long-term value of using original components.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Engagement */}
              <div className="flex items-start gap-4">
                <span className="text-[#d61e1b] text-base mt-1.5 shrink-0">✦</span>
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg md:text-xl font-heading font-semibold text-white">
                    Engagement
                  </h4>
                  <p className="text-sm md:text-base font-heading font-light text-white/70 leading-relaxed">
                    Developing visually engaging content formats that encouraged interaction while making technical information easy to understand.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SERVICES DELIVERED SECTION ── */}
      <section className="relative w-full overflow-hidden py-32 md:py-44 text-white">
        {/* Background Image (BgYellow.png) */}
        <Image
          src="/images/portfolio/Hyundai/BgYellow.png"
          alt="Services Delivered Background"
          fill
          quality={90}
          className="absolute inset-0 z-0 pointer-events-none object-cover"
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-[1350px] w-full mx-auto px-8 md:px-16 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text & Grid Info */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-white mb-6">
              Services Delivered
            </h2>
            
            <p className="text-[clamp(16px,2vw,22px)] font-heading font-light leading-relaxed text-white/95 max-w-2xl mb-12">
              In a highly competitive automotive aftermarket, consumers are
              often presented with lower-cost alternatives that can
              compromise quality and safety.
            </p>
            
            {/* 2-Column Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 max-w-3xl mb-12">
              
              {/* Service 1: Social Media Strategy */}
              <div className="flex items-start gap-4">
                <span className="text-[#fcae1e] text-base mt-1.5 shrink-0">✦</span>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-lg md:text-xl font-heading font-semibold text-white">
                    Social Media Strategy
                  </h4>
                  <p className="text-sm md:text-base font-heading font-light text-white/90 leading-relaxed">
                    Developed a content framework aligned with audience interests, platform behaviors, and brand objectives.
                  </p>
                </div>
              </div>

              {/* Service 2: Creative Content Production */}
              <div className="flex items-start gap-4">
                <span className="text-[#fcae1e] text-base mt-1.5 shrink-0">✦</span>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-lg md:text-xl font-heading font-semibold text-white">
                    Creative Content Production
                  </h4>
                  <p className="text-sm md:text-base font-heading font-light text-white/90 leading-relaxed">
                    Created engaging visuals, motion graphics, and campaign assets designed to increase awareness and strengthen brand recall.
                  </p>
                </div>
              </div>

              {/* Service 3: Content Planning */}
              <div className="flex items-start gap-4">
                <span className="text-[#fcae1e] text-base mt-1.5 shrink-0">✦</span>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-lg md:text-xl font-heading font-semibold text-white">
                    Content Planning
                  </h4>
                  <p className="text-sm md:text-base font-heading font-light text-white/90 leading-relaxed">
                    Built a structured content calendar balancing education, product awareness, industry insights, and engagement-focused content.
                  </p>
                </div>
              </div>

              {/* Service 4: Community Engagement */}
              <div className="flex items-start gap-4">
                <span className="text-[#fcae1e] text-base mt-1.5 shrink-0">✦</span>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-lg md:text-xl font-heading font-semibold text-white">
                    Community Engagement
                  </h4>
                  <p className="text-sm md:text-base font-heading font-light text-white/90 leading-relaxed">
                    Supported audience interaction through platform management and performance-led optimization.
                  </p>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="flex gap-16 items-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-white flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <Image
                  src="/images/SocialIcons/Fb.png"
                  alt="Facebook"
                  width={14}
                  height={14}
                  style={{ width: 'auto', height: 'auto' }}
                  className="object-contain brightness-0 invert"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-white flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Image
                  src="/images/SocialIcons/LinkedIN.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  style={{ width: 'auto', height: 'auto' }}
                  className="object-contain brightness-0 invert"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-white flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <Image
                  src="/images/SocialIcons/Insta.png"
                  alt="Instagram"
                  width={20}
                  height={20}
                  style={{ width: 'auto', height: 'auto' }}
                  className="object-contain brightness-0 invert"
                />
              </a>
            </div>

          </div>

          {/* Right Column: Parallax 3D Character Illustration */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full h-[450px] md:h-[550px]">
            <div className="relative w-full max-w-[420px] h-full flex items-center justify-center">
              {/* THE SENSOR */}
              <motion.div
                initial="down"
                whileInView="up"
                viewport={{ once: false, amount: 0.6, margin: "-15% 0px -20% 0px" }}
                className="w-full h-full relative"
              >
                {/* 1. BACKGROUND GRID (group all (2).png) */}
                <motion.img
                  src="/images/portfolio/Hyundai/group all (2).png"
                  variants={{
                    down: { y: 0 },
                    up: { y: -25 }
                  }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-contain scale-[1.3] z-0 opacity-100 pointer-events-none"
                  style={{ filter: 'sepia(1) saturate(8) hue-rotate(335deg) brightness(0.85) contrast(1.5)' }}
                  alt="Background Star Pattern"
                />

                {/* 2. FOREGROUND 3D CHARACTER (image 31.png) */}
                <motion.div
                  variants={{
                    down: { y: 30 },
                    up: { y: -60 }
                  }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full z-10 flex items-center justify-center"
                >
                  <Image
                    src="/images/portfolio/Hyundai/image 31.png"
                    alt="Services Delivered 3D Illustration"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* ── THE OUTCOME SECTION ── */}
      <section className="w-full bg-white pt-24 pb-0 text-left">
        {/* Top Part: White Background */}
        <div className="max-w-[1350px] w-full mx-auto px-8 md:px-16 lg:px-16 pb-16">
          <span className="text-[#d61e1b] text-xl font-heading font-semibold tracking-wider block mb-4">
            The Outcome
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-heading font-semibold text-[#102a43] leading-snug mb-8 max-w-[1100px]">
            The campaign established a stronger and more consistent social
            presence while increasing audience awareness around the
            importance of genuine automotive parts.
          </h2>
          <p className="text-slate-800 font-heading font-semibold text-base">
            Key outcomes included:
          </p>
        </div>

        {/* Bottom Part: Blue Gradient Grid */}
        <div className="w-full bg-gradient-to-r from-[#004ca8] to-[#002f85] py-20 md:py-24">
          <div className="max-w-[1350px] w-full mx-auto px-8 md:px-16 lg:px-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-16">
            
            {/* Stat 1 */}
            <div className="flex flex-col">
              <span className="text-white text-4xl md:text-[44px] font-heading font-bold tracking-tight mb-2">
                2.8M+
              </span>
              <p className="text-white/80 text-sm font-heading font-light leading-snug max-w-[190px]">
                Content Impressions Generated
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col">
              <span className="text-white text-4xl md:text-[44px] font-heading font-bold tracking-tight mb-2">
                850K+
              </span>
              <p className="text-white/80 text-sm font-heading font-light leading-snug max-w-[190px]">
                Video Views Across Campaign Assets
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col">
              <span className="text-white text-4xl md:text-[44px] font-heading font-bold tracking-tight mb-2">
                120K+
              </span>
              <p className="text-white/80 text-sm font-heading font-light leading-snug max-w-[190px]">
                Audience Engagements
              </p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col">
              <span className="text-white text-4xl md:text-[44px] font-heading font-bold tracking-tight mb-2">
                45K+
              </span>
              <p className="text-white/80 text-sm font-heading font-light leading-snug max-w-[190px]">
                Post Shares & Saves
              </p>
            </div>

            {/* Stat 5 */}
            <div className="flex flex-col">
              <span className="text-white text-4xl md:text-[44px] font-heading font-bold tracking-tight mb-2">
                18K+
              </span>
              <p className="text-white/80 text-sm font-heading font-light leading-snug max-w-[190px]">
                New Social Followers Acquired
              </p>
            </div>

            {/* Stat 6 */}
            <div className="flex flex-col">
              <span className="text-white text-4xl md:text-[44px] font-heading font-bold tracking-tight mb-2">
                35%
              </span>
              <p className="text-white/80 text-sm font-heading font-light leading-snug max-w-[190px]">
                Increase in Engagement Rate
              </p>
            </div>

            {/* Stat 7 */}
            <div className="flex flex-col">
              <span className="text-white text-4xl md:text-[44px] font-heading font-bold tracking-tight mb-2">
                250K+
              </span>
              <p className="text-white/80 text-sm font-heading font-light leading-snug max-w-[190px]">
                Website Visits Driven from Social Channels
              </p>
            </div>

            {/* Stat 8 */}
            <div className="flex flex-col">
              <span className="text-white text-4xl md:text-[44px] font-heading font-bold tracking-tight mb-2">
                4.2M+
              </span>
              <p className="text-white/80 text-sm font-heading font-light leading-snug max-w-[190px]">
                Total Campaign Reach
              </p>
            </div>

          </div>
        </div>
      </section>

      <PortfolioSection />
      <ContactCTA />
      <SocialBar />
      <Footer />
    </>
  );
}
