import { getPostsByAuthor, getResolvedAuthor, getWordPressTeamMembers } from "@/lib/getPosts";
import BlogGridCard from "@/components/cards/BlogGridCard";
import ContactCTA from "@/components/homepage/ContactCTA";
import SocialBar from "@/components/layout/SocialBar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const posts = await getPostsByAuthor(slug);
  let name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  if (posts.length > 0) {
    const authorData = await getResolvedAuthor(posts[0]);
    name = authorData.name;
  } else {
    const team = await getWordPressTeamMembers();
    const matchingMember = team.find((m: any) => m.slug === slug);
    if (matchingMember) {
      name = matchingMember.name;
    }
  }

  return {
    title: `${name} - Author at Adapts Media`,
    description: `Read articles and insights published by ${name} on Adapts Media's blog.`,
  };
}

export default async function AuthorBlogsPage({ params }: Props) {
  const { slug } = await params;
  
  const posts = await getPostsByAuthor(slug);
  
  let authorData = null;
  if (posts.length > 0) {
    authorData = await getResolvedAuthor(posts[0]);
  } else {
    const team = await getWordPressTeamMembers();
    const matchingMember = team.find((m: any) => m.slug === slug);
    if (matchingMember) {
      authorData = {
        name: matchingMember.name,
        slug: matchingMember.slug,
        description: matchingMember.aboutLong || matchingMember.bio,
        avatar: matchingMember.image,
        role: matchingMember.role,
        linkedin: matchingMember.socials?.linkedin || "https://linkedin.com/company/adaptsmedia",
        email: matchingMember.socials?.email || "info@adaptsmedia.com",
      };
    } else {
      const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      authorData = {
        name,
        slug,
        description: "Digital Marketing Specialist and author at Adapts Media.",
        avatar: "/images/team/shruti.jpg",
        role: "Author",
        linkedin: "https://linkedin.com/company/adaptsmedia",
        email: "info@adaptsmedia.com",
      };
    }
  }

  const emailUrl = authorData.email.startsWith("mailto:") ? authorData.email : `mailto:${authorData.email}`;

  return (
    <article className="min-h-screen bg-white text-[#17313B]">
      {/* Premium Hero with Glassmorphism Author Card */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061d40] via-[#004dc3] to-[#083c8a] pt-32 pb-24 px-6">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
            {/* Avatar */}
            <div className="flex-shrink-0 relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
              <Image
                src={authorData.avatar}
                alt={authorData.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-grow text-center md:text-left text-white flex flex-col justify-between min-h-[12rem]">
              <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-2 tracking-tight">{authorData.name}</h1>
                    <p className="text-blue-200 text-lg md:text-xl font-medium font-sans">{authorData.role}</p>
                  </div>
                  
                  {/* Social Icons */}
                  <div className="flex items-center gap-4">
                    <a 
                      href={emailUrl} 
                      className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#004dc3] hover:border-white transition-all group duration-300"
                    >
                      <FaEnvelope className="w-5 h-5 text-white group-hover:text-[#004dc3] transition-colors" />
                    </a>
                    <a 
                      href={authorData.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#004dc3] hover:border-white transition-all group duration-300"
                    >
                      <FaLinkedinIn className="w-5 h-5 text-white group-hover:text-[#004dc3] transition-colors" />
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-3xl font-sans">
                {authorData.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Grid Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1350px] mx-auto">
          <div className="border-b border-gray-100 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-[#004dc3] text-sm font-bold tracking-widest uppercase block mb-2">Author Archive</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#17313B] tracking-tight">
                Insights &amp; Articles by {authorData.name}
              </h2>
            </div>
            <p className="text-gray-500 font-medium">
              Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {posts.map((p: any) => (
                <BlogGridCard 
                  key={p.slug}
                  title={p.title}
                  image={p.image}
                  slug={p.slug}
                  author={p.author}
                  date={p.date}
                  tags={p.categories}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
              <p className="text-gray-400 text-lg mb-4">No published blog posts found for this author yet.</p>
            </div>
          )}
        </div>
      </section>

      <ContactCTA />
      <SocialBar />
      <Footer />
    </article>
  );
}
