"use client"
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import ServiceList from "../layout/ServicesList";

// Define the shape of our props for type safety
interface ServiceCategoryProps {
  label?: string;          // e.g., "Services"
  mainTitle: string;       // e.g., "Connected Thinking..."
  description: string;     // The top paragraph
  categoryTitle: string;   // e.g., "Performance Marketing"
  categoryDesc: string;    // The paragraph under category title
  services: {
    items: string[];
  }[];
  bgImage?: string;        // Optional background image path
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const ServiceCategory = ({
  label = "Services",
  mainTitle,
  description,
  categoryTitle,
  categoryDesc,
  services,
  bgImage = "/images/Services_Bg.png"
}: ServiceCategoryProps) => {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#064ED3] bg-gradient-to-br from-[#0052FF] relative to-[#0039CC] text-white flex flex-col w-full items-start justify-start md:items-center md:justify-center py-20 font-sans overflow-hidden"
    >
      {bgImage && (
        <Image
          src={bgImage} 
          alt=""
          fill
          className="absolute z-10 pointer-events-none object-cover" 
        />
      )}

      <div className="max-w-[1350px] z-50 w-full px-8 md:px-16">
        {/* Header Section */}
        <motion.div className="mb-20" variants={fadeInUp}>

          
          <h2 className="text-4xl md:text-7xl font-normal mb-8 leading-tight max-w-3xl" 
              dangerouslySetInnerHTML={{ __html: mainTitle }} 
          />
          
          <p className="text-lg md:text-3xl opacity-90 max-w-3xl font-light leading-relaxed mb-20">
            {description}
          </p>

          <h2 className="text-2xl md:text-6xl font-light mb-8 leading-tight max-w-3xl"
              dangerouslySetInnerHTML={{ __html: categoryTitle }}
          />

          <p className="text-lg md:text-3xl opacity-90 max-w-3xl font-light leading-relaxed mb-20">
            {categoryDesc}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 min-[1300px]:grid-cols-3 gap-x-12 gap-y-6 md:gap-y-16"
        >
          {services.map((service, index) => (
            <motion.div key={index} className="flex flex-col">
              <ServiceList items={service.items} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServiceCategory;