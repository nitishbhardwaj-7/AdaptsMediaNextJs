import Hero from "@/ServicesPages/SocialContent/Hero";
import Intro from "@/ServicesPages/SocialContent/Intro";
import ContentStrategySection from "@/ServicesPages/SocialContent/ContentStrategySection";
import LeverageInfluencersSection from "@/ServicesPages/SocialContent/LeverageInfluencersSection";
import PaidSocialSection from "@/ServicesPages/SocialContent/PaidSocialSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import SocialBar from "@/components/layout/SocialBar";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ClientsSection from "@/components/homepage/ClientsSection";

const page = () => {
  return (
    <div>
        <Hero/>
        <Intro/>
        <ContentStrategySection/>
        <LeverageInfluencersSection/>
        <PaidSocialSection/>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <SocialBar/>
        <Footer/>
    </div>
  );
};

export default page;
