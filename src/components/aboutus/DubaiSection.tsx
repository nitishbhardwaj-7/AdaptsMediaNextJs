"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const DubaiSection = () => {
  // We define the lift values here for easy adjustment
  const bgLift = -40;   // How much the images move
  const textLift = -120; // How much the DUBAI text moves (more than images)

  return (
    <motion.section 
      initial="down"
      whileInView="up"
      // Triggers the lift when 50% visible, resets when leaving
      viewport={{ once: false, amount: 0.5 }}
      className="relative w-full h-screen bg-[#505559] overflow-hidden flex items-center justify-center"
    >
      
      {/* LAYER 0: The Base Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/aboutus/teambg.png" 
          alt="Background Base"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover" // object-cover ensures no gaps during lift
        />
      </motion.div>

      {/* LAYER 1: The Large Background Text (Moves more than the images) */}
      <motion.h1 
        variants={{
          down:  { y: 0,
            opacity: 0.5
           },
          up: { y: textLift,
            opacity: 1
           } 
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-start justify-center z-10 
                   text-[20vw] mt-55 font-black text-white tracking-tighter leading-none select-none"
      >
        DUBAI
      </motion.h1>

      {/* LAYER 2: The People (Moves same as Layer 0) */}
      <motion.div 
        className="absolute inset-0 z-20 flex items-start justify-center"
        variants={{
          down: { y: 0 },
          up: { y: bgLift } 
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/aboutus/teampng.png" 
            alt="Team"
            fill
            sizes="100vw"
            quality={80}
            className="object-cover mt-10 object-bottom"
            priority
          />
        </div>
      </motion.div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-black/30 z-[5]" />

    </motion.section>
  );
};

export default DubaiSection;