import Image from "next/image";
import Link from "next/link";

interface BlogGridCardProps {
  title: string;
  image: string;
  slug: string;
  author: string;
  date: string;
  tags: string[];
}

export default function BlogGridCard({
  title,
  image,
  slug,
  author,
  date,
  tags,
}: BlogGridCardProps) {
  return (
    <Link href={`/blogs/${slug}`} className="group flex flex-col w-full block">
      {/* Image Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col mt-5 flex-grow">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-sans font-bold text-[#07476B] leading-snug line-clamp-2 mb-3 transition-colors group-hover:text-[#004dc3]">
          {title}
        </h3>

        {/* Meta (Author & Date) */}
        <div className="flex items-center justify-between text-xs font-sans mt-auto mb-4">
          <div className="flex items-center text-gray-500">
            <span>By</span>
            <span className="ml-1 text-[#004dc3] font-medium">{author}</span>
          </div>
          <span className="text-gray-400">{date}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#fac02d] text-[#17313B] text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
