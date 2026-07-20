import Hero from "@/ServicesPages/BrandingCreative/Hero"
import BrandingIntro from "@/ServicesPages/BrandingCreative/BrandingIntro"
import IdentitySection from "@/ServicesPages/BrandingCreative/IdentitySection"
import CampaignsSection from "@/ServicesPages/BrandingCreative/CampaignsSection"
import DesignSystemsSection from "@/ServicesPages/BrandingCreative/DesignSystemsSection"
import ContentStrategySection from "@/ServicesPages/BrandingCreative/ContentStrategySection"
import LeverageInfluencersSection from "@/ServicesPages/BrandingCreative/LeverageInfluencersSection"
import ContactCTA from "@/components/homepage/ContactCTA"
import SocialBar from "@/components/layout/SocialBar"
import Footer from "@/components/layout/Footer"
import PortfolioSection from "@/components/servicespage/PortfolioSection"
import ClientsSection from "@/components/homepage/ClientsSection"

const page = () => {
  return (
    <div>
        <Hero/>
        <BrandingIntro/>
        <IdentitySection/>
        <CampaignsSection/>
        <DesignSystemsSection/>
        <ContentStrategySection/>
        <LeverageInfluencersSection/>
        <PortfolioSection/>
        <ClientsSection/>
        <ContactCTA/>
        <SocialBar/>
        <Footer/>
    </div>
  )
}

export default page
