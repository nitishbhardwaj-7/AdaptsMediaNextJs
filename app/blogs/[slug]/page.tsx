import { getSinglePost, getWordPressPosts } from "@/lib/getPosts";
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};


// This function replaces the "Create Next App" default with real blog data
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) return { title: "Post Not Found" };

  const yoast = post.yoast_head_json;

  return {
    // 1. Titles & Descriptions
    title: yoast?.title || post.title.rendered,
    description: yoast?.description || "Read more about this insight...",

    // 2. Canonicals (The SEO Team's priority)
    alternates: {
      canonical: yoast?.canonical || `https://adaptsmedia.com/blog/${slug}`,
    },

    // 3. Social Media (Open Graph)
    openGraph: {
      title: yoast?.og_title || yoast?.title || post.title.rendered,
      description: yoast?.og_description || yoast?.description,
      url: yoast?.og_url || `https://adaptsmedia.com/blog/${slug}`,
      siteName: yoast?.og_site_name || 'Adapts Media',
      type: 'article',
      images: [
        {
          url: yoast?.og_image?.[0]?.url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/default-og.jpg",
        },
      ],
    },

    // 4. Search Engine Instructions
    robots: {
      index: yoast?.robots?.index !== 'noindex',
      follow: yoast?.robots?.follow !== 'nofollow',
    }
  };
}

