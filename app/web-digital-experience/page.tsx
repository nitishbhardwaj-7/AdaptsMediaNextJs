import Hero from "@/ServicesPages/WebDigitalExperience/Hero";
import Intro from "@/ServicesPages/WebDigitalExperience/Intro";
import UxUiSection from "@/ServicesPages/WebDigitalExperience/UxUiSection";
import WebDevelopmentSection from "@/ServicesPages/WebDigitalExperience/WebDevelopmentSection";
import EcommerceSection from "@/ServicesPages/WebDigitalExperience/EcommerceSection";
import CmsImplementationSection from "@/ServicesPages/WebDigitalExperience/CmsImplementationSection";
import ApiIntegrationSection from "@/ServicesPages/WebDigitalExperience/ApiIntegrationSection";
import LandingPageSection from "@/ServicesPages/WebDigitalExperience/LandingPageSection";
import MaintenanceSection from "@/ServicesPages/WebDigitalExperience/MaintenanceSection";
import CroSection from "@/ServicesPages/WebDigitalExperience/CroSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ClientsSection from "@/components/homepage/ClientsSection";

const page = () => {
  return (
    <div>
        <Hero/>
        <Intro/>
        <UxUiSection/>
        <WebDevelopmentSection/>
        <EcommerceSection/>
        <CmsImplementationSection/>
        <ApiIntegrationSection/>
        <LandingPageSection/>
        <MaintenanceSection/>
        <CroSection/>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <Footer/>
    </div>
  );
};

export default page;
