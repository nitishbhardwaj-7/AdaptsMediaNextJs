import Image from "next/image";
import ArrowButton from "../buttons/ArrowButton";
import Tailwind3DCard from "../cards/Tailwind3DCard";
import Link from "next/link";

const insights = [
  {
    title: "Social Media Marketing: Facts You Need to Know This Year",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Types of Web Development That Businesses Must Know",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Top AI Tools Digital Marketers Should Be Using Today!",
    image: "https://images.unsplash.com/photo-1698628472751-b65c74f247a9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "4 Simple Steps to Optimize Your Dubai Business for Web",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Social Media Marketing: Facts You Need to Know This Year",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Types of Web Development That Businesses Must Know",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Top AI Tools Digital Marketers Should Be Using Today!",
    image: "https://images.unsplash.com/photo-1698628472751-b65c74f247a9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "4 Simple Steps to Optimize Your Dubai Business for Web",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
  }
  // Adding more cards here will now automatically enable horizontal scrolling
];
interface Insight {
  title: string;
  image: string;
  slug?: string;
}

const PortfolioSection = () => {
  // Fetching real data from your WordPress backend via the helper function
//   const insights = await getWordPressPosts(10);
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden font-sans flex flex-col items-start justify-start md:items-center md:justify-center">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-600/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-900/30 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      
      <Image
        src="/images/Maskgroup.png" 
        alt="Decorative Element"
        fill
        sizes="100vw"
        quality={80}
        className="absolute z-10 pointer-events-none object-cover" 
      />

      {/* Removed 'mx-auto' and 'max-w-screen' to pin content to the left.
        Changed to w-full to allow scroll to span the width.
      */}
      <div className="relative z-20 max-w-[1350px] px-8 md:px-16 w-full">
        
        {/* Header Section: flex-col below 1300px to keep button left-aligned */}
        <div className="flex flex-col min-[1300px]:flex-row min-[1300px]:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-4">

            
          </div>

          <div className="flex justify-start">
  <Link href="/portfolio">
    <ArrowButton title="View Portfolio"/>
  </Link>
</div>
        </div>

        {/* --- HORIZONTAL SCROLLING GRID --- */}
        {/* Added '-mx-8' and 'px-8' on mobile/tablet range so the scroll 
            goes edge-to-edge but content aligns with the text.
        */}
        <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide px-8 min-[1300px]:mx-0 min-[1300px]:px-0">
          {insights.map((item: Insight, index: number) => (
            <Link 
              key={index} 
              href={`/blogs/${item.slug}`} 
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] snap-start"
            >
              {/* The card is now a child of the Link */}
              <Tailwind3DCard 
                title={item.title} 
                image={item.image} 
              />
            </Link>
          ))}
        </div>
        {/* ---------------------------------- */}

      </div>
    </section>
  );
};

export default PortfolioSection;