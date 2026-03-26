// ✅ Local API URLs
const BLOGS_API = '/api/blogs';
const BLOG_CONTENT_API = '/api/blogs/content';

/**
 * Fetch all blog overviews from API
 */
export const getAllBlogOverviews = async () => {
  const res = await fetch(BLOGS_API, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch blog overviews');
  const blogData = await res.json();
  return blogData.map(({ id, title, date, writer, image, category, description, categorytype, redirectPath }) => ({
    id,
    title,
    date,
    writer,
    image,
    category,
    description,
    categorytype,
    redirectPath
  }));
};

/**
 * Fetch blog by redirectPath
 */
export const getBlogById = async (id) => {
  const res = await fetch(BLOGS_API, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch blog data');
  const blogData = await res.json();
  return blogData.find((blog) => blog.redirectPath === id) || null;
};

/**
 * Fetch blogs filtered by category
 */
export const getBlogsByCategory = async (category) => {
  const res = await fetch(BLOGS_API, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch blogs');
  const blogData = await res.json();
  if (!category || category.trim() === '') return blogData;
  return blogData.filter((blog) => blog.category.includes(category));
};

/**
 * Fetch blogs filtered by tag
 */
export const getBlogsByTag = async (tag) => {
  const res = await fetch(BLOGS_API, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch blogs');
  const blogData = await res.json();
  return blogData.filter((blog) => blog.tags.includes(tag));
};

/**
 * Get all unique categories
 */
export const getAllCategories = async () => {
  const res = await fetch(BLOGS_API, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch categories');
  const blogData = await res.json();
  const categoriesSet = new Set();
  blogData.forEach((blog) => {
    blog.category.forEach((cat) => categoriesSet.add(cat));
  });
  return Array.from(categoriesSet);
};

/**
 * Get all unique tags
 */
export const getAllTags = async () => {
  const res = await fetch(BLOGS_API, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch tags');
  const blogData = await res.json();
  const tagsSet = new Set();
  blogData.forEach((blog) => {
    blog.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
};

/**
 * Search blogs by keyword
 */
export const searchBlogs = async (keyword) => {
  if (!keyword || keyword.trim() === '') return [];
  const res = await fetch(BLOGS_API, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch blogs');
  const blogData = await res.json();
  const lowerKeyword = keyword.toLowerCase();

  return blogData.filter((blog) => {
    const { title, description, category, tags, writer, categorytype } = blog;
    return (
      title.toLowerCase().includes(lowerKeyword) ||
      description.toLowerCase().includes(lowerKeyword) ||
      writer.toLowerCase().includes(lowerKeyword) ||
      category.some((cat) => cat.toLowerCase().includes(lowerKeyword)) ||
      categorytype.some((cat) => cat.toLowerCase().includes(lowerKeyword)) ||
      tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
    );
  });
};

/**
 * Fetch blog content and category
 */
export const getBlogContentAndCategory = async ({ id, redirectPath }) => {
  if (!id && !redirectPath) {
    throw new Error('Either "id" or "redirectPath" must be provided');
  }

  const queryParam = id ? `id=${id}` : `redirectPath=${encodeURIComponent(redirectPath)}`;
  const url = `${BLOG_CONTENT_API}?${queryParam}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error('Failed to fetch blog content and category');

  const data = await res.json();
  return {
    content: data.content,
    category: data.category,
    tags: data.tags
  };
};
