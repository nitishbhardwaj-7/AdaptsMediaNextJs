import { motion } from 'framer-motion';

interface ServiceListProps {
  items: string[]; // Explicitly telling TS this is an array of strings
}

const ServiceList = ({ items }: ServiceListProps) => {
  return (
    <div className="flex flex-col">

      {/* List Items - Your Exact UI */}
      <div className="flex flex-col">
        {items.map((item, itemIndex) => (
          <motion.div
            key={itemIndex}
            initial="initial"
            whileHover="hover"
            className="flex items-center justify-between py-3 px-2 border-t border-white/60 group cursor-pointer hover:bg-white/5 transition-colors"
          >
            <span className="text-sm md:text-lg font-extralight tracking-wide opacity-90">
              {item}
            </span>
            <ArrowIcon />
          </motion.div>
        ))}
        {/* Exact closing border from your snippet */}
        <div className="border-t border-white/60 mb-20" />
      </div>
    </div>
  );
};

const ArrowIcon = () => (
  <svg
    className="w-5 h-5 md:w-6 md:h-6 rotate-45 rounded-full border border-white/40 p-1 md:p-1.5 duration-300 ease-linear group-hover:border-none group-hover:bg-white group-hover:rotate-90 text-white group-hover:text-black relative z-10"
    viewBox="0 0 16 19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
      fill="currentColor"
    ></path>
  </svg>
);

export default ServiceList;