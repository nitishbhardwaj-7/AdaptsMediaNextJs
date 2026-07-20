import Image from "next/image";

interface SingleBlogHeroProps {
  title: string;
  author: string;
  date: string;
  categories: string[];
}

const SingleBlogHero = ({ title, author, date, categories }: SingleBlogHeroProps) => {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-40 md:pb-48 px-6 text-center text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/CommonBlogHero.png"
        alt="Blog Hero Background"
        fill
        priority
        className="absolute inset-0 object-cover z-0"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col items-center">
        {/* Breadcrumb */}
        <p className="text-[10px] md:text-xs font-sans text-white/70 mb-6 tracking-wide">
          Adapts Media | Blog | <span className="text-[#6a9bd6]">{title}</span>
        </p>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans leading-snug mb-8 max-w-5xl text-center line-clamp-2"
          title={title}
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {/* Meta Info: Author */}
        {author && (
          <p className="text-sm md:text-base font-sans text-white/80 mb-2">
            By <span className="text-[#6a9bd6]">{author}</span>
          </p>
        )}

        {/* Meta Info: Date & Primary Category */}
        <p className="text-xs md:text-sm font-sans text-white/60 mb-8">
          {date} <span className="mx-2">|</span> Category: {categories.length > 0 ? categories[0] : "Insights"}
        </p>

        {/* Category Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat, index) => (
            <span
              key={index}
              className="bg-[#fac02d] text-[#17313B] text-[10px] md:text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SingleBlogHero;
