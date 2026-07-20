"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { TeamMember, teamMembers } from "@/data/teamData";

interface TeamMemberProfileClientProps {
  member: TeamMember;
  allPosts: any[];
}

export default function TeamMemberProfileClient({
  member,
  allPosts,
}: TeamMemberProfileClientProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Helper function to calculate reading time locally based on post title hash
  const getReadingTime = (title: string) => {
    if (!title) return 4;
    const hash = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 5) + 3; // Returns 3, 4, 5, 6, or 7 minutes
  };

  // Filter posts matching member's expertise topics
  const memberPosts = useMemo(() => {
    return allPosts.filter((post: any) =>
      post.categories?.some((cat: string) =>
        member.topics.some(
          (topic) => topic.toLowerCase() === cat.toLowerCase()
        )
      )
    );
  }, [allPosts, member.topics]);



  // Get other team members for the "More voices" section
  const otherMembers = useMemo(() => {
    return teamMembers.filter((m) => m.slug !== member.slug);
  }, [member.slug]);

  // Calculate statistics
  const stats = useMemo(() => {
    const articleCount = memberPosts.length;
    const topicsCount = member.expertise.length;
    const since = member.memberSince;
    const avgRead =
      articleCount > 0
        ? Math.round(
            memberPosts.reduce(
              (acc, p) => acc + getReadingTime(p.title),
              0
            ) / articleCount
          )
        : 4;

    return {
      articleCount,
      topicsCount,
      since,
      avgRead,
    };
  }, [memberPosts, member]);

  // Reset post count when switching team members
  useEffect(() => {
    setVisibleCount(6);
    setSubscribed(false);
    setEmail("");
  }, [member.slug]);

  // Scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // offset for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Helper for generating background colors for fallback images based on category name
  const getCategoryColorClass = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("seo")) return "bg-gradient-to-br from-orange-500 to-red-600";
    if (cat.includes("social")) return "bg-gradient-to-br from-blue-600 to-indigo-800";
    if (cat.includes("ppc") || cat.includes("google")) return "bg-gradient-to-br from-yellow-500 to-amber-600";
    if (cat.includes("email")) return "bg-gradient-to-br from-emerald-500 to-teal-700";
    if (cat.includes("analytics") || cat.includes("web")) return "bg-gradient-to-br from-purple-600 to-violet-800";
    if (cat.includes("marketing")) return "bg-gradient-to-br from-rose-500 to-pink-700";
    return "bg-gradient-to-br from-gray-700 to-slate-900";
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="w-full bg-white text-gray-900 min-h-screen">
      {/* 1. Header Section */}
      <section className="w-full bg-gradient-to-b from-[#00224D] to-[#001126] pt-36 pb-20 px-6 md:px-20 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,192,46,0.08),transparent_40%)] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10 relative z-10">
          {/* Left Block: Avatar, Name, Bio */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start max-w-4xl text-center md:text-left">
            {/* Circle Image Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 rounded-full border-4 border-white/20 shadow-xl shadow-black/30 shrink-0 relative group overflow-hidden bg-[#0a254a]"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                sizes="128px"
                priority
              />
            </motion.div>

            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAC02E] mb-2 block">
                Team Member
              </span>
              <h1 className="text-4xl md:text-6xl font-light leading-tight tracking-tight text-white mb-2">
                {member.name}
              </h1>
              <p className="text-lg md:text-xl font-light text-white/80 mb-6 italic">
                {member.role}
              </p>
              <p className="text-white/70 max-w-2xl font-light leading-relaxed mb-6">
                {member.bio}
              </p>

              {/* Location & Social Icons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FAC02E]" />
                  <span>{member.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FAC02E]/20 hover:text-[#FAC02E] flex items-center justify-center transition-all duration-300 border border-white/10"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedinIn className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.email && (
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FAC02E]/20 hover:text-[#FAC02E] flex items-center justify-center transition-all duration-300 border border-white/10"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Floating Articles Counter */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex flex-col items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 px-8 py-6 rounded-2xl shrink-0"
          >
            <span className="text-3xl font-light text-[#FAC02E] block mb-1">
              {stats.articleCount}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
              articles published
            </span>
          </motion.div>
        </div>
      </section>



      {/* 3. Main content body (White Background) */}
      <main className="max-w-[1400px] mx-auto py-16 px-6 md:px-20">
        
        {/* Stats Panel */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-10 border-b border-gray-100 mb-16 text-center md:text-left">
          {[
            { value: stats.articleCount, label: "Articles" },
            { value: stats.topicsCount, label: "Topics covered" },
            { value: stats.since, label: "Member since" },
            { value: `${stats.avgRead} min`, label: "Avg. read time" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1 border-r last:border-0 border-gray-100 pr-4">
              <span className="text-4xl md:text-5xl font-light text-[#c42a27]">
                {item.value}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </section>

        {/* Section: Latest Articles */}
        <section id="articles" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-[3px] h-6 bg-[#c42a27]" />
            <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Latest articles</h2>
          </div>

          {/* Articles Grid */}
          {memberPosts.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {memberPosts.slice(0, visibleCount).map((post: any) => {
                  const hasImage = post.image && post.image !== "/fallback.jpg";
                  const primaryCategory = post.categories?.[0] || "Insight";
                  const dateFormatted = post.date
                    ? new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Published";
                  
                  return (
                    <motion.div
                      key={post.slug}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex flex-col h-full bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <Link href={`/blogs/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden shrink-0">
                        {hasImage ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className={`w-full h-full ${getCategoryColorClass(primaryCategory)} flex items-center justify-center p-6 text-center text-white font-medium text-lg leading-tight group-hover:opacity-90 transition-opacity duration-300`}>
                            {post.title}
                          </div>
                        )}
                        {/* Shadow Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                      </Link>

                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <span className="text-[10px] font-bold text-[#c42a27] uppercase tracking-widest block mb-2">
                            {primaryCategory}
                          </span>
                          <Link href={`/blogs/${post.slug}`} className="block group-hover:text-[#c42a27] transition-colors duration-300">
                            <h3
                              className="text-lg font-semibold text-gray-800 leading-snug line-clamp-2"
                              dangerouslySetInnerHTML={{ __html: post.title }}
                            />
                          </Link>
                        </div>
                        <div className="text-xs text-gray-400 mt-4 flex items-center gap-2 font-medium">
                          <span>{dateFormatted}</span>
                          <span>•</span>
                          <span>{getReadingTime(post.title)} min read</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Load More Button */}
              {memberPosts.length > visibleCount && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-700 bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:bg-gray-50 shadow-sm cursor-pointer"
                  >
                    Load more articles
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-light">No articles published yet.</p>
            </div>
          )}
        </section>

        {/* Section: About Long */}
        <section id="about" className="mb-20 scroll-mt-24 border-t border-gray-100 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Long Bio */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[3px] h-6 bg-[#c42a27]" />
                <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">About {member.name.split(" ")[0]}</h2>
              </div>
              <p className="text-gray-600 font-light text-base leading-relaxed whitespace-pre-line mb-8">
                {member.aboutLong}
              </p>

              {/* Sub-Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {member.badges.map((badge) => (
                  <div key={badge} className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{badge}</span>
                  </div>
                ))}
              </div>

              {/* Scroll button to contact */}
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3.5 bg-[#c42a27] hover:bg-[#a32220] text-white rounded-xl text-sm font-medium shadow-md shadow-red-900/10 hover:shadow-lg transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                Work with our team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Column: Mini Info Card */}
            <div className="lg:col-span-4 bg-gray-50 border border-gray-100 p-8 rounded-2xl self-start">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Quick Facts
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">Position</span>
                  <span className="font-semibold text-gray-800">{member.role}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">Office Location</span>
                  <span className="font-semibold text-gray-800">{member.location}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">Experience</span>
                  <span className="font-semibold text-gray-800">
                    {member.id === 1 ? "17+ Years" : member.id === 2 ? "7+ Years" : "5+ Years"}
                  </span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-gray-500">Specialty</span>
                  <span className="font-semibold text-gray-800">{member.expertise[0]}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: More Voices */}
        <section className="border-t border-gray-100 pt-16 mb-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-[3px] h-6 bg-[#c42a27]" />
            <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">More voices from Adapts Media</h2>
          </div>

          <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
            {otherMembers.map((other) => (
              <Link
                key={other.id}
                href={`/team/${other.slug}`}
                className="flex flex-col items-center gap-3 group text-center"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#FAC02E]/60 group-hover:scale-105 transition-all duration-300 shadow-sm relative bg-[#0a254a]">
                  <Image
                    src={other.image}
                    alt={other.name}
                    fill
                    className="object-cover object-top"
                    sizes="64px"
                  />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-[#c42a27] transition-colors">
                  {other.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 4. Newsletter Signup Section (Dark Background) */}
      <section id="contact" className="w-full bg-[#001126] text-white py-16 px-6 md:px-20 border-t border-white/10 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(196,42,39,0.06),transparent_40%)] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-light leading-tight mb-3">
              Stay updated with expert insights
            </h2>
            <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
              Get the latest digital marketing tips and case studies from {member.name.split(" ")[0]} and the Adapts Media team, sent straight to your inbox.
            </p>
          </div>

          {/* Form */}
          <div className="w-full lg:w-auto min-w-[320px] md:min-w-[480px]">
            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  key="subscribe-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 w-full"
                >
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#FAC02E] focus:bg-white/10 transition-all duration-300 placeholder-white/40"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#c42a27] hover:bg-[#a32220] text-white font-medium rounded-xl text-sm transition-all duration-300 shadow-md shadow-red-950/20 active:scale-98 shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-400 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Success! You've been subscribed to insights from {member.name}.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
