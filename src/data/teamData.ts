export interface TeamMember {
  id: number;
  name: string;
  slug: string;
  role: string;
  image: string;
  initials: string;
  initialsBg: string; // Tailwind class or hex color for the initials circle
  bio: string;
  location: string;
  memberSince: number;
  expertise: string[];
  topics: string[]; // Wordpress category names to filter blogs
  aboutLong: string;
  badges: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ashish Gupta",
    slug: "ashish-gupta",
    role: "CEO & Founder",
    image: "/images/Team/AshishGupta.png",
    initials: "AG",
    initialsBg: "bg-orange-600",
    bio: "Digital marketing veteran with 17+ years of experience helping brands across the MENA region scale their digital presence, optimize media spending, and build high-impact marketing strategies.",
    location: "Dubai, UAE",
    memberSince: 2017,
    expertise: ["Digital Marketing", "Media Planning", "Strategy & Consulting", "Search Engine Marketing", "Ad Operations", "Business Growth"],
    topics: ["Digital Marketing", "Media Planning", "Search Engine Marketing", "Ad Operations", "marketing"],
    aboutLong: "Ashish leads the overall strategic vision at Adapts Media. With over 17 years in the industry, he has deep expertise in programmatic media buying, cross-channel planning, and digital transformation. He works closely with leading brands in the UAE and wider MENA region to build data-driven marketing campaigns. Before founding Adapts Media, he held senior leadership positions at major agencies including BPG Group in Dubai.",
    badges: ["17+ Years Experience", "Media Planning Expert", "Founder & CEO", "Strategic Consultant"],
    socials: {
      linkedin: "https://www.linkedin.com/company/adaptsmedia",
      email: "info@adaptsmedia.com"
    }
  },
  {
    id: 2,
    name: "Shubham Dhanwate",
    slug: "shubham-dhanwate",
    role: "Associate Director – Media",
    image: "/images/Team/ShubhamDhanwate.png",
    initials: "SD",
    initialsBg: "bg-blue-600",
    bio: "Performance marketing specialist with a proven track record of managing multi-million dollar ad spend. Expert in PPC, programmatic, and paid social campaigns that drive measurable business growth.",
    location: "Dubai, UAE",
    memberSince: 2019,
    expertise: ["Google Ads", "PPC Campaigns", "Paid Social", "Performance Marketing", "KPIs & Analytics", "Programmatic Buying"],
    topics: ["Google Ads", "PPC", "Social Media", "Digital Marketing", "KPIs for Digital Marketing"],
    aboutLong: "Shubham oversees media buying and performance marketing at Adapts Media. He is highly specialized in executing high-ROI search engine marketing, display ads, and social media campaigns on Meta, TikTok, and LinkedIn. Shubham's analytical approach ensures that marketing budgets are spent efficiently, helping clients consistently achieve high return on ad spend (ROAS) and scale their acquisition funnels.",
    badges: ["Google Ads Certified", "Meta Blueprint", "PPC Expert", "Performance Marketing Lead"],
    socials: {
      linkedin: "https://www.linkedin.com/company/adaptsmedia",
      email: "info@adaptsmedia.com"
    }
  },
  {
    id: 3,
    name: "Dvija Pandya",
    slug: "dvija-pandya",
    role: "Senior Account Manager",
    image: "/images/Team/Dvija.png",
    initials: "DP",
    initialsBg: "bg-emerald-600",
    bio: "Dedicated client relationship and account management specialist. Expert in bridging client needs with creative execution to deliver seamless digital marketing campaigns.",
    location: "Gurugram, India",
    memberSince: 2021,
    expertise: ["Account Management", "Client Relations", "Digital Strategy", "Social Media Management", "Graphic Design Coordination"],
    topics: ["Social Media", "Digital Marketing", "Graphic Design", "marketing", "meme marketing"],
    aboutLong: "Dvija manages key accounts at Adapts Media, ensuring client goals are translated into actionable, high-quality agency output. She coordinates closely with media buying, search, and design teams to ensure that campaigns are executed on time, within budget, and to the highest standards. Her strong understanding of client industries makes her a trusted consultant for brands looking to maintain consistent communication and brand growth.",
    badges: ["Account Management Specialist", "Project Coordinator", "Brand Strategy Partner", "Client Relations"],
    socials: {
      linkedin: "https://www.linkedin.com/company/adaptsmedia",
      email: "info@adaptsmedia.com"
    }
  },
  {
    id: 4,
    name: "Raghad Darkashli",
    slug: "raghad-darkashli",
    role: "Account Manager",
    image: "/images/Team/RD.png",
    initials: "RD",
    initialsBg: "bg-purple-600",
    bio: "Transitioning from the hospitality industry to pursue my passion for digital marketing. As a Digital Marketing Account Manager, I bring rich experience in creating and optimizing campaigns on various social media platforms. My style is characterized by ease and effective communication, and I am committed to building bridges with others.",
    location: "Gurugram, India",
    memberSince: 2020,
    expertise: ["Technical SEO", "GA4 & Tracking", "Artificial Intelligence", "Voice Search Optimization", "API Integrations"],
    topics: ["web development", "SEO", "Artificial Intelligence", "voice search"],
    aboutLong: "Raghad is the technical cornerstone of Adapts Media. He is responsible for building fast, responsive, and SEO-optimized web and app solutions, implementing complex conversion tracking setups (GA4, Google Tag Manager, custom pixels), and leveraging AI technologies to automate marketing workflows. His technical expertise ensures that client campaigns are fully tracked, optimized, and built on solid digital foundations.",
    badges: ["Technical SEO Certified", "GA4 & GTM Specialist", "AI Operations"],
    socials: {
      linkedin: "https://www.linkedin.com/company/adaptsmedia",
      email: "info@adaptsmedia.com"
    }
  }
];
