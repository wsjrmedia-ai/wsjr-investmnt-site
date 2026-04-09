const API_URL = '/api/faq'; // ✅ local API route

export const getAllFAQs = async () => {
  try {
    const res = await fetch(API_URL, { cache: "no-store" }); // prevent caching
    if (!res.ok) throw new Error('Failed to fetch FAQs');

    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error(error);
    return []; // fallback empty array
  }
};
