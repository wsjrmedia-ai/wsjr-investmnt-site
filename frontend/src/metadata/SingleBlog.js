import { getBlogById } from "@/lib/blogUtils";

export async function generateBlogMetadata({ id }) {
  const blogId = decodeURIComponent(id);

  try {
    
    const blog = await getBlogById(id);

    console.log('blog data',JSON.stringify(blog));

    return {
      title: blog?.title || "Blog Details",
      description: blog?.description || "Read our latest blog post.",
      openGraph: {
        title: blog?.title,
        description: blog?.description,
        type: "article",
        images: blog?.image ? [blog.image] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: blog?.title,
        description: blog?.description,
        images: blog?.image ? [blog.image] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for blog:", error);
    return {
      title: "Blog",
      description: "Explore our latest blogs and insights.",
    };
  }
}
