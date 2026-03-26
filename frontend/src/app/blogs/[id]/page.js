import NewsDetail from "@/components/Blogs/news-detail";
import NewsDetailsBlog from "@/components/Blogs/NewsDetailsBlog";
import { generateBlogMetadata } from "@/metadata/SingleBlog"; // <- Your external metadata logic

// ✅ Use for SEO metadata
export async function generateMetadata({ params }) {
  return generateBlogMetadata({ id: params});
}

// ✅ Blog detail page component
export default async function Page({ params }) {
const { id } = await params;


  return (
    <div>
      <NewsDetailsBlog id={id} />
      <NewsDetail id={id} />
    </div>
  );
}
