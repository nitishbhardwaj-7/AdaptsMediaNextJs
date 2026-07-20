"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { teamMembers } from '@/data/teamData';

const TeamSection = () => {
  return (
    <section className="w-full bg-[#00224D] py-24 px-8 md:px-16 min-h-screen">
      <div className="max-w-[1350px] mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-end gap-1 mb-4">
            <span className="text-[10px] font-light uppercase text-[#FAC02E]">
              Our Team
            </span>
            <div className="h-[1px] flex w-12 bg-yellow-500/50" />
          </div>
          <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">
            The Minds Behind
          </h2>
        </motion.div>

        {/* Unified Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Link key={member.id} href={`/team/${member.slug}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, ease: "easeOut" }}
                className="relative cursor-pointer aspect-[4/5] rounded-xl overflow-hidden bg-[#0a254a] h-full"
              >


                {/* Top Right Plus Icon */}
                <div className="absolute top-5 right-5 z-20">
                  <Image
                    src='/images/aboutus/plusicon.png'
                    alt=''
                    width={30}
                    height={40}
                  />
                </div>

                {/* Team Member Image */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Bottom Shadow / Info Container */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-medium text-white transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#FAC02E] mt-1 transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 delay-75">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;