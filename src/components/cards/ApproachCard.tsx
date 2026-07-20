"use client"
import React from 'react';
import { motion, Variants } from "framer-motion";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const ApproachCard = ({ steps }: { steps: Step[] }) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full"
    >
      {steps.map((step, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          className="relative group p-8 rounded-3xl rounded-tl-none flex flex-col items-center text-center 
                     bg-white/5 border border-white/10 backdrop-blur-md 
                     transition-colors duration-300 min-h-[320px] justify-center"
        >
          {/* Icon Circle */}
<div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 
                group-hover:border-white/50 transition-colors duration-300 overflow-hidden">
  <div className="text-white w-full h-full flex items-center justify-center">
    {typeof step.icon === 'string' && step.icon !== '' ? (
      <img 
        loading="lazy"
        src={step.icon} 
        alt={step.title} 
        className="w-8 h-8 object-contain" // Adjusted size to fit nicely in the circle
      />
    ) : (
      // This will render the icon if you pass a component, 
      // or show nothing/default if the string is empty
      <span className="w-6 h-6 flex items-center justify-center">
        {step.icon}
      </span>
    )}
  </div>
</div>

          {/* Text Content */}
          <h3 className="text-white font-bold tracking-widest text-lg md:text-xl mb-4 uppercase">
            {step.title}
          </h3>
          <p className="text-white/60 text-xs md:text-lg leading-tight font-extralight px-2">
            {step.description}
          </p>
          
          {/* Subtle Bottom Glow effect on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                          bg-gradient-to-b from-transparent via-transparent to-white/5 
                          pointer-events-none transition-opacity duration-500" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ApproachCard;