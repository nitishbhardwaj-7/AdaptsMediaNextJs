"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  {
    number: "100+",
    label: "Brands Scaled",
    icon: "/images/aboutus/Star.png", 
    color: "text-[#0052FF]",
  },
  {
    number: "500+",
    label: "Campaigns Delivered",
    icon: "/images/aboutus/Speaker.png",
    color: "text-[#0052FF]",
  },
  {
    number: "10+",
    label: "Industries Served",
    icon: "/images/aboutus/Rocket.png",
    color: "text-[#0052FF]",
  },
  {
    number: "20+",
    label: "Digital Plaforms Managed",
    icon: "/images/aboutus/Toy.png",
    color: "text-[#0052FF]",
  },
];

const ImpactSection = () => {
  return (
    <section className="w-full bg-[#F8F9FA] py-20 px-8 md:px-16 overflow-hidden">
      <div className="max-w-[1350px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#0052FF] opacity-80">
              Our Impact
            </span>
            <div className="h-[1px] w-12 bg-[#0052FF]/30" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-normal text-[#002B7F] mb-10 leading-tight">
            Driven by Results.
          </h2>
          
          <div className="space-y-8 max-w-2xl">
            <p className="text-lg md:text-[32px] text-gray-600 leading-tight">
              We measure success by the impact we create. Every campaign, every strategy, 
              every piece of content is built to deliver tangible outcomes, 
              from increased visibility to stronger engagement and higher conversions.
            </p>
            
            <div className="space-y-2">
              <p className="text-3xl font-medium text-[#002B7F]">
                We don’t believe in vanity metrics.
              </p>
              <p className="text-3xl font-medium text-[#002B7F]">
                We focus on what actually grows your business.
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT STATS GRID */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 lg:pl-20 pt-20 lg:pt-[25vh] mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col items-start ${index % 2 !== 0 ? 'sm:mt-40' : ''}`} // Creates the staggered/offset look
            >
              <div className="relative">
                {/* Stat Number */}
                <span className={`text-6xl md:text-8xl font-light ${stat.color} tracking-wide`}>
                  {stat.number}
                </span>
                
                {/* Floating 3D Icon */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.5 
                  }}
                  className="absolute -top-20 -right-36 w-20 h-20 md:w-56 md:h-24"
                >
                  <Image 
                    src={stat.icon} 
                    alt={stat.label} 
                    width={200} 
                    height={100} 
                    className="object-contain"
                  />
                </motion.div>
              </div>
              
              <p className="text-2xl md:text-4xl font-light text-[#002B7F] leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ImpactSection;