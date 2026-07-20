import ContactHero from "@/components/contact/ContactHero";
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
      
      {/* Intro Text Section */}
      <section className="w-full bg-white py-20 md:py-24">
        <div className="max-w-[1350px] mx-auto px-8 md:px-16 lg:px-20">
          <div className="w-full">
            <p className="text-2xl md:text-3xl lg:text-[32px] font-medium text-[#17313B] leading-relaxed md:leading-normal">
              Thank you for your interest in partnering with Adapts Media for your Digital Marketing agency Dubai, We are ready to lead you in a new era of digital marketing. Please complete the below form, So we can provide quick service and quotation. Our 24/7 client service team helps you to reach your upcoming goals and make your revenue increase.
            </p>
          </div>
        </div>
      </section>

      <ContactFormSection />

      <ContactAddresses />

      <SocialBar />
      <Footer />
    </main>
  );
}
