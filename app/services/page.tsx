import ClientsSection from "@/components/homepage/ClientsSection"
import ContactCTA from "@/components/homepage/ContactCTA"
import Footer from "@/components/layout/Footer"
import SocialBar from "@/components/layout/SocialBar"
import ConnectedThinkingServices from "@/components/servicespage/ConnectedThinking"
import PerformSection from "@/components/servicespage/PerformSection"
import PortfolioSection from "@/components/servicespage/PortfolioSection"
import ServicesHero from "@/components/servicespage/ServicesHero"

const page = () => {
  return (
    <div>
      {/* <ServicesHero/> */}
    <ConnectedThinkingServices/>
    <PortfolioSection/>
    <ClientsSection/>
    <PerformSection/>
    <ContactCTA/>
    <SocialBar/>
    <Footer/>
    </div>
  )
}

export default page