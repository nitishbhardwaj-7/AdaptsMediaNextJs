import Hero from "@/ServicesPages/WebDigitalExperience/Hero";
import Intro from "@/ServicesPages/WebDigitalExperience/Intro";
import UxUiSection from "@/ServicesPages/WebDigitalExperience/UxUiSection";
import FrontBackEndSection from "@/ServicesPages/WebDigitalExperience/FrontBackEndSection";
import ApiIntegrationSection from "@/ServicesPages/WebDigitalExperience/ApiIntegrationSection";
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
        <UxUiSection/>
        <FrontBackEndSection/>
        <ApiIntegrationSection/>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <SocialBar/>
        <Footer/>
    </div>
  );
};

export default page;
