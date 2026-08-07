import Hero from "@/ServicesPages/AiEmergingMedia/Hero";
import Intro from "@/ServicesPages/AiEmergingMedia/Intro";
import AeoGeoSection from "@/ServicesPages/AiEmergingMedia/AeoGeoSection";
import AiContentSection from "@/ServicesPages/AiEmergingMedia/AiContentSection";
import MarketingAutomationSection from "@/ServicesPages/AiEmergingMedia/MarketingAutomationSection";
import ConversationalAiSection from "@/ServicesPages/AiEmergingMedia/ConversationalAiSection";
import PredictiveAnalyticsSection from "@/ServicesPages/AiEmergingMedia/PredictiveAnalyticsSection";
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
        <AeoGeoSection/>
        <AiContentSection/>
        <MarketingAutomationSection/>
        <ConversationalAiSection/>
        <PredictiveAnalyticsSection/>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <SocialBar/>
        <Footer/>
    </div>
  );
};

export default page;
