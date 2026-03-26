const API_URL = '/api/gallery'; // ✅ local API route

export const getGalleryImages = async () => {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error('Failed to fetch gallery');
    const data = await res.json();

    // Flatten into desired format
    const imagesData = data.flatMap(category =>
      category.images.map(img => ({
        category: category.categoryName,
        src: img.imageUrl,
      }))
    );

    return imagesData;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
};

export const getGalleryCategories = async () => {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error('Failed to fetch gallery categories');
    const data = await res.json();

    // Extract unique category names
    const categories = data.map(cat => cat.categoryName);

    // Add "All Photos" at the beginning
    return ["All Photos", ...categories];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ["All Photos"];
  }
};
