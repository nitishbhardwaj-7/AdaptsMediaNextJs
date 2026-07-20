import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";

interface AuthorSectionProps {
  author: any;
}

const AuthorSection = ({ author }: AuthorSectionProps) => {
  if (!author) return null;

  const authorName = author.name || "Shruti Goswami";
  const authorDesc = author.description || "A results-driven SEO professional with 8+ years of experience across e-commerce, healthcare, B2B and affiliate domains. Specializes in leading end-to-end SEO projects, combining technical expertise, data-driven strategy, and cross-team collaboration to deliver sustainable organic growth. Passionate about building scalable SEO...";
  const authorAvatar = author.avatar_urls?.['96'] || "/images/team/shruti.jpg";
  const authorRole = "SEO Project Manager"; // Fallback role if not in WP
  const email = "mailto:info@adaptsmedia.com";
  const linkedin = "https://linkedin.com/company/adaptsmedia";

  return (
    <section className="w-full bg-gradient-to-r from-[#083c8a] to-[#1565c0] py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
        
        {/* Avatar */}
        <div className="flex-shrink-0 relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl">
          <Image
            src={authorAvatar}
            alt={authorName}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-grow text-center md:text-left text-white">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4 gap-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">{authorName}</h3>
              <p className="text-blue-100 text-base md:text-lg">{authorRole}</p>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href={email} className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-[#083c8a] transition-all group">
                <FaEnvelope className="w-5 h-5 text-white group-hover:text-[#083c8a]" />
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-[#083c8a] transition-all group">
                <FaLinkedinIn className="w-5 h-5 text-white group-hover:text-[#083c8a]" />
              </a>
            </div>
          </div>

          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
            {authorDesc}
          </p>

          <div className="mt-auto">
            <Link 
              href={`/author/${author.slug || "shruti-goswami"}`}
              className="inline-block border-2 border-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-white hover:text-[#083c8a] transition-all"
            >
              View All Posts by {authorName}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