import SingleBlogHero from "@/components/blog/SingleBlogHero";
import AuthorSection from "@/components/blog/AuthorSection";
import BlogGridCard from "@/components/cards/BlogGridCard";
import ContactCTA from "@/components/homepage/ContactCTA";
import SocialBar from "@/components/layout/SocialBar";
import Footer from "@/components/layout/Footer";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getSinglePost(resolvedParams.slug);
  const recentPosts = await getWordPressPosts(4);
  const relatedPosts = recentPosts.filter((p: any) => p.slug !== resolvedParams.slug).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Post not found
      </div>
    );
  }

  let authorName = "Shruti Goswami";
  if (post._embedded?.author && post._embedded.author.length > 0) {
    authorName = post._embedded.author[0].name;
  }
  
  const parsedDate = post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "June 30, 2026";
  
  let cats = post._embedded?.['wp:term']?.[0]?.filter((t: any) => t.taxonomy === 'category').map((c: any) => c.name) || [];
  if (cats.length === 0) cats = ["SEO", "Content Marketing", "Digital Strategy"];

  const decodedTitle = post.title.rendered.replace(/&#(\d+);/g, (match: string, dec: number) => String.fromCharCode(dec));

  return (
    <>
      {post.yoast_head_json?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.yoast_head_json.schema) }}
        />
      )}

      <article className="bg-white min-h-screen text-[#17313B]">
        <SingleBlogHero 
          title={decodedTitle}
          author={authorName}
          date={parsedDate}
          categories={cats}
        />

        {/* Featured Image Overlap */}
        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
          <div className="relative z-20 max-w-5xl mx-auto px-6 -mt-32 md:-mt-40 mb-12">
            <div className="relative w-full overflow-hidden shadow-2xl bg-gray-100">
              <img 
                src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url} 
                alt="Featured Image"
                className="w-full h-auto block" 
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="
            /* Style Paragraphs */
            [&_p]:text-[#4a5568] [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-base
            
            /* Style Headings */
            [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-[#07476B] [&_h1]:mb-8
            [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[#1c64f2] [&_h2]:mt-12 [&_h2]:mb-6
            [&_h3]:text-lg md:text-xl [&_h3]:font-bold [&_h3]:text-[#2d3748] [&_h3]:mt-8 [&_h3]:mb-4
            
            /* Style Regular Lists */
            [&_ul:not(.questions-grid)]:list-disc [&_ul:not(.questions-grid)]:ml-6 [&_ul:not(.questions-grid)]:mb-6 [&_ul:not(.questions-grid)]:space-y-2
            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-6 [&_ol]:space-y-2
            [&_li]:text-[#4a5568] [&_li]:text-base
            
            /* Custom Questions Grid */
            [&_.questions-grid]:grid [&_.questions-grid]:grid-cols-1 md:[&_.questions-grid]:grid-cols-2 [&_.questions-grid]:gap-3 [&_.questions-grid]:mb-8 [&_.questions-grid]:list-none [&_.questions-grid]:ml-0 [&_.questions-grid]:p-0
            [&_.questions-grid>li]:bg-[#f4f4f4] [&_.questions-grid>li]:py-3 [&_.questions-grid>li]:px-4 [&_.questions-grid>li]:text-center [&_.questions-grid>li]:flex [&_.questions-grid>li]:items-center [&_.questions-grid>li]:justify-center [&_.questions-grid>li]:text-sm md:[&_.questions-grid>li]:text-base
            
            /* Style Links */
            [&_a]:text-[#4285f4] [&_a]:underline hover:[&_a]:text-[#07476B]
            
            /* Style Images inside content */
            [&_img]:my-8 [&_img]:w-full [&_img]:h-auto
            
            /* Style Bold Text */
            [&_strong]:text-[#17313B] [&_strong]:font-bold
            
            /* Style Tables */
            [&_table]:w-full [&_table]:border-collapse [&_table]:mb-8 [&_table]:text-left
            [&_th]:bg-[#f4f4f4] [&_th]:p-3 md:[&_th]:p-4 [&_th]:border [&_th]:border-gray-200 [&_th]:font-bold [&_th]:text-[#17313B]
            [&_td]:p-3 md:[&_td]:p-4 [&_td]:border [&_td]:border-gray-200 [&_td]:text-[#4a5568]
            [&_tr:first-child>td]:bg-[#f4f4f4] [&_tr:first-child>td]:text-[#17313B]
            
            /* Style Horizontal Rules */
            [&_hr]:border-t [&_hr]:border-gray-300 [&_hr]:my-10
          ">
            <div dangerouslySetInnerHTML={{ 
              __html: (() => {
                let modifiedContent = post.content.rendered;
                const parts = modifiedContent.split('</p>');
                let newParts: string[] = [];
                let currentList: string[] = [];
                
                for (let i = 0; i < parts.length; i++) {
                  let p = parts[i];
                  const pIndex = p.indexOf('<p');
                  
                  if (pIndex !== -1) {
                    const pContent = p.substring(p.indexOf('>', pIndex) + 1);
                    const stripped = pContent.replace(/<[^>]+>/g, '').trim().replace(/^(?:&nbsp;)+/, '').trim();
                    
                    if (/^([-–—]|&#8211;|&#8212;)/.test(stripped)) {
                      // It's a dash list item
                      let itemText = pContent.replace(/[-–—]|&#8211;|&#8212;/, '').trim();
                      itemText = itemText.replace(/^(?:&nbsp;|\s|<br>)+/, '');
                      currentList.push(`<li>${itemText}</li>`);
                      continue; // Skip adding the original <p> tag
                    } else if (stripped === '' || stripped === '&nbsp;') {
                      // Empty paragraph
                      if (currentList.length > 0) {
                        continue; // Skip it so it doesn't break the continuous list
                      }
                    } else {
                      // Regular paragraph
                      if (currentList.length > 0) {
                        newParts.push(`<ul class="questions-grid">${currentList.join('')}</ul>`);
                        currentList = [];
                      }
                    }
                  } else {
                    if (currentList.length > 0 && p.trim() !== '') {
                      newParts.push(`<ul class="questions-grid">${currentList.join('')}</ul>`);
                      currentList = [];
                    }
                  }
                  
                  newParts.push(p + (i < parts.length - 1 ? '</p>' : ''));
                }
                
                if (currentList.length > 0) {
                  newParts.push(`<ul class="questions-grid">${currentList.join('')}</ul>`);
                }
                
                return modifiedContent = newParts.join('');
              })()
            }} />
          </div>
        </div>

        {/* Dynamic Author Section */}
        <AuthorSection author={post._embedded?.author?.[0]} />

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="w-full bg-white py-20">
            <div className="max-w-[1350px] mx-auto px-8 md:px-16 lg:px-20">
              <h2 className="text-3xl md:text-4xl font-bold text-[#C52A27] mb-12">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((rp: any) => (
                  <BlogGridCard 
                    key={rp.slug}
                    title={rp.title}
                    image={rp.image}
                    slug={rp.slug}
                    author={rp.author}
                    date={rp.date}
                    tags={rp.categories}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <ContactCTA/>
        <SocialBar/>
        <Footer/>
      </article>
    </>
  );
}