import Link from "next/link";

interface YellowButtonProps {
  title: string;
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto';
  variant?: 'red' | 'blue'; // Added variant prop
  href?: string; // Optional href prop to make it a link
}

const YellowButton = ({ title, width = 'auto', variant = 'red', href }: YellowButtonProps) => {
  // Responsive width mapping
  const widthMap = {
    sm: "w-32 md:w-40",
    md: "w-52 md:w-56",
    lg: "w-64 md:w-72",
    xl: "w-80 md:w-96",
    full: "w-full",
    auto: "w-auto"
  };

  // Define dynamic colors based on variant
  const isBlue = variant === 'blue';
  const textColor = isBlue ? 'text-[#0043e0] hover:text-white' : 'text-[#c42a27] hover:text-white';
  const borderColor = isBlue ? 'border-[#0043e0] group-hover:border-white' : 'border-[#c42a27] group-hover:border-white';
  const hoverBgColor = isBlue ? 'bg-[#0043e0]' : 'bg-[#c42a27]';

  const buttonClasses = `
    ${widthMap[width]}
    ${textColor}
    group cursor-pointer relative z-10 flex items-center justify-center gap-3 overflow-hidden rounded-full border border-black/5 bg-transparent 
    px-5 py-2.5 md:px-6 md:py-3 
    font-['DM_Sans'] text-[16px] md:text-[18px] font-heading font-semibold tracking-[0.02em] transition-colors duration-300 ease-out
    shadow-md shadow-yellow-500/5 hover:shadow-lg hover:shadow-yellow-500/10 whitespace-nowrap no-underline
    transform-gpu backface-hidden [clip-path:inset(0_round_9999px)]
  `;

  const innerContent = (
    <>
      {/* Layer 1: Base Yellow Background */}
      <span className="absolute inset-0 -z-20 bg-[#fac02d] rounded-full" />

      {/* Layer 2: Brand Color Slide-up Hover Background */}
      <span className={`absolute inset-0 -z-10 translate-y-full ${hoverBgColor} rounded-full transition-transform duration-500 ease-[cubic-bezier(0.3,1,0.2,1)] group-hover:translate-y-0`} />

      {/* Layer 3: Foreground Content (relative z-10) */}
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">{title}</span>
      
      <svg
        className={`w-5 h-5 md:w-6 md:h-6 rotate-45 rounded-full border ${borderColor} p-1 md:p-1.5 transition-all duration-300 ease-out group-hover:rotate-90 group-hover:scale-105 relative z-10`}
        viewBox="0 0 16 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
          fill="currentColor"
        ></path>
      </svg>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button type="button" className={buttonClasses}>
      {innerContent}
    </button>
  );
};

export default YellowButton;