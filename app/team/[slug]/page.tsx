import { notFound } from "next/navigation";
import { teamMembers } from "@/data/teamData";
import { getWordPressPosts } from "@/lib/getPosts";
import TeamMemberProfileClient from "@/components/team/TeamMemberProfileClient";
import Footer from "@/components/layout/Footer";
import SocialBar from "@/components/layout/SocialBar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teamMembers.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const member = teamMembers.find((m) => m.slug === resolvedParams.slug);
  if (!member) {
    return {
      title: "Team Member Not Found | Adapts Media",
    };
  }

  return {
    title: `${member.name} - ${member.role} | Adapts Media`,
    description: member.bio,
    alternates: {
      canonical: `https://adaptsmedia.com/team/${member.slug}`,
    },
    openGraph: {
      title: `${member.name} - ${member.role} | Adapts Media`,
      description: member.bio,
      images: [
        {
          url: member.image,
          width: 800,
          height: 1000,
          alt: member.name,
        },
      ],
      type: "profile",
    },
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const resolvedParams = await params;
  const member = teamMembers.find((m) => m.slug === resolvedParams.slug);

  if (!member) {
    notFound();
  }

  // Fetch posts from WordPress to filter for team member's expertise
  const allPosts = await getWordPressPosts(100);

  return (
    <>
      <TeamMemberProfileClient member={member} allPosts={allPosts} />
      <SocialBar />
      <Footer />
    </>
  );
}
