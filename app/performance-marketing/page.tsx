import Hero from "@/ServicesPages/PerformanceMarketing/Hero";
import Intro from "@/ServicesPages/PerformanceMarketing/Intro";
import SeoServicesSection from "@/ServicesPages/PerformanceMarketing/SeoServicesSection";
import SemGoogleAdsSection from "@/ServicesPages/PerformanceMarketing/SemGoogleAdsSection";
import ProgrammaticSection from "@/ServicesPages/PerformanceMarketing/ProgrammaticSection";
import DisplayCampaignSection from "@/ServicesPages/PerformanceMarketing/DisplayCampaignSection";
import PerformanceMarketingSection from "@/ServicesPages/PerformanceMarketing/PerformanceMarketingSection";
import MediaPlanningSection from "@/ServicesPages/PerformanceMarketing/MediaPlanningSection";
import AdOpsAgenciesSection from "@/ServicesPages/PerformanceMarketing/AdOpsAgenciesSection";
import AdOpsPublishersSection from "@/ServicesPages/PerformanceMarketing/AdOpsPublishersSection";
import AffiliateMarketingSection from "@/ServicesPages/PerformanceMarketing/AffiliateMarketingSection";
import RetargetingSection from "@/ServicesPages/PerformanceMarketing/RetargetingSection";
import RetailMediaSection from "@/ServicesPages/PerformanceMarketing/RetailMediaSection";
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
        <SeoServicesSection/>
        <SemGoogleAdsSection/>
        <ProgrammaticSection/>
        <DisplayCampaignSection/>
        <PerformanceMarketingSection/>
        <MediaPlanningSection/>
        <AdOpsAgenciesSection/>
        <AdOpsPublishersSection/>
        <AffiliateMarketingSection/>
        <RetargetingSection/>
        <RetailMediaSection/>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <SocialBar/>
        <Footer/>
    </div>
  );
};

export default page;
