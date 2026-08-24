import Footer from "@/components/layout/Footer";
import ClientsSection from "@/components/homepage/ClientsSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import InsightsSection from "@/components/homepage/InsightsSection";
import LocationSection from "@/components/homepage/LocationSection";
import PortfolioShowcase from "@/components/homepage/PortfolioShowcase";
import RecreateDesign from "@/components/homepage/RecognizedSection";
import ServicesSection from "@/components/homepage/ServicesSection";
import HeroVideo from "@/components/videos/HeroVideo";
import OrangeSection from "@/components/videos/OrangeSection";
import SocialBar from "@/components/layout/SocialBar";
import { Metadata } from "next";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ParallaxSection from "@/components/homepage/ParallaxSection";
import HeroSection from "@/components/homepage/HeroSection";


export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(
      `https://adaptsmedia.com/wp-json/yoast/v1/get_head?url=https://adaptsmedia.com/`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(4000) }
    );
    if (res.ok) {
      const data = await res.json();
      const yoast = data?.json;
      if (yoast) {
        return {
          title: yoast.title || "Adapts Media | Digital Marketing Agency",
          description: yoast.description || "Expert digital marketing solutions in Dubai and globally.",
          alternates: {
            canonical: "https://adaptsmedia.com/",
          },
          openGraph: {
            title: yoast.og_title || yoast.title || "Adapts Media",
            description: yoast.og_description || yoast.description,
            images: yoast.og_image?.[0]?.url ? [yoast.og_image[0].url] : [],
          }
        };
      }
    }
  } catch (err) {
    console.error("Failed to fetch homepage Yoast metadata:", err);
  }

  return {
    title: "Adapts Media | Digital Marketing Agency in Dubai",
    description: "Expert digital marketing solutions in Dubai and globally.",
    alternates: {
      canonical: "https://adaptsmedia.com/",
    },
  };
}

export default async function Home() {
  let schema: any = null;
  try {
    const res = await fetch(
      `https://adaptsmedia.com/wp-json/yoast/v1/get_head?url=https://adaptsmedia.com/`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(4000) }
    );
    if (res.ok) {
      const data = await res.json();
      schema = data?.json?.schema;
    }
  } catch (err) {
    console.error("Failed to fetch homepage Schema:", err);
  }

  return (
    <>
      {/* Homepage specific Schema (Organization, WebSite, etc.) */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <main>

        <HeroVideo/>
        {/* <HeroSection /> */}
        {/* <ParallaxSection /> */}

        <OrangeSection />
        
        <ServicesSection />

        <PortfolioShowcase/>

        <ClientsSection />

        <RecreateDesign />

        <InsightsSection />

        <ContactCTA />

        <LocationSection />

        <Footer />
      </main>
    </>
  );
}
