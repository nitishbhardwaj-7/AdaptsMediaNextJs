import Hero from "@/ServicesPages/PublicRelations/Hero";
import Intro from "@/ServicesPages/PublicRelations/Intro";
import StrategicPrSection from "@/ServicesPages/PublicRelations/StrategicPrSection";
import PressReleasesSection from "@/ServicesPages/PublicRelations/PressReleasesSection";
import EventsActivationSection from "@/ServicesPages/PublicRelations/EventsActivationSection";
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
        <StrategicPrSection/>
        <PressReleasesSection/>
        <EventsActivationSection/>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <SocialBar/>
        <Footer/>
    </div>
  );
};

export default page;
