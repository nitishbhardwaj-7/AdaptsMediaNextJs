import Image from "next/image";

const AboutHero = () => {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-[#032d57] flex items-center justify-center py-12 text-white">
      <Image
        src="/images/aboutus/HeroMask.png" 
        alt=""
        fill
        priority={true}
        sizes="100vw"
        className="absolute z-10 pointer-events-none object-cover" 
      />
      {/* Hero Content */}
      <div className="grid grid-cols-1 gap-8 min-[1200px]:grid-cols-2 max-w-[1350px] w-full px-8 md:px-16">
        {/* Left Side */}
        <div className="flex items-center">
          <h1 className="text-5xl tracking-wide md:text-7xl">
            About Us
          </h1>
        </div>

        {/* Right Side */}
        <div className="relative z-10 flex flex-col justify-center max-w-lg">
          <h2 className="mb-6 text-3xl leading-snug md:text-5xl">
            Built for Brands <br /> That Want to Grow, <br/> Not Just Exist.
          </h2>
          <p className="text-2xl font-extralight leading-tight tracking-wide text-white">
            We’re a new-age marketing agency combining strategy, creativity, and performance to help brands move faster, connect deeper, and scale smarter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;