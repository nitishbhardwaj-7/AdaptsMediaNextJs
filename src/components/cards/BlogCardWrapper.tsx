"use client"

import Link from "next/link"
import Tailwind3DCard from "./Tailwind3DCard"

interface BlogCardWrapperProps {
  slug: string
  title: string
  image: string
}

export default function BlogCardWrapper({
  slug,
  title,
  image,
}: BlogCardWrapperProps) {
  const handleMouseEnter = () => {
    document.dispatchEvent(new Event("blog-card-enter"))
  }

  const handleMouseLeave = () => {
    document.dispatchEvent(new Event("blog-card-leave"))
  }

  return (
    <div
      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] snap-start"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/blogs/${slug}`} className="block h-full">
        <Tailwind3DCard title={title} image={image} />
      </Link>
    </div>
  )
}
