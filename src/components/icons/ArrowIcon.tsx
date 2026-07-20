import React from "react";

const ArrowIcon = ({ direction = "right", onClick }: { direction?: "left" | "right", onClick?: () => void }) => {
  const isRight = direction === "right";

  return (
    <div className="relative inline-block [perspective:1000px]">
      {/* FIX: Changed <button> to <div> to avoid nested buttons. 
          The 'group' class remains here so child spans still react to the parent button's hover.
      */}
      <div
        className="group relative w-[76px] h-[76px] flex items-center justify-center bg-transparent border-none overflow-hidden outline-none transition-transform"
      >
        {/* 1. RINGS */}
        <span className="absolute inset-[8px] rounded-full border-2 border-white/20 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-0 group-hover:opacity-0" />
        <span className="absolute inset-[8px] rounded-full border-[3px] border-[#3b6cf5] scale-[1.3] opacity-0 transition-all duration-1200 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-100 group-hover:opacity-100" />

        {/* 2. THE FILM STRIP */}
        <span 
          className={`absolute top-0 flex w-[152px] h-full transition-transform duration-1200 ease-[cubic-bezier(0.19,1,0.22,1)]
            ${isRight 
              ? "left-0 group-hover:-translate-x-1/2" 
              : "right-0 group-hover:translate-x-1/2"
            }
          `}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Slot 1: Default State */}
          <span className="w-[76px] h-full flex items-center justify-center shrink-0 [transform:translateZ(20px)]">
            <ArrowSVG direction={direction} />
          </span>

          {/* Slot 2: Hover State */}
          <span className="w-[76px] h-full flex items-center justify-center shrink-0 [transform:translateZ(20px)]">
            <ArrowSVG direction={direction} />
          </span>
        </span>
      </div>
    </div>
  );
};

const ArrowSVG = ({ direction }: { direction: string }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-white transition-colors duration-300 ${direction === "left" ? "rotate-180" : ""}`}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default ArrowIcon;