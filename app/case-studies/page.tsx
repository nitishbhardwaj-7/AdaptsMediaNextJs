import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioList from "@/components/portfolio/PortfolioList";
import ContactCTA from "@/components/homepage/ContactCTA";
import SocialBar from "@/components/layout/SocialBar";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";

export const metadata = {
  title: "Case Studies | Adapts Media",
  description: "Explore our latest case studies and success stories delivering impact across digital marketing, branding, and web development.",
};

const CaseStudiesPage = () => {
  return (
    <div>
      <PortfolioHero />
      <PortfolioList />
      <PortfolioSection />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
