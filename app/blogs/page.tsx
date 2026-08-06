import { getWordPressPosts } from "@/lib/getPosts";
import BlogList from "@/components/blog/BlogList";

export default async function AllBlogsPage() {
  const posts = await getWordPressPosts(100);

  return (
    <main className="bg-[#004dc3] min-h-screen">
      <BlogList posts={posts} />
    </main>
  );
}