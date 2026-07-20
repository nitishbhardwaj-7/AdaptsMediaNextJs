import Image from 'next/image';

const AboutOrangeSection = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#C52A27] text-white py-20">
      
      {/* LAYER 0: The Background Image */}
      <img 
        src="/images/About_Us_Bg.png" 
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* LAYER 20: The Content Layer */}
      <div className="relative z-20 max-w-[1350px] w-full px-8 md:px-16">
        <div className="flex flex-col min-[1200px]:flex-row justify-between items-start gap-8 md:gap-16">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col w-full min-[1200px]:w-[58%]">
            <h1 className="text-[clamp(1.5rem,3.2vw,4rem)] font-extralight mb-6 md:mb-8 tracking-wider leading-tight">
              More Than an Agency. <br /> A Growth Partner.
            </h1>
            
            <div className="w-full">
              <h2 className="text-[clamp(1rem,1.6vw,1.67rem)] mb-4 md:mb-6 text-gray-200 font-thin font-sans">
                In a world where attention is limited and competition is constant, brands need more than just marketing, they need direction.
              </h2>
              
              <p className="text-[clamp(0.85rem,1.1vw,1.05rem)] mb-4 opacity-90 font-thin">
                That's where we come in.
              </p>
              
              <p className="text-[clamp(0.85rem,1.1vw,1.05rem)] mb-6 md:mb-8 font-thin">
                <span className="opacity-90">We are a team of strategists, creatives, and performance specialists working</span><br className="hidden md:block" />
                <span className="opacity-70">together to build brands that don't just show up, but stand out. Every project we </span><br className="hidden md:block" />
                <span className="opacity-50">take on starts with understanding your business, your audience, and your  </span><br className="hidden md:block" />
                <span className="opacity-40">ambition — because real growth begins with clarity.</span>
              </p>
              
              
              <h2 className="text-[clamp(1rem,2vw,1.6rem)] mb-5 md:mb-6 bg-gradient-to-r from-[#FFFFFF] to-[#FAC02E] bg-clip-text text-transparent font-heading font-medium leading-tight">
                From brand creation to performance marketing <br /> We design solutions that are intentional, <br/> measurable, and built to scale.
              </h2>

            </div>
          </div>

         
         <div className="flex justify-center items-center -mt-20 md:mt-6 w-full min-[1200px]:w-[42%]">
           <div 
             className="relative pointer-events-none max-w-[800px] w-full aspect-square flex items-center justify-center"
             style={{
               filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.55))",
             }}
           >
             {/* SVG Filter to remove black background (Chroma Key) with smooth edge blending */}
             <svg width="0" height="0" className="absolute">
               <defs>
                 <filter id="remove-black" colorInterpolationFilters="sRGB">
                   <feColorMatrix type="matrix" 
                     values="1 0 0 0 0
                             0 1 0 0 0
                             0 0 1 0 0
                             1.5 1.5 1.5 0 -0.1" />
                 </filter>
               </defs>
             </svg>

             {/* Warm ambient glow behind the compass */}
             <div
               className="absolute inset-0 rounded-full"
               style={{
                 background: "radial-gradient(circle, rgba(0,0,0,0.4) 30%, transparent 65%)",
                 filter: "blur(40px)",
                 transform: "scale(0.65) translateY(8%)",
               }}
             />

             <video
               src='/assets/moving compass_1.webm'
               autoPlay
               muted
               loop
               playsInline
               className="w-full h-full object-contain scale-160 md:scale-220"
               style={{
                 filter: "url(#remove-black)",
               }}
             />
           </div>
         </div>

        </div>
      </div>
      
    </section>
  );
};

export default AboutOrangeSection;