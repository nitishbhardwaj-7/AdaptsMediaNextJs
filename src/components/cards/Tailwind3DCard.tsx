const Tailwind3DCard = ({ title, image }: { title: string; image: string }) => {
  return (
    <div className="w-full">
      <div className="
        group relative aspect-[9/14] w-full overflow-hidden rounded-2xl 
        bg-zinc-900 border border-white/10 
        transition-all duration-500 ease-out
        hover:border-white/30 hover:shadow-[0_20px_40px_rgba(245,166,35,0.15)]
      ">

        {/* Image Layer */}
        <div
          className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105"
        >
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Overlay Shine */}
        <div
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent"
        />

        {/* Content Layer */}
        <div
          className="absolute bottom-0 left-0 right-0 p-8 z-20 transition-all duration-500"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#f5a623] uppercase mb-3 block opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
            Blog Post
          </span>
          <h3 className="text-2xl font-heading font-light leading-tight text-white">
            {title}
          </h3>

          <div className="h-[1px] w-0 group-hover:w-12 bg-[#f5a623] mt-4 transition-all duration-1000" />
        </div>

        {/* Border Highlight */}
        <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none z-30" />
      </div>
    </div>
  );
};

export default Tailwind3DCard;