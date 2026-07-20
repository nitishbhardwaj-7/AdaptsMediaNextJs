"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const socialLinks = [
  { id: 1, iconPath: "/images/SocialIcons/Fb.png", url: "#", alt: "Facebook" },
  { id: 2, iconPath: "/images/SocialIcons/X.png", url: "#", alt: "Twitter/X" },
  { id: 3, iconPath: "/images/SocialIcons/Insta.png", url: "#", alt: "Instagram" },
  { id: 4, iconPath: "/images/SocialIcons/LinkedIN.png", url: "#", alt: "LinkedIn" },
  { id: 5, iconPath: "/images/SocialIcons/YT.png", url: "#", alt: "YouTube" },
];

const SocialBar = () => {
  return (
    <section className="w-full py-12 flex items-center justify-center bg-gradient-to-r from-[#0241b5] via-[#1255e4] to-[#0135b9]">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-26">
        <h3 className="text-white text-3xl md:text-5xl font-heading font-thin tracking-wide">
          Follow us @
        </h3> 
        <div className="flex items-center gap-4 md:gap-12">
          {socialLinks.map((social) => (
            <motion.a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center 
                         rounded-full border border-white text-white
                         transition-colors duration-300 hover:border-white"
            >
              <div className={`relative ${social.id === 1 ? 'w-[20px] h-[20px] md:w-[34px] md:h-[34px]' : 'w-5 h-5 md:w-8 md:h-8'}`}>
                <Image
                  src={social.iconPath}
                  alt={social.alt}
                  fill
                  sizes="(max-width: 768px) 20px, 32px"
                  className="object-contain brightness-0 invert"
                />
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialBar;