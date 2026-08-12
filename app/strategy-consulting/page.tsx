import Hero from "@/ServicesPages/StrategyConsulting/Hero";
import Intro from "@/ServicesPages/StrategyConsulting/Intro";
import MarketResearchSection from "@/ServicesPages/StrategyConsulting/MarketResearchSection";
import IndustryAnalysisSection from "@/ServicesPages/StrategyConsulting/IndustryAnalysisSection";
import AudienceInsightsSection from "@/ServicesPages/StrategyConsulting/AudienceInsightsSection";
import GrowthStrategiesSection from "@/ServicesPages/StrategyConsulting/GrowthStrategiesSection";
import DigitalAuditSection from "@/ServicesPages/StrategyConsulting/DigitalAuditSection";
import TargetedCampaignsSection from "@/ServicesPages/StrategyConsulting/TargetedCampaignsSection";
import DataAnalyticsSection from "@/ServicesPages/StrategyConsulting/DataAnalyticsSection";
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
        <div id="market-research"><MarketResearchSection/></div>
        <div id="industry-analysis"><IndustryAnalysisSection/></div>
        <div id="audience-insights"><AudienceInsightsSection/></div>
        <div id="growth-strategies"><GrowthStrategiesSection/></div>
        <div id="digital-audit"><DigitalAuditSection/></div>
        <div id="targeted-campaigns"><TargetedCampaignsSection/></div>
        <div id="data-analytics"><DataAnalyticsSection/></div>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <SocialBar/>
        <Footer/>
    </div>
  );
};

export default page;
