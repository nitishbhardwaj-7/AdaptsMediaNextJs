import Hero from "@/ServicesPages/StrategyConsulting/Hero";
import Intro from "@/ServicesPages/StrategyConsulting/Intro";
import IndustryAnalysisSection from "@/ServicesPages/StrategyConsulting/IndustryAnalysisSection";
import GrowthStrategiesSection from "@/ServicesPages/StrategyConsulting/GrowthStrategiesSection";
import TargetedCampaignsSection from "@/ServicesPages/StrategyConsulting/TargetedCampaignsSection";
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
        <IndustryAnalysisSection/>
        <GrowthStrategiesSection/>
        <TargetedCampaignsSection/>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <SocialBar/>
        <Footer/>
    </div>
  );
};

export default page;
