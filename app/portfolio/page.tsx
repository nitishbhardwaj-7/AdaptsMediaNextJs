import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioList from "@/components/portfolio/PortfolioList";
import PortfolioSection from "@/components/servicespage/PortfolioSection";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Portfolio | Adapts Media",
  description: "Explore our featured portfolio of high-impact creative campaigns, brand design, and digital experiences.",
};

export default function PortfolioPage() {
  return (
    <main className="w-full bg-[#0c121c] text-white">
      <PortfolioHero />
      <PortfolioList />
      <PortfolioSection />
      <ContactCTA />
      <Footer />
    </main>
  );
}
