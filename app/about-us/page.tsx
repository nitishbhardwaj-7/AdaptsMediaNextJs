import AboutHero from '@/components/aboutus/AboutHero'
import AboutOrangeSection from '@/components/aboutus/AboutOrangeSection'
import BlueSection from '@/components/aboutus/BlueSection'
import DubaiSection from '@/components/aboutus/DubaiSection'
import ImpactSection from '@/components/aboutus/ImpactSection'
import Recognized from '@/components/aboutus/Recognized'
import TeamSection from '@/components/aboutus/TeamSection'
import ClientsSection from '@/components/homepage/ClientsSection'
import ContactCTA from '@/components/homepage/ContactCTA'
import Footer from '@/components/layout/Footer'
import SocialBar from '@/components/layout/SocialBar'
import PerformSection from '@/components/servicespage/PerformSection'

const page = () => {
  return (
    <div>
    <AboutHero/>
    <DubaiSection/>
    <AboutOrangeSection/>
    <BlueSection/>
    <PerformSection/>
    <ImpactSection/>
    <TeamSection/>
    <ClientsSection/>
    <Recognized/>
    <ContactCTA/>
    <SocialBar/>
    <Footer/>
    </div>
  )
}

export default page