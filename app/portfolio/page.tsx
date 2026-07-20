import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioList from "@/components/portfolio/PortfolioList";
import ContactCTA from "@/components/homepage/ContactCTA";
import SocialBar from "@/components/layout/SocialBar";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";

const PortfolioPage = () => {
  return (
    <div>
      <PortfolioHero />
      <PortfolioList />
      <PortfolioSection/>
      <ContactCTA />
      <SocialBar />
      <Footer />
    </div>
  );
};

export default PortfolioPage;
