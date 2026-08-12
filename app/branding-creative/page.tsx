import Hero from "@/ServicesPages/BrandingCreative/Hero"
import BrandingIntro from "@/ServicesPages/BrandingCreative/BrandingIntro"
import IdentitySection from "@/ServicesPages/BrandingCreative/IdentitySection"
import CampaignsSection from "@/ServicesPages/BrandingCreative/CampaignsSection"
import DesignSystemsSection from "@/ServicesPages/BrandingCreative/DesignSystemsSection"
import ContentStrategySection from "@/ServicesPages/BrandingCreative/ContentStrategySection"
import LeverageInfluencersSection from "@/ServicesPages/BrandingCreative/LeverageInfluencersSection"
import ContactCTA from "@/components/homepage/ContactCTA"
import Footer from "@/components/layout/Footer"
import PortfolioSection from "@/components/servicespage/PortfolioSection"
import ClientsSection from "@/components/homepage/ClientsSection"

const page = () => {
  return (
    <div>
        <Hero/>
        <BrandingIntro/>
        <div id="identity"><IdentitySection/></div>
        <div id="campaigns"><CampaignsSection/></div>
        <div id="design-systems"><DesignSystemsSection/></div>
        <div id="content-strategy"><ContentStrategySection/></div>
        <div id="influencers"><LeverageInfluencersSection/></div>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <Footer/>
    </div>
  )
}

export default page
