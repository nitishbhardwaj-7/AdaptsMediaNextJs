"use client";

import { useState, useRef } from "react";
import BlogGridCard from "@/components/cards/BlogGridCard";
import Tailwind3DCard from "@/components/cards/Tailwind3DCard";
import ArrowButton from "@/components/buttons/ArrowButton";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ArrowDown = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-current shrink-0 ml-2">
    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function BlogList({ posts }: { posts: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Filter section entrance
    gsap.from(".filter-title", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".filter-title",
        start: "top 90%",
        toggleActions: "play none none none",
      }
    });

    gsap.from(".filter-item, .filter-btn-apply", {
      opacity: 0,
      y: 25,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".filter-title",
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });
  }, { scope: containerRef });

  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industry");
  const [selectedGoal, setSelectedGoal] = useState("All Marketing Goals");
  const [selectedTag, setSelectedTag] = useState("All Tags");

  const [activeTopic, setActiveTopic] = useState("All Topics");
  const [activeIndustry, setActiveIndustry] = useState("All Industry");
  const [activeGoal, setActiveGoal] = useState("All Marketing Goals");
  const [activeTag, setActiveTag] = useState("All Tags");

  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);

  // Cascading dropdown options animation
  useGSAP(() => {
    const activeOpen = isTopicOpen || isIndustryOpen || isGoalOpen || isTagOpen;
    if (activeOpen) {
      gsap.fromTo(".dropdown-panel", 
        { opacity: 0, y: -10, scaleY: 0.95, transformOrigin: "top center" },
        { opacity: 1, y: 0, scaleY: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(".dropdown-item",
        { opacity: 0, x: -6 },
        { opacity: 1, x: 0, stagger: 0.03, duration: 0.2, ease: "power2.out", delay: 0.05 }
      );
    }
  }, { scope: containerRef, dependencies: [isTopicOpen, isIndustryOpen, isGoalOpen, isTagOpen] });

  const filterBlogs = () => {
    setActiveTopic(selectedTopic);
    setActiveIndustry(selectedIndustry);
    setActiveGoal(selectedGoal);
    setActiveTag(selectedTag);
  };

  // Pagination state
  const [visibleCount, setVisibleCount] = useState(9);

  // For now, no actual filtering logic on WordPress posts based on these since data structure may not support it yet.
  // This just returns all posts, but the UI is there.
  const filteredPosts = posts;

  // Sliced posts for display
  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const uniqueTopics = ["All Topics", "SEO", "Design", "Development", "Content"];
  const uniqueIndustries = ["All Industry", "Automotive", "F&B", "Wellness", "Finance"];
  const uniqueGoals = ["All Marketing Goals", "Brand Awareness", "Lead Generation", "Sales"];
  const uniqueTags = ["All Tags", "Trends", "Tips", "News"];

  return (
    <div ref={containerRef} className="w-full bg-[#004dc3] text-white font-heading relative z-20">
      
      {/* ── FILTER SECTION ── */}
      <div className="w-full bg-[#004dc3] py-10 relative z-50">
        <div className="max-w-[1350px] mx-auto px-8 md:px-16 lg:px-20">
          <h2 className="filter-title text-xl font-heading font-medium tracking-wide mb-6 text-white font-sans">
            Filter by
          </h2>

          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6 lg:gap-8 w-full z-30">
            {/* Topic Filter */}
            <div className="filter-item relative w-full lg:flex-1 flex flex-col gap-2">
              <span className="text-sm font-heading font-normal text-white/80">Topic:</span>
              <button
                onClick={() => {
                  setIsTopicOpen(!isTopicOpen);
                  setIsIndustryOpen(false);
                  setIsGoalOpen(false);
                  setIsTagOpen(false);
                }}
                className="w-full flex items-center justify-between bg-transparent hover:bg-white/5 border border-white rounded-full px-5 py-3 text-sm text-white/50 font-medium cursor-pointer transition-colors"
              >
                <span>{selectedTopic}</span>
                <ArrowDown />
              </button>
              {isTopicOpen && (
                <div className="dropdown-panel absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
                  {uniqueTopics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => {
                        setSelectedTopic(topic);
                        setIsTopicOpen(false);
                      }}
                      className="dropdown-item w-full px-5 py-3 text-left text-sm hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Industry Filter */}
            <div className="filter-item relative w-full lg:flex-1 flex flex-col gap-2">
              <span className="text-sm font-heading font-normal text-white/80">Industry:</span>
              <button
                onClick={() => {
                  setIsIndustryOpen(!isIndustryOpen);
                  setIsTopicOpen(false);
                  setIsGoalOpen(false);
                  setIsTagOpen(false);
                }}
                className="w-full flex items-center justify-between bg-transparent hover:bg-white/5 border border-white rounded-full px-5 py-3 text-sm text-white/50 font-medium cursor-pointer transition-colors"
              >
                <span>{selectedIndustry}</span>
                <ArrowDown />
              </button>
              {isIndustryOpen && (
                <div className="dropdown-panel absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
                  {uniqueIndustries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => {
                        setSelectedIndustry(ind);
                        setIsIndustryOpen(false);
                      }}
                      className="dropdown-item w-full px-5 py-3 text-left text-sm hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Marketing Goal Filter */}
            <div className="filter-item relative w-full lg:flex-1 flex flex-col gap-2">
              <span className="text-sm font-heading font-normal text-white/80">Marketing Goal:</span>
              <button
                onClick={() => {
                  setIsGoalOpen(!isGoalOpen);
                  setIsIndustryOpen(false);
                  setIsTopicOpen(false);
                  setIsTagOpen(false);
                }}
                className="w-full flex items-center justify-between bg-transparent hover:bg-white/5 border border-white rounded-full px-5 py-3 text-sm text-white/50 font-medium cursor-pointer transition-colors"
              >
                <span>{selectedGoal}</span>
                <ArrowDown />
              </button>
              {isGoalOpen && (
                <div className="dropdown-panel absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
                  {uniqueGoals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => {
                        setSelectedGoal(goal);
                        setIsGoalOpen(false);
                      }}
                      className="dropdown-item w-full px-5 py-3 text-left text-sm hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Tags Filter */}
            <div className="filter-item relative w-full lg:flex-1 flex flex-col gap-2">
              <span className="text-sm font-heading font-normal text-white/80">Popular Tags:</span>
              <button
                onClick={() => {
                  setIsTagOpen(!isTagOpen);
                  setIsIndustryOpen(false);
                  setIsTopicOpen(false);
                  setIsGoalOpen(false);
                }}
                className="w-full flex items-center justify-between bg-transparent hover:bg-white/5 border border-white rounded-full px-5 py-3 text-sm text-white/50 font-medium cursor-pointer transition-colors"
              >
                <span>{selectedTag}</span>
                <ArrowDown />
              </button>
              {isTagOpen && (
                <div className="dropdown-panel absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
                  {uniqueTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(tag);
                        setIsTagOpen(false);
                      }}
                      className="dropdown-item w-full px-5 py-3 text-left text-sm hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Apply Button */}
            <button
              onClick={filterBlogs}
              className="filter-btn-apply w-full lg:w-auto bg-white text-[#004dc3] hover:bg-white/90 font-heading font-semibold px-16 py-3 rounded-full text-sm tracking-wide transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* ── BLOGS GRID ── */}
      <div className="w-full bg-white py-20 relative z-10">
        <div className="max-w-[1350px] mx-auto px-8 md:px-16 lg:px-20">
          {displayedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {displayedPosts.map((post: any) => (
                <BlogGridCard 
                  key={post.slug}
                  title={post.title} 
                  image={post.image} 
                  slug={post.slug}
                  author={post.author || "Shruti Goswami"}
                  date={post.date}
                  tags={post.categories || ["SEO", "Content Marketing", "Digital Strategy"]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[#17313B]/50 text-lg">
              No insights match your active filters.
            </div>
          )}

          {/* Load More Button */}
          {filteredPosts.length > visibleCount && (
            <div className="w-full flex justify-center mt-20">
              <ArrowButton title="Load More" onClick={handleLoadMore} variant="blue" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
