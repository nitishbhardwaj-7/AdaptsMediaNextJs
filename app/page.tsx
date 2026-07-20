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
  const res = await fetch(`https://adaptsmedia.com/wp-json/yoast/v1/get_head?url=https://adaptsmedia.com/`);
  const data = await res.json();
  const yoast = data.json;

  return {
    title: yoast.title,
    description: yoast.description,
    alternates: {
      canonical: "https://adaptsmedia.com/",
    },
    openGraph: {
      title: yoast.og_title,
      description: yoast.og_description,
      images: [yoast.og_image?.[0]?.url],
    }
  };
}

export default async function Home() {
  // To get the Homepage SCHEMA, you fetch the head data again or create a helper
  const res = await fetch(`https://adaptsmedia.com/wp-json/yoast/v1/get_head?url=https://adaptsmedia.com/`);
  const data = await res.json();
  return (
    <>
      {/* Homepage specific Schema (Organization, WebSite, etc.) */}
      {data.json?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.json.schema) }}
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

        {/* <InsightsSection /> */}

        <ContactCTA />

        <LocationSection />

        <SocialBar />

        {/* <Footer /> */}
      </main>
    </>
  );
}
