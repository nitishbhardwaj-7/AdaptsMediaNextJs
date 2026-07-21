import ContactHero from "@/components/contact/ContactHero";
import ContactIntroText from "@/components/contact/ContactIntroText";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactAddresses from "@/components/contact/ContactAddresses";
import SocialBar from "@/components/layout/SocialBar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: 'Contact Us | Adapts Media',
  description: "Let's build what's next. Launch your brand, scale your business, or find a strategic marketing partner with Adapts Media.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContactHero />
      
      <ContactIntroText />

      <ContactFormSection />

      <ContactAddresses />

      <SocialBar />
      <Footer />
    </main>
  );
}
