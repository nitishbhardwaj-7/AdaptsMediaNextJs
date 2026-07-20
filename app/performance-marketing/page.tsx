import Hero from "@/ServicesPages/PerformanceMarketing/Hero";
import Intro from "@/ServicesPages/PerformanceMarketing/Intro";
import AffiliateChannelsSection from "@/ServicesPages/PerformanceMarketing/AffiliateChannelsSection";
import CostPerActionSection from "@/ServicesPages/PerformanceMarketing/CostPerActionSection";
import RoiModelSection from "@/ServicesPages/PerformanceMarketing/RoiModelSection";
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
        <AffiliateChannelsSection/>
        <CostPerActionSection/>
        <RoiModelSection/>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <SocialBar/>
        <Footer/>
    </div>
  );
};

export default page;
