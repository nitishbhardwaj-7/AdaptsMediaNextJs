import { teamMembers } from "@/data/teamData";

const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export async function getWordPressPosts(limit: number = 100) {
  if (!BASE_URL) {
    console.error("WORDPRESS_URL is not defined in environment variables");
    return [];
  }

  const safeLimit = Math.min(limit, 100);

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=${safeLimit}&_fields=title,slug,date,categories,featured_media,_links,_embedded,yoast_head_json`,
      { next: { revalidate: 600 }, signal: AbortSignal.timeout(6000) }
    );

    if (!res.ok) throw new Error(`WordPress API returned status: ${res.status}`);

    const posts = await res.json();

    return posts.map((post: any) => {
      let authorName = post.yoast_head_json?.author;
      if (!authorName && post._embedded?.author && post._embedded.author.length > 0) {
        authorName = post._embedded.author[0].name;
      }
      if (!authorName) {
        authorName = "Shruti Goswami";
      }

      const schemaPerson = post.yoast_head_json?.schema?.['@graph']?.find(
        (item: any) => item['@type'] === 'Person'
      );
      let authorSlug = "shruti-goswami";
      if (schemaPerson?.url) {
        authorSlug = schemaPerson.url.split('/author/')[1]?.replace(/\//g, '') || authorSlug;
      } else {
        authorSlug = authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      
      const parsedDate = post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "June 30, 2026";
      
      let cats = post._embedded?.['wp:term']?.[0]?.filter((t: any) => t.taxonomy === 'category').map((c: any) => c.name) || [];
      if (cats.length === 0) cats = ["SEO", "Content Marketing", "Digital Strategy"];

      return {
        // Decoding titles for production-ready text
        title: post.title.rendered.replace(/&#(\d+);/g, (match: string, dec: number) => String.fromCharCode(dec)),
        image: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium_large?.source_url || 
               post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.large?.source_url || 
               post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
               "/fallback.jpg",
        slug: post.slug,
        date: parsedDate,
        author: authorName,
        authorSlug: authorSlug,
        categories: cats,
        content: "",
        yoast_head_json: post.yoast_head_json,
        _embedded: post._embedded,
      };
    });
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    return []; // Return empty array so .map() doesn't break your UI
  }
}

export async function getResolvedAuthor(post: any) {
  const schemaPerson = post.yoast_head_json?.schema?.['@graph']?.find(
    (item: any) => item['@type'] === 'Person'
  );

  const authorName = post.yoast_head_json?.author || schemaPerson?.name || "Shruti Goswami";

  // Fetch team members (scraping live WP page and fallback to local team data)
  const team = await getWordPressTeamMembers();
  const matchingMember = team.find((m: any) => 
    m.name.toLowerCase().trim() === authorName.toLowerCase().trim() ||
    m.slug === schemaPerson?.url?.split('/author/')[1]?.replace(/\//g, '')
  );

  let authorSlug = "shruti-goswami";
  if (schemaPerson?.url) {
    authorSlug = schemaPerson.url.split('/author/')[1]?.replace(/\//g, '') || authorSlug;
  } else if (matchingMember?.slug) {
    authorSlug = matchingMember.slug;
  } else {
    authorSlug = authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  let linkedin = "https://linkedin.com/company/adaptsmedia";
  if (schemaPerson?.sameAs) {
    const li = schemaPerson.sameAs.find((url: string) => url.includes("linkedin.com"));
    if (li) linkedin = li;
  } else if (matchingMember?.socials?.linkedin) {
    linkedin = matchingMember.socials.linkedin;
  }

  let email = "info@adaptsmedia.com";
  if (matchingMember?.socials?.email) {
    email = matchingMember.socials.email;
  }

  return {
    name: authorName,
    slug: authorSlug,
    description: schemaPerson?.description || matchingMember?.aboutLong || matchingMember?.bio || "Digital Marketing Expert at Adapts Media.",
    avatar: matchingMember?.image || post._embedded?.author?.[0]?.avatar_urls?.['96'] || "/images/team/shruti.jpg",
    role: matchingMember?.role || "Digital Marketing Specialist",
    linkedin,
    email,
  };
}

export async function getPostsByAuthor(authorSlug: string) {
  const posts = await getWordPressPosts(100);
  return posts.filter((post: any) => post.authorSlug === authorSlug);
}


export async function getSinglePost(slug: string) {
  if (!BASE_URL) return null;

  const url = `${BASE_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`;

  try {
    const res = await fetch(url, { next: { revalidate: 600 }, signal: AbortSignal.timeout(5000) });

    if (!res.ok) return null;

    const posts = await res.json();

    if (!posts || posts.length === 0) {
      return null;
    }

    return posts[0];
  } catch (error) {
    console.error(`Error fetching single post [${slug}]:`, error);
    return null;
  }
}


export async function getWordPressTeamMembers() {
  const { teamMembers } = await import('@/data/teamData');
  const teamUrl = BASE_URL ? `${BASE_URL}/team/` : 'https://adaptsmedia.com/team/';

  try {
    const res = await fetch(teamUrl, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return teamMembers;

    const html = await res.text();
    const cardBlocks = html.split(/<div[^>]*class=["'][^"']*card-wrapper[^"']*["']/gi).slice(1);
    
    if (cardBlocks.length > 0) {
      const parsed: any[] = [];
      let id = 1;

      for (const block of cardBlocks) {
        const imgMatch = block.match(/<img[^>]+src=["']([^"']+)["']/i);
        const nameMatch = block.match(/<h3[^>]*>(.*?)<\/h3>/i);
        const roleMatch = block.match(/<h5[^>]*>(.*?)<\/h5>/i);
        const bioMatch = block.match(/<p[^>]*>([\s\S]*?)<\/p>/i);

        const img = imgMatch ? imgMatch[1] : '';
        const name = nameMatch ? nameMatch[1].replace(/<[^>]+>/g, '').trim().replace(/&amp;/g, '&') : '';
        const role = roleMatch ? roleMatch[1].replace(/<[^>]+>/g, '').trim().replace(/&amp;/g, '&') : '';
        const bio = bioMatch ? bioMatch[1].replace(/<[^>]+>/g, '').trim().replace(/&amp;/g, '&') : '';
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        if (name && role && img) {
          const existing = teamMembers.find(t => t.slug === slug || t.name.toLowerCase().includes(name.toLowerCase()));

          parsed.push({
            id: id++,
            name,
            slug,
            role,
            image: img, // Directly from WordPress card-wrapper
            initials: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
            initialsBg: existing?.initialsBg || "bg-blue-600",
            bio: bio || existing?.bio || `${role} at Adapts Media.`,
            location: existing?.location || "Dubai, UAE",
            memberSince: existing?.memberSince || 2022,
            expertise: existing?.expertise || ["Digital Marketing", "Strategy"],
            topics: existing?.topics || ["Digital Marketing"],
            aboutLong: bio || existing?.aboutLong || `${name} is ${role} at Adapts Media.`,
            badges: existing?.badges || [role],
            socials: existing?.socials || { linkedin: "https://www.linkedin.com/company/adaptsmedia", email: "info@adaptsmedia.com" }
          });
        }
      }

      if (parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error fetching live WordPress team page:", error);
  }

  return teamMembers;
}

