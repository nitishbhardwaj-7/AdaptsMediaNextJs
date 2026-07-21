import { Metadata } from 'next';
import TeamSection from '@/components/aboutus/TeamSection';
import Footer from '@/components/layout/Footer';
import SocialBar from '@/components/layout/SocialBar';
import ContactCTA from '@/components/homepage/ContactCTA';
import { getWordPressTeamMembers } from '@/lib/getPosts';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch('https://adaptsmedia.com/wp-json/yoast/v1/get_head?url=https://adaptsmedia.com/team/');
    if (res.ok) {
      const data = await res.json();
      const yoast = data?.json;
      if (yoast) {
        return {
          title: yoast.title || 'Meet Our Expert Team | Adapts Media',
          description: yoast.description || 'Explore the talented individuals behind Adapts Media. Our dedicated team brings passion, expertise, and creativity to every project.',
          alternates: {
            canonical: 'https://adaptsmedia.com/team/',
          },
          openGraph: {
            title: yoast.og_title || 'Meet Our Expert Team | Adapts Media',
            description: yoast.og_description,
            images: yoast.og_image?.map((img: any) => img.url) || [],
          },
        };
      }
    }
  } catch (err) {
    console.error('Failed to fetch Yoast metadata for /team:', err);
  }

  return {
    title: 'Meet Our Expert Team - Driving Innovation Together | Adapts Media',
    description: 'Explore the talented individuals behind Adapts Media. Our dedicated team brings passion, expertise, and creativity to every project.',
    alternates: {
      canonical: 'https://adaptsmedia.com/team/',
    },
  };
}

export default async function TeamPage() {
  const teamMembers = await getWordPressTeamMembers();

  let schema: any = null;
  try {
    const res = await fetch('https://adaptsmedia.com/wp-json/yoast/v1/get_head?url=https://adaptsmedia.com/team/');
    if (res.ok) {
      const data = await res.json();
      schema = data?.json?.schema;
    }
  } catch (err) {
    console.error('Failed to fetch Schema for /team page:', err);
  }

  return (
    <main className="min-h-screen bg-[#00224D]">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <TeamSection members={teamMembers} title="Meet Our Expert Team" />
      <ContactCTA />
      <SocialBar />
      <Footer />
    </main>
  );
}